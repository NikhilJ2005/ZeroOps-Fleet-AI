import { Activity, CheckCircle2, Timer, DollarSign } from "lucide-react"
import { StatCard } from "@/components/dashboard/stat-card"
import {
  ExecutionVolumeChart,
  AgentPerformanceChart,
  TokenUsageChart,
  ErrorBreakdownChart,
} from "@/components/analytics/analytics-charts"
import { LeaderboardTable } from "@/components/analytics/leaderboard-table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export const metadata = {
  title: "Analytics | AgentSphere",
}

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground text-balance">Analytics</h1>
          <p className="text-sm text-muted-foreground">Performance, cost, and reliability across your agent fleet.</p>
        </div>
        <ToggleGroup defaultValue={["7d"]} variant="outline">
          <ToggleGroupItem value="7d">7d</ToggleGroupItem>
          <ToggleGroupItem value="30d">30d</ToggleGroupItem>
          <ToggleGroupItem value="90d">90d</ToggleGroupItem>
          <ToggleGroupItem value="custom">Custom</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Executions" value="12,300" icon={Activity} trend="+18.2%" trendUp hint="vs last week" />
        <StatCard label="Success Rate" value="97.4%" icon={CheckCircle2} trend="+0.6%" trendUp hint="vs last week" />
        <StatCard label="Avg Latency" value="1.84s" icon={Timer} trend="-9.1%" trendUp hint="faster" />
        <StatCard label="AWS Cost" value="$842" icon={DollarSign} trend="+4.3%" trendUp={false} hint="this week" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ExecutionVolumeChart />
        <AgentPerformanceChart />
      </div>

      <LeaderboardTable />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TokenUsageChart />
        <ErrorBreakdownChart />
      </div>
    </div>
  )
}
