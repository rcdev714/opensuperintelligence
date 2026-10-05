import { getCombos } from "@/lib/data/repository";
import { StacksPageClient } from "@/components/stacks/stacks-page-client";
import Link from "next/link";
import { Bot, Terminal, Box, Layers } from "lucide-react";

export default async function CombosPage() {
  const combos = await getCombos();

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-10">
      {/* ── Apple-Style Executive Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div>
          <span className="text-[13px] font-semibold text-[#86868B] uppercase tracking-normal block mb-1">
            Autonomous Systems Studio
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F5F5F7]">
            Steady Bots & Agentic Stacks
          </h1>
          <p className="text-sm text-[#86868B] mt-1.5 max-w-2xl">
            Create steady custom agents like GrokBot with custom roles and tool sandboxes, or switch between pre-configured autonomous SWE and Sales loadouts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/sandboxes"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-black bg-white hover:bg-[#E8E8ED] transition-all shadow-sm"
          >
            <Box className="w-3.5 h-3.5" />
            <span>Launch MicroVM</span>
          </Link>
        </div>
      </div>

      {/* ── Main Unified Studio ── */}
      <StacksPageClient combos={combos} />
    </div>
  );
}
