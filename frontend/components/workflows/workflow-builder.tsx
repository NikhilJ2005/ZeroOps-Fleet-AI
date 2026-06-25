"use client"

import * as React from "react"
import {
  ArrowLeft,
  Undo2,
  Redo2,
  Webhook,
  Clock,
  MousePointerClick,
  GitBranch,
  Timer,
  Split,
  UserCheck,
  Mail,
  MessageSquare,
  FileText,
  Bot,
  Plus,
  Minus,
  Maximize,
  type LucideIcon,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { agents } from "@/lib/mock-data"

type NodeKind = "trigger" | "agent" | "logic" | "action" | "end"

interface CanvasNode {
  id: string
  kind: NodeKind
  label: string
  sublabel: string
  icon: LucideIcon
  x: number
  y: number
}

interface Edge {
  from: string
  to: string
}

const PALETTE: { group: string; items: { label: string; icon: LucideIcon; kind: NodeKind }[] }[] = [
  {
    group: "Triggers",
    items: [
      { label: "Webhook", icon: Webhook, kind: "trigger" },
      { label: "Schedule", icon: Clock, kind: "trigger" },
      { label: "Manual", icon: MousePointerClick, kind: "trigger" },
    ],
  },
  {
    group: "Agents",
    items: agents.slice(0, 4).map((a) => ({ label: a.name, icon: Bot, kind: "agent" as NodeKind })),
  },
  {
    group: "Logic",
    items: [
      { label: "Condition", icon: GitBranch, kind: "logic" },
      { label: "Delay", icon: Timer, kind: "logic" },
      { label: "Parallel", icon: Split, kind: "logic" },
      { label: "Human Approval", icon: UserCheck, kind: "logic" },
    ],
  },
  {
    group: "Actions",
    items: [
      { label: "Send Email", icon: Mail, kind: "action" },
      { label: "Slack Message", icon: MessageSquare, kind: "action" },
      { label: "File Write", icon: FileText, kind: "action" },
    ],
  },
]

const NODE_W = 200
const NODE_H = 76

const KIND_STYLES: Record<NodeKind, string> = {
  trigger: "border-emerald-500/60 bg-emerald-500/5",
  agent: "border-primary/60 bg-primary/5",
  logic: "border-amber-500/60 bg-amber-500/5",
  action: "border-sky-500/60 bg-sky-500/5",
  end: "border-border bg-muted/30",
}

const KIND_ICON_BG: Record<NodeKind, string> = {
  trigger: "bg-emerald-500/15 text-emerald-500",
  agent: "bg-primary/15 text-primary",
  logic: "bg-amber-500/15 text-amber-500",
  action: "bg-sky-500/15 text-sky-500",
  end: "bg-muted text-muted-foreground",
}

const INITIAL_NODES: CanvasNode[] = [
  { id: "n1", kind: "trigger", label: "Webhook", sublabel: "POST /ingest", icon: Webhook, x: 80, y: 200 },
  { id: "n2", kind: "agent", label: "Research Scout", sublabel: "claude-3-5-sonnet", icon: Bot, x: 380, y: 180 },
  { id: "n3", kind: "end", label: "End", sublabel: "Return result", icon: MousePointerClick, x: 680, y: 200 },
]

const INITIAL_EDGES: Edge[] = [
  { from: "n1", to: "n2" },
  { from: "n2", to: "n3" },
]

export function WorkflowBuilder() {
  const [nodes, setNodes] = React.useState<CanvasNode[]>(INITIAL_NODES)
  const [edges] = React.useState<Edge[]>(INITIAL_EDGES)
  const [selectedId, setSelectedId] = React.useState<string | null>("n2")
  const [zoom, setZoom] = React.useState(1)
  const dragRef = React.useRef<{ id: string; offX: number; offY: number } | null>(null)
  const canvasRef = React.useRef<HTMLDivElement>(null)

  const selected = nodes.find((n) => n.id === selectedId) ?? null

  function onPointerDown(e: React.PointerEvent, node: CanvasNode) {
    e.stopPropagation()
    setSelectedId(node.id)
    const rect = canvasRef.current!.getBoundingClientRect()
    dragRef.current = {
      id: node.id,
      offX: (e.clientX - rect.left) / zoom - node.x,
      offY: (e.clientY - rect.top) / zoom - node.y,
    }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragRef.current) return
    const rect = canvasRef.current!.getBoundingClientRect()
    const x = (e.clientX - rect.left) / zoom - dragRef.current.offX
    const y = (e.clientY - rect.top) / zoom - dragRef.current.offY
    setNodes((prev) =>
      prev.map((n) => (n.id === dragRef.current!.id ? { ...n, x: Math.max(0, x), y: Math.max(0, y) } : n)),
    )
  }

  function onPointerUp() {
    dragRef.current = null
  }

  function edgePath(from: CanvasNode, to: CanvasNode) {
    const x1 = from.x + NODE_W
    const y1 = from.y + NODE_H / 2
    const x2 = to.x
    const y2 = to.y + NODE_H / 2
    const dx = Math.max(40, Math.abs(x2 - x1) * 0.5)
    return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`
  }

  return (
    <div className="flex h-[calc(100vh-7rem)] flex-col gap-0 overflow-hidden rounded-xl border">
      {/* Top toolbar */}
      <div className="bg-card flex items-center gap-2 border-b px-4 py-2.5">
        <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => window.history.back()}>
          <ArrowLeft data-icon="inline-start" />
          Back
        </Button>
        <div className="bg-border mx-1 h-5 w-px" />
        <Button variant="ghost" size="icon" aria-label="Undo">
          <Undo2 />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Redo">
          <Redo2 />
        </Button>
        <div className="ml-2 flex flex-col">
          <span className="text-sm font-semibold leading-tight">Content Pipeline</span>
          <span className="text-muted-foreground text-xs leading-tight">Draft · auto-saved</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => toast("Draft saved")}>
            Save Draft
          </Button>
          <Button size="sm" onClick={() => toast.success("Workflow deployed")}>
            Deploy Workflow
          </Button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Palette */}
        <aside className="bg-card scrollbar-thin w-[200px] shrink-0 overflow-y-auto border-r p-3">
          <div className="flex flex-col gap-4">
            {PALETTE.map((section) => (
              <div key={section.group} className="flex flex-col gap-1.5">
                <span className="text-muted-foreground px-1 text-xs font-medium uppercase tracking-wider">
                  {section.group}
                </span>
                {section.items.map((item, i) => (
                  <div
                    key={`${item.label}-${i}`}
                    draggable
                    className={cn(
                      "flex cursor-grab items-center gap-2 rounded-lg border p-2 text-sm transition-colors active:cursor-grabbing",
                      "border-border bg-background hover:border-primary/40 hover:bg-accent",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-md",
                        KIND_ICON_BG[item.kind],
                      )}
                    >
                      <item.icon className="size-4" />
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </aside>

        {/* Canvas */}
        <div className="relative min-w-0 flex-1 overflow-hidden bg-muted/20">
          <div
            ref={canvasRef}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onClick={() => setSelectedId(null)}
            className="bg-dot-grid absolute inset-0 origin-top-left"
            style={{ transform: `scale(${zoom})`, width: `${100 / zoom}%`, height: `${100 / zoom}%` }}
          >
            {/* Edges */}
            <svg className="pointer-events-none absolute inset-0 size-full overflow-visible">
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6 Z" className="fill-muted-foreground" />
                </marker>
              </defs>
              {edges.map((edge) => {
                const from = nodes.find((n) => n.id === edge.from)
                const to = nodes.find((n) => n.id === edge.to)
                if (!from || !to) return null
                return (
                  <path
                    key={`${edge.from}-${edge.to}`}
                    d={edgePath(from, to)}
                    className="stroke-muted-foreground/50"
                    strokeWidth={2}
                    fill="none"
                    markerEnd="url(#arrow)"
                  />
                )
              })}
            </svg>

            {/* Nodes */}
            {nodes.map((node) => {
              const isSelected = node.id === selectedId
              const isEndpoint = node.kind === "trigger" || node.kind === "end"
              return (
                <div
                  key={node.id}
                  onPointerDown={(e) => onPointerDown(e, node)}
                  onClick={(e) => e.stopPropagation()}
                  className={cn(
                    "absolute flex cursor-grab touch-none items-center gap-3 rounded-xl border-2 p-3 shadow-sm transition-shadow active:cursor-grabbing",
                    KIND_STYLES[node.kind],
                    "bg-card",
                    isSelected && "shadow-lg shadow-primary/30 ring-2 ring-primary",
                    isEndpoint && "rounded-full",
                  )}
                  style={{ left: node.x, top: node.y, width: NODE_W, height: NODE_H }}
                >
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-lg",
                      KIND_ICON_BG[node.kind],
                    )}
                  >
                    <node.icon className="size-[18px]" />
                  </span>
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-medium">{node.label}</span>
                    <span className="text-muted-foreground truncate text-xs">{node.sublabel}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Zoom controls */}
          <div className="bg-card absolute bottom-4 right-4 flex items-center gap-1 rounded-lg border p-1 shadow-sm">
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label="Zoom out"
              onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.1).toFixed(2)))}
            >
              <Minus />
            </Button>
            <span className="text-muted-foreground w-12 text-center text-xs tabular-nums">
              {Math.round(zoom * 100)}%
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label="Zoom in"
              onClick={() => setZoom((z) => Math.min(1.5, +(z + 0.1).toFixed(2)))}
            >
              <Plus />
            </Button>
            <Button variant="ghost" size="icon" className="size-8" aria-label="Reset zoom" onClick={() => setZoom(1)}>
              <Maximize />
            </Button>
          </div>
        </div>

        {/* Properties panel */}
        <aside className="bg-card scrollbar-thin w-[320px] shrink-0 overflow-y-auto border-l">
          <div className="border-b p-4">
            <h3 className="text-sm font-semibold">Properties</h3>
            <p className="text-muted-foreground text-xs">
              {selected ? `Editing "${selected.label}"` : "Select a node to edit"}
            </p>
          </div>
          {selected ? (
            <div className="flex flex-col gap-5 p-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="capitalize">
                  {selected.kind}
                </Badge>
                <span className="text-muted-foreground text-xs">{selected.id}</span>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="node-label">Label</Label>
                <Input id="node-label" defaultValue={selected.label} />
              </div>

              {selected.kind === "agent" && (
                <>
                  <div className="flex flex-col gap-2">
                    <Label>Agent</Label>
                    <Select defaultValue={agents[0].id}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {agents.map((a) => (
                            <SelectItem key={a.id} value={a.id}>
                              {a.emoji} {a.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="input-map">Input mapping</Label>
                    <Input id="input-map" defaultValue="{{ trigger.payload }}" className="font-mono text-xs" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="output-var">Output variable</Label>
                    <Input id="output-var" defaultValue="research_result" className="font-mono text-xs" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>On success</Label>
                    <Select defaultValue="continue">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="continue">Continue to next node</SelectItem>
                          <SelectItem value="end">End workflow</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>On failure</Label>
                    <Select defaultValue="retry">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="retry">Retry (3x)</SelectItem>
                          <SelectItem value="alert">Alert &amp; stop</SelectItem>
                          <SelectItem value="ignore">Ignore &amp; continue</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {selected.kind === "trigger" && (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="endpoint">Endpoint</Label>
                  <Input id="endpoint" defaultValue="/api/ingest" className="font-mono text-xs" />
                </div>
              )}
            </div>
          ) : (
            <div className="text-muted-foreground p-8 text-center text-sm">
              Click a node on the canvas to configure it.
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
