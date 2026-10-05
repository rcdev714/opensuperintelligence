import { getModels } from "@/lib/data/repository";
import { ModelGrid } from "@/components/models/model-grid";
import { Cpu, Terminal, ArrowUpRight, Sparkles, Zap, Activity } from "lucide-react";
import Link from "next/link";

export default async function ModelsPage() {
  const models = await getModels();

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Executive Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400 font-medium">
              SOVEREIGN WEIGHTS DIRECTORY
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
            Foundation Model Hub & Inference Catalog
          </h1>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl font-sans">
            Verified open-weight foundation models ready for metered cloud inference via our unified OpenAI-compatible endpoint or self-hosted deployment on your GPU clusters.
          </p>
        </div>

        <Link
          href="/playground"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium text-black bg-white hover:bg-zinc-200 transition shrink-0 shadow-sm"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Launch Inference Console</span>
        </Link>
      </div>

      {/* Visual Metric Chips */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[9px] font-mono uppercase text-zinc-500 block">Catalog Scale</span>
            <span className="text-sm font-mono font-medium text-white">{models.length} Verified Models</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[9px] font-mono uppercase text-zinc-500 block">Max Context</span>
            <span className="text-sm font-mono font-medium text-white">1,000,000 Tokens</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[9px] font-mono uppercase text-zinc-500 block">Starting Price</span>
            <span className="text-sm font-mono font-medium text-emerald-400">$0.35 / 1M Input</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[9px] font-mono uppercase text-zinc-500 block">Total MoE Scale</span>
            <span className="text-sm font-mono font-medium text-white">7.4T Parameters</span>
          </div>
        </div>
      </div>

      <ModelGrid initialModels={models} />
    </div>
  );
}
