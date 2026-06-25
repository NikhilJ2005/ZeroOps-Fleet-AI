import { SandboxMap } from "@/components/monitor/sandbox-map"
import { LogStream } from "@/components/monitor/log-stream"
import { AgentTerminal } from "@/components/monitor/agent-terminal"
import { ResourceMetrics } from "@/components/monitor/resource-metrics"

export const metadata = {
  title: "Live Monitor | AgentSphere",
}

export default function MonitorPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground text-balance">Live Monitor</h1>
        <p className="text-sm text-muted-foreground">
          Real-time view of sandboxes, logs, agent sessions, and resource usage.
        </p>
      </div>

      <SandboxMap />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-[440px]">
          <LogStream />
        </div>
        <div className="h-[440px]">
          <AgentTerminal />
        </div>
      </div>

      <ResourceMetrics />
    </div>
  )
}
