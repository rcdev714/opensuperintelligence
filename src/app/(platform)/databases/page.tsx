import { getDatabases } from "@/lib/data/repository";
import { Database, Star, ExternalLink, Terminal, Layers, Globe, GitBranch } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export default async function DatabasesPage() {
  const databases = await getDatabases();

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 mb-2">
          <Database className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400">
            AI DATA INFRASTRUCTURE
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
          Vector Databases & Analytical Engines
        </h1>
        <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
          High-performance distributed vector search engines (Qdrant, Milvus, Weaviate, LanceDB), columnar telemetry stores (ClickHouse, DuckDB), and knowledge graph engines (Neo4j) for enterprise RAG and agent memory.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {databases.map((db) => (
          <div key={db.id} className="luxury-card rounded-xl p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="font-medium text-base text-white">{db.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-400 border border-white/[0.06] uppercase">
                      {db.category}
                    </span>
                    <span className="text-[11px] font-mono text-amber-400 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {formatNumber(db.stars)}
                    </span>
                    {db.license && (
                      <span className="text-[10px] font-mono text-zinc-500">
                        {db.license}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {db.website_url && (
                    <a
                      href={db.website_url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.06] text-zinc-400 hover:text-white transition"
                      title="Official Website"
                    >
                      <Globe className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {db.github_url && (
                    <a
                      href={db.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.06] text-zinc-400 hover:text-white transition"
                      title="GitHub Repository"
                    >
                      <GitBranch className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                {db.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {db.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.02] text-zinc-400 border border-white/[0.04]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Docker pull snippet */}
              {db.docker_pull && (
                <div className="p-2.5 rounded-lg bg-black/60 border border-white/[0.06] font-mono text-[11px] text-zinc-300">
                  <span className="text-zinc-500 block text-[9px] uppercase mb-0.5">Container Pull</span>
                  <span className="text-emerald-400 select-all">{db.docker_pull}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
              <a
                href={db.documentation_url || db.github_url || "#"}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono text-zinc-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] transition"
              >
                <span>Documentation</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
