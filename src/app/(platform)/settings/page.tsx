import { Settings, Shield, Server, Key, User } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 mb-2">
          <Settings className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400">
            SYSTEM PREFERENCES
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
          Platform Architecture & Governance
        </h1>
        <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
          Configure self-hosted inference clusters, upstream API providers, and organization permissions.
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Card */}
        <div className="luxury-card rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center">
              <User className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Arcane Echos Technologies SAS</h2>
              <p className="text-xs text-[#86868B]">Product Owner & Operating Company · Enterprise Cognitive Cluster · Custom SLA</p>
            </div>
          </div>
        </div>

        {/* Upstream Gateways Status */}
        <div className="luxury-card rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-medium text-white flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-400" />
            <span>Upstream Inference Providers</span>
          </h2>

          <div className="divide-y divide-white/[0.06] text-xs font-mono">
            <div className="py-3 flex items-center justify-between">
              <div>
                <span className="text-white block">DeepSeek Direct API</span>
                <span className="text-zinc-500 text-[11px]">https://api.deepseek.com · Multi-Head Latent Attention</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Connected
              </span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <span className="text-white block">Moonshot AI (Kimi) Gateway</span>
                <span className="text-zinc-500 text-[11px]">https://api.moonshot.cn/v1 · 1M Token Context Engine</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Connected
              </span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <span className="text-white block">Kernel.sh Browser-as-a-Service</span>
                <span className="text-zinc-500 text-[11px]">Sub-150ms remote Chromium microVM cluster</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Active Cluster
              </span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <span className="text-white block">Tavily Research Grounding</span>
                <span className="text-zinc-500 text-[11px]">SOC2 verified web & ArXiv search engine</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex gap-4">
          <Link
            href="/settings/api-keys"
            className="flex-1 luxury-card rounded-xl p-5 hover:border-white/20 transition group"
          >
            <Key className="w-5 h-5 text-emerald-400 mb-2" />
            <div className="text-sm font-medium text-white group-hover:text-emerald-300">Provision API Keys</div>
            <p className="text-xs text-zinc-500 mt-1">Manage Bearer tokens for SDK and cURL automation.</p>
          </Link>

          <Link
            href="/settings/usage"
            className="flex-1 luxury-card rounded-xl p-5 hover:border-white/20 transition group"
          >
            <BarChart3 className="w-5 h-5 text-emerald-400 mb-2" />
            <div className="text-sm font-medium text-white group-hover:text-emerald-300">View Usage Ledger</div>
            <p className="text-xs text-zinc-500 mt-1">Audit token consumption and operational profit margins.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

function BarChart3(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  );
}
