import Link from "next/link";
import { 
  Cpu, 
  Terminal, 
  Box, 
  FileText, 
  ArrowRight, 
  Key, 
  ShieldCheck, 
  Activity, 
  TrendingDown, 
  ChevronRight,
  Film,
  GitBranch
} from "lucide-react";
import { getModels, getPapers, getSandboxes, getHarnesses, getRepos } from "@/lib/data/repository";
import { ModelCard } from "@/components/models/model-card";
import { ArchitectureMap } from "@/components/dashboard/architecture-map";
import { CodeSwitch } from "@/components/dashboard/code-switch";
import { formatNumber } from "@/lib/utils";

export default async function DashboardPage() {
  const [models, papers, sandboxes, harnesses, repos] = await Promise.all([
    getModels(),
    getPapers(),
    getSandboxes(),
    getHarnesses(),
    getRepos(),
  ]);

  const featuredModels = models.filter((m) => m.is_featured).slice(0, 3);

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-12">
      {/* ── Apple-Style Platform Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div>
          <span className="text-[13px] font-semibold text-[#86868B] uppercase tracking-normal block mb-1">
            Enterprise Console
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F5F5F7]">
            Infrastructure & Inference
          </h1>
          <p className="text-sm text-[#86868B] mt-1.5 max-w-2xl">
            Orchestrate verified foundation models, isolated microVM sandboxes, and generative video diffusion with zero vendor lock-in.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/video"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 transition-all"
          >
            <Film className="w-3.5 h-3.5 text-[#BF5AF2]" />
            <span>Sundance Studio</span>
          </Link>
          <Link
            href="/playground"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-black bg-white hover:bg-[#E8E8ED] transition-all shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Interactive Console</span>
          </Link>
        </div>
      </div>

      {/* ── Apple-Style System Metrics Strip ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="luxury-card rounded-[22px] p-6 border-white/[0.08] flex flex-col justify-between group">
          <div className="flex items-center justify-between text-[#86868B] mb-3">
            <span className="text-xs font-medium">TCO Advantage</span>
            <TrendingDown className="w-4 h-4 text-[#30D158]" />
          </div>
          <div>
            <div className="text-3xl font-semibold tracking-tight text-[#F5F5F7]">−78%</div>
            <p className="text-xs text-[#86868B] mt-1">vs proprietary cloud APIs</p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="luxury-card rounded-[22px] p-6 border-white/[0.08] flex flex-col justify-between group">
          <div className="flex items-center justify-between text-[#86868B] mb-3">
            <span className="text-xs font-medium">Inference Latency</span>
            <Activity className="w-4 h-4 text-[#2997FF]" />
          </div>
          <div>
            <div className="text-3xl font-semibold tracking-tight text-[#F5F5F7]">180ms</div>
            <p className="text-xs text-[#86868B] mt-1">Average TTFT · 99.95% SLA</p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="luxury-card rounded-[22px] p-6 border-white/[0.08] flex flex-col justify-between group">
          <div className="flex items-center justify-between text-[#86868B] mb-3">
            <span className="text-xs font-medium">Managed Scale</span>
            <Cpu className="w-4 h-4 text-[#BF5AF2]" />
          </div>
          <div>
            <div className="text-3xl font-semibold tracking-tight text-[#F5F5F7]">7.4T</div>
            <p className="text-xs text-[#86868B] mt-1">{models.length} foundation models</p>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="luxury-card rounded-[22px] p-6 border-white/[0.08] flex flex-col justify-between group">
          <div className="flex items-center justify-between text-[#86868B] mb-3">
            <span className="text-xs font-medium">Sovereign Repos</span>
            <GitBranch className="w-4 h-4 text-[#FF9F0A]" />
          </div>
          <div>
            <div className="text-3xl font-semibold tracking-tight text-[#F5F5F7]">{repos.length}</div>
            <p className="text-xs text-[#86868B] mt-1">Verified GitHub blueprints</p>
          </div>
        </div>
      </div>

      {/* ── Architecture Pipeline ── */}
      <ArchitectureMap />

      {/* ── Multi-Language SDK Switcher ── */}
      <CodeSwitch />

      {/* ── Featured Models Grid ── */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white">Frontier Foundation Models</h2>
            <p className="text-xs text-[#86868B] mt-0.5">Verified open weights with transparent unit economics</p>
          </div>
          <Link
            href="/models"
            className="text-sm font-semibold text-[#2997FF] hover:underline flex items-center gap-1"
          >
            <span>View All ({models.length})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredModels.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      </div>

      {/* ── Bottom Cards: Research & Sandboxes ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Curated Literature */}
        <div className="luxury-card rounded-[24px] p-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#2997FF]" />
              <span>ArXiv Frontier Research Feed</span>
            </h3>
            <Link href="/papers" className="text-xs font-semibold text-[#2997FF] hover:underline">
              All Literature ({papers.length}) ›
            </Link>
          </div>

          <div className="space-y-2.5">
            {papers.slice(0, 3).map((paper) => (
              <a
                key={paper.id}
                href={paper.pdf_url || "#"}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] transition-all flex items-start justify-between gap-3 block group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1 text-xs text-[#86868B]">
                    <span className="font-mono text-[11px] text-[#2997FF]">arXiv:{paper.arxiv_id}</span>
                    <span>•</span>
                    <span>★ {formatNumber(paper.citation_count)} citations</span>
                  </div>
                  <h4 className="text-xs font-medium text-white group-hover:text-[#2997FF] transition-colors line-clamp-1">
                    {paper.title}
                  </h4>
                </div>
                <ChevronRight className="w-4 h-4 text-[#86868B] group-hover:text-white shrink-0 mt-1" />
              </a>
            ))}
          </div>
        </div>

        {/* Live Kernel.sh Sandboxes */}
        <div className="luxury-card rounded-[24px] p-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Box className="w-4 h-4 text-[#30D158]" />
              <span>Active Kernel.sh MicroVM Sandboxes</span>
            </h3>
            <Link href="/sandboxes" className="text-xs font-semibold text-[#2997FF] hover:underline">
              Manage Sandboxes ›
            </Link>
          </div>

          <div className="space-y-2.5">
            {sandboxes.slice(0, 2).map((sbx) => (
              <div
                key={sbx.id}
                className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />
                    <span className="text-xs font-medium text-white">{sbx.name}</span>
                  </div>
                  <p className="text-xs text-[#86868B]">
                    Session: {sbx.kernel_session_id} · {sbx.config.memoryMb}MB RAM
                  </p>
                </div>
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-white/[0.06] text-[#30D158]">
                  {sbx.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
