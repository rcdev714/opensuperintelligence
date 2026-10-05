"use client";

import { useState } from "react";
import { Cluster, ClusterRegion, GpuType, ClusterStatus } from "@/types/database";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import { 
  Server, 
  Globe, 
  Cpu, 
  Network, 
  Plus, 
  ChevronDown, 
  ChevronUp,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

interface ClustersClientProps {
  clusters: Cluster[];
}

const statusColors: Record<ClusterStatus, { bg: string, text: string, border: string, dot: string }> = {
  running: { bg: "bg-[#30D158]/10", text: "text-[#30D158]", border: "border-[#30D158]/20", dot: "bg-[#30D158]" },
  scaling: { bg: "bg-[#FF9F0A]/10", text: "text-[#FF9F0A]", border: "border-[#FF9F0A]/20", dot: "bg-[#FF9F0A]" },
  degraded: { bg: "bg-[#FF453A]/10", text: "text-[#FF453A]", border: "border-[#FF453A]/20", dot: "bg-[#FF453A]" },
  provisioning: { bg: "bg-[#2997FF]/10", text: "text-[#2997FF]", border: "border-[#2997FF]/20", dot: "bg-[#2997FF]" },
  stopped: { bg: "bg-white/5", text: "text-[#86868B]", border: "border-white/10", dot: "bg-[#86868B]" },
};

export default function ClustersClient({ clusters }: ClustersClientProps) {
  const [filter, setFilter] = useState<ClusterStatus | "all">("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredClusters = clusters.filter(c => filter === "all" || c.status === filter);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">GPU Clusters</h1>
          <p className="text-[#86868B] mt-1">Manage your dedicated AI compute infrastructure.</p>
        </div>
        <button
          onClick={() => setIsCreateOpen(!isCreateOpen)}
          className="flex items-center gap-2 bg-[#2997FF] hover:bg-[#2997FF]/90 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
        >
          {isCreateOpen ? <ChevronUp className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isCreateOpen ? "Close Panel" : "New Cluster"}
        </button>
      </div>

      {isCreateOpen && (
        <div className="luxury-card p-6 border border-white/[0.08] rounded-xl space-y-6">
          <div>
            <h2 className="text-lg font-medium">Provision New Cluster</h2>
            <p className="text-[#86868B] text-sm mt-1">Configure and deploy a new dedicated GPU cluster.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#86868B]">Name</label>
              <input type="text" placeholder="Cluster Name" className="w-full bg-background border border-white/[0.08] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2997FF] transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#86868B]">Region</label>
              <select className="w-full bg-background border border-white/[0.08] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2997FF] transition-colors">
                <option value="us-east-1">US East (N. Virginia)</option>
                <option value="us-west-2">US West (Oregon)</option>
                <option value="eu-west-1">EU (Ireland)</option>
                <option value="eu-central-1">EU (Frankfurt)</option>
                <option value="ap-southeast-1">AP (Singapore)</option>
                <option value="ap-northeast-1">AP (Tokyo)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#86868B]">GPU Type</label>
              <select className="w-full bg-background border border-white/[0.08] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2997FF] transition-colors">
                <option value="NVIDIA H100 SXM">NVIDIA H100 SXM</option>
                <option value="NVIDIA H200 SXM">NVIDIA H200 SXM</option>
                <option value="NVIDIA A100 80GB">NVIDIA A100 80GB</option>
                <option value="NVIDIA L40S">NVIDIA L40S</option>
                <option value="AMD MI300X">AMD MI300X</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#86868B]">GPU Count</label>
              <input type="number" min="1" max="32" defaultValue="8" className="w-full bg-background border border-white/[0.08] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2997FF] transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#86868B]">VPC CIDR</label>
              <input type="text" placeholder="10.0.0.0/16" defaultValue="10.0.0.0/16" className="w-full bg-background border border-white/[0.08] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2997FF] transition-colors" />
            </div>
          </div>
          <div className="flex justify-end">
            <button 
              onClick={() => alert("Cluster provisioning initiated.")}
              className="bg-[#2997FF] hover:bg-[#2997FF]/90 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              Provision Cluster
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
            filter === "all" ? "bg-white/10 border-white/20 text-foreground" : "bg-transparent border-white/[0.08] text-[#86868B] hover:text-foreground"
          )}
        >
          All
        </button>
        {(["running", "scaling", "degraded", "stopped", "provisioning"] as ClusterStatus[]).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium border capitalize transition-colors flex items-center gap-2",
              filter === status 
                ? `${statusColors[status].bg} ${statusColors[status].border} ${statusColors[status].text}` 
                : "bg-transparent border-white/[0.08] text-[#86868B] hover:text-foreground"
            )}
          >
            {filter === status && <span className={cn("w-1.5 h-1.5 rounded-full", statusColors[status].dot)} />}
            {status}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClusters.map((cluster) => {
          const colors = statusColors[cluster.status];
          return (
            <div key={cluster.id} className="luxury-card border border-white/[0.08] rounded-xl flex flex-col overflow-hidden group hover:border-white/[0.15] transition-colors">
              <div className="p-5 border-b border-white/[0.08]">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-lg">{cluster.name}</h3>
                  <div className={cn("flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border capitalize", colors.bg, colors.border, colors.text)}>
                    <span className={cn("w-1.5 h-1.5 rounded-full", colors.dot)} />
                    {cluster.status}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-[#86868B] bg-white/5 px-2 py-1 rounded-md border border-white/[0.05]">
                    <Globe className="w-3.5 h-3.5" />
                    {cluster.region}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#86868B] bg-white/5 px-2 py-1 rounded-md border border-white/[0.05]">
                    <Cpu className="w-3.5 h-3.5" />
                    {cluster.gpu_type}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-2">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#86868B] mb-1">GPUs</p>
                    <p className="font-medium">{cluster.gpu_count}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#86868B] mb-1">Nodes</p>
                    <p className="font-medium">{cluster.node_count}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#86868B] mb-1">Queue</p>
                    <p className="font-medium">{cluster.queue_depth}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-5 flex-1">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[#86868B]">GPU Utilization</span>
                    <span>{cluster.gpu_utilization.toFixed(1)}%</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#2997FF] rounded-full"
                      style={{ width: `${cluster.gpu_utilization}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[#86868B]">VRAM Usage</span>
                    <span>{formatNumber(cluster.vram_used_gb)} / {formatNumber(cluster.vram_total_gb)} GB</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#BF5AF2] rounded-full"
                      style={{ width: `${(cluster.vram_used_gb / cluster.vram_total_gb) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[#86868B]">System Memory</span>
                    <span>{cluster.memory_utilization.toFixed(1)}%</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#30D158] rounded-full"
                      style={{ width: `${cluster.memory_utilization}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-4 text-xs text-[#86868B]">
                  <div className="flex items-center gap-1.5">
                    <Network className="w-3.5 h-3.5" />
                    <span>{cluster.vpc_cidr}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5" />
                    <span>{cluster.subnet}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-white/[0.02] border-t border-white/[0.08] flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#86868B] mb-0.5">Est. Monthly</p>
                  <p className="font-medium text-sm">{formatCurrency(cluster.monthly_cost)}</p>
                </div>
                <Link 
                  href={`/cloud/clusters/${cluster.id}`}
                  className="text-sm text-[#2997FF] hover:text-[#2997FF]/80 flex items-center gap-1 transition-colors"
                >
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredClusters.length === 0 && (
        <div className="text-center py-12 text-[#86868B]">
          No clusters found matching the selected filter.
        </div>
      )}
    </div>
  );
}
