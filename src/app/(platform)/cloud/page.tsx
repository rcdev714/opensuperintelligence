import Link from "next/link";
import { 
  Cloud, 
  Server, 
  Rocket, 
  BarChart3, 
  ArrowRight,
  Activity,
  Cpu,
  Layers,
  Zap,
  DollarSign,
  MapPin,
  ChevronRight
} from "lucide-react";
import { getClusters, getDeployments, getDailyUsage } from "@/lib/data/cloud-data";
import { formatNumber, formatCurrency, cn } from "@/lib/utils";
import { Cluster, Deployment } from "@/types/database";

function StatusDot({ status }: { status: string }) {
  let colorClass = "bg-[#86868B]";
  if (["running", "active"].includes(status)) colorClass = "bg-[#30D158]";
  else if (["scaling"].includes(status)) colorClass = "bg-[#FF9F0A]";
  else if (["degraded", "failed"].includes(status)) colorClass = "bg-[#FF453A]";
  else if (["provisioning", "deploying"].includes(status)) colorClass = "bg-[#2997FF]";
  
  return <div className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", colorClass)} />;
}

export default async function CloudDashboardPage() {
  const clusters = await getClusters();
  const deployments = await getDeployments();
  // const dailyUsage = await getDailyUsage();
  
  // Metrics calculation
  const runningClusters = clusters.filter(c => c.status === "running" || c.status === "scaling");
  const activeDeployments = deployments.filter(d => d.status === "active" || d.status === "scaling");
  const totalGPUs = runningClusters.reduce((sum, c) => sum + c.gpu_count, 0);
  const todaysTokens = deployments.reduce((sum, d) => sum + d.tokens_today, 0);
  const monthlyCost = clusters.reduce((sum, c) => sum + c.monthly_cost, 0);

  // Region aggregation
  const regionMap = new Map<string, { count: number, hasIssue: boolean }>();
  clusters.forEach(c => {
    const data = regionMap.get(c.region) || { count: 0, hasIssue: false };
    data.count++;
    if (c.status === "degraded") {
      data.hasIssue = true;
    }
    regionMap.set(c.region, data);
  });

  return (
    <div className="flex flex-col gap-8 pb-12 max-w-7xl mx-auto w-full">
      {/* Header Section */}
      <div className="flex flex-col gap-3 pt-6">
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#86868B]">
          <Cloud className="w-4 h-4 text-[#2997FF]" />
          <span>Cloud Infrastructure</span>
        </div>
        <h1 className="text-3xl font-medium tracking-tight text-foreground">Private Cloud Console</h1>
        <p className="text-[#86868B] max-w-2xl text-sm leading-relaxed">
          Provision sovereign GPU clusters, deploy models, and track token consumption across your VPC fleet.
        </p>
      </div>

      {/* Fleet Summary Strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="luxury-card p-5 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs font-medium text-[#86868B]">
            <Server className="w-3.5 h-3.5" />
            Active Clusters
          </div>
          <div className="flex items-center gap-2">
            <div className="text-2xl font-medium text-foreground">{runningClusters.length}</div>
            {runningClusters.length > 0 && <div className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />}
          </div>
        </div>

        <div className="luxury-card p-5 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs font-medium text-[#86868B]">
            <Cpu className="w-3.5 h-3.5" />
            Total GPUs
          </div>
          <div className="text-2xl font-medium text-foreground">{totalGPUs}</div>
        </div>

        <div className="luxury-card p-5 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs font-medium text-[#86868B]">
            <Rocket className="w-3.5 h-3.5" />
            Active Deployments
          </div>
          <div className="text-2xl font-medium text-foreground">{activeDeployments.length}</div>
        </div>

        <div className="luxury-card p-5 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs font-medium text-[#86868B]">
            <Zap className="w-3.5 h-3.5" />
            Today's Tokens
          </div>
          <div className="text-2xl font-medium text-foreground">{formatNumber(todaysTokens)}</div>
        </div>

        <div className="luxury-card p-5 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs font-medium text-[#86868B]">
            <DollarSign className="w-3.5 h-3.5" />
            Monthly Spend
          </div>
          <div className="text-2xl font-medium text-foreground">{formatCurrency(monthlyCost)}</div>
        </div>
      </div>

      {/* Region Availability */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xs font-mono uppercase tracking-[0.1em] text-[#86868B]">Global Network</h2>
        <div className="flex flex-wrap gap-2.5">
          {Array.from(regionMap.entries()).map(([region, data]) => (
            <div key={region} className="flex items-center gap-2 px-3 py-1.5 luxury-card text-sm">
              <MapPin className="w-3.5 h-3.5 text-[#86868B]" />
              <span className="font-medium text-foreground">{region}</span>
              <span className="text-xs text-[#86868B]">({data.count})</span>
              <div className={cn("w-1.5 h-1.5 rounded-full ml-1", data.hasIssue ? "bg-[#FF453A]" : "bg-[#30D158]")} />
            </div>
          ))}
          {regionMap.size === 0 && (
            <div className="text-sm text-[#86868B] italic">No active regions</div>
          )}
        </div>
      </div>

      {/* Active Clusters Quick View */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-foreground">Active Clusters</h2>
          <Link href="/cloud/clusters" className="text-xs text-[#2997FF] hover:underline flex items-center gap-1">
            View All Clusters <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="luxury-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-[#86868B] border-b border-white/[0.08] bg-white/[0.02] dark:bg-black/[0.02]">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Region</th>
                  <th className="px-4 py-3 font-medium">GPU Type</th>
                  <th className="px-4 py-3 font-medium text-right">GPUs</th>
                  <th className="px-4 py-3 font-medium w-32">Utilization</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Monthly Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {clusters.slice(0, 4).map((cluster) => (
                  <tr key={cluster.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 font-medium">
                      <Link href={`/cloud/clusters/${cluster.id}`} className="hover:text-[#2997FF] transition-colors">
                        {cluster.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-[#86868B]">{cluster.region}</td>
                    <td className="px-4 py-3 text-[#86868B]">{cluster.gpu_type}</td>
                    <td className="px-4 py-3 text-right">{cluster.gpu_count}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-full bg-white/[0.08] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#2997FF] rounded-full" 
                            style={{ width: `${cluster.gpu_utilization}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-[#86868B] w-8 text-right">{cluster.gpu_utilization}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 capitalize text-xs">
                        <StatusDot status={cluster.status} />
                        {cluster.status}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-[#86868B]">{formatCurrency(cluster.monthly_cost)}</td>
                  </tr>
                ))}
                {clusters.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-[#86868B]">No clusters found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Active Deployments Quick View */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-foreground">Active Deployments</h2>
          <Link href="/cloud/deployments" className="text-xs text-[#2997FF] hover:underline flex items-center gap-1">
            View All Deployments <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="luxury-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-[#86868B] border-b border-white/[0.08] bg-white/[0.02] dark:bg-black/[0.02]">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Model</th>
                  <th className="px-4 py-3 font-medium">Cluster</th>
                  <th className="px-4 py-3 font-medium text-right">Replicas</th>
                  <th className="px-4 py-3 font-medium text-right">P50 Latency</th>
                  <th className="px-4 py-3 font-medium text-right">RPM</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {deployments.slice(0, 4).map((deployment) => (
                  <tr key={deployment.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 font-medium">{deployment.name}</td>
                    <td className="px-4 py-3 text-[#86868B]">{deployment.model_name}</td>
                    <td className="px-4 py-3 text-[#86868B]">
                      <Link href={`/cloud/clusters/${deployment.cluster_id}`} className="hover:text-[#2997FF] transition-colors">
                        {clusters.find(c => c.id === deployment.cluster_id)?.name || deployment.cluster_id.slice(0, 8)}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-right">{deployment.replicas}</td>
                    <td className="px-4 py-3 text-right text-[#86868B]">{deployment.latency_p50}ms</td>
                    <td className="px-4 py-3 text-right text-[#86868B]">{formatNumber(deployment.requests_per_minute)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 capitalize text-xs">
                        <StatusDot status={deployment.status} />
                        {deployment.status}
                      </div>
                    </td>
                  </tr>
                ))}
                {deployments.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-[#86868B]">No deployments found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/cloud/clusters" className="luxury-card p-5 flex items-center justify-between group hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#2997FF]/10 flex items-center justify-center flex-shrink-0">
                <Server className="w-5 h-5 text-[#2997FF]" />
              </div>
              <div>
                <div className="font-medium text-sm text-foreground">Deploy a Cluster</div>
                <div className="text-xs text-[#86868B]">Provision new GPU infrastructure</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#86868B] group-hover:text-foreground transition-colors" />
          </Link>

          <Link href="/cloud/deployments" className="luxury-card p-5 flex items-center justify-between group hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#BF5AF2]/10 flex items-center justify-center flex-shrink-0">
                <Rocket className="w-5 h-5 text-[#BF5AF2]" />
              </div>
              <div>
                <div className="font-medium text-sm text-foreground">Deploy a Model</div>
                <div className="text-xs text-[#86868B]">Launch an endpoint on your fleet</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#86868B] group-hover:text-foreground transition-colors" />
          </Link>

          <Link href="/cloud/usage" className="luxury-card p-5 flex items-center justify-between group hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#30D158]/10 flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-5 h-5 text-[#30D158]" />
              </div>
              <div>
                <div className="font-medium text-sm text-foreground">View Usage Analytics</div>
                <div className="text-xs text-[#86868B]">Track tokens and cost breakdown</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#86868B] group-hover:text-foreground transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}
