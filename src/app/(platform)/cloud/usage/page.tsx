import { getDailyUsage, getDeployments, getClusters } from "@/lib/data/cloud-data";
import UsageAnalytics from "@/components/cloud/usage-analytics";

export default async function UsagePage() {
  const dailyUsage = await getDailyUsage();
  const deployments = await getDeployments();
  const clusters = await getClusters();

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <UsageAnalytics 
        dailyUsage={dailyUsage}
        deployments={deployments}
        clusters={clusters}
      />
    </div>
  );
}
