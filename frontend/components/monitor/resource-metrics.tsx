"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkline } from "@/components/shared/sparkline"

interface Metric {
  label: string
  unit: string
  base: number
  variance: number
  color: string
  fixed?: number
}

const METRICS: Metric[] = [
  { label: "CPU", unit: "%", base: 54, variance: 30, color: "var(--chart-1)" },
  { label: "Memory", unit: "%", base: 61, variance: 22, color: "var(--chart-2)" },
  { label: "Tokens/min", unit: "k", base: 12, variance: 8, color: "var(--chart-3)", fixed: 1 },
  { label: "Cost/hour", unit: "$", base: 3.4, variance: 1.6, color: "var(--chart-4)", fixed: 2 },
]

function seedSeries(m: Metric, n: number) {
  return Array.from({ length: n }, () => Math.max(0, m.base + (Math.random() - 0.5) * m.variance))
}

export function ResourceMetrics() {
  const [series, setSeries] = React.useState(() => METRICS.map((m) => seedSeries(m, 60)))

  React.useEffect(() => {
    const id = setInterval(() => {
      setSeries((prev) =>
        prev.map((s, i) => {
          const m = METRICS[i]
          return [...s.slice(1), Math.max(0, m.base + (Math.random() - 0.5) * m.variance)]
        }),
      )
    }, 1500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {METRICS.map((m, i) => {
        const current = series[i][series[i].length - 1]
        const value =
          m.unit === "$" ? `$${current.toFixed(m.fixed)}` : `${current.toFixed(m.fixed ?? 0)}${m.unit}`
        return (
          <Card key={m.label}>
            <CardContent className="flex flex-col gap-2 p-4">
              <span className="text-muted-foreground text-xs font-medium">{m.label}</span>
              <span className="text-2xl font-semibold tabular-nums tracking-tight">{value}</span>
              <Sparkline data={series[i].map((value) => ({ value }))} color={m.color} className="h-10 w-full" />
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
