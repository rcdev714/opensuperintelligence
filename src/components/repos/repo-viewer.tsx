"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  GitBranch, 
  Star, 
  GitFork, 
  ExternalLink, 
  Copy, 
  Check, 
  FileCode, 
  Box, 
  Eye, 
  Layers, 
  ChevronRight,
  Terminal
} from "lucide-react";
import type { GitHubRepo } from "@/types/database";
import { formatNumber } from "@/lib/utils";

export function RepoViewer({ repo }: { repo: GitHubRepo }) {
  const [tab, setTab] = useState<"html" | "markdown" | "specs">("html");
  const [copiedClone, setCopiedClone] = useState(false);

  const copyClone = () => {
    navigator.clipboard.writeText(`git clone ${repo.clone_url}`);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  const getLanguageColor = (lang: string) => {
    switch (lang.toLowerCase()) {
      case "python": return "bg-[#2997FF]";
      case "rust": return "bg-[#FF9F0A]";
      case "go": return "bg-[#64D2FF]";
      case "c++": return "bg-[#FF375F]";
      default: return "bg-[#30D158]";
    }
  };

  return (
    <div className="space-y-8">
      {/* ── Apple-Style Master Header ── */}
      <div className="luxury-card rounded-[28px] p-8 sm:p-10 border-white/[0.08] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 relative">
          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/[0.06] text-[#A1A1A6]">
                {repo.category.replace("-", " ")}
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/[0.06] text-[#A1A1A6]">
                {repo.license}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#86868B] ml-2">
                <span className={`w-2 h-2 rounded-full ${getLanguageColor(repo.language)}`} />
                <span className="font-medium text-[#F5F5F7]">{repo.language}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
                <GitBranch className="w-7 h-7 text-[#2997FF]" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#F5F5F7]">
                  {repo.full_name}
                </h1>
                <p className="text-xs text-[#86868B] mt-1">
                  Default Branch: <span className="text-white font-medium">{repo.default_branch}</span> · Maintained by <span className="text-white font-medium">{repo.owner}</span>
                </p>
              </div>
            </div>

            <p className="text-base text-[#86868B] leading-relaxed pt-1">
              {repo.description}
            </p>

            {/* Tag Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {repo.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/[0.04] text-[#A1A1A6]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* GitHub Metrics & Clone Bar */}
          <div className="flex flex-col gap-3 shrink-0 sm:min-w-[280px]">
            {/* Stats counter strip */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
              <div>
                <span className="text-[#86868B] block text-xs font-medium">Stars</span>
                <span className="text-base font-semibold text-[#FF9F0A] flex items-center justify-center gap-1 mt-0.5">
                  <Star className="w-4 h-4 fill-[#FF9F0A]" />
                  {formatNumber(repo.stars)}
                </span>
              </div>
              <div>
                <span className="text-[#86868B] block text-xs font-medium">Forks</span>
                <span className="text-base font-semibold text-[#F5F5F7] flex items-center justify-center gap-1 mt-0.5">
                  <GitFork className="w-4 h-4 text-[#86868B]" />
                  {formatNumber(repo.forks)}
                </span>
              </div>
            </div>

            {/* Quick Clone Button */}
            <div className="flex items-center gap-2 p-2.5 rounded-full bg-black/60 border border-white/[0.08] text-xs font-mono">
              <span className="text-[#30D158] select-none pl-2">$</span>
              <span className="flex-1 truncate text-[#A1A1A6] select-all text-[11px]">
                git clone {repo.clone_url}
              </span>
              <button
                onClick={copyClone}
                className="p-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-[#86868B] hover:text-white transition"
                title="Copy git clone"
              >
                {copiedClone ? <Check className="w-3.5 h-3.5 text-[#30D158]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Direct External Action */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href={repo.github_url}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] transition"
              >
                <span>GitHub Repo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <Link
                href="/sandboxes"
                className="inline-flex items-center justify-center gap-1 px-4 py-2.5 rounded-full text-xs font-semibold text-black bg-white hover:bg-[#E8E8ED] transition shadow-sm"
              >
                <Box className="w-3.5 h-3.5 text-black" />
                <span>Test MicroVM</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Apple-Style Segmented View Switcher ── */}
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
        <div className="flex items-center p-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
          <button
            onClick={() => setTab("html")}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              tab === "html"
                ? "bg-white text-black shadow-md"
                : "text-[#86868B] hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Rendered README (HTML)</span>
          </button>

          <button
            onClick={() => setTab("markdown")}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              tab === "markdown"
                ? "bg-white text-black shadow-md"
                : "text-[#86868B] hover:text-white"
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Raw Markdown Source</span>
          </button>

          <button
            onClick={() => setTab("specs")}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              tab === "specs"
                ? "bg-white text-black shadow-md"
                : "text-[#86868B] hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture & Topics</span>
          </button>
        </div>

        <span className="text-xs text-[#86868B] hidden sm:inline">
          {tab === "html" ? "WebKit HTML Rendering" : tab === "markdown" ? "UTF-8 Markdown Stream" : "System Blueprint"}
        </span>
      </div>

      {/* ── Active View Body ── */}
      {tab === "html" && (
        <div className="luxury-card rounded-[28px] p-8 sm:p-12 border-white/[0.08] shadow-xl">
          <div 
            dangerouslySetInnerHTML={{ __html: repo.readme_html }}
            className="prose prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-[#2997FF] prose-code:font-mono"
          />
        </div>
      )}

      {tab === "markdown" && (
        <div className="luxury-card rounded-[28px] p-8 border-white/[0.08] bg-black/80 font-mono text-xs text-[#F5F5F7]">
          <pre className="overflow-x-auto leading-relaxed select-all">
            <code>{repo.readme_markdown}</code>
          </pre>
        </div>
      )}

      {tab === "specs" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="luxury-card rounded-[26px] p-8 border-white/[0.08] space-y-4">
            <h3 className="text-base font-semibold text-white">Repository Specifications</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-white/[0.06]">
                <span className="text-[#86868B]">Full Name</span>
                <span className="text-white font-medium">{repo.full_name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/[0.06]">
                <span className="text-[#86868B]">Maintainer</span>
                <span className="text-white font-medium">{repo.owner}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/[0.06]">
                <span className="text-[#86868B]">Primary Language</span>
                <span className="text-white font-medium">{repo.language}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/[0.06]">
                <span className="text-[#86868B]">Open Source License</span>
                <span className="text-[#30D158] font-medium">{repo.license}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#86868B]">Default Branch</span>
                <span className="text-white font-medium font-mono text-xs">{repo.default_branch}</span>
              </div>
            </div>
          </div>

          <div className="luxury-card rounded-[26px] p-8 border-white/[0.08] space-y-4">
            <h3 className="text-base font-semibold text-white">Production Deployment</h3>
            <p className="text-sm text-[#86868B] leading-relaxed">
              This repository is certified for automated deployment within our Kernel.sh microVM sandboxes and local GPU serving harnesses.
            </p>
            <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.08] font-mono text-xs text-[#A1A1A6] space-y-1">
              <p className="text-[#86868B]"># Test repository in isolated microVM</p>
              <p className="text-white">kernel sandbox create --repo {repo.clone_url}</p>
            </div>
            <div className="pt-2">
              <Link
                href="/sandboxes"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold text-black bg-white hover:bg-[#E8E8ED] transition shadow-sm"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Launch MicroVM Session</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
