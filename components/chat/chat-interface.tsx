"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  role: "user" | "assistant"
  text: string
}

const QUICK_PROMPTS = [
  "Let's practice a cold call opening",
  "Help me handle the 'too expensive' objection",
  "Simulate a discovery call with a prospect",
  "Practice closing techniques with me",
]

export function ChatInterface() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight)
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      text,
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: text }],
        }),
      })

      const data = await res.json()

      const aiMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: data.text, // ✅ YAHI FIX HAI
      }

      setMessages((prev) => [...prev, aiMsg])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="flex h-[calc(100vh-12rem)] flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b p-4">
        <Bot />
        <div>
          <h3 className="font-semibold">AI Sales Coach</h3>
          <p className="text-xs text-muted-foreground">
            {loading ? "Thinking..." : "Ready to help"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="grid gap-2">
            {QUICK_PROMPTS.map((p) => (
              <Button key={p} variant="outline" onClick={() => sendMessage(p)}>
                {p}
              </Button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex gap-2",
                  m.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {m.role === "assistant" && <Bot />}
                <div className="max-w-[75%] rounded-lg bg-muted px-4 py-2">
                  <p className="whitespace-pre-wrap text-sm">{m.text}</p>
                </div>
                {m.role === "user" && <User />}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2">
                <Bot />
                <Loader2 className="animate-spin" />
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          sendMessage(input)
        }}
        className="flex gap-2 border-t p-4"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <Button type="submit" disabled={loading}>
          <Send />
        </Button>
      </form>
    </Card>
  )
}
