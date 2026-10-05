import { getHarnesses } from "@/lib/data/repository";
import { HarnessesViewer } from "@/components/harnesses/harnesses-viewer";
import Link from "next/link";
import { Terminal, Layers, Cpu } from "lucide-react";

export default async function HarnessesPage() {
  const harnesses = await getHarnesses();

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-10">
      {/* ── Apple-Style Executive Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div>
          <span className="text-[13px] font-semibold text-[#86868B] uppercase tracking-normal block mb-1">
            Enterprise Open-Source Infrastructure
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F5F5F7]">
            Serving Runtimes, Agent Frameworks & Harnesses
          </h1>
          <p className="text-sm text-[#86868B] mt-1.5 max-w-2xl">
            Architecturally separated layers: Silicon serving engines (vLLM, SGLang, TensorRT), cognitive multi-agent frameworks (CrewAI, LangGraph, LlamaIndex), and evaluation/proxy harnesses.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/combos"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-black bg-white hover:bg-[#E8E8ED] transition-all shadow-sm"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Production Stacks</span>
          </Link>
        </div>
      </div>

      {/* ── Segmented Interactive Viewer ── */}
      <HarnessesViewer initialHarnesses={harnesses} />
    </div>
  );
}
