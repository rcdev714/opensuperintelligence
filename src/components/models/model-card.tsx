"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Cpu, 
  Terminal, 
  Zap, 
  Copy, 
  Check, 
  ExternalLink, 
  Code2, 
  BrainCircuit, 
  Eye, 
  Headphones, 
  ChevronRight,
  Sparkles
} from "lucide-react";
import type { Model } from "@/types/database";
import { formatNumber, formatTokenPrice } from "@/lib/utils";

export function ModelCard({ model }: { model: Model }) {
  const [copied, setCopied] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "reasoning": return <BrainCircuit className="w-4 h-4 text-[#2997FF]" />;
      case "video-generation": return <Sparkles className="w-4 h-4 text-[#BF5AF2]" />;
      case "code-generation": return <Code2 className="w-4 h-4 text-[#30D158]" />;
      case "image-generation": return <Eye className="w-4 h-4 text-[#FF9F0A]" />;
      case "audio-transcription":
      case "audio-speech": return <Headphones className="w-4 h-4 text-[#FF375F]" />;
      default: return <Cpu className="w-4 h-4 text-[#86868B]" />;
    }
  };

  const copyCurl = () => {
    const curl = `curl https://osi.arcanetechnologies.org/api/v1/chat/completions \\
  -H "Authorization: Bearer $OSI_API_KEY" \\
  -d '{"model": "${model.slug}", "messages": [{"role": "user", "content": "Hello"}]}'`;
    navigator.clipboard.writeText(curl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const benchmarkEntry = model.metadata?.swe_bench 
    ? { label: "SWE-bench", val: String(model.metadata.swe_bench) }
    : model.metadata?.mmlu 
    ? { label: "MMLU", val: String(model.metadata.mmlu) }
    : model.metadata?.humaneval 
    ? { label: "HumanEval", val: String(model.metadata.humaneval) }
    : null;

  return (
    <div className="luxury-card rounded-[24px] p-6 flex flex-col justify-between group transition-all duration-300 hover:scale-[1.012] hover:shadow-2xl hover:shadow-black/40 relative">
      <div>
        {/* Header Row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
              {getCategoryIcon(model.category)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold text-[15px] text-[#F5F5F7] tracking-tight group-hover:text-white transition-colors">
                  {model.name}
                </h3>
              </div>
              <p className="text-xs text-[#86868B] mt-0.5 font-normal">
                {model.provider}
              </p>
            </div>
          </div>

          <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-white/[0.06] text-[#A1A1A6] border border-white/[0.08]">
            {model.category.replace("-", " ")}
          </span>
        </div>

        {/* Description */}
        <p className="text-[13px] text-[#86868B] leading-relaxed line-clamp-2 mt-2">
          {model.description}
        </p>

        {/* Apple-Style Specs Grid */}
        <div className="grid grid-cols-3 gap-2 py-4 my-4 border-y border-white/[0.06] text-center">
          <div>
            <span className="block text-[11px] text-[#86868B] uppercase tracking-wider">Context</span>
            <span className="text-sm font-semibold text-[#F5F5F7]">
              {model.context_window ? `${Math.round(model.context_window / 1024)}k` : "N/A"}
            </span>
          </div>
          <div>
            <span className="block text-[11px] text-[#86868B] uppercase tracking-wider">Parameters</span>
            <span className="text-sm font-semibold text-[#F5F5F7]">
              {model.parameters || "MoE"}
            </span>
          </div>
          <div>
            <span className="block text-[11px] text-[#86868B] uppercase tracking-wider">Pricing</span>
            <span className="text-sm font-semibold text-[#F5F5F7]">
              {model.our_input_price !== null && model.our_input_price !== undefined
                ? `$${model.our_input_price.toFixed(2)}`
                : model.input_price_per_m !== null && model.input_price_per_m !== undefined
                ? `$${model.input_price_per_m.toFixed(2)}`
                : "Free"}
            </span>
          </div>
        </div>

        {/* Benchmark pill if available */}
        {benchmarkEntry && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[11px] text-[#86868B]">{benchmarkEntry.label}:</span>
            <span className="text-[11px] font-semibold text-[#2997FF] bg-[#0071E3]/10 px-2 py-0.5 rounded-full">
              {benchmarkEntry.val}% Verified
            </span>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="pt-2 flex items-center justify-between gap-3">
        <button
          onClick={copyCurl}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#86868B] hover:text-[#F5F5F7] bg-white/[0.04] hover:bg-white/[0.08] transition"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-[#30D158]" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied" : "cURL"}</span>
        </button>

        <Link
          href={`/models/${model.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#2997FF] hover:underline"
        >
          <span>View Model</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
