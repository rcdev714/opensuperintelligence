import { getRepoBySlug, getRepos } from "@/lib/data/repository";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { RepoViewer } from "@/components/repos/repo-viewer";

export async function generateStaticParams() {
  const repos = await getRepos();
  return repos.map((r) => ({ slug: r.slug }));
}

export default async function RepoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const repo = await getRepoBySlug(slug);

  if (!repo) {
    notFound();
  }

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-6">
      <div>
        <Link
          href="/repos"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to GitHub Repositories</span>
        </Link>
      </div>

      <RepoViewer repo={repo} />
    </div>
  );
}
