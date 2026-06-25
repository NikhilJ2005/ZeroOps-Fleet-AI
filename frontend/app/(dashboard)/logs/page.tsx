import { ScrollText } from "lucide-react"
import { PagePlaceholder } from "@/components/shared/page-placeholder"

export const metadata = { title: "Logs | AgentSphere" }

export default function LogsPage() {
  return (
    <PagePlaceholder
      title="Logs"
      description="Searchable, retained execution logs across every agent and sandbox."
      icon={ScrollText}
    />
  )
}
