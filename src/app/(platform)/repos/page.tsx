import { getRepos } from "@/lib/data/repository";
import Link from "next/link";
import { 
  GitBranch, 
  Star, 
  ExternalLink, 
  Terminal, 
  Eye, 
  Layers, 
  Sparkles,
  ChevronRight
} from "lucide-react";
import { formatNumber } from "@/lib/utils";

export default async function ReposPage() {
  const repos = await getRepos();

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-12">
      {/* ── Apple-Style Executive Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div>
          <span className="text-[13px] font-semibold text-[#86868B] uppercase tracking-normal block mb-1">
            Verified Open Source
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F5F5F7]">
            GitHub Repository Hub
          </h1>
          <p className="text-sm text-[#86868B] mt-1.5 max-w-2xl">
            Inspect verified upstream repositories powering Sundance Video, Meta Content Brain, and inference serving engines with rendered HTML documentation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/sandboxes"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-black bg-white hover:bg-[#E8E8ED] transition-all shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Launch Sandbox</span>
          </Link>
        </div>
      </div>

      {/* ── Apple Feature Highlights ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="luxury-card rounded-[22px] p-6 border-white/[0.08] flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#BF5AF2] shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Sundance Video Engine</h3>
            <p className="text-xs text-[#86868B] mt-0.5">Wan 2.1 14B cinema diffusion</p>
          </div>
        </div>

        <div className="luxury-card rounded-[22px] p-6 border-white/[0.08] flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#2997FF] shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Meta Content Brain</h3>
            <p className="text-xs text-[#86868B] mt-0.5">SAM 2 real-time spatiotemporal memory</p>
          </div>
        </div>

        <div className="luxury-card rounded-[22px] p-6 border-white/[0.08] flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#30D158] shrink-0">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Native HTML Rendering</h3>
            <p className="text-xs text-[#86868B] mt-0.5">Direct AST preview of repo guides</p>
          </div>
        </div>
      </div>

      {/* ── Repositories Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="luxury-card rounded-[24px] p-7 flex flex-col justify-between group hover:scale-[1.01] transition-all duration-300 relative"
          >
            <div>
              {/* Header row */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#2997FF]">
                    <GitBranch className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-white group-hover:text-[#2997FF] transition-colors">
                      {repo.full_name}
                    </h3>
                    <p className="text-xs text-[#86868B] mt-0.5">
                      {repo.language} · {repo.license}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF9F0A] px-2.5 py-0.5 rounded-full bg-[#FF9F0A]/10">
                  <Star className="w-3 h-3 fill-[#FF9F0A]" />
                  {formatNumber(repo.stars)}
                </span>
              </div>

              <p className="text-[13px] text-[#86868B] leading-relaxed line-clamp-2 mb-4">
                {repo.description}
              </p>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {repo.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-white/[0.04] text-[#86868B]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Quick clone snippet */}
              <div className="p-3 rounded-xl bg-black/60 border border-white/[0.06] font-mono text-[11px] text-[#A1A1A6] flex items-center gap-2 mb-2">
                <span className="text-[#30D158] select-none">$</span>
                <span className="truncate select-all flex-1">git clone {repo.clone_url}</span>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center gap-2 pt-4 border-t border-white/[0.06] mt-4">
              <Link
                href={`/repos/${repo.slug}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] transition"
              >
                <Eye className="w-3.5 h-3.5 text-[#2997FF]" />
                <span>Read HTML Docs</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#86868B]" />
              </Link>

              <a
                href={repo.github_url}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-[#86868B] hover:text-white transition"
                title="Open GitHub Repo"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
