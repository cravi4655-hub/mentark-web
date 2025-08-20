// app/api/test/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET() {
  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const models = await client.models.list();
    return NextResponse.json({ ok: true, modelCount: models.data.length });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
