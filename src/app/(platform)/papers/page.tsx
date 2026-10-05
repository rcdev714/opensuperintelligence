import { getPapers } from "@/lib/data/repository";
import { FileText, Download, ExternalLink, Bookmark, Sparkles, BookOpen } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export default async function PapersPage() {
  const papers = await getPapers();

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400">
            FRONTIER ML LITERATURE
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
          ArXiv Research Feed & Architecture Preprints
        </h1>
        <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
          Curated primary literature on sparse mixture-of-experts, latent attention compression, synthetic reinforcement learning, and GPU kernel optimizations.
        </p>
      </div>

      {/* Papers Feed */}
      <div className="space-y-4">
        {papers.map((paper) => (
          <div
            key={paper.id}
            className="luxury-card rounded-xl p-6 hover:border-white/20 transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    arXiv:{paper.arxiv_id}
                  </span>
                  {paper.is_curated && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      Editor Pick
                    </span>
                  )}
                  {paper.categories.map((c) => (
                    <span key={c} className="text-[10px] font-mono text-zinc-500">
                      #{c}
                    </span>
                  ))}
                </div>

                <h2 className="text-base font-medium text-white tracking-tight leading-snug">
                  {paper.title}
                </h2>

                <p className="text-xs font-mono text-zinc-400">
                  By {paper.authors.join(", ")}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-mono text-zinc-500">
                  {formatNumber(paper.citation_count)} citations
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans pt-1">
              {paper.summary || paper.abstract}
            </p>

            <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06] text-xs font-mono">
              <a
                href={paper.pdf_url || "#"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white text-black font-medium hover:bg-zinc-200 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF Fulltext</span>
              </a>
              <a
                href={paper.source_url || `https://arxiv.org/abs/${paper.arxiv_id}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-zinc-300 hover:text-white transition"
              >
                <span>arXiv Abstract</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
