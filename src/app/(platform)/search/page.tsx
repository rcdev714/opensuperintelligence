"use client";

import { useState } from "react";
import { Search, Sparkles, ExternalLink, ArrowRight, BookOpen, GitBranch, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { SearchResponse, SearchResultItem } from "@/lib/search/tavily";

const PRESET_QUERIES = [
  "DeepSeek V3 and V4 Multi-Head Latent Attention architecture",
  "vLLM chunked prefill and PagedAttention configuration",
  "Kernel.sh browser sandboxes stealth anti-bot mitigation",
  "Kimi K3 linear delta attention 1M context horizon",
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SearchResponse | null>(null);

  const handleSearch = async (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const q = customQuery || query;
    if (!q.trim()) return;

    if (customQuery) setQuery(customQuery);
    setIsLoading(true);

    try {
      const res = await fetch("/api/v1/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
      if (res.ok) {
        const data = await res.json();
        setResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400">
            TAVILY RESEARCH ENGINE
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
          Frontier AI Research & Infrastructure Search
        </h1>
        <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
          Search authoritative open-source repositories, ArXiv preprints, and serving documentation grounded via Tavily AI.
        </p>
      </div>

      {/* Search Input */}
      <form onSubmit={(e) => handleSearch(e)} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-4 h-4 text-zinc-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search papers, architectures, kernel configs, benchmarks..."
            className="w-full h-12 pl-11 pr-24 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 transition"
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute right-2 px-4 py-2 rounded-lg bg-white text-black font-mono text-xs font-medium hover:bg-zinc-200 disabled:opacity-40 transition"
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Quick query chips */}
        <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
          <span className="text-zinc-500 text-[11px] font-mono">Suggested:</span>
          {PRESET_QUERIES.map((pq) => (
            <button
              key={pq}
              type="button"
              onClick={() => handleSearch(undefined, pq)}
              className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.05] transition"
            >
              {pq}
            </button>
          ))}
        </div>
      </form>

      {/* Results View */}
      {result && (
        <div className="space-y-6 pt-4 animate-in fade-in duration-300">
          {/* AI Synthesis Answer Box */}
          {result.answer && (
            <div className="luxury-card rounded-xl p-6 border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.03] to-transparent">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
                <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-medium">
                  Authoritative Synthesis ({result.responseTimeMs}ms)
                </h3>
              </div>
              <p className="text-sm text-zinc-200 leading-relaxed font-sans">
                {result.answer}
              </p>
            </div>
          )}

          {/* Source Citations */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500">
              Verified Sources & Citations ({result.results.length})
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {result.results.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="luxury-card rounded-xl p-5 hover:border-white/20 transition group block"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        {item.sourceType === "arxiv" ? (
                          <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                        ) : item.sourceType === "github" ? (
                          <GitBranch className="w-3.5 h-3.5 text-purple-400" />
                        ) : (
                          <Globe className="w-3.5 h-3.5 text-zinc-400" />
                        )}
                        <h4 className="text-sm font-medium text-white group-hover:text-emerald-300 transition-colors">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {item.content}
                      </p>
                      <span className="text-[10px] font-mono text-zinc-500 truncate block">
                        {item.url}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-400 border border-white/[0.06]">
                        {Math.round(item.score * 100)}% match
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!result && !isLoading && (
        <div className="py-20 text-center rounded-2xl border border-white/[0.06] bg-white/[0.01]">
          <Sparkles className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-sm font-medium text-zinc-300">Enterprise AI Search Grounding</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-1 font-sans">
            Enter any technical query to search research papers, GitHub repos, and serving documentation via Tavily.
          </p>
        </div>
      )}
    </div>
  );
}
