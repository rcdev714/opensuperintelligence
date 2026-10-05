"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Cpu, FileText, TestTube2, Database, LayoutDashboard, Terminal, Settings, Key, Search, Box, Sparkles, Layers, Cloud, Server, Rocket, Activity } from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0 bg-[#0F0F14] border border-white/[0.08] shadow-2xl rounded-xl max-w-xl">
        <DialogTitle className="sr-only">Command Palette</DialogTitle>
        <Command
          className="flex h-full w-full flex-col overflow-hidden bg-transparent text-white"
          label="Global Command Menu"
        >
          <div className="flex items-center border-b border-white/[0.08] px-3">
            <Search className="mr-2.5 h-4 w-4 shrink-0 text-zinc-500" />
            <Command.Input
              autoFocus
              placeholder="Search models, papers, harnesses, sandboxes..."
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-zinc-500 text-white"
            />
          </div>
          <Command.List className="max-h-[340px] overflow-y-auto overflow-x-hidden p-2">
            <Command.Empty className="py-6 text-center text-sm text-zinc-500">
              No matching resources found.
            </Command.Empty>

            <Command.Group heading="Open-Source Models" className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 px-2 py-1.5">
              <Command.Item
                onSelect={() => runCommand(() => router.push("/models/deepseek-v4-pro"))}
                className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-zinc-300 aria-selected:bg-white/[0.06] aria-selected:text-white"
              >
                <Cpu className="h-4 w-4 text-emerald-400" />
                <span>DeepSeek V4 Pro</span>
                <span className="ml-auto rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 text-[10px] font-mono">1.6T MoE</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/models/kimi-k3"))}
                className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-zinc-300 aria-selected:bg-white/[0.06] aria-selected:text-white"
              >
                <Cpu className="h-4 w-4 text-blue-400" />
                <span>Kimi K3 (Moonshot)</span>
                <span className="ml-auto rounded bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-mono">1M Context</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/models/qwen-2-5-coder-32b"))}
                className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-zinc-300 aria-selected:bg-white/[0.06] aria-selected:text-white"
              >
                <Cpu className="h-4 w-4 text-purple-400" />
                <span>Qwen 2.5 Coder 32B</span>
                <span className="ml-auto rounded bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-mono">Code SOTA</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Blueprints & Stacks" className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 px-2 py-1.5 mt-2">
              <Command.Item
                onSelect={() => runCommand(() => router.push("/combos"))}
                className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-zinc-300 aria-selected:bg-white/[0.06] aria-selected:text-white"
              >
                <Layers className="h-4 w-4 text-emerald-400" />
                <span>Production Combos (Hermes, vLLM, Kernel, Qdrant)</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Cloud Infrastructure" className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 px-2 py-1.5 mt-2">
              <Command.Item
                onSelect={() => runCommand(() => router.push("/cloud"))}
                className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-zinc-300 aria-selected:bg-white/[0.06] aria-selected:text-white"
              >
                <Cloud className="h-4 w-4 text-[#2997FF]" />
                <span>Cloud Overview Dashboard</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/cloud/clusters"))}
                className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-zinc-300 aria-selected:bg-white/[0.06] aria-selected:text-white"
              >
                <Server className="h-4 w-4 text-[#BF5AF2]" />
                <span>GPU Clusters (VPC Fleet)</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/cloud/deployments"))}
                className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-zinc-300 aria-selected:bg-white/[0.06] aria-selected:text-white"
              >
                <Rocket className="h-4 w-4 text-[#FF9F0A]" />
                <span>Model Deployments</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/cloud/usage"))}
                className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-zinc-300 aria-selected:bg-white/[0.06] aria-selected:text-white"
              >
                <Activity className="h-4 w-4 text-[#30D158]" />
                <span>Usage & Cost Analytics</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Infrastructure & Tools" className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 px-2 py-1.5 mt-2">
              <Command.Item
                onSelect={() => runCommand(() => router.push("/search"))}
                className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-zinc-300 aria-selected:bg-white/[0.06] aria-selected:text-white"
              >
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>Tavily Deep AI Search</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/sandboxes"))}
                className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-zinc-300 aria-selected:bg-white/[0.06] aria-selected:text-white"
              >
                <Box className="h-4 w-4 text-emerald-400" />
                <span>Kernel.sh Agent Sandboxes</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/harnesses"))}
                className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-zinc-300 aria-selected:bg-white/[0.06] aria-selected:text-white"
              >
                <TestTube2 className="h-4 w-4 text-cyan-400" />
                <span>Evaluation Harnesses (vLLM, LM-Eval)</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/papers"))}
                className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-zinc-300 aria-selected:bg-white/[0.06] aria-selected:text-white"
              >
                <FileText className="h-4 w-4 text-zinc-400" />
                <span>ArXiv Research Feed</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/databases"))}
                className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-zinc-300 aria-selected:bg-white/[0.06] aria-selected:text-white"
              >
                <Database className="h-4 w-4 text-orange-400" />
                <span>Vector Databases (Qdrant, Milvus)</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Navigation" className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 px-2 py-1.5 mt-2">
              <Command.Item
                onSelect={() => runCommand(() => router.push("/models"))}
                className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-zinc-300 aria-selected:bg-white/[0.06] aria-selected:text-white"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Model Hub</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/playground"))}
                className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-zinc-300 aria-selected:bg-white/[0.06] aria-selected:text-white"
              >
                <Terminal className="h-4 w-4" />
                <span>Inference Playground</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/settings/api-keys"))}
                className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-zinc-300 aria-selected:bg-white/[0.06] aria-selected:text-white"
              >
                <Key className="h-4 w-4" />
                <span>API Keys & Provisioning</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/settings/usage"))}
                className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-zinc-300 aria-selected:bg-white/[0.06] aria-selected:text-white"
              >
                <Settings className="h-4 w-4" />
                <span>Usage & Billing Ledger</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
