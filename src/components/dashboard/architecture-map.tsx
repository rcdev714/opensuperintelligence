import Link from "next/link";
import { 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Search, 
  Database, 
  Terminal, 
  ArrowRight, 
  Layers
} from "lucide-react";

export function ArchitectureMap() {
  const pillars = [
    {
      step: "01",
      title: "Frontier Weights",
      desc: "DeepSeek, Kimi, Qwen, Llama",
      icon: Cpu,
      color: "text-blue-400",
      border: "hover:border-blue-500/40",
      href: "/models",
      tag: "14 Models",
    },
    {
      step: "02",
      title: "Inference Gateway",
      desc: "Sub-200ms TTFT + OpenAI API",
      icon: Zap,
      color: "text-amber-400",
      border: "hover:border-amber-500/40",
      href: "/playground",
      tag: "vLLM / SGLang",
    },
    {
      step: "03",
      title: "Kernel.sh MicroVMs",
      desc: "Stealth Chromium Sandboxes",
      icon: ShieldCheck,
      color: "text-emerald-400",
      border: "hover:border-emerald-500/40",
      href: "/sandboxes",
      tag: "Isolated BaaS",
    },
    {
      step: "04",
      title: "Tavily Search",
      desc: "ArXiv & GitHub Grounding",
      icon: Search,
      color: "text-purple-400",
      border: "hover:border-purple-500/40",
      href: "/search",
      tag: "Live Grounding",
    },
    {
      step: "05",
      title: "Vector & Graph Stores",
      desc: "Qdrant, Neo4j, ClickHouse",
      icon: Database,
      color: "text-cyan-400",
      border: "hover:border-cyan-500/40",
      href: "/databases",
      tag: "RAG & Audit",
    },
    {
      step: "06",
      title: "MCP Protocol",
      desc: "Direct Claude & Cursor Bridge",
      icon: Terminal,
      color: "text-pink-400",
      border: "hover:border-pink-500/40",
      href: "/combos",
      tag: "5 Live Tools",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-400">
            OpenSuperIntelligence Sovereign Stack Architecture
          </h2>
        </div>
        <span className="text-[10px] font-mono text-zinc-500">
          Executive High-Level View
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <Link
              key={p.step}
              href={p.href}
              className={`luxury-card rounded-xl p-4 flex flex-col justify-between group transition-all duration-300 hover:shadow-lg ${p.border} relative overflow-hidden`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono text-zinc-500">{p.step}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-zinc-400 border border-white/[0.06]">
                    {p.tag}
                  </span>
                </div>

                <div className={`w-8 h-8 rounded-lg bg-white/[0.02] border border-white/[0.08] flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform ${p.color}`}>
                  <Icon className="w-4 h-4" />
                </div>

                <h3 className="text-xs font-medium text-white group-hover:text-white transition-colors">
                  {p.title}
                </h3>
                <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
                  {p.desc}
                </p>
              </div>

              <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-500 group-hover:text-emerald-400 mt-3 pt-2 border-t border-white/[0.04] transition-colors">
                <span>Explore</span>
                <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
