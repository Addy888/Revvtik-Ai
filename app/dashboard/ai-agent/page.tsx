import { ChatInterface } from "@/components/chat/chat-interface"

export default function AIAgentPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">AI Sales Coach</h1>
        <p className="text-muted-foreground">Practice sales conversations and get instant feedback</p>
      </div>
      <ChatInterface />
    </div>
  )
}
