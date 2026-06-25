"use client"

import * as React from "react"
import { AgentList } from "@/components/agents/agent-list"
import { AgentBuilder } from "@/components/agents/agent-builder"
import { agents } from "@/lib/mock-data"

export function AgentStudio() {
  const [selectedId, setSelectedId] = React.useState(agents[0].id)
  const selected = agents.find((a) => a.id === selectedId) ?? agents[0]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground text-balance">Agent Studio</h1>
        <p className="text-sm text-muted-foreground">
          Design, configure, and deploy autonomous agents across your fleet.
        </p>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <AgentList agents={agents} selectedId={selectedId} onSelect={setSelectedId} />
        <div className="min-w-0 flex-1">
          <AgentBuilder key={selected.id} agent={selected} />
        </div>
      </div>
    </div>
  )
}
