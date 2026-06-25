import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Loader2 } from "lucide-react"
import { sandboxes } from "@/lib/mock-data"
import type { SandboxStatus } from "@/types"

const BORDER: Record<SandboxStatus, string> = {
  running: "border-emerald-500/60",
  provisioning: "border-amber-500/60",
  terminated: "border-border opacity-60",
}

export function SandboxMap() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Sandbox Cluster</CardTitle>
        <span className="text-muted-foreground text-xs tabular-nums">
          {sandboxes.filter((s) => s.status === "running").length} running · {sandboxes.length} total
        </span>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
          {sandboxes.map((sb) => (
            <div
              key={sb.id}
              className={cn("bg-background relative flex flex-col gap-2.5 rounded-lg border-2 p-3", BORDER[sb.status])}
            >
              <div className="flex items-center justify-between">
                <span className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">{sb.id}</span>
                {sb.status === "running" && (
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                )}
                {sb.status === "provisioning" && <Loader2 className="size-3.5 animate-spin text-amber-500" />}
                {sb.status === "terminated" && <span className="bg-muted-foreground/50 size-2 rounded-full" />}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base">{sb.agentEmoji}</span>
                <span className="truncate text-sm font-medium">{sb.agentName}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-col gap-1">
                  <div className="text-muted-foreground flex justify-between text-xs">
                    <span>CPU</span>
                    <span className="tabular-nums">{sb.cpu}%</span>
                  </div>
                  <Progress value={sb.cpu} className="h-1.5" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-muted-foreground flex justify-between text-xs">
                    <span>MEM</span>
                    <span className="tabular-nums">{sb.memory}%</span>
                  </div>
                  <Progress value={sb.memory} className="h-1.5" />
                </div>
              </div>
              <span className="text-muted-foreground text-xs">{sb.runtime}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
