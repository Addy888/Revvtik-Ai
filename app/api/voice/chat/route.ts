import { NextResponse } from "next/server"
import { anthropic } from "@ai-sdk/anthropic"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { text } = await req.json()

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 })
    }

    const result = await generateText({
      model: anthropic("claude-3-haiku-20240307"), // ✅ WORKING MODEL
      system: `
You are an AI Sales Coach.
Respond clearly and conversationally.
Keep replies short and helpful for voice.
`,
      prompt: text,
    })

    return NextResponse.json({
      reply: result.text,
    })
  } catch (err) {
    console.error("VOICE CHAT ERROR:", err)
    return NextResponse.json({ error: "Voice AI failed" }, { status: 500 })
  }
}
