// app/actions/preferences.ts
'use server';

import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import OpenAI from 'openai';

/** JSON helper type (no `any`) */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

/** OpenAI analysis shape we expect back */
type ParsedProfile = {
  goals?: Json;
  persona?: string | null;
  cadence?: string | null;
  focusAreas?: Json;
  plan?: Json;
  tags?: Json;
};

/** helper: FormData -> plain object (handles multi-values) */
function formDataToObject(fd: FormData): Record<string, string | string[]> {
  const obj: Record<string, string | string[]> = {};
  fd.forEach((value, key) => {
    const v = String(value);
    if (key in obj) {
      const existing = obj[key];
      obj[key] = Array.isArray(existing) ? [...existing, v] : [existing, v];
    } else {
      obj[key] = v;
    }
  });
  return obj;
}

/** ---- Save preferences from either QUICK (flat) or FULL (wizard) form ---- */
export async function savePreferences(formData: FormData) {
  const isQuick = formData.has('name') || formData.has('grade');

  let payload: Json;

  if (isQuick) {
    const flat = formDataToObject(formData);
    const name = String(flat.name ?? '');
    const grade = String(flat.grade ?? '');
    if (!name || !grade) throw new Error('Please fill your name and grade.');

    payload = {
      mode: 'quick',
      identity: { name, grade },
      data: flat as Json,
    };
  } else {
    // FULL wizard path (older large form)
    const pickMulti = (name: string, opts: string[]) => {
      const selected = formData.getAll(name).map(String);
      return opts.filter((o) => selected.includes(o));
    };

    const role = String(formData.get('role') ?? 'general');

    const fullPayload: Record<string, Json> = {
      role,
      core: {
        struggles: pickMulti('core.struggles', [
          'Focus',
          'Procrastination',
          'Time planning',
          'Confidence',
          'Communication',
          'Money management',
          'Health/energy',
          'Finding opportunities',
        ]),
        bestTime: String(formData.get('core.bestTime') ?? ''),
        style: String(formData.get('core.style') ?? ''),
        accountability: String(formData.get('core.accountability') ?? ''),
        failedHabit: String(formData.get('core.failedHabit') ?? ''),
      },
      student:
        role === 'student'
          ? {
              heavySubjects: String(formData.get('student.heavySubjects') ?? ''),
              studyPlan: String(formData.get('student.studyPlan') ?? ''),
              confidence: String(formData.get('student.confidence') ?? ''),
              weeklyPractice: String(formData.get('student.weeklyPractice') ?? ''),
              opportunities: pickMulti('student.opportunities', [
                'Internships',
                'Research projects',
                'Hackathons',
                'Olympiads',
                'Not now',
              ]),
            }
          : null,
      earlyPro:
        role === 'early-pro'
          ? {
              stressors: pickMulti('earlyPro.stressors', [
                'New tech stack',
                'Task estimates',
                'Reviews/feedback',
                'Team communication',
                'Meetings',
                'Imposter feelings',
              ]),
              ninetyDayOutcome: String(formData.get('earlyPro.ninetyDayOutcome') ?? ''),
              weeklyHelp: pickMulti('earlyPro.weeklyHelp', [
                'Breaking tasks',
                'Estimating time',
                'Standup prep',
                'Code review checklist',
                'Learning plan',
              ]),
              interviewPrep: String(formData.get('earlyPro.interviewPrep') ?? ''),
            }
          : null,
      finance: {
        simplePlan: String(formData.get('finance.simplePlan') ?? ''),
        moneyGoals: pickMulti('finance.moneyGoals', [
          'Emergency fund',
          'Pay down debt',
          'Save for a laptop/course',
          'Invest basics',
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
          'Writing clear updates',
          'Asking for help',
          'Pushing back on timelines',
          '1:1 prep',
          'Interview intros',
        ]),
        tone: String(formData.get('communication.tone') ?? ''),
      },
      timeFocus: {
        timeLeaks: pickMulti('timeFocus.timeLeaks', [
          'Social apps',
          'YouTube/shorts',
          'Meetings',
          'Context switching',
          'Perfectionism',
        ]),
        aids: pickMulti('timeFocus.aids', [
          'Website blocker',
          'Calendar holds',
          '25-min sprints',
          'Priority matrix',
        ]),
        cadence: String(formData.get('timeFocus.cadence') ?? ''),
      },
      consent: formData.get('consent') === 'on',
    };

    if (
      !Array.isArray((fullPayload.core as { struggles: unknown }).struggles) ||
      (fullPayload.core as { struggles: unknown[] }).struggles.length === 0
    ) {
      throw new Error('Please select at least one struggle.');
    }
    if (
      !(fullPayload.core as { bestTime: string }).bestTime ||
      !(fullPayload.core as { style: string }).style
    ) {
      throw new Error('Please answer best time and style.');
    }

    payload = fullPayload as Json;
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
  if (!pref) throw new Error('No preferences found — please complete the onboarding form first.');

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
  });

  const content = resp.choices[0]?.message?.content ?? '{}';

  let parsed: ParsedProfile = {};
  try {
    parsed = JSON.parse(content) as ParsedProfile;
  } catch {
    parsed = {};
  }

  // Save in JSON columns (your schema already uses Json? types)
  const profile = await db.profileSummary.create({
    data: {
      userId: pref.userId ?? null,
      preferenceId: pref.id,
      goals: parsed.goals ?? null,
      persona: parsed.persona ?? null,
      cadence: parsed.cadence ?? null,
      focusAreas: parsed.focusAreas ?? null,
      plan: parsed.plan ?? null,
      tags: parsed.tags ?? null,
    },
    select: { id: true },
  });

  return profile.id;
}