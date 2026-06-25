import type {
  Agent,
  Execution,
  Sandbox,
  LogLine,
  ChatMessage,
  LeaderboardRow,
  NotificationItem,
  Team,
} from "@/types"

export const agents: Agent[] = [
  {
    id: "agt_devbot",
    name: "DevBot",
    emoji: "🤖",
    description: "Autonomous coding agent that ships PRs and fixes failing CI.",
    status: "active",
    tags: ["coding", "github", "ci"],
    provider: "AWS Bedrock",
    model: "claude-3-5-sonnet",
    runs: 1284,
    cpu: 62,
    runtime: "3h 12m",
  },
  {
    id: "agt_sleuth",
    name: "Sleuth",
    emoji: "🕵️",
    description: "Investigates incidents, correlates logs and writes RCAs.",
    status: "active",
    tags: ["observability", "incident"],
    provider: "OpenAI",
    model: "gpt-4o",
    runs: 642,
    cpu: 38,
    runtime: "1h 47m",
  },
  {
    id: "agt_analyst",
    name: "Analyst",
    emoji: "📊",
    description: "Pulls metrics from warehouses and builds weekly reports.",
    status: "idle",
    tags: ["analytics", "sql"],
    provider: "AWS Bedrock",
    model: "claude-3-haiku",
    runs: 389,
    cpu: 4,
    runtime: "0m",
  },
  {
    id: "agt_scribe",
    name: "Scribe",
    emoji: "📝",
    description: "Drafts changelogs, release notes and docs from commits.",
    status: "idle",
    tags: ["docs", "writing"],
    provider: "OpenAI",
    model: "gpt-4o-mini",
    runs: 921,
    cpu: 2,
    runtime: "0m",
  },
  {
    id: "agt_flux",
    name: "Flux",
    emoji: "⚡",
    description: "High-throughput data enrichment and embedding pipeline.",
    status: "active",
    tags: ["pipeline", "embeddings"],
    provider: "Ollama",
    model: "llama3.1:70b",
    runs: 5120,
    cpu: 81,
    runtime: "11h 02m",
  },
  {
    id: "agt_seeker",
    name: "Seeker",
    emoji: "🔍",
    description: "Deep research agent with web search and citations.",
    status: "error",
    tags: ["research", "web"],
    provider: "OpenAI",
    model: "gpt-4o",
    runs: 247,
    cpu: 0,
    runtime: "0m",
  },
  {
    id: "agt_sentinel",
    name: "Sentinel",
    emoji: "🛡️",
    description: "Scans dependencies and code for security vulnerabilities.",
    status: "offline",
    tags: ["security", "scanning"],
    provider: "AWS Bedrock",
    model: "claude-3-5-sonnet",
    runs: 158,
    cpu: 0,
    runtime: "0m",
  },
  {
    id: "agt_proto",
    name: "Proto",
    emoji: "🧪",
    description: "Experimental sandbox agent for evals and prompt testing.",
    status: "active",
    tags: ["eval", "testing"],
    provider: "Ollama",
    model: "mistral-large",
    runs: 73,
    cpu: 27,
    runtime: "0h 24m",
  },
]

export const executions: Execution[] = [
  {
    id: "exec_8821",
    agentName: "DevBot",
    agentEmoji: "🤖",
    task: "Fix flaky integration test in checkout-service",
    status: "success",
    duration: "7.2s",
    timeAgo: "12s ago",
  },
  {
    id: "exec_8820",
    agentName: "Flux",
    agentEmoji: "⚡",
    task: "Embed 12,480 support tickets into pgvector",
    status: "running",
    duration: "2m 41s",
    timeAgo: "running",
  },
  {
    id: "exec_8819",
    agentName: "Sleuth",
    agentEmoji: "🕵️",
    task: "Correlate 5xx spike with deploy d-9f2a",
    status: "success",
    duration: "18.4s",
    timeAgo: "1m ago",
  },
  {
    id: "exec_8818",
    agentName: "Seeker",
    agentEmoji: "🔍",
    task: "Research competitor pricing models",
    status: "failed",
    duration: "4.0s",
    timeAgo: "3m ago",
  },
  {
    id: "exec_8817",
    agentName: "Scribe",
    agentEmoji: "📝",
    task: "Generate release notes for v2.14.0",
    status: "success",
    duration: "9.8s",
    timeAgo: "6m ago",
  },
  {
    id: "exec_8816",
    agentName: "Analyst",
    agentEmoji: "📊",
    task: "Build weekly revenue cohort report",
    status: "success",
    duration: "22.1s",
    timeAgo: "11m ago",
  },
  {
    id: "exec_8815",
    agentName: "Proto",
    agentEmoji: "🧪",
    task: "Run eval suite against prompt-v7",
    status: "running",
    duration: "1m 03s",
    timeAgo: "running",
  },
  {
    id: "exec_8814",
    agentName: "DevBot",
    agentEmoji: "🤖",
    task: "Open PR: migrate auth to Better Auth",
    status: "success",
    duration: "41.6s",
    timeAgo: "18m ago",
  },
]

export const sandboxes: Sandbox[] = [
  { id: "SB-1042", agentName: "DevBot", agentEmoji: "🤖", status: "running", cpu: 62, memory: 71, runtime: "3h 12m" },
  { id: "SB-1041", agentName: "Flux", agentEmoji: "⚡", status: "running", cpu: 81, memory: 88, runtime: "11h 02m" },
  { id: "SB-1040", agentName: "Sleuth", agentEmoji: "🕵️", status: "running", cpu: 38, memory: 44, runtime: "1h 47m" },
  { id: "SB-1039", agentName: "Proto", agentEmoji: "🧪", status: "provisioning", cpu: 12, memory: 18, runtime: "0h 00m" },
  { id: "SB-1038", agentName: "Seeker", agentEmoji: "🔍", status: "terminated", cpu: 0, memory: 0, runtime: "—" },
  { id: "SB-1037", agentName: "Analyst", agentEmoji: "📊", status: "running", cpu: 24, memory: 33, runtime: "0h 41m" },
  { id: "SB-1036", agentName: "Scribe", agentEmoji: "📝", status: "provisioning", cpu: 8, memory: 14, runtime: "0h 00m" },
  { id: "SB-1035", agentName: "Sentinel", agentEmoji: "🛡️", status: "terminated", cpu: 0, memory: 0, runtime: "—" },
  { id: "SB-1034", agentName: "DevBot", agentEmoji: "🤖", status: "running", cpu: 55, memory: 49, runtime: "0h 58m" },
  { id: "SB-1033", agentName: "Flux", agentEmoji: "⚡", status: "running", cpu: 77, memory: 80, runtime: "4h 20m" },
]

export const logs: LogLine[] = [
  { id: "l1", timestamp: "10:23:01.204", level: "INFO", message: "Sandbox SB-1042 provisioned in us-east-1 (claude-3-5-sonnet)" },
  { id: "l2", timestamp: "10:23:01.876", level: "INFO", message: "Agent DevBot attached to sandbox SB-1042" },
  { id: "l3", timestamp: "10:23:02.331", level: "DEBUG", message: "Tool registry loaded: code_exec, github_reader, file_writer" },
  { id: "l4", timestamp: "10:23:03.012", level: "INFO", message: "Cloning repo vercel/commerce@main (depth=1)" },
  { id: "l5", timestamp: "10:23:05.448", level: "WARN", message: "Rate limit at 82% for provider AWS Bedrock" },
  { id: "l6", timestamp: "10:23:06.991", level: "INFO", message: "Executing step 1/4: locate failing test" },
  { id: "l7", timestamp: "10:23:08.220", level: "ERROR", message: "ECONNRESET while reaching registry.npmjs.org — retrying (1/3)" },
  { id: "l8", timestamp: "10:23:09.005", level: "INFO", message: "Retry succeeded, dependencies installed (412 pkgs)" },
  { id: "l9", timestamp: "10:23:11.762", level: "INFO", message: "Patch applied to checkout-service/cart.test.ts" },
  { id: "l10", timestamp: "10:23:14.530", level: "INFO", message: "Test suite passed: 248 passed, 0 failed (7.2s)" },
  { id: "l11", timestamp: "10:23:15.118", level: "INFO", message: "Opened PR #4821 — fix: stabilize flaky cart test" },
  { id: "l12", timestamp: "10:23:15.640", level: "DEBUG", message: "Tokens used: 18,402 in / 3,118 out — est. $0.21" },
]

export const chatMessages: ChatMessage[] = [
  {
    id: "m1",
    role: "user",
    author: "You",
    emoji: "🧑‍💻",
    content: "Investigate the 5xx spike on checkout-service and tell me the likely cause.",
    timestamp: "10:21",
  },
  {
    id: "m2",
    role: "agent",
    author: "Sleuth",
    emoji: "🕵️",
    content:
      "Pulling traces and deploy history now. I see a 14x increase in 5xx starting at 10:04 UTC, correlated with deploy d-9f2a.",
    timestamp: "10:21",
  },
  {
    id: "m3",
    role: "agent",
    author: "Sleuth",
    emoji: "🕵️",
    content:
      "Root cause: the new connection pool config lowered max connections from 50 to 10, exhausting the pool under load. Recommend reverting d-9f2a or bumping pool size.",
    timestamp: "10:22",
  },
  {
    id: "m4",
    role: "user",
    author: "You",
    emoji: "🧑‍💻",
    content: "Open a rollback PR and notify the on-call channel.",
    timestamp: "10:22",
  },
]

export const leaderboard: LeaderboardRow[] = [
  { rank: 1, agentName: "Flux", agentEmoji: "⚡", runs: 5120, successRate: 99.2, avgTime: "1.4s", tokens: "48.2M" },
  { rank: 2, agentName: "DevBot", agentEmoji: "🤖", runs: 1284, successRate: 96.8, avgTime: "12.1s", tokens: "22.7M" },
  { rank: 3, agentName: "Scribe", agentEmoji: "📝", runs: 921, successRate: 98.4, avgTime: "8.3s", tokens: "9.1M" },
  { rank: 4, agentName: "Sleuth", agentEmoji: "🕵️", runs: 642, successRate: 94.1, avgTime: "16.7s", tokens: "14.0M" },
  { rank: 5, agentName: "Analyst", agentEmoji: "📊", runs: 389, successRate: 97.9, avgTime: "21.0s", tokens: "6.4M" },
  { rank: 6, agentName: "Seeker", agentEmoji: "🔍", runs: 247, successRate: 88.3, avgTime: "5.2s", tokens: "11.8M" },
]

export const notifications: NotificationItem[] = [
  { id: "n1", title: "DevBot opened PR #4821", description: "fix: stabilize flaky cart test", timeAgo: "12s ago", read: false, type: "success" },
  { id: "n2", title: "Seeker execution failed", description: "Web search tool returned 429 Too Many Requests", timeAgo: "3m ago", read: false, type: "error" },
  { id: "n3", title: "Rate limit warning", description: "AWS Bedrock usage at 82% of quota", timeAgo: "9m ago", read: false, type: "warning" },
  { id: "n4", title: "Flux finished embedding job", description: "12,480 tickets embedded into pgvector", timeAgo: "21m ago", read: true, type: "success" },
  { id: "n5", title: "New team member", description: "maya@acme.dev accepted your invite", timeAgo: "1h ago", read: true, type: "info" },
]

export const teams: Team[] = [
  { id: "t1", name: "Acme Platform", plan: "Enterprise", initials: "AP" },
  { id: "t2", name: "Acme Labs", plan: "Pro", initials: "AL" },
  { id: "t3", name: "Personal", plan: "Hobby", initials: "PS" },
]

// 7-day execution volume
export const executionVolume = [
  { day: "Mon", executions: 1240, success: 1190, failed: 50 },
  { day: "Tue", executions: 1810, success: 1742, failed: 68 },
  { day: "Wed", executions: 1520, success: 1488, failed: 32 },
  { day: "Thu", executions: 2240, success: 2160, failed: 80 },
  { day: "Fri", executions: 2980, success: 2901, failed: 79 },
  { day: "Sat", executions: 1390, success: 1370, failed: 20 },
  { day: "Sun", executions: 1120, success: 1098, failed: 22 },
]

export const statusDistribution = [
  { name: "Active", value: 4, key: "active" },
  { name: "Idle", value: 2, key: "idle" },
  { name: "Error", value: 1, key: "error" },
  { name: "Offline", value: 1, key: "offline" },
]

export const agentPerformance = [
  { metric: "Speed", value: 88 },
  { metric: "Accuracy", value: 96 },
  { metric: "Cost", value: 72 },
  { metric: "Uptime", value: 99 },
  { metric: "Throughput", value: 84 },
  { metric: "Safety", value: 91 },
]

export const tokenByModel = [
  { day: "Mon", bedrock: 8.2, openai: 4.1, ollama: 12.0 },
  { day: "Tue", bedrock: 9.4, openai: 5.2, ollama: 14.8 },
  { day: "Wed", bedrock: 7.1, openai: 3.9, ollama: 11.2 },
  { day: "Thu", bedrock: 11.0, openai: 6.0, ollama: 17.4 },
  { day: "Fri", bedrock: 13.2, openai: 7.1, ollama: 19.9 },
  { day: "Sat", bedrock: 6.0, openai: 2.8, ollama: 9.1 },
  { day: "Sun", bedrock: 5.2, openai: 2.1, ollama: 7.8 },
]

export const errorBreakdown = [
  { name: "Timeout", value: 42, key: "chart-4" },
  { name: "Rate limit", value: 28, key: "chart-1" },
  { name: "Tool error", value: 18, key: "chart-3" },
  { name: "Network", value: 12, key: "chart-5" },
]

// helper to generate sparkline data
export function makeSparkline(seed: number, points = 60, base = 50, variance = 30) {
  const data: { i: number; value: number }[] = []
  let v = base
  for (let i = 0; i < points; i++) {
    const wobble = Math.sin((i + seed) / 4) * variance * 0.4 + (Math.cos((i + seed) / 7) * variance) / 2
    v = Math.max(2, Math.min(100, base + wobble))
    data.push({ i, value: Math.round(v) })
  }
  return data
}
