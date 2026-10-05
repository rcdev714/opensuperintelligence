"use client";

import { useState, useEffect } from "react";
import { Box, Plus, Terminal, RefreshCw, ExternalLink, Play, CheckCircle2, Shield, Activity } from "lucide-react";
import type { Sandbox } from "@/types/database";

export default function SandboxesPage() {
  const [sandboxes, setSandboxes] = useState<Sandbox[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSpawning, setIsSpawning] = useState(false);
  const [execResult, setExecResult] = useState<string | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const loadSandboxes = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/v1/sandboxes");
      if (res.ok) {
        const data = await res.json();
        setSandboxes(data.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSandboxes();
  }, []);

  const handleSpawn = async () => {
    setIsSpawning(true);
    try {
      const res = await fetch("/api/v1/sandboxes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `Cluster MicroVM #${sandboxes.length + 1}`,
          runtime: "kernel-browser-chromium-arm64",
          stealth: true,
          memoryMb: 4096,
        }),
      });
      if (res.ok) {
        await loadSandboxes();
      }
    } finally {
      setIsSpawning(false);
    }
  };

  const handleRunCommand = async (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setExecResult("Executing Playwright command inside Kernel microVM...");
    try {
      const res = await fetch("/api/v1/sandboxes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "exec",
          sessionId,
          command: "await page.goto('https://huggingface.co/models'); return await page.title();",
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setExecResult(data.output);
      }
    } catch (err) {
      setExecResult("Command failed: " + String(err));
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Box className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400">
              KERNEL.SH BROWSER INFRASTRUCTURE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
            Autonomous Agent Sandboxes
          </h1>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
            Sub-150ms cold-start microVMs with remote Chromium instances, residential egress proxy stealth, and CDP automation for autonomous AI agents.
          </p>
        </div>

        <button
          onClick={handleSpawn}
          disabled={isSpawning}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-mono font-medium text-black bg-white hover:bg-zinc-200 disabled:opacity-50 transition shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{isSpawning ? "Provisioning..." : "Spawn MicroVM"}</span>
        </button>
      </div>

      {/* Execution Output Panel */}
      {execResult && (
        <div className="luxury-card rounded-xl p-5 border-emerald-500/20 bg-emerald-500/[0.02]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-medium">
              <Terminal className="w-3.5 h-3.5" />
              <span>MicroVM Live Execution Terminal ({selectedSessionId})</span>
            </div>
            <button
              onClick={() => setExecResult(null)}
              className="text-[10px] font-mono text-zinc-500 hover:text-white"
            >
              Dismiss
            </button>
          </div>
          <pre className="p-3 rounded-lg bg-black/60 border border-white/[0.08] font-mono text-xs text-zinc-300 overflow-x-auto whitespace-pre-wrap">
            {execResult}
          </pre>
        </div>
      )}

      {/* Sandboxes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sandboxes.map((sbx) => (
          <div key={sbx.id} className="luxury-card rounded-xl p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
                  <h3 className="font-medium text-sm text-white">{sbx.name}</h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                  {sbx.status}
                </span>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                {sbx.description}
              </p>

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] font-mono text-xs space-y-2">
                <div className="flex justify-between text-zinc-400">
                  <span className="text-zinc-500">Session ID:</span>
                  <span className="text-zinc-200">{sbx.kernel_session_id || "simulated"}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span className="text-zinc-500">Memory Allocation:</span>
                  <span className="text-zinc-200">{String((sbx.config as Record<string, any>)?.memoryMb || 4096)} MB</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span className="text-zinc-500">Stealth Engine:</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    <span>Enabled</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
              <button
                onClick={() => handleRunCommand(sbx.kernel_session_id || "ksess_demo")}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono text-zinc-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition"
              >
                <Play className="w-3 h-3 text-emerald-400" />
                <span>Run Automation</span>
              </button>

              <a
                href={sbx.kernel_session_id ? `https://session.kernel.sh/view/${sbx.kernel_session_id}` : "#"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono text-zinc-400 hover:text-white bg-white/[0.02] border border-white/[0.06] transition"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Live View</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
