import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET() {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,  // ✅ this pulls from .env.local
    });

    const models = await client.models.list();

    return NextResponse.json({ ok: true, modelCount: models.data.length });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
