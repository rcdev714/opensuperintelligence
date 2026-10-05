import { notFound } from "next/navigation"
import Link from "next/link"
import { getClusterById, getClusters, getDeploymentsByCluster } from "@/lib/data/cloud-data"
import { cn, formatNumber, formatCurrency } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  ChevronRight,
  Activity,
  Cpu,
  Database,
  Network,
  Clock,
  DollarSign,
  Copy,
  Download,
  Server,
  ArrowUpRight,
  ArrowDownRight,
  Plus
} from "lucide-react"
import { ClusterStatus, DeploymentStatus } from "@/types/database"

export async function generateStaticParams() {
  const clusters = await getClusters()
  return clusters.map((c) => ({ id: c.id }))
}

interface ClusterDetailPageProps {
  params: Promise<{
    id: string
  }>
}

function getStatusColor(status: ClusterStatus | DeploymentStatus) {
  switch (status) {
    case "running":
    case "active":
      return "bg-[#30D158]"
    case "provisioning":
    case "deploying":
    case "scaling":
      return "bg-[#2997FF]"
    case "degraded":
    case "failed":
      return "bg-[#FF453A]"
    case "stopped":
    case "idle":
      return "bg-[#86868B]"
    default:
      return "bg-[#86868B]"
  }
}

export default async function ClusterDetailPage({ params }: ClusterDetailPageProps) {
  const { id } = await params
  const cluster = await getClusterById(id)

  if (!cluster) {
    notFound()
  }

  const deployments = await getDeploymentsByCluster(cluster.id)

  return (
    <div className="space-y-8 pb-12">
      {/* Breadcrumb + Header */}
      <div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
          <Link href="/cloud" className="hover:text-foreground transition-colors">Cloud</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/cloud/clusters" className="hover:text-foreground transition-colors">Clusters</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{cluster.name}</span>
        </div>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-4 mb-2">
              <h1 className="text-3xl font-semibold tracking-tight">{cluster.name}</h1>
              <Badge variant="outline" className="flex items-center gap-1.5 capitalize">
                <div className={cn("w-1.5 h-1.5 rounded-full", getStatusColor(cluster.status))} />
                {cluster.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {cluster.region} • {cluster.gpu_type} • Created {new Date(cluster.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Kubeconfig
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Deploy Model
            </Button>
          </div>
        </div>
      </div>

      {/* Health Metrics Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* GPU Utilization */}
        <Card className="luxury-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">GPU Utilization</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{cluster.gpu_utilization}%</div>
            <div className="h-1.5 w-full rounded-full bg-white/[0.06]">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  cluster.gpu_utilization < 60 ? "bg-[#30D158]" :
                  cluster.gpu_utilization <= 85 ? "bg-[#FF9F0A]" : "bg-[#FF453A]"
                )}
                style={{ width: `${cluster.gpu_utilization}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Memory Utilization */}
        <Card className="luxury-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Memory Util.</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{cluster.memory_utilization}%</div>
            <div className="h-1.5 w-full rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-[#2997FF] transition-all"
                style={{ width: `${cluster.memory_utilization}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* VRAM Usage */}
        <Card className="luxury-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">VRAM Usage</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{cluster.vram_used_gb} / {cluster.vram_total_gb} GB</div>
            <div className="h-1.5 w-full rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-[#BF5AF2] transition-all"
                style={{ width: `${Math.min(100, Math.round((cluster.vram_used_gb / cluster.vram_total_gb) * 100))}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Queue Depth */}
        <Card className="luxury-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Queue Depth</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={cn("text-2xl font-bold", cluster.queue_depth > 20 && "text-[#FF453A]")}>
              {cluster.queue_depth}
            </div>
          </CardContent>
        </Card>

        {/* Node Count */}
        <Card className="luxury-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Node Count</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cluster.node_count}</div>
          </CardContent>
        </Card>

        {/* Monthly Cost */}
        <Card className="luxury-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(cluster.monthly_cost)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Network Configuration */}
        <Card className="luxury-card h-full">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Network className="h-5 w-5 text-[#2997FF]" />
              <CardTitle>Network Configuration</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 border-b border-border/50 pb-4">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1">VPC CIDR</div>
                  <div className="font-medium">{cluster.vpc_cidr}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1">Subnet</div>
                  <div className="font-medium">{cluster.subnet}</div>
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1">Private Endpoint</div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-secondary/50 rounded-lg px-3 py-2 font-mono text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                    {cluster.endpoint}
                  </div>
                  <Button variant="outline" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scaling Configuration */}
        <Card className="luxury-card h-full">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Server className="h-5 w-5 text-[#30D158]" />
              <CardTitle>Scaling Configuration</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/20 rounded-xl p-4 border border-border/50">
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1">Total GPUs</div>
                  <div className="text-3xl font-semibold">{cluster.gpu_count}</div>
                </div>
                <div className="bg-secondary/20 rounded-xl p-4 border border-border/50">
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1">Total Nodes</div>
                  <div className="text-3xl font-semibold">{cluster.node_count}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button className="flex-1 gap-2 bg-secondary hover:bg-secondary/80 text-foreground">
                  <ArrowUpRight className="h-4 w-4" />
                  Scale Up
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <ArrowDownRight className="h-4 w-4" />
                  Scale Down
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deployed Models Table */}
      <Card className="luxury-card">
        <CardHeader>
          <CardTitle>Deployed Models</CardTitle>
        </CardHeader>
        <CardContent>
          {deployments.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-muted-foreground mb-4">No models deployed to this cluster yet.</div>
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Deploy Model
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 text-muted-foreground">
                    <th className="text-left font-medium pb-3 pr-4">Name</th>
                    <th className="text-left font-medium pb-3 pr-4">Model</th>
                    <th className="text-left font-medium pb-3 pr-4">Replicas</th>
                    <th className="text-left font-medium pb-3 pr-4">GPU Alloc.</th>
                    <th className="text-left font-medium pb-3 pr-4">Latency (P50/P99)</th>
                    <th className="text-left font-medium pb-3 pr-4">RPM</th>
                    <th className="text-left font-medium pb-3 pr-4">Tokens Today</th>
                    <th className="text-left font-medium pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {deployments.map((d) => (
                    <tr key={d.id} className="group">
                      <td className="py-4 pr-4">
                        <Link href={`/cloud/deployments/${d.id}`} className="font-medium hover:underline text-foreground">
                          {d.name}
                        </Link>
                      </td>
                      <td className="py-4 pr-4 text-muted-foreground">{d.model_name}</td>
                      <td className="py-4 pr-4">{d.replicas}</td>
                      <td className="py-4 pr-4">{d.gpu_allocation}</td>
                      <td className="py-4 pr-4 font-mono">{d.latency_p50}ms / {d.latency_p99}ms</td>
                      <td className="py-4 pr-4">{formatNumber(d.requests_per_minute)}</td>
                      <td className="py-4 pr-4">{formatNumber(d.tokens_today)}</td>
                      <td className="py-4">
                        <Badge variant="outline" className="flex items-center gap-1.5 w-fit capitalize">
                          <div className={cn("w-1.5 h-1.5 rounded-full", getStatusColor(d.status))} />
                          {d.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
      
    </div>
  )
}
