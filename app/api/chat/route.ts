// app/api/chat/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };
type ChatBody = { messages: ChatMessage[]; model?: string };

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatBody;

    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json({ ok: false, error: "messages required" }, { status: 400 });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    if (!client.apiKey) {
      return NextResponse.json({ ok: false, error: "Missing OPENAI_API_KEY" }, { status: 500 });
    }

    const model = body.model ?? "gpt-4o-mini";

    const res = await client.chat.completions.create({
      model,
      messages: body.messages,
    });

    const text = res.choices[0]?.message?.content ?? "";
    return NextResponse.json({ ok: true, reply: text });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
