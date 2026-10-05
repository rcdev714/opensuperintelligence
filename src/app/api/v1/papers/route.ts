import { NextResponse } from "next/server";
import { getPapers } from "@/lib/data/repository";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");
  const category = searchParams.get("category");

  let papers = await getPapers();

  if (category && category !== "all") {
    papers = papers.filter((p) => p.categories.some((c) => c.toLowerCase().includes(category.toLowerCase())));
  }

  if (search) {
    const q = search.toLowerCase();
    papers = papers.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.abstract?.toLowerCase().includes(q) ||
        p.authors.some((a) => a.toLowerCase().includes(q)) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return NextResponse.json({
    object: "list",
    data: papers,
    total: papers.length,
  });
}
