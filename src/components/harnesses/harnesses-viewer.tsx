"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Cpu, 
  Layers, 
  Terminal, 
  Box, 
  TestTube2, 
  GitBranch, 
  Star, 
  Globe, 
  Download, 
  ExternalLink, 
  Check, 
  Copy,
  Zap,
  Activity,
  ShieldCheck,
  BrainCircuit
} from "lucide-react";
import type { Harness } from "@/types/database";
import { formatNumber } from "@/lib/utils";

interface HarnessesViewerProps {
  initialHarnesses: Harness[];
}

export function HarnessesViewer({ initialHarnesses }: HarnessesViewerProps) {
  const [activeTab, setActiveTab] = useState<"runtimes" | "frameworks" | "harnesses">("runtimes");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCommand = (cmd: string, id: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Strict architectural separation
  const runtimes = useMemo(() => {
    return initialHarnesses.filter((h) => 
      ["vllm", "sglang", "tensorrt-llm", "tgi", "ollama", "llama-cpp"].includes(h.slug) ||
      h.type === "deployment" || h.type === "local-runtime"
    ).filter(h => h.slug !== "kernel-agent-runtime");
  }, [initialHarnesses]);

  const frameworks = useMemo(() => {
    return initialHarnesses.filter((h) => 
      ["crewai", "langgraph", "llamaindex", "hermes-agent", "open-interpreter", "aider", "dspy", "kernel-agent-runtime"].includes(h.slug) ||
      h.type === "agent-framework"
    );
  }, [initialHarnesses]);

  const harnesses = useMemo(() => {
    return initialHarnesses.filter((h) => 
      ["litellm", "lm-evaluation-harness", "open-webui", "unsloth", "outlines"].includes(h.slug) ||
      h.type === "evaluation" || h.type === "gateway" || h.type === "fine-tuning" || h.type === "structured-output" || h.type === "observability"
    );
  }, [initialHarnesses]);

  const currentList = activeTab === "runtimes" ? runtimes : activeTab === "frameworks" ? frameworks : harnesses;

  return (
    <div className="space-y-8">
      {/* ── Apple Segmented Tab Switcher ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center p-1 rounded-full bg-white/[0.04] border border-white/[0.08] max-w-fit">
          <button
            onClick={() => setActiveTab("runtimes")}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === "runtimes"
                ? "bg-white text-black shadow-md"
                : "text-[#86868B] hover:text-white"
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-[#2997FF]" />
            <span>Serving Runtimes ({runtimes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("frameworks")}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === "frameworks"
                ? "bg-white text-black shadow-md"
                : "text-[#86868B] hover:text-white"
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5 text-[#BF5AF2]" />
            <span>Agent Frameworks ({frameworks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("harnesses")}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === "harnesses"
                ? "bg-white text-black shadow-md"
                : "text-[#86868B] hover:text-white"
            }`}
          >
            <TestTube2 className="w-3.5 h-3.5 text-[#30D158]" />
            <span>Evaluation & Gateways ({harnesses.length})</span>
          </button>
        </div>

        <span className="text-xs text-[#86868B]">
          {activeTab === "runtimes" && "GPU/CPU Silicon Execution Engines"}
          {activeTab === "frameworks" && "Autonomous Multi-Agent & State Graphs"}
          {activeTab === "harnesses" && "Benchmarking, Security & Fallback Routing"}
        </span>
      </div>

      {/* ── Architectural Tier Explainer Strip ── */}
      <div className="p-6 rounded-[24px] bg-[#161617] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-6">
        {activeTab === "runtimes" && (
          <div className="space-y-1 max-w-3xl">
            <span className="text-xs font-semibold text-[#2997FF] uppercase tracking-wider block">
              Layer 01 · Silicon Inference Engines
            </span>
            <h3 className="text-lg font-semibold text-white">Serving Runtimes</h3>
            <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
              Low-level execution runtimes that host model weights on NVIDIA GPUs, Apple Silicon, or CPUs. Responsible for KV-cache optimization (PagedAttention, RadixAttention), FP8 kernel execution, and exposing OpenAI-compatible endpoints.
            </p>
          </div>
        )}

        {activeTab === "frameworks" && (
          <div className="space-y-1 max-w-3xl">
            <span className="text-xs font-semibold text-[#BF5AF2] uppercase tracking-wider block">
              Layer 02 · Cognitive Multi-Agent Orchestration
            </span>
            <h3 className="text-lg font-semibold text-white">Agent Frameworks</h3>
            <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
              Autonomous cognitive architectures that structure how models invoke tools, persist long-term memory, delegate across specialized swarms, and execute browser/terminal computer-use tasks.
            </p>
          </div>
        )}

        {activeTab === "harnesses" && (
          <div className="space-y-1 max-w-3xl">
            <span className="text-xs font-semibold text-[#30D158] uppercase tracking-wider block">
              Layer 03 · Quality, Safety & Routing Gateways
            </span>
            <h3 className="text-lg font-semibold text-white">Evaluation & Testing Harnesses</h3>
            <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
              Industrial testing frameworks and proxy gateways that stress-test models across academic benchmarks (MMLU, SWE-bench), prevent prompt injections, enforce JSON grammars, and load-balance across multi-cloud clusters.
            </p>
          </div>
        )}

        <div className="shrink-0 flex items-center gap-3">
          <Link
            href="/combos"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-black bg-white hover:bg-[#E8E8ED] transition shadow-sm"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>View Full Stacks (Combos)</span>
          </Link>
        </div>
      </div>

      {/* ── App Store Style Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentList.map((item) => (
          <div
            key={item.id}
            className="luxury-card rounded-[24px] p-7 flex flex-col justify-between group hover:scale-[1.01] transition-all duration-300 relative space-y-5"
          >
            <div>
              {/* Header row */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-white/[0.08] ${
                    activeTab === "runtimes" ? "bg-blue-500/10 text-[#2997FF]" :
                    activeTab === "frameworks" ? "bg-purple-500/10 text-[#BF5AF2]" :
                    "bg-emerald-500/10 text-[#30D158]"
                  }`}>
                    {activeTab === "runtimes" ? <Cpu className="w-6 h-6" /> :
                     activeTab === "frameworks" ? <BrainCircuit className="w-6 h-6" /> :
                     <TestTube2 className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-white group-hover:text-white transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/[0.06] text-[#A1A1A6]">
                        {item.type}
                      </span>
                      <span className="text-xs font-semibold text-[#FF9F0A] flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-[#FF9F0A]" />
                        {formatNumber(item.stars)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.website_url && (
                    <a
                      href={item.website_url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-[#86868B] hover:text-white transition"
                      title="Website"
                    >
                      <Globe className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {item.github_url && (
                    <a
                      href={item.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-[#86868B] hover:text-white transition"
                      title="GitHub"
                    >
                      <GitBranch className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-[13px] text-[#86868B] leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-white/[0.04] text-[#86868B]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Install or Docker Snippet */}
              {item.install_command && (
                <div className="p-3 rounded-xl bg-black/60 border border-white/[0.06] font-mono text-[11px] text-[#A1A1A6] flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-[#30D158] select-none">$</span>
                    <span className="truncate select-all">{item.install_command}</span>
                  </div>
                  <button
                    onClick={() => copyCommand(item.install_command || "", `inst-${item.id}`)}
                    className="p-1 rounded bg-white/[0.06] hover:bg-white/[0.1] text-[#86868B] hover:text-white transition shrink-0"
                    title="Copy install command"
                  >
                    {copiedId === `inst-${item.id}` ? <Check className="w-3 h-3 text-[#30D158]" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              )}

              {item.docker_command && (
                <div className="p-3 rounded-xl bg-black/60 border border-white/[0.06] font-mono text-[11px] text-[#A1A1A6] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-[#2997FF] select-none">docker</span>
                    <span className="truncate select-all">{item.docker_command}</span>
                  </div>
                  <button
                    onClick={() => copyCommand(item.docker_command || "", `dock-${item.id}`)}
                    className="p-1 rounded bg-white/[0.06] hover:bg-white/[0.1] text-[#86868B] hover:text-white transition shrink-0"
                    title="Copy docker command"
                  >
                    {copiedId === `dock-${item.id}` ? <Check className="w-3 h-3 text-[#30D158]" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-[#86868B]">Production Ready</span>

              <div className="flex items-center gap-2">
                {item.download_url && (
                  <a
                    href={item.download_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                )}
                {item.documentation_url && (
                  <a
                    href={item.documentation_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#2997FF] hover:underline"
                  >
                    <span>Documentation</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
