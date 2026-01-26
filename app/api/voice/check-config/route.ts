import { NextResponse } from "next/server"

export async function GET() {
  const hasApiKey = !!process.env.ELEVENLABS_API_KEY
  return NextResponse.json({ configured: hasApiKey })
}
