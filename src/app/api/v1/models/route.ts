import { NextResponse } from "next/server";
import { getModels } from "@/lib/data/repository";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const provider = searchParams.get("provider");
  const search = searchParams.get("search");

  let models = await getModels();

  if (category && category !== "all") {
    models = models.filter((m) => m.category.toLowerCase() === category.toLowerCase());
  }

  if (provider && provider !== "all") {
    models = models.filter((m) => m.provider.toLowerCase().includes(provider.toLowerCase()));
  }

  if (search) {
    const q = search.toLowerCase();
    models = models.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.slug.toLowerCase().includes(q) ||
        m.description?.toLowerCase().includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return NextResponse.json({
    object: "list",
    data: models,
    total: models.length,
  });
}
