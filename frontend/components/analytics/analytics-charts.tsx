"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { executionVolume, agentPerformance, tokenByModel, errorBreakdown } from "@/lib/mock-data"

const volumeConfig = {
  success: { label: "Success", color: "var(--chart-1)" },
  failed: { label: "Failed", color: "var(--chart-4)" },
} satisfies ChartConfig

export function ExecutionVolumeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Execution Volume</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={volumeConfig} className="h-[260px] w-full">
          <AreaChart data={executionVolume} margin={{ left: 0, right: 8, top: 8 }}>
            <defs>
              <linearGradient id="vSuccess" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="vFailed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-failed)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="var(--color-failed)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} width={32} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              dataKey="success"
              type="monotone"
              stroke="var(--color-success)"
              fill="url(#vSuccess)"
              strokeWidth={2}
              stackId="1"
            />
            <Area
              dataKey="failed"
              type="monotone"
              stroke="var(--color-failed)"
              fill="url(#vFailed)"
              strokeWidth={2}
              stackId="1"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

const radarConfig = {
  value: { label: "Score", color: "var(--chart-1)" },
} satisfies ChartConfig

export function AgentPerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={radarConfig} className="mx-auto h-[260px] w-full">
          <RadarChart data={agentPerformance}>
            <ChartTooltip content={<ChartTooltipContent />} />
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" />
            <Radar
              dataKey="value"
              fill="var(--color-value)"
              fillOpacity={0.35}
              stroke="var(--color-value)"
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

const tokenConfig = {
  bedrock: { label: "AWS Bedrock", color: "var(--chart-1)" },
  openai: { label: "OpenAI", color: "var(--chart-2)" },
  ollama: { label: "Ollama", color: "var(--chart-3)" },
} satisfies ChartConfig

export function TokenUsageChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Token Usage by Model</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={tokenConfig} className="h-[260px] w-full">
          <BarChart data={tokenByModel} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} width={32} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="bedrock" stackId="t" fill="var(--color-bedrock)" radius={[0, 0, 0, 0]} />
            <Bar dataKey="openai" stackId="t" fill="var(--color-openai)" radius={[0, 0, 0, 0]} />
            <Bar dataKey="ollama" stackId="t" fill="var(--color-ollama)" radius={[4, 4, 0, 0]} />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

const errorConfig = {
  value: { label: "Errors" },
} satisfies ChartConfig

const ERROR_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"]

export function ErrorBreakdownChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Error Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={errorConfig} className="mx-auto h-[260px] w-full">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
            <Pie data={errorBreakdown} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={2}>
              {errorBreakdown.map((_, i) => (
                <Cell key={i} fill={ERROR_COLORS[i % ERROR_COLORS.length]} />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="name" />} className="flex-wrap" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
