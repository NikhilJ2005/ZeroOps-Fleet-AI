"use client"

import * as React from "react"
import { Copy, Search } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { logs as seedLogs } from "@/lib/mock-data"
import type { LogLevel, LogLine } from "@/types"

const LEVEL_COLOR: Record<LogLevel, string> = {
  INFO: "text-slate-300",
  WARN: "text-amber-400",
  ERROR: "text-red-400",
  DEBUG: "text-sky-400",
}

const SAMPLE_MESSAGES = [
  "Spawning sandbox sb-a91f for agent run",
  "Tool call: web_search(query='latest metrics')",
  "Received 200 OK from Bedrock endpoint",
  "Token budget at 62% for current execution",
  "Retrying upstream request (attempt 2/3)",
  "Memory threshold approaching 480MB",
  "Execution completed in 1.84s",
]

export function LogStream() {
  const [logs, setLogs] = React.useState<LogLine[]>(seedLogs)
  const [level, setLevel] = React.useState<string>("all")
  const [query, setQuery] = React.useState("")
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const id = setInterval(() => {
      const levels: LogLevel[] = ["INFO", "INFO", "INFO", "WARN", "DEBUG", "ERROR"]
      const lvl = levels[Math.floor(Math.random() * levels.length)]
      const now = new Date()
      const ts = now.toTimeString().slice(0, 8) + "." + String(now.getMilliseconds()).padStart(3, "0")
      setLogs((prev) =>
        [
          ...prev,
          {
            id: `${now.getTime()}`,
            timestamp: ts,
            level: lvl,
            message: SAMPLE_MESSAGES[Math.floor(Math.random() * SAMPLE_MESSAGES.length)],
          },
        ].slice(-200),
      )
    }, 2200)
    return () => clearInterval(id)
  }, [])

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [logs])

  const filtered = logs.filter(
    (l) =>
      (level === "all" || l.level === level) &&
      (query === "" || l.message.toLowerCase().includes(query.toLowerCase())),
  )

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex-row items-center justify-between gap-2 pb-3">
        <CardTitle>Log Stream</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5"
          onClick={() => {
            navigator.clipboard?.writeText(filtered.map((l) => `${l.timestamp} ${l.level} ${l.message}`).join("\n"))
            toast.success("Logs copied")
          }}
        >
          <Copy data-icon="inline-start" />
          Copy
        </Button>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col gap-3">
        <div className="flex items-center gap-2">
          <Select value={level} onValueChange={(v) => setLevel((v as string) ?? "all")}>
            <SelectTrigger className="h-9 w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All levels</SelectItem>
                <SelectItem value="INFO">INFO</SelectItem>
                <SelectItem value="WARN">WARN</SelectItem>
                <SelectItem value="ERROR">ERROR</SelectItem>
                <SelectItem value="DEBUG">DEBUG</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute left-2.5 top-1/2 size-4 -translate-y-1/2" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter logs..."
              className="h-9 pl-8"
            />
          </div>
        </div>
        <div
          ref={scrollRef}
          className="scrollbar-thin min-h-0 flex-1 overflow-y-auto rounded-lg bg-slate-950 p-3 font-mono text-xs leading-relaxed"
        >
          {filtered.map((log) => (
            <div key={log.id} className="flex gap-2 py-0.5">
              <span className="shrink-0 text-emerald-400">{log.timestamp}</span>
              <span className={cn("shrink-0 font-semibold", LEVEL_COLOR[log.level])}>{log.level}</span>
              <span className="text-slate-300">{log.message}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
