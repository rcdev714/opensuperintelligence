"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Cpu, 
  Terminal, 
  Server, 
  Key, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Copy, 
  CheckCircle2, 
  Lock, 
  DollarSign, 
  Zap, 
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { LanguageToggle } from "@/components/shared/language-toggle";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"ts" | "py" | "curl">("ts");
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    ts: `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.opensuperintelligence.com/v1",
  apiKey: process.env.OSI_API_KEY || "osi_live_default",
});

const completion = await client.chat.completions.create({
  model: "deepseek-v4-pro", // or "kimi-k3", "qwen-2-5-coder"
  messages: [{ role: "user", content: "Analyze sparse MoE attention kernels." }],
});

console.log(completion.choices[0].message.content);`,
    py: `from openai import OpenAI
import os

client = OpenAI(
    base_url="https://api.opensuperintelligence.com/v1",
    api_key=os.environ.get("OSI_API_KEY", "osi_live_default"),
)

completion = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[{"role": "user", "content": "Analyze sparse MoE attention kernels."}],
)

print(completion.choices[0].message.content)`,
    curl: `curl https://api.opensuperintelligence.com/v1/chat/completions \\
  -H "Authorization: Bearer osi_live_default" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "deepseek-v4-pro",
    "messages": [
      {"role": "user", "content": "Analyze sparse MoE attention kernels."}
    ],
    "stream": true
  }'`,
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const models = [
    {
      id: "deepseek-v4-pro",
      name: "DeepSeek V4 Pro",
      provider: "DeepSeek",
      badge: "SOTA Reasoning",
      context: "131,072 tokens",
      specs: "1.6T MoE (37B active) · Multi-Head Latent Attention",
      priceIn: "$0.70 / 1M tokens",
      priceOut: "$2.18 / 1M tokens",
      color: "text-[#2997FF]",
      border: "border-blue-500/20",
      bg: "bg-blue-500/10",
    },
    {
      id: "kimi-k3",
      name: "Kimi K3 Ultra",
      provider: "Moonshot AI",
      badge: "1,000,000 Context",
      context: "1,048,576 tokens",
      specs: "2.8T MoE · Kimi Delta Attention (KDA) long-horizon",
      priceIn: "$0.60 / 1M tokens",
      priceOut: "$1.80 / 1M tokens",
      color: "text-[#30D158]",
      border: "border-emerald-500/20",
      bg: "bg-emerald-500/10",
    },
    {
      id: "qwen-2-5-coder",
      name: "Qwen 2.5 Coder 32B",
      provider: "Alibaba Cloud",
      badge: "SWE-bench 55.4%",
      context: "131,072 tokens",
      specs: "32B Dense · SOTA open weights coding & multi-file edit",
      priceIn: "$0.50 / 1M tokens",
      priceOut: "$1.40 / 1M tokens",
      color: "text-[#BF5AF2]",
      border: "border-purple-500/20",
      bg: "bg-purple-500/10",
    },
    {
      id: "deepseek-v4-flash",
      name: "DeepSeek V4.1 Flash",
      provider: "DeepSeek",
      badge: "Sub-200ms TTFT",
      context: "131,072 tokens",
      specs: "Ultra-low-latency high-throughput agentic execution",
      priceIn: "$0.07 / 1M tokens",
      priceOut: "$0.22 / 1M tokens",
      color: "text-[#FF9F0A]",
      border: "border-amber-500/20",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors selection:bg-[#0071E3] selection:text-white">
      {/* ── Apple-Grade Header ── */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-black/60 border-b border-white/[0.08] transition-colors">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Logo />

          <nav className="hidden md:flex items-center gap-6 text-xs text-[#86868B] font-medium">
            <Link href="/models" className="hover:text-foreground transition-colors">
              {t("nav.models")}
            </Link>
            <Link href="/playground" className="hover:text-foreground transition-colors">
              {t("nav.playground")}
            </Link>
            <Link href="/cloud/clusters" className="hover:text-foreground transition-colors">
              {t("nav.clusters")}
            </Link>
            <Link href="/cloud/usage" className="hover:text-foreground transition-colors">
              {t("nav.usage")}
            </Link>
          </nav>

          <div className="flex items-center gap-2.5">
            <LanguageToggle />
            <ThemeToggle />
            <Link
              href="/login"
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold text-black bg-white hover:bg-[#E8E8ED] transition-all shadow-sm"
            >
              <span>{t("nav.console")}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero: Radical Simplicity & Clear Positioning ── */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-20 text-center overflow-hidden">
        {/* Ambient spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-[#2997FF]/[0.09] blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.10] text-[11px] font-mono uppercase tracking-wider text-[#A1A1A6]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />
            <span>{t("hero.badge")}</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-semibold tracking-[-0.04em] text-foreground leading-[1.02]">
            {t("hero.title_1")}<br />
            <span className="bg-gradient-to-b from-foreground via-foreground/90 to-[#86868B] bg-clip-text text-transparent">
              {t("hero.title_2")}
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#86868B] font-normal leading-relaxed max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <Link
              href="/settings/api-keys"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-black bg-white hover:bg-[#E8E8ED] transition-all shadow-lg shadow-white/5"
            >
              <Key className="w-4 h-4" />
              <span>{t("hero.cta_keys")}</span>
            </Link>

            <Link
              href="/playground"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-foreground bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 transition-all"
            >
              <Terminal className="w-4 h-4 text-[#2997FF]" />
              <span>{t("hero.cta_playground")}</span>
            </Link>

            <Link
              href="/cloud/clusters"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-[#86868B] hover:text-foreground transition-all"
            >
              <Server className="w-4 h-4 text-[#BF5AF2]" />
              <span>{t("hero.cta_clusters")} →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Drop-In OpenAI Compatibility Card ── */}
      <section className="py-12 max-w-4xl mx-auto px-6">
        <div className="luxury-card rounded-2xl p-6 sm:p-8 backdrop-blur-2xl border border-white/[0.08] shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.06]">
            <div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#FF9F0A]" />
                <h3 className="text-sm font-semibold tracking-tight text-foreground">
                  {t("hero.drop_in_label")}
                </h3>
              </div>
              <p className="text-xs text-[#86868B] mt-1">
                {t("hero.drop_in_sub")}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="inline-flex p-1 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs font-mono">
                {(["ts", "py", "curl"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-3 py-1 rounded-lg transition-all text-xs",
                      activeTab === tab
                        ? "bg-white/[0.14] text-foreground font-semibold"
                        : "text-[#86868B] hover:text-foreground"
                    )}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>

              <button
                onClick={handleCopyCode}
                className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-[#86868B] hover:text-foreground transition-colors"
                title="Copy Code"
              >
                {copied ? <Check className="w-4 h-4 text-[#30D158]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <pre className="mt-5 p-4 rounded-xl bg-black/60 border border-white/[0.06] text-xs font-mono text-[#F4F4F6] overflow-x-auto leading-relaxed">
            <code>{codeSnippets[activeTab]}</code>
          </pre>
        </div>
      </section>

      {/* ── 3 Core Executive Convictions ── */}
      <section className="py-16 border-y border-white/[0.08] bg-[#161617]/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Conviction 1 */}
            <div className="luxury-card p-6 sm:p-7 rounded-2xl border border-white/[0.08] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#2997FF]">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground tracking-tight">
                {t("value.sovereignty.title")}
              </h3>
              <p className="text-xs text-[#86868B] leading-relaxed">
                {t("value.sovereignty.desc")}
              </p>
              <div className="flex items-center gap-1.5 pt-2 text-[11px] font-mono text-[#2997FF]">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>{t("value.sovereignty.tag")}</span>
              </div>
            </div>

            {/* Conviction 2 */}
            <div className="luxury-card p-6 sm:p-7 rounded-2xl border border-white/[0.08] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#30D158]">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground tracking-tight">
                {t("value.cost.title")}
              </h3>
              <p className="text-xs text-[#86868B] leading-relaxed">
                {t("value.cost.desc")}
              </p>
              <div className="flex items-center gap-1.5 pt-2 text-[11px] font-mono text-[#30D158]">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>{t("value.cost.tag")}</span>
              </div>
            </div>

            {/* Conviction 3 */}
            <div className="luxury-card p-6 sm:p-7 rounded-2xl border border-white/[0.08] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#BF5AF2]">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground tracking-tight">
                {t("value.dedicated.title")}
              </h3>
              <p className="text-xs text-[#86868B] leading-relaxed">
                {t("value.dedicated.desc")}
              </p>
              <div className="flex items-center gap-1.5 pt-2 text-[11px] font-mono text-[#BF5AF2]">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>{t("value.dedicated.tag")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Head-to-Head Benchmarks Table ── */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#2997FF]">
            {t("benchmarks.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            {t("benchmarks.title")}
          </h2>
          <p className="text-xs sm:text-sm text-[#86868B]">
            {t("benchmarks.subtitle")}
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/[0.08] luxury-card shadow-2xl">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02] text-[#86868B] text-[10px] uppercase">
                <th className="p-4">{t("benchmarks.col_model")}</th>
                <th className="p-4">{t("benchmarks.col_context")}</th>
                <th className="p-4">{t("benchmarks.col_swe")}</th>
                <th className="p-4 text-right">{t("benchmarks.col_input")}</th>
                <th className="p-4 text-right">{t("benchmarks.col_output")}</th>
                <th className="p-4 text-center">{t("benchmarks.col_sovereign")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {/* DeepSeek V4 Pro */}
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4 font-semibold text-[#2997FF] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2997FF]" />
                  <span>DeepSeek V4 Pro</span>
                </td>
                <td className="p-4 text-foreground">131,072</td>
                <td className="p-4 text-[#30D158] font-bold">51.2% (SOTA)</td>
                <td className="p-4 text-right text-foreground font-bold">$0.70</td>
                <td className="p-4 text-right text-foreground">$2.18</td>
                <td className="p-4 text-center">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Yes (H100)
                  </span>
                </td>
              </tr>

              {/* Kimi K3 */}
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4 font-semibold text-[#30D158] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#30D158]" />
                  <span>Kimi K3 Ultra</span>
                </td>
                <td className="p-4 text-[#30D158] font-bold">1,048,576 (1M)</td>
                <td className="p-4 text-foreground">48.7%</td>
                <td className="p-4 text-right text-foreground font-bold">$0.60</td>
                <td className="p-4 text-right text-foreground">$1.80</td>
                <td className="p-4 text-center">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Yes (H100)
                  </span>
                </td>
              </tr>

              {/* Qwen 2.5 Coder */}
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4 font-semibold text-[#BF5AF2] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#BF5AF2]" />
                  <span>Qwen 2.5 Coder 32B</span>
                </td>
                <td className="p-4 text-foreground">131,072</td>
                <td className="p-4 text-[#30D158] font-bold">55.4% (Highest)</td>
                <td className="p-4 text-right text-foreground font-bold">$0.50</td>
                <td className="p-4 text-right text-foreground">$1.40</td>
                <td className="p-4 text-center">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Yes (A100)
                  </span>
                </td>
              </tr>

              {/* Closed APIs (for comparison) */}
              <tr className="hover:bg-white/[0.02] transition-colors text-[#86868B] bg-white/[0.01]">
                <td className="p-4">OpenAI GPT-4o</td>
                <td className="p-4">128,000</td>
                <td className="p-4">38.8%</td>
                <td className="p-4 text-right text-[#FF453A]">$2.50 (+257%)</td>
                <td className="p-4 text-right text-[#FF453A]">$10.00</td>
                <td className="p-4 text-center text-[#86868B]">No (Closed)</td>
              </tr>

              <tr className="hover:bg-white/[0.02] transition-colors text-[#86868B] bg-white/[0.01]">
                <td className="p-4">Anthropic Claude 3.5 Sonnet</td>
                <td className="p-4">200,000</td>
                <td className="p-4">49.2%</td>
                <td className="p-4 text-right text-[#FF453A]">$3.00 (+328%)</td>
                <td className="p-4 text-right text-[#FF453A]">$15.00</td>
                <td className="p-4 text-center text-[#86868B]">No (Closed)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Frontier Models Catalog Grid ── */}
      <section className="py-16 border-t border-white/[0.08] bg-[#161617]/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#2997FF]">
                Production Endpoints
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mt-1">
                Verified Frontier Foundation Models
              </h2>
            </div>
            <Link
              href="/models"
              className="text-xs text-[#2997FF] hover:underline font-mono inline-flex items-center gap-1"
            >
              <span>View All Verified Models</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {models.map((m) => (
              <div
                key={m.id}
                className="luxury-card rounded-2xl p-6 border border-white/[0.08] hover:border-white/[0.16] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-[#86868B] font-mono">{m.provider}</span>
                    <span className={cn("text-[10px] font-mono px-2 py-0.5 rounded border", m.bg, m.color, m.border)}>
                      {m.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground tracking-tight">
                    {m.name}
                  </h3>
                  <p className="text-xs text-[#86868B] mt-1.5 leading-relaxed">
                    {m.specs}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="font-mono text-xs">
                    <span className="text-foreground font-semibold">{m.priceIn}</span>
                    <span className="text-[#86868B] text-[10px] block">input tokens</span>
                  </div>

                  <Link
                    href={`/playground?model=${m.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-xs font-medium text-foreground transition-all"
                  >
                    <span>Run in Playground</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom Call to Action ── */}
      <section className="py-24 text-center max-w-4xl mx-auto px-6 space-y-6">
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-foreground">
          {t("cta.title")}
        </h2>
        <p className="text-sm sm:text-base text-[#86868B] max-w-xl mx-auto">
          {t("cta.subtitle")}
        </p>
        <div className="pt-2">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-black bg-white hover:bg-[#E8E8ED] transition-all shadow-xl shadow-white/10"
          >
            <span>{t("cta.button")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Global Footer ── */}
      <footer className="border-t border-white/[0.08] py-8 text-center text-xs text-[#86868B]">
        <p>{t("cta.footer")}</p>
      </footer>
    </div>
  );
}
