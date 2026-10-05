import Link from "next/link";
import { 
  Cpu, 
  Search, 
  Box, 
  Database, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  XCircle,
  TrendingDown,
  Sparkles,
  Film,
  GitBranch,
  BrainCircuit,
  ChevronRight,
  ExternalLink,
  Lock,
  DollarSign,
  Download,
  Terminal,
  Zap,
  Star,
  Check
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function LandingPage() {
  const appStoreModels = [
    {
      id: "deepseek-v4-pro",
      name: "DeepSeek V4 Pro",
      developer: "DeepSeek AI",
      category: "Frontier Reasoning & Coding",
      rating: "4.9",
      specs: "1.6T MoE · 131k Context",
      price: "$0.28 / 1M tokens",
      iconBg: "bg-blue-600",
      icon: Cpu,
      slug: "deepseek-v4-pro",
      badge: "SWE-bench 51.2%"
    },
    {
      id: "kimi-k3",
      name: "Kimi K3 Ultra",
      developer: "Moonshot AI",
      category: "1M Long-Horizon Context",
      rating: "5.0",
      specs: "2.8T MoE · 1,000,000 Tokens",
      price: "$1.00 / 1M tokens",
      iconBg: "bg-emerald-600",
      icon: Zap,
      slug: "kimi-k3",
      badge: "1M Needle 99.8%"
    },
    {
      id: "wan-video",
      name: "Wan 2.1 Sundance",
      developer: "Alibaba Wan Team",
      category: "1080p Cinema Video Diffusion",
      rating: "4.8",
      specs: "14B DiT · 24fps Anamorphic",
      price: "Open Weights",
      iconBg: "bg-purple-600",
      icon: Film,
      slug: "wan-2.1-video",
      badge: "Cinema Scope"
    },
    {
      id: "meta-sam2",
      name: "Meta Content Brain",
      developer: "Meta AI",
      category: "SAM 2 Video Object Memory",
      rating: "4.9",
      specs: "Real-time Spatiotemporal Grounding",
      price: "Open Weights",
      iconBg: "bg-indigo-600",
      icon: BrainCircuit,
      slug: "meta-content-brain",
      badge: "Zero-Shot RAG"
    },
    {
      id: "kernel-sandbox",
      name: "Kernel.sh MicroVM",
      developer: "Kernel Systems",
      category: "Isolated Stealth Browser VM",
      rating: "4.9",
      specs: "Sub-150ms Cold Start · Anti-bot CDP",
      price: "$0.02 / min",
      iconBg: "bg-amber-600",
      icon: Box,
      slug: "sandboxes",
      badge: "Air-Gapped"
    },
    {
      id: "vllm-engine",
      name: "vLLM Serving Engine",
      developer: "vLLM Team (UC Berkeley)",
      category: "High-Throughput GPU Runtime",
      rating: "5.0",
      specs: "PagedAttention · Continuous Batching",
      price: "Certified Upstream",
      iconBg: "bg-cyan-600",
      icon: Layers,
      slug: "harnesses",
      badge: "3.5x Throughput"
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground selection:bg-[#0071E3] selection:text-white">
      {/* Apple Subtle Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[480px] ambient-glow pointer-events-none" />

      {/* ── Apple Global Navigation Bar (48px) ── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] backdrop-blur-2xl bg-black/75">
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
          <Logo size="default" />

          <nav className="hidden md:flex items-center gap-7 text-[13px] text-[#86868B]">
            <Link href="#benchmarks" className="hover:text-white transition-colors">
              Benchmarks
            </Link>
            <Link href="#app-store" className="hover:text-white transition-colors">
              App Store
            </Link>
            <Link href="#sovereignty" className="hover:text-white transition-colors">
              Data Sovereignty
            </Link>
            <Link href="/models" className="hover:text-white transition-colors">
              Models
            </Link>
            <Link href="/video" className="hover:text-white transition-colors text-[#2997FF]">
              Sundance Video
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/models"
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold text-black bg-white hover:bg-[#E8E8ED] transition-all shadow-sm"
            >
              <span>Console</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* ── Apple Radical Simplicity Hero ── */}
      <section className="relative pt-24 pb-16 md:pt-36 md:pb-24 text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <span className="text-[12px] font-semibold text-[#86868B] tracking-wider uppercase block">
            Enterprise Open-Source Infrastructure
          </span>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-semibold tracking-[-0.035em] text-[#F5F5F7] leading-[1.03]">
            Own your data.<br />
            <span className="bg-gradient-to-b from-white via-[#F5F5F7] to-[#86868B] bg-clip-text text-transparent">
              At a fraction of the cost.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#86868B] font-normal leading-relaxed max-w-2xl mx-auto">
            Replace closed APIs from OpenAI and Anthropic with sovereign DeepSeek and Kimi clusters. Same frontier intelligence. 100% data privacy. 85% lower compute spend.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link
              href="/models"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full text-sm font-semibold text-black bg-white hover:bg-[#E8E8ED] transition-all shadow-lg shadow-white/5"
            >
              <span>Deploy Sovereign Cluster</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <Link
              href="#benchmarks"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full text-sm font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 transition-all"
            >
              <span>View Head-to-Head Benchmarks</span>
              <ChevronRight className="w-4 h-4 text-[#86868B]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── The 2 Executive Convictions Strip ── */}
      <section id="sovereignty" className="py-12 border-y border-white/[0.08] bg-[#161617]/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Conviction 1: Data Ownership */}
            <div className="p-8 rounded-[24px] bg-[#161617] border border-white/[0.08] space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#2997FF] mb-2">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-white tracking-tight">
                1. 100% Data Sovereignty
              </h3>
              <p className="text-sm text-[#86868B] leading-relaxed">
                Your enterprise weights and prompts run entirely in your private cloud or air-gapped on-premise hardware. Zero telemetry. Zero logs retained. Zero compliance risk.
              </p>
              <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-[#2997FF]">
                <Check className="w-4 h-4" />
                <span>Certified for SOC 2, HIPAA, and GDPR air-gap deployments</span>
              </div>
            </div>

            {/* Conviction 2: 85% Cost Reduction */}
            <div className="p-8 rounded-[24px] bg-[#161617] border border-white/[0.08] space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#30D158] mb-2">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-white tracking-tight">
                2. A Fraction of the Cost
              </h3>
              <p className="text-sm text-[#86868B] leading-relaxed">
                DeepSeek V4 and Kimi K3 deliver matching or superior coding and reasoning performance to GPT-4o and Claude 3.7 at up to <strong>91% lower token pricing</strong>.
              </p>
              <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-[#30D158]">
                <Check className="w-4 h-4" />
                <span>$0.28 vs $15.00 per million input tokens</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Head-to-Head Benchmarks: DeepSeek & Kimi vs OpenAI & Claude ── */}
      <section id="benchmarks" className="py-24 border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-[12px] font-semibold text-[#2997FF] tracking-wider uppercase block">
              Direct Benchmark Comparison
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#F5F5F7]">
              Open Weights vs Closed APIs
            </h2>
            <p className="text-sm sm:text-base text-[#86868B]">
              Real independent benchmark results comparing frontier open models to the leading closed proprietary APIs.
            </p>
          </div>

          {/* Apple-Style Comparison Matrix */}
          <div className="overflow-x-auto rounded-[28px] border border-white/[0.08] bg-[#161617] shadow-2xl">
            <table className="w-full text-left text-sm font-sans border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                  <th className="p-4 sm:p-5 text-[#86868B] font-medium text-xs uppercase tracking-wider">Dimension</th>
                  <th className="p-4 sm:p-5 text-[#2997FF] font-semibold text-xs uppercase tracking-wider bg-blue-500/[0.04]">
                    DeepSeek V4 Pro
                  </th>
                  <th className="p-4 sm:p-5 text-[#30D158] font-semibold text-xs uppercase tracking-wider bg-emerald-500/[0.04]">
                    Kimi K3 Ultra
                  </th>
                  <th className="p-4 sm:p-5 text-[#86868B] font-medium text-xs uppercase tracking-wider">
                    OpenAI GPT-4o
                  </th>
                  <th className="p-4 sm:p-5 text-[#86868B] font-medium text-xs uppercase tracking-wider">
                    Claude 3.7 Sonnet
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {/* Row 1: SWE-bench Verified */}
                <tr>
                  <td className="p-4 sm:p-5 text-white font-medium">
                    Software Engineering (SWE-bench)
                  </td>
                  <td className="p-4 sm:p-5 text-[#2997FF] font-semibold bg-blue-500/[0.04]">
                    51.2% (Top Tier)
                  </td>
                  <td className="p-4 sm:p-5 text-[#30D158] font-semibold bg-emerald-500/[0.04]">
                    48.9%
                  </td>
                  <td className="p-4 sm:p-5 text-[#86868B]">
                    38.8%
                  </td>
                  <td className="p-4 sm:p-5 text-[#F5F5F7]">
                    51.0%
                  </td>
                </tr>

                {/* Row 2: Math & Reasoning */}
                <tr>
                  <td className="p-4 sm:p-5 text-white font-medium">
                    Advanced Reasoning (MATH 500 / AIME)
                  </td>
                  <td className="p-4 sm:p-5 text-[#2997FF] font-semibold bg-blue-500/[0.04]">
                    96.8%
                  </td>
                  <td className="p-4 sm:p-5 text-[#30D158] font-semibold bg-emerald-500/[0.04]">
                    95.2%
                  </td>
                  <td className="p-4 sm:p-5 text-[#86868B]">
                    92.4%
                  </td>
                  <td className="p-4 sm:p-5 text-[#F5F5F7]">
                    92.4%
                  </td>
                </tr>

                {/* Row 3: Context Window */}
                <tr>
                  <td className="p-4 sm:p-5 text-white font-medium">
                    Context Window Horizon
                  </td>
                  <td className="p-4 sm:p-5 text-[#F5F5F7] bg-blue-500/[0.04]">
                    131,072 tokens
                  </td>
                  <td className="p-4 sm:p-5 text-[#30D158] font-semibold bg-emerald-500/[0.04]">
                    1,000,000 tokens (1M)
                  </td>
                  <td className="p-4 sm:p-5 text-[#86868B]">
                    128,000 tokens
                  </td>
                  <td className="p-4 sm:p-5 text-[#86868B]">
                    200,000 tokens
                  </td>
                </tr>

                {/* Row 4: Input Pricing */}
                <tr>
                  <td className="p-4 sm:p-5 text-white font-medium">
                    Input Cost / 1M Tokens
                  </td>
                  <td className="p-4 sm:p-5 text-[#2997FF] font-bold bg-blue-500/[0.04]">
                    $0.28
                  </td>
                  <td className="p-4 sm:p-5 text-[#30D158] font-bold bg-emerald-500/[0.04]">
                    $1.00
                  </td>
                  <td className="p-4 sm:p-5 text-[#FF453A] font-semibold">
                    $2.50 (9x higher)
                  </td>
                  <td className="p-4 sm:p-5 text-[#FF453A] font-semibold">
                    $3.00 (11x higher)
                  </td>
                </tr>

                {/* Row 5: Output Pricing */}
                <tr>
                  <td className="p-4 sm:p-5 text-white font-medium">
                    Output Cost / 1M Tokens
                  </td>
                  <td className="p-4 sm:p-5 text-[#2997FF] font-bold bg-blue-500/[0.04]">
                    $1.40
                  </td>
                  <td className="p-4 sm:p-5 text-[#30D158] font-bold bg-emerald-500/[0.04]">
                    $5.00
                  </td>
                  <td className="p-4 sm:p-5 text-[#FF453A] font-semibold">
                    $10.00 (7x higher)
                  </td>
                  <td className="p-4 sm:p-5 text-[#FF453A] font-semibold">
                    $15.00 (10x higher)
                  </td>
                </tr>

                {/* Row 6: Monthly Spend for 100M Tokens */}
                <tr className="bg-white/[0.03]">
                  <td className="p-4 sm:p-5 text-white font-semibold">
                    Monthly TCO (100M Tokens/mo)
                  </td>
                  <td className="p-4 sm:p-5 text-[#2997FF] font-bold text-base bg-blue-500/[0.08]">
                    $168 / mo
                  </td>
                  <td className="p-4 sm:p-5 text-[#30D158] font-bold text-base bg-emerald-500/[0.08]">
                    $300 / mo
                  </td>
                  <td className="p-4 sm:p-5 text-[#FF453A] font-semibold text-base">
                    $2,500 / mo
                  </td>
                  <td className="p-4 sm:p-5 text-[#FF453A] font-semibold text-base">
                    $3,000 / mo
                  </td>
                </tr>

                {/* Row 7: Data Sovereignty */}
                <tr>
                  <td className="p-4 sm:p-5 text-white font-medium">
                    Data Sovereignty & Privacy
                  </td>
                  <td className="p-4 sm:p-5 text-[#30D158] font-medium bg-blue-500/[0.04]">
                    100% Private VPC / Air-Gap
                  </td>
                  <td className="p-4 sm:p-5 text-[#30D158] font-medium bg-emerald-500/[0.04]">
                    100% Private VPC / Air-Gap
                  </td>
                  <td className="p-4 sm:p-5 text-[#FF453A]">
                    Shared Hyperscaler Cloud
                  </td>
                  <td className="p-4 sm:p-5 text-[#FF453A]">
                    Shared Hyperscaler Cloud
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Apple App Store Style: Curated Open Models & Services ── */}
      <section id="app-store" className="py-24 border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-[12px] font-semibold text-[#86868B] tracking-wider uppercase block mb-1">
                Open-Source App Store
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F5F5F7]">
                Featured Models & Services
              </h2>
            </div>
            <Link
              href="/models"
              className="text-sm font-semibold text-[#2997FF] hover:underline flex items-center gap-1"
            >
              <span>Browse All Models</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* App Store List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appStoreModels.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="luxury-card rounded-[22px] p-5 flex items-center justify-between gap-4 group hover:scale-[1.01] transition-all duration-300"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {/* App Icon */}
                    <div className={`w-14 h-14 rounded-[16px] ${item.iconBg} flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Metadata */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[15px] text-white tracking-tight truncate group-hover:text-[#2997FF] transition-colors">
                          {item.name}
                        </h3>
                      </div>
                      <p className="text-xs text-[#86868B] truncate mt-0.5">
                        {item.developer} · {item.category}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-[#A1A1A6] mt-1.5">
                        <span className="text-[#FF9F0A] flex items-center gap-0.5 font-medium">
                          <Star className="w-3 h-3 fill-[#FF9F0A]" />
                          {item.rating}
                        </span>
                        <span>•</span>
                        <span className="font-medium text-white">{item.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* App Store "GET / DEPLOY" Pill Button */}
                  <Link
                    href={`/models/${item.slug}`}
                    className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-semibold text-[#2997FF] bg-white/[0.08] hover:bg-white hover:text-black transition-all shrink-0 uppercase tracking-wider"
                  >
                    GET
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Executive CTA Section ── */}
      <section className="py-24 text-center">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">
            Ready to reclaim your AI budget?
          </h2>
          <p className="text-base text-[#86868B] leading-relaxed max-w-xl mx-auto">
            Talk to an infrastructure architect. We will model your exact monthly token usage and show you how much you save on sovereign DeepSeek and Kimi clusters.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/models"
              className="inline-flex items-center gap-1.5 px-6 py-3.5 rounded-full text-sm font-semibold text-black bg-white hover:bg-[#E8E8ED] transition-all shadow-lg"
            >
              <span>Launch Enterprise Console</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/video"
              className="inline-flex items-center gap-1.5 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 transition-all"
            >
              <span>Try Sundance Video Studio</span>
              <ChevronRight className="w-4 h-4 text-[#86868B]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Apple Clean Global Footer ── */}
      <footer className="py-12 border-t border-white/[0.08] text-xs text-[#86868B]">
        <div className="max-w-5xl mx-auto px-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Logo size="sm" showWordmark={true} />
              <span>·</span>
              <span>The Sovereign Open-Source AI Infrastructure</span>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <Link href="/models" className="hover:text-white transition-colors">
                Models
              </Link>
              <Link href="/video" className="hover:text-white transition-colors">
                Sundance Video
              </Link>
              <Link href="/repos" className="hover:text-white transition-colors">
                Repositories
              </Link>
              <Link href="/stacks" className="hover:text-white transition-colors">
                Agentic Stacks
              </Link>
              <Link href="/settings/api-keys" className="hover:text-white transition-colors">
                API Keys
              </Link>
              <Link href="/settings/usage" className="hover:text-white transition-colors">
                Ledger
              </Link>
            </div>
          </div>

          <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#86868B]">
            <div>
              © 2026 OpenSuperIntelligence. An <strong className="text-white font-medium">Arcane Echos Technologies SAS</strong> product. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>100% Data Sovereignty</span>
              <span>•</span>
              <span>Enterprise SLA</span>
              <span>•</span>
              <span>Air-Gapped Compliance</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
