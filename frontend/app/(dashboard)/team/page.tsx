import { Users } from "lucide-react"
import { PagePlaceholder } from "@/components/shared/page-placeholder"

export const metadata = { title: "Team | AgentSphere" }

export default function TeamPage() {
  return (
    <PagePlaceholder
      title="Team"
      description="Invite teammates, manage roles, and control access to your agent fleet."
      icon={Users}
    />
  )
}
