"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Layers, 
  Copy, 
  Check, 
  Terminal, 
  Box, 
  Cpu, 
  Database, 
  ShieldCheck, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Zap,
  Code
} from "lucide-react";
import type { Combo } from "@/types/database";

export function ComboCard({ combo }: { combo: Combo }) {
  const [copiedCompose, setCopiedCompose] = useState(false);
  const [copiedRun, setCopiedRun] = useState(false);
  const [showCompose, setShowCompose] = useState(false);

  const copyCompose = () => {
    navigator.clipboard.writeText(combo.docker_compose);
    setCopiedCompose(true);
    setTimeout(() => setCopiedCompose(false), 2000);
  };

  const copyRun = () => {
    navigator.clipboard.writeText(combo.run_command);
    setCopiedRun(true);
    setTimeout(() => setCopiedRun(false), 2000);
  };

  const renderDifficulty = (difficulty: Combo["difficulty"]) => {
    const dots = difficulty === "production-grade" ? 3 : difficulty === "intermediate" ? 2 : 1;
    return (
      <div className="flex items-center gap-1.5" title={`Tier: ${difficulty}`}>
        <div className="flex gap-1">
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${
                i <= dots ? "bg-emerald-400" : "bg-white/10"
              }`}
            />
          ))}
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
          {difficulty.replace("-", " ")}
        </span>
      </div>
    );
  };

  return (
    <div className="luxury-card rounded-2xl p-6 sm:p-8 border-white/[0.08] hover:border-white/20 transition-all duration-300 space-y-6 relative overflow-hidden group">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              {combo.category}
            </span>
            {renderDifficulty(combo.difficulty)}
          </div>

          <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white group-hover:text-emerald-300 transition-colors">
            {combo.title}
          </h3>
          <p className="text-xs font-mono text-emerald-400/90 font-medium">
            {combo.tagline}
          </p>
          <p className="text-xs text-zinc-300 leading-relaxed max-w-3xl pt-1">
            {combo.description}
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <span className="text-xs font-mono text-zinc-400 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
            ★ {combo.stars} deployments
          </span>
        </div>
      </div>

      {/* ── Apple-Style Visual Topology Pipeline ── */}
      <div className="space-y-2">
        <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block">
          End-to-End Execution Topology
        </span>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 relative">
          {/* Node 1: Model */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all">
            <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] uppercase font-mono mb-1">
              <Cpu className="w-3 h-3 text-blue-400" />
              <span>Model</span>
            </div>
            <div className="text-xs font-mono font-medium text-white truncate" title={combo.model}>
              {combo.model}
            </div>
          </div>

          {/* Node 2: Runtime */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all">
            <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] uppercase font-mono mb-1">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Runtime</span>
            </div>
            <div className="text-xs font-mono font-medium text-zinc-200 truncate" title={combo.runtime}>
              {combo.runtime}
            </div>
          </div>

          {/* Node 3: Harness */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all">
            <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] uppercase font-mono mb-1">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>Harness</span>
            </div>
            <div className="text-xs font-mono font-medium text-zinc-200 truncate" title={combo.harness}>
              {combo.harness}
            </div>
          </div>

          {/* Node 4: Sandbox */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all">
            <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] uppercase font-mono mb-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Sandbox</span>
            </div>
            <div className="text-xs font-mono font-medium text-emerald-400 truncate" title={combo.sandbox || "Subprocess"}>
              {combo.sandbox || "Isolated Subprocess"}
            </div>
          </div>

          {/* Node 5: Database */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all col-span-2 md:col-span-1">
            <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] uppercase font-mono mb-1">
              <Database className="w-3 h-3 text-cyan-400" />
              <span>Store</span>
            </div>
            <div className="text-xs font-mono font-medium text-zinc-200 truncate" title={combo.database || "In-Memory"}>
              {combo.database || "In-Memory Buffer"}
            </div>
          </div>
        </div>
      </div>

      {/* Architecture Highlights */}
      <div className="p-4 rounded-xl bg-white/[0.015] border border-white/[0.05] space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
          Key Engineering Rationale:
        </span>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-sans text-zinc-300">
          {combo.architecture_notes.map((note, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-emerald-400 font-mono text-[11px] shrink-0 mt-0.5">•</span>
              <span className="leading-relaxed">{note}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Expandable Docker Compose Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowCompose(!showCompose)}
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <Code className="w-3.5 h-3.5 text-emerald-400" />
            <span>{showCompose ? "Hide docker-compose.yml" : "View docker-compose.yml"}</span>
            {showCompose ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={copyCompose}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition"
          >
            {copiedCompose ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copied Compose</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy Manifest</span>
              </>
            )}
          </button>
        </div>

        {showCompose && (
          <pre className="p-4 rounded-xl bg-black/80 border border-white/[0.08] font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed select-all">
            <code>{combo.docker_compose}</code>
          </pre>
        )}
      </div>

      {/* Footer Run Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.06] text-xs font-mono">
        <div className="flex items-center gap-2 flex-1 max-w-xl">
          <div className="flex-1 flex items-center justify-between bg-black/60 border border-white/[0.08] px-3.5 py-2 rounded-lg text-zinc-300 select-all overflow-x-auto">
            <div className="flex items-center gap-2 truncate">
              <span className="text-emerald-400 select-none">$</span>
              <span className="truncate">{combo.run_command}</span>
            </div>
            <button
              onClick={copyRun}
              className="ml-2 text-zinc-500 hover:text-white shrink-0"
              title="Copy Run Command"
            >
              {copiedRun ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/playground"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-zinc-200 transition text-xs font-mono"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Test Stack in Console</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
