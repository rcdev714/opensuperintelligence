"use client"

import React, { useState } from "react"
import { Deployment, Cluster, DeploymentStatus } from "@/types/database"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn, formatNumber, formatCurrency } from "@/lib/utils"
import { Copy, Check, ChevronDown, ChevronUp, Plus } from "lucide-react"

interface DeploymentsClientProps {
  deployments: Deployment[]
  clusters: Cluster[]
}

const statusColors: Record<DeploymentStatus, string> = {
  active: "bg-[#30D158]",
  scaling: "bg-[#FF9F0A]",
  deploying: "bg-[#2997FF]",
  idle: "bg-[#86868B]",
  failed: "bg-[#FF453A]",
}

export function DeploymentsClient({ deployments, clusters }: DeploymentsClientProps) {
  const [filter, setFilter] = useState<DeploymentStatus | "all">("all")
  const [showCreate, setShowCreate] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filteredDeployments = filter === "all" 
    ? deployments 
    : deployments.filter(d => d.status === filter)

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const getClusterName = (id: string) => {
    return clusters.find(c => c.id === id)?.name || "Unknown Cluster"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Model Deployments</h2>
          <Badge variant="secondary" className="bg-[#161617] border-white/[0.08] text-foreground">
            {deployments.length}
          </Badge>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)} className="gap-2 rounded-lg">
          {showCreate ? <ChevronUp className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          Deploy Model
        </Button>
      </div>

      {showCreate && (
        <Card className="luxury-card border-white/[0.08] bg-[#161617] rounded-xl text-foreground">
          <CardHeader>
            <CardTitle className="text-lg">Create New Deployment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#86868B]">Select Model</label>
                <select className="w-full bg-black border border-white/[0.08] rounded-lg p-2 text-sm text-foreground focus:outline-none focus:border-[#2997FF]">
                  <option>DeepSeek V4 Pro</option>
                  <option>DeepSeek V4.1 Flash</option>
                  <option>Kimi K3</option>
                  <option>Qwen 2.5 Coder</option>
                  <option>Llama 4 Maverick</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#86868B]">Select Cluster</label>
                <select className="w-full bg-black border border-white/[0.08] rounded-lg p-2 text-sm text-foreground focus:outline-none focus:border-[#2997FF]">
                  {clusters.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.region})</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#86868B]">Replicas (Min / Initial / Max)</label>
                <div className="flex gap-2">
                  <input type="number" defaultValue={1} className="w-1/3 bg-black border border-white/[0.08] rounded-lg p-2 text-sm text-foreground focus:outline-none focus:border-[#2997FF]" />
                  <input type="number" defaultValue={2} className="w-1/3 bg-black border border-white/[0.08] rounded-lg p-2 text-sm text-foreground focus:outline-none focus:border-[#2997FF]" />
                  <input type="number" defaultValue={5} className="w-1/3 bg-black border border-white/[0.08] rounded-lg p-2 text-sm text-foreground focus:outline-none focus:border-[#2997FF]" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#86868B]">Autoscale Metric</label>
                <select className="w-full bg-black border border-white/[0.08] rounded-lg p-2 text-sm text-foreground focus:outline-none focus:border-[#2997FF]">
                  <option value="latency">Latency</option>
                  <option value="utilization">Utilization</option>
                  <option value="queue_depth">Queue Depth</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#86868B]">Autoscale Target</label>
                <input type="number" defaultValue={80} className="w-full bg-black border border-white/[0.08] rounded-lg p-2 text-sm text-foreground focus:outline-none focus:border-[#2997FF]" />
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-[#2997FF] hover:bg-[#2997FF]/90 text-white rounded-lg">Deploy Model</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {(["all", "active", "scaling", "deploying", "idle", "failed"] as const).map(f => (
          <Badge
            key={f}
            variant="outline"
            className={cn(
              "cursor-pointer capitalize px-3 py-1 text-sm rounded-lg border-white/[0.08] transition-colors",
              filter === f ? "bg-white/[0.1] text-foreground" : "text-[#86868B] hover:text-foreground hover:bg-white/[0.05]"
            )}
            onClick={() => setFilter(f as any)}
          >
            {f}
          </Badge>
        ))}
      </div>

      <Card className="luxury-card border-white/[0.08] bg-[#161617] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-black/50 border-b border-white/[0.08] text-[#86868B]">
              <tr>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em]">Name</th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em]">Model</th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em]">Cluster</th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em]">Replicas</th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em]">GPU Alloc</th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em]">Autoscale</th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em]">Latency (p50/p99)</th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em]">RPM</th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em]">Tokens Today</th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em]">Cost Today</th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em]">Status</th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em]">Endpoint</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.08] text-foreground">
              {filteredDeployments.map(d => (
                <tr key={d.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 font-semibold whitespace-nowrap">{d.name}</td>
                  <td className="px-4 py-3 text-[#2997FF] whitespace-nowrap font-medium">{d.model_name}</td>
                  <td className="px-4 py-3 text-[#86868B] whitespace-nowrap">{getClusterName(d.cluster_id)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {d.replicas} <span className="text-[#86868B]">({d.min_replicas}-{d.max_replicas})</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{d.gpu_allocation}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {d.autoscale_metric} @ {d.autoscale_target}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {d.latency_p50}ms / <span className="text-[#86868B]">{d.latency_p99}ms</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{formatNumber(d.requests_per_minute)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{formatNumber(d.tokens_today)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{formatCurrency(d.cost_today)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-1.5 h-1.5 rounded-full", statusColors[d.status])} />
                      <span className="capitalize">{d.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="truncate max-w-[120px] text-[#86868B] font-mono text-xs">{d.endpoint}</span>
                      <button 
                        onClick={() => handleCopy(d.endpoint, d.id)}
                        className="text-[#86868B] hover:text-foreground transition-colors focus:outline-none"
                      >
                        {copiedId === d.id ? <Check className="w-3.5 h-3.5 text-[#30D158]" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredDeployments.length === 0 && (
                <tr>
                  <td colSpan={12} className="px-4 py-8 text-center text-[#86868B]">
                    No deployments found matching the filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
