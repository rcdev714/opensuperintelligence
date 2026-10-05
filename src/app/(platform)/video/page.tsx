import { SundanceStudio } from "@/components/video/sundance-studio";
import { Film, Sparkles, BrainCircuit, Play } from "lucide-react";
import Link from "next/link";

export default function VideoPage() {
  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-10">
      {/* ── Apple-Style Executive Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400 font-medium">
              GENERATIVE VIDEO & MULTIMODAL CORTEX
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-white">
            Sundance Video Studio & Meta Content Brain
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl font-sans">
            Cinematic 1080p open video synthesis powered by Wan 2.1 and HunyuanVideo, alongside the Meta Content Brain omnimodal memory cortex.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/models"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-medium text-black bg-white hover:bg-zinc-200 transition shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>View Video Models</span>
          </Link>
        </div>
      </div>

      <SundanceStudio />
    </div>
  );
}
