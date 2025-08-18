// app/actions/preferences.ts
'use server';

import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import OpenAI from 'openai';

// helper to coerce values into strings that fit your schema
function toStr(v: any): string | null {
  if (v === undefined || v === null) return null;
  if (Array.isArray(v)) return v.join(', ');
  if (typeof v === 'object') return JSON.stringify(v);
  return String(v);
}

/** ---- helper: FormData -> plain object (handles multi-values) ---- */
function formDataToObject(fd: FormData) {
  const obj: Record<string, any> = {};
  fd.forEach((value, key) => {
    const v = String(value);
    if (key in obj) {
      if (!Array.isArray(obj[key])) obj[key] = [obj[key]];
      obj[key].push(v);
    } else {
      obj[key] = v;
    }
  });
  return obj;
}

/** ---- Save preferences from either QUICK (flat) or FULL (wizard) form ---- */
export async function savePreferences(formData: FormData) {
  // QUICK mode: step-by-step wizard posts flat keys (name, grade, etc.)
  const isQuick = formData.has('name') || formData.has('grade');

  let payload: any;

  if (isQuick) {
    const flat = formDataToObject(formData);

    // minimal sanity
    const name = String(flat.name || '');
    const grade = String(flat.grade || '');
    if (!name || !grade) {
      throw new Error('Please fill your name and grade.');
    }

    payload = {
      mode: 'quick',
      identity: { name, grade },
      data: flat, // keep all flat answers
    };
  } else {
    // FULL wizard path (older large form)
    const pickMulti = (name: string, opts: string[]) => {
      const selected = formData.getAll(name).map(String);
      return opts.filter((o) => selected.includes(o));
    };

    const role = String(formData.get('role') ?? 'general');

    payload = {
      role,
      core: {
        struggles: pickMulti('core.struggles', [
          'Focus','Procrastination','Time planning','Confidence',
          'Communication','Money management','Health/energy','Finding opportunities',
        ]),
        bestTime: String(formData.get('core.bestTime') ?? ''),
        style: String(formData.get('core.style') ?? ''),
        accountability: String(formData.get('core.accountability') ?? ''),
        failedHabit: String(formData.get('core.failedHabit') ?? ''),
      },
      student: role === 'student' ? {
        heavySubjects: String(formData.get('student.heavySubjects') ?? ''),
        studyPlan: String(formData.get('student.studyPlan') ?? ''),
        confidence: String(formData.get('student.confidence') ?? ''),
        weeklyPractice: String(formData.get('student.weeklyPractice') ?? ''),
        opportunities: pickMulti('student.opportunities', [
          'Internships','Research projects','Hackathons','Olympiads','Not now',
        ]),
      } : null,
      earlyPro: role === 'early-pro' ? {
        stressors: pickMulti('earlyPro.stressors', [
          'New tech stack','Task estimates','Reviews/feedback',
          'Team communication','Meetings','Imposter feelings',
        ]),
        ninetyDayOutcome: String(formData.get('earlyPro.ninetyDayOutcome') ?? ''),
        weeklyHelp: pickMulti('earlyPro.weeklyHelp', [
          'Breaking tasks','Estimating time','Standup prep','Code review checklist','Learning plan',
        ]),
        interviewPrep: String(formData.get('earlyPro.interviewPrep') ?? ''),
      } : null,
      finance: {
        simplePlan: String(formData.get('finance.simplePlan') ?? ''),
        moneyGoals: pickMulti('finance.moneyGoals', [
          'Emergency fund','Pay down debt','Save for a laptop/course','Invest basics',
        ]),
        nudgeStyle: String(formData.get('finance.nudgeStyle') ?? ''),
      },
      health: {
        energy: String(formData.get('health.energy') ?? ''),
        checkins: String(formData.get('health.checkins') ?? ''),
        dependents: String(formData.get('health.dependents') ?? ''),
      },
      communication: {
        scenario: pickMulti('communication.scenario', [
          'Writing clear updates','Asking for help','Pushing back on timelines','1:1 prep','Interview intros',
        ]),
        tone: String(formData.get('communication.tone') ?? ''),
      },
      timeFocus: {
        timeLeaks: pickMulti('timeFocus.timeLeaks', [
          'Social apps','YouTube/shorts','Meetings','Context switching','Perfectionism',
        ]),
        aids: pickMulti('timeFocus.aids', [
          'Website blocker','Calendar holds','25-min sprints','Priority matrix',
        ]),
        cadence: String(formData.get('timeFocus.cadence') ?? ''),
      },
      consent: formData.get('consent') === 'on',
    };

    if (payload.core.struggles.length === 0) {
      throw new Error('Please select at least one struggle.');
    }
    if (!payload.core.bestTime || !payload.core.style) {
      throw new Error('Please answer best time and style.');
    }
  }

  const pref = await db.preference.create({
    data: { answers: payload },
    select: { id: true },
  });

  redirect(`/train/analyze?pref=${pref.id}`);
}

/** ---- Analyze a saved Preference and create a ProfileSummary; return its id ---- */
export async function analyzePreferences(prefId: string) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is missing. Add it to .env(.local) and restart the server.');
  }

  const pref = await db.preference.findUnique({ where: { id: prefId } });
  if (!pref) {
    throw new Error('No preferences found — please complete the onboarding form first.');
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

  const system = `You are Mentark, an accountability & planning coach.
Return concise JSON with keys: goals, persona, cadence, focusAreas, plan, tags.
Persona ∈ ["gentle encouragement","direct & firm","data-driven","short actionable steps"].
Cadence ∈ ["light","medium","intense"]. Keep outputs short but specific.`;

  const resp = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: `Analyze this onboarding JSON:\n${JSON.stringify(pref.answers)}` },
    ],
    temperature: 0.2,
    max_tokens: 400,
  });

  const content = resp.choices[0]?.message?.content ?? '{}';
  let parsed: any = {};
  try { parsed = JSON.parse(content); } catch { /* leave {} */ }

  // ⬇️ Use toStr() here so arrays/objects fit your String? schema
  const profile = await db.profileSummary.create({
    data: {
      userId: pref.userId ?? null,
      preferenceId: pref.id,
      goals: toStr(parsed.goals),
      persona: toStr(parsed.persona),
      cadence: toStr(parsed.cadence),
      focusAreas: toStr(parsed.focusAreas),
      plan: toStr(parsed.plan),
      tags: toStr(parsed.tags),
    },
    select: { id: true },
  });

  return profile.id;
}
