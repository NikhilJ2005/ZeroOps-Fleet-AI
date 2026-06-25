import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PagePlaceholder({
  title,
  description,
  icon: Icon,
}: {
  title: string
  description: string
  icon: LucideIcon
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground text-balance">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 rounded-xl border border-dashed text-center">
        <div className="bg-muted/60 text-muted-foreground flex size-14 items-center justify-center rounded-2xl">
          <Icon className="size-7" />
        </div>
        <div className="flex max-w-sm flex-col gap-1">
          <h2 className="text-lg font-semibold">{title} is coming soon</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            This area is part of the AgentSphere roadmap. The interactive prototype focuses on Overview, Agents,
            Workflows, Monitor, and Analytics.
          </p>
        </div>
        <Button variant="outline">Request early access</Button>
      </div>
    </div>
  )
}
