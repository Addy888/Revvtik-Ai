import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"

export const runtime = "nodejs"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const messages = body.messages || []

    const lastUserMessage =
      messages[messages.length - 1]?.content || "Hello"

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307", // ✅ guaranteed access
      max_tokens: 800,
      system: `
You are an AI Sales Coach.

- Practice cold calls
- Handle objections
- Simulate discovery calls
- Help with closing techniques

Be realistic, practical, and conversational.
`,
      messages: [
        {
          role: "user",
          content: lastUserMessage,
        },
      ],
    })

    // ✅ SAFE TEXT EXTRACTION
    const text = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n")

    return NextResponse.json({ text })
  } catch (error) {
    console.error("CHAT API ERROR:", error)
    return NextResponse.json(
      { error: "Chat failed" },
      { status: 500 }
    )
  }
}
