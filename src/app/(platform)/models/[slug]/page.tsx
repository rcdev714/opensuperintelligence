import { getModelBySlug, getModels } from "@/lib/data/repository";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Cpu, Terminal, ExternalLink, ShieldCheck, Zap, Layers, FileCode } from "lucide-react";
import { formatNumber, formatTokenPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams() {
  const models = await getModels();
  return models.map((m) => ({ slug: m.slug }));
}

export default async function ModelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const model = await getModelBySlug(slug);

  if (!model) {
    notFound();
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/models"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Models Directory</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="luxury-card rounded-2xl p-8 border-white/[0.1]">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.1] flex items-center justify-center">
                <Cpu className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white flex items-center gap-3">
                  {model.name}
                  {model.is_featured && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      SOTA Frontier
                    </span>
                  )}
                </h1>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">
                  Provider: <span className="text-zinc-200">{model.provider}</span> · License:{" "}
                  <span className="text-zinc-200 uppercase">{model.license}</span>
                </p>
              </div>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-2xl pt-2">
              {model.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {model.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2.5 py-1 rounded bg-white/[0.03] text-zinc-400 border border-white/[0.06]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <Link
              href={`/playground?model=${model.slug}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono font-medium text-black bg-white hover:bg-zinc-200 transition"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch in Playground</span>
            </Link>
            <a
              href={model.huggingface_url || `https://huggingface.co/models?search=${encodeURIComponent(model.name)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-xs font-mono text-zinc-300 hover:text-white bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition"
            >
              <span>HuggingFace Hub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            {model.github_url && (
              <a
                href={model.github_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-xs font-mono text-zinc-400 hover:text-white bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition"
              >
                <span>GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {model.weights_url && (
              <a
                href={model.weights_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-xs font-mono text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition"
              >
                <span>Download Model Weights</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Specifications & Economics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Architectural Specs */}
        <div className="luxury-card rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-medium text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Architecture & Execution Specs</span>
          </h2>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between py-2 border-b border-white/[0.05]">
              <span className="text-zinc-500">Parameter Scale</span>
              <span className="text-zinc-200">{model.parameters || "Dynamic"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/[0.05]">
              <span className="text-zinc-500">Context Horizon</span>
              <span className="text-zinc-200">{model.context_window ? `${formatNumber(model.context_window)} tokens` : "N/A"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/[0.05]">
              <span className="text-zinc-500">Attention Mechanism</span>
              <span className="text-zinc-200">{model.architecture || "RoPE Transformer"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/[0.05]">
              <span className="text-zinc-500">Serving Runtime</span>
              <span className="text-emerald-400">vLLM / SGLang (Continuous Batching)</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-zinc-500">Precision Standard</span>
              <span className="text-zinc-200">FP8 / BF16 Native</span>
            </div>
          </div>
        </div>

        {/* Pricing & Economics */}
        <div className="luxury-card rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-medium text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Inference Pricing & Economics</span>
          </h2>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between py-2 border-b border-white/[0.05]">
              <span className="text-zinc-500">Input Cost / 1M Tokens</span>
              <span className="text-emerald-400 font-medium">
                {model.our_input_price !== null ? formatTokenPrice(model.our_input_price) : "Contact"}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/[0.05]">
              <span className="text-zinc-500">Output Cost / 1M Tokens</span>
              <span className="text-zinc-200">
                {model.our_output_price !== null ? formatTokenPrice(model.our_output_price) : "Contact"}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/[0.05]">
              <span className="text-zinc-500">Effective Operational Markup</span>
              <span className="text-zinc-400">+20% over bare compute</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/[0.05]">
              <span className="text-zinc-500">Self-Hosting Break-Even</span>
              <span className="text-zinc-300">~80M monthly tokens</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-zinc-500">SLA Availability</span>
              <span className="text-zinc-200">99.9% Enterprise Tier</span>
            </div>
          </div>
        </div>
      </div>

      {/* Code Snippet */}
      <div className="luxury-card rounded-xl p-6 space-y-3">
        <h3 className="text-sm font-medium text-white flex items-center gap-2">
          <FileCode className="w-4 h-4 text-purple-400" />
          <span>cURL API Integration</span>
        </h3>
        <pre className="p-4 rounded-lg bg-black/60 border border-white/[0.08] font-mono text-xs text-zinc-300 overflow-x-auto">
          <code>{`curl https://osi.arcanetechnologies.org/api/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer osi_live_YOUR_KEY" \\
  -d '{
    "model": "${model.slug}",
    "messages": [
      { "role": "system", "content": "You are a senior algorithmic systems engineer." },
      { "role": "user", "content": "Analyze the time complexity of distributed sparse all-to-all communications." }
    ],
    "temperature": 0.6
  }'`}</code>
        </pre>
      </div>
    </div>
  );
}
