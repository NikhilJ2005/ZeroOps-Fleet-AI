"use client"

import * as React from "react"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { chatMessages as seed } from "@/lib/mock-data"
import type { ChatMessage } from "@/types"

export function AgentTerminal() {
  const [messages, setMessages] = React.useState<ChatMessage[]>(seed)
  const [input, setInput] = React.useState("")
  const [typing, setTyping] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, typing])

  function send() {
    if (!input.trim()) return
    const now = new Date().toTimeString().slice(0, 5)
    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}`, role: "user", author: "You", emoji: "🧑", content: input, timestamp: now },
    ])
    setInput("")
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-r`,
          role: "agent",
          author: "Research Scout",
          emoji: "🕵️",
          content: "Got it — kicking off a new sandbox run and streaming results to the log panel.",
          timestamp: new Date().toTimeString().slice(0, 5),
        },
      ])
    }, 1600)
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex-row items-center gap-2.5 border-b pb-4">
        <Avatar className="size-9">
          <AvatarFallback className="bg-primary/15 text-base">🕵️</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-semibold leading-tight">Research Scout</span>
          <span className="flex items-center gap-1 text-xs text-emerald-500">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Online
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col gap-3 pt-4">
        <div ref={scrollRef} className="scrollbar-thin flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1">
          {messages.map((m) => (
            <div key={m.id} className={cn("flex gap-2", m.role === "user" ? "flex-row-reverse" : "flex-row")}>
              <span className="bg-muted flex size-7 shrink-0 items-center justify-center rounded-full text-sm">
                {m.emoji}
              </span>
              <div
                className={cn(
                  "max-w-[78%] rounded-2xl px-3 py-2 text-sm",
                  m.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-muted text-foreground rounded-tl-sm",
                )}
              >
                <p className="leading-relaxed">{m.content}</p>
                <span
                  className={cn(
                    "mt-1 block text-[10px]",
                    m.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground",
                  )}
                >
                  {m.timestamp}
                </span>
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex gap-2">
              <span className="bg-muted flex size-7 shrink-0 items-center justify-center rounded-full text-sm">
                🕵️
              </span>
              <div className="bg-muted flex items-center gap-1 rounded-2xl rounded-tl-sm px-3 py-3">
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
              </div>
            </div>
          )}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            send()
          }}
          className="flex items-center gap-2"
        >
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message the agent..." />
          <Button type="submit" size="icon" aria-label="Send message">
            <Send />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
