import { NextResponse } from "next/server"
import { anthropic } from "@ai-sdk/anthropic"
import { generateText } from "ai"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const messages = body.messages || []

    const lastUserMessage =
      messages[messages.length - 1]?.content || "Hello"

    const result = await generateText({
      model: anthropic("claude-3-haiku-20240307"),
      system: `
You are an AI Sales Coach.

- Practice cold calls
- Handle objections
- Simulate discovery calls
- Help with closing techniques

Be realistic, practical, and conversational.
`,
      prompt: lastUserMessage,
      maxOutputTokens: 800,
    })

    return NextResponse.json({
      text: result.text,
    })
  } catch (error) {
    console.error("CHAT API ERROR:", error)
    return NextResponse.json(
      { error: "Chat failed" },
      { status: 500 }
    )
  }
}