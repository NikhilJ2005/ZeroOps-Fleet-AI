import { Key } from "lucide-react"
import { PagePlaceholder } from "@/components/shared/page-placeholder"

export const metadata = { title: "API Keys | AgentSphere" }

export default function ApiKeysPage() {
  return (
    <PagePlaceholder
      title="API Keys"
      description="Generate and rotate keys to drive AgentSphere programmatically."
      icon={Key}
    />
  )
}
