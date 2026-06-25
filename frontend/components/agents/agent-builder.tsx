"use client"

import * as React from "react"
import {
  Code2,
  GitBranch,
  FileText,
  Globe,
  Bell,
  GripVertical,
  Plus,
  Trash2,
  type LucideIcon,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import type { Agent, ModelProvider } from "@/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/shared/status-badge"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const EMOJIS = ["🤖", "🕵️", "📊", "📝", "⚡", "🔍", "🛡️", "🧪"]

const PROVIDERS: { id: ModelProvider; label: string; desc: string; models: string[] }[] = [
  { id: "AWS Bedrock", label: "AWS Bedrock", desc: "Managed Claude & Titan", models: ["claude-3-5-sonnet", "claude-3-haiku", "titan-text-premier"] },
  { id: "OpenAI", label: "OpenAI", desc: "GPT-4o family", models: ["gpt-4o", "gpt-4o-mini", "o1-preview"] },
  { id: "Ollama", label: "Ollama", desc: "Self-hosted models", models: ["llama3.1:70b", "mistral-large", "qwen2.5:32b"] },
]

const TOOLS: { id: string; name: string; desc: string; icon: LucideIcon }[] = [
  { id: "code", name: "Code Execution", desc: "Run code in an isolated sandbox", icon: Code2 },
  { id: "github", name: "GitHub Reader", desc: "Read repos, issues and PRs", icon: GitBranch },
  { id: "file", name: "File Writer", desc: "Create and edit files", icon: FileText },
  { id: "web", name: "Web Search", desc: "Query the web with citations", icon: Globe },
  { id: "slack", name: "Slack Notify", desc: "Post messages to channels", icon: Bell },
]

const MEMORY = ["256MB", "512MB", "1GB", "2GB"]
const TIMEOUT = ["30s", "60s", "5min", "15min"]
const NETWORK = ["Restricted", "Allowed domains", "Open"]

export function AgentBuilder({ agent }: { agent: Agent }) {
  const [emoji, setEmoji] = React.useState(agent.emoji)
  const [provider, setProvider] = React.useState<ModelProvider>(agent.provider)
  const [model, setModel] = React.useState(agent.model)
  const [temperature, setTemperature] = React.useState(0.7)
  const [tools, setTools] = React.useState<string[]>(["code", "github"])
  const [memory, setMemory] = React.useState("512MB")
  const [timeout, setTimeoutVal] = React.useState("60s")
  const [network, setNetwork] = React.useState("Restricted")
  const [envVars, setEnvVars] = React.useState([
    { key: "OPENAI_API_KEY", value: "sk-••••••••" },
    { key: "LOG_LEVEL", value: "info" },
  ])

  const activeProvider = PROVIDERS.find((p) => p.id === provider)!

  React.useEffect(() => {
    setEmoji(agent.emoji)
    setProvider(agent.provider)
    setModel(agent.model)
  }, [agent])

  return (
    <div className="bg-card flex min-w-0 flex-1 flex-col rounded-xl border">
      {/* Header */}
      <div className="flex items-center gap-3 border-b p-4">
        <div className="bg-muted/60 flex size-11 items-center justify-center rounded-xl text-xl">
          {emoji}
        </div>
        <div className="flex flex-col">
          <h2 className="text-base font-semibold tracking-tight">{agent.name}</h2>
          <span className="text-muted-foreground text-xs">
            {agent.provider} · {agent.model}
          </span>
        </div>
        <StatusBadge status={agent.status} className="ml-auto" />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="general" className="flex min-h-0 flex-1 flex-col">
        <div className="border-b px-4 pt-3">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="model">Model</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="sandbox">Sandbox</TabsTrigger>
          </TabsList>
        </div>

        <div className="scrollbar-thin flex-1 overflow-y-auto p-6">
          {/* GENERAL */}
          <TabsContent value="general" className="mt-0 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="agent-name">Agent name</Label>
              <Input id="agent-name" defaultValue={agent.name} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="agent-desc">Description</Label>
              <Textarea id="agent-desc" rows={3} defaultValue={agent.description} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Avatar</Label>
              <div className="flex flex-wrap gap-2">
                {EMOJIS.map((e) => (
                  <button
                    key={e}
                    onClick={() => setEmoji(e)}
                    className={cn(
                      "flex size-11 items-center justify-center rounded-lg border text-xl transition-all",
                      emoji === e
                        ? "border-primary bg-primary/10 ring-primary/30 ring-2"
                        : "border-border hover:bg-accent",
                    )}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-1.5">
                {agent.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
                <Badge variant="outline" className="cursor-pointer gap-1">
                  <Plus className="size-3" /> Add
                </Badge>
              </div>
            </div>
          </TabsContent>

          {/* MODEL */}
          <TabsContent value="model" className="mt-0 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label>Provider</Label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {PROVIDERS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setProvider(p.id)
                      setModel(p.models[0])
                    }}
                    className={cn(
                      "flex flex-col items-start gap-0.5 rounded-lg border p-3 text-left transition-all",
                      provider === p.id
                        ? "border-primary bg-primary/10 ring-primary/30 ring-2"
                        : "border-border hover:bg-accent",
                    )}
                  >
                    <span className="text-sm font-medium">{p.label}</span>
                    <span className="text-muted-foreground text-xs">{p.desc}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Model</Label>
              <Select value={model} onValueChange={(v) => setModel((v as string) ?? "")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {activeProvider.models.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Label>Temperature</Label>
                <span className="text-muted-foreground text-sm tabular-nums">{temperature.toFixed(1)}</span>
              </div>
              <Slider
                value={temperature}
                onValueChange={(v) => setTemperature(v as number)}
                min={0}
                max={2}
                step={0.1}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="max-tokens">Max tokens</Label>
              <Input id="max-tokens" type="number" defaultValue={4096} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="system-prompt">System prompt</Label>
              <Textarea
                id="system-prompt"
                rows={6}
                className="font-mono text-xs"
                defaultValue={`You are ${agent.name}, an autonomous agent.\n\n## Responsibilities\n- ${agent.description}\n\n## Guidelines\n- Be concise and cite sources.\n- Never expose secrets.`}
              />
            </div>
          </TabsContent>

          {/* TOOLS */}
          <TabsContent value="tools" className="mt-0 flex flex-col gap-2">
            {TOOLS.map((tool) => {
              const enabled = tools.includes(tool.id)
              return (
                <div
                  key={tool.id}
                  className="flex items-center gap-3 rounded-lg border p-3"
                >
                  <GripVertical className="text-muted-foreground size-4 shrink-0 cursor-grab" />
                  <div className="bg-muted/60 text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
                    <tool.icon className="size-[18px]" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="text-sm font-medium">{tool.name}</span>
                    <span className="text-muted-foreground text-xs">{tool.desc}</span>
                  </div>
                  <Switch
                    checked={enabled}
                    onCheckedChange={(c) =>
                      setTools((prev) => (c ? [...prev, tool.id] : prev.filter((t) => t !== tool.id)))
                    }
                  />
                </div>
              )
            })}
          </TabsContent>

          {/* SANDBOX */}
          <TabsContent value="sandbox" className="mt-0 flex flex-col gap-6">
            <SegmentedField label="Memory limit" options={MEMORY} value={memory} onChange={setMemory} />
            <SegmentedField label="Timeout" options={TIMEOUT} value={timeout} onChange={setTimeoutVal} />
            <SegmentedField label="Network" options={NETWORK} value={network} onChange={setNetwork} />
            <div className="flex flex-col gap-2">
              <Label>Environment variables</Label>
              <div className="flex flex-col gap-2">
                {envVars.map((ev, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      value={ev.key}
                      onChange={(e) =>
                        setEnvVars((prev) => prev.map((p, idx) => (idx === i ? { ...p, key: e.target.value } : p)))
                      }
                      placeholder="KEY"
                      className="font-mono text-xs"
                    />
                    <Input
                      value={ev.value}
                      onChange={(e) =>
                        setEnvVars((prev) => prev.map((p, idx) => (idx === i ? { ...p, value: e.target.value } : p)))
                      }
                      placeholder="value"
                      className="font-mono text-xs"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEnvVars((prev) => prev.filter((_, idx) => idx !== i))}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="self-start gap-1"
                  onClick={() => setEnvVars((prev) => [...prev, { key: "", value: "" }])}
                >
                  <Plus data-icon="inline-start" />
                  Add variable
                </Button>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* Fixed bottom bar */}
      <div className="flex items-center justify-end gap-2 border-t p-4">
        <Button variant="ghost" onClick={() => toast("Draft saved")}>
          Save Draft
        </Button>
        <Button variant="outline" onClick={() => toast.info("Running test execution...")}>
          Test Agent
        </Button>
        <Button onClick={() => toast.success(`${agent.name} deployed`)}>Deploy</Button>
      </div>
    </div>
  )
}

function SegmentedField({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <div className="bg-muted/50 inline-flex w-fit rounded-lg border p-1">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              value === opt ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
