import { Settings } from "lucide-react"
import { PagePlaceholder } from "@/components/shared/page-placeholder"

export const metadata = { title: "Settings | AgentSphere" }

export default function SettingsPage() {
  return (
    <PagePlaceholder
      title="Settings"
      description="Workspace preferences, billing, and integration configuration."
      icon={Settings}
    />
  )
}
