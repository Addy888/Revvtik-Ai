"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mic, MicOff, Volume2, AlertCircle } from "lucide-react"

interface ElevenLabsWidgetProps {
  agentId?: string
}

export function ElevenLabsWidget({ agentId = "agent_9601kaxw4474fs7srpvh9srbth7k" }: ElevenLabsWidgetProps) {
  const [isActive, setIsActive] = useState(false)
  const [hasApiKey, setHasApiKey] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Check if ElevenLabs API key is configured
    const checkApiKey = async () => {
      try {
        const response = await fetch("/api/voice/check-config")
        const data = await response.json()
        setHasApiKey(data.configured)
      } catch {
        setHasApiKey(false)
      }
    }
    checkApiKey()
  }, [])

  const handleToggle = () => {
    setIsActive(!isActive)
  }

  if (!hasApiKey) {
    return (
      <Card className="border-border/50 bg-card p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <AlertCircle className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">ElevenLabs Voice AI Not Configured</h3>
          <p className="mb-4 text-sm text-muted-foreground max-w-md mx-auto">
            To enable voice-based training with ElevenLabs, please add your ELEVENLABS_API_KEY environment variable. In
            the meantime, you can use the Web Speech API fallback below.
          </p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="border-border/50 bg-card overflow-hidden">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Volume2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">ElevenLabs Voice Agent</h3>
              <p className="text-xs text-muted-foreground">
                {isActive ? "Session active" : "Click to start voice session"}
              </p>
            </div>
          </div>
          <Button onClick={handleToggle} variant={isActive ? "destructive" : "default"} size="sm">
            {isActive ? (
              <>
                <MicOff className="mr-2 h-4 w-4" />
                End Session
              </>
            ) : (
              <>
                <Mic className="mr-2 h-4 w-4" />
                Start Voice
              </>
            )}
          </Button>
        </div>
      </div>

      {isActive && (
        <div className="aspect-video w-full">
          <iframe
            ref={iframeRef}
            src={`https://elevenlabs.io/app/talk-to?agent_id=${agentId}`}
            className="h-full w-full border-0"
            allow="microphone"
            title="ElevenLabs Voice Agent"
          />
        </div>
      )}

      {!isActive && (
        <div className="p-12 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Mic className="h-10 w-10 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">
            Click &quot;Start Voice&quot; to begin a voice conversation with the AI sales coach
          </p>
        </div>
      )}
    </Card>
  )
}
