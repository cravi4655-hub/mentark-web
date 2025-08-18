import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { message, profileId } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Missing message' }, { status: 400 });
    }
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OPENAI_API_KEY missing' }, { status: 500 });
    }

    // Load profile context (persona, cadence, goals, focusAreas, plan)
    let profile = null as any;
    if (profileId) {
      profile = await db.profileSummary.findUnique({
        where: { id: String(profileId) },
        select: {
          persona: true, cadence: true, goals: true, focusAreas: true, plan: true, tags: true,
        },
      });
    }

    const system = `You are Mentark, a friendly accountability & planning coach.
Always give short, specific, step-by-step guidance. Match the user's preferred persona and cadence if provided.`;

    const context = {
      persona: profile?.persona ?? null,
      cadence: profile?.cadence ?? null,
      goals: profile?.goals ?? null,
      focusAreas: profile?.focusAreas ?? null,
      plan: profile?.plan ?? null,
      tags: profile?.tags ?? null,
    };

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const resp = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.4,
      messages: [
        { role: 'system', content: system },
        {
          role: 'user',
          content:
            `Context (JSON): ${JSON.stringify(context)}\n\nUser: ${message}\n` +
            `Respond in 4-6 concise bullet points or 2-3 short paragraphs. End with 1 next action.`,
        },
      ],
    });

    const reply = resp.choices[0]?.message?.content ?? 'Sorry, I could not generate a reply.';
    return NextResponse.json({ reply });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unexpected error' }, { status: 500 });
  }
}
