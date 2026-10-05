import { getClusters, getDeployments } from "@/lib/data/cloud-data"
import { DeploymentsClient } from "@/components/cloud/deployments-client"

export const metadata = {
  title: "Model Deployments - OpenSuperIntelligence",
}

export default async function DeploymentsPage() {
  const clusters = await getClusters()
  const deployments = await getDeployments()

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 w-full max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Cloud Platform</h1>
        <p className="text-[#86868B] text-lg">Manage your globally distributed AI cloud infrastructure.</p>
      </div>
      
      <DeploymentsClient deployments={deployments} clusters={clusters} />
    </div>
  )
}
