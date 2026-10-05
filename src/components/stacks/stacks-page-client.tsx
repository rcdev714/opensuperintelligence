"use client";

import { useState } from "react";
import { BotCreatorStudio } from "@/components/bots/bot-creator-studio";
import { AgenticStackStudio } from "@/components/stacks/agentic-stack-studio";
import { ComboCard } from "@/components/combos/combo-card";
import type { Combo } from "@/types/database";
import { Bot, Layers, Box, Terminal, Sparkles } from "lucide-react";
import Link from "next/link";

interface StacksPageClientProps {
  combos: Combo[];
}

export function StacksPageClient({ combos }: StacksPageClientProps) {
  const [activeTab, setActiveTab] = useState<"create-bot" | "loadouts" | "all-blueprints">("create-bot");

  return (
    <div className="space-y-10">
      {/* ── Apple Segmented Mode Switcher ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center p-1 rounded-full bg-white/[0.04] border border-white/[0.08] max-w-fit">
          <button
            onClick={() => setActiveTab("create-bot")}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === "create-bot"
                ? "bg-white text-black shadow-md"
                : "text-[#86868B] hover:text-white"
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-[#2997FF]" />
            <span>Create Steady Bot (GrokBot)</span>
          </button>

          <button
            onClick={() => setActiveTab("loadouts")}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === "loadouts"
                ? "bg-white text-black shadow-md"
                : "text-[#86868B] hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#30D158]" />
            <span>Agentic Stack Loadouts</span>
          </button>

          <button
            onClick={() => setActiveTab("all-blueprints")}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === "all-blueprints"
                ? "bg-white text-black shadow-md"
                : "text-[#86868B] hover:text-white"
            }`}
          >
            <Box className="w-3.5 h-3.5 text-[#BF5AF2]" />
            <span>All Stacks Catalog ({combos.length})</span>
          </button>
        </div>

        <span className="text-xs text-[#86868B]">
          {activeTab === "create-bot" && "Instant Bot Assembly & Live Testing"}
          {activeTab === "loadouts" && "Pre-assembled SWE, Sales & Video Agents"}
          {activeTab === "all-blueprints" && "Docker Compose & Upstream Repos"}
        </span>
      </div>

      {/* ── Mode 1: Create Steady Bot ── */}
      {activeTab === "create-bot" && <BotCreatorStudio />}

      {/* ── Mode 2: Agentic Stack Loadouts (Videogame Switcher) ── */}
      {activeTab === "loadouts" && <AgenticStackStudio />}

      {/* ── Mode 3: All Blueprints Catalog ── */}
      {activeTab === "all-blueprints" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white">
              All Turnkey Stack Blueprints ({combos.length})
            </h2>
            <p className="text-xs text-[#86868B] mt-1">
              Docker-compose manifests linking Model + Runtime + Framework + Sandbox + Database
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {combos.map((combo) => (
              <ComboCard key={combo.id} combo={combo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
