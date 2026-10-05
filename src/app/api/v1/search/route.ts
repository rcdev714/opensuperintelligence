import { NextResponse } from "next/server";
import { executeTavilySearch } from "@/lib/search/tavily";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const query = body.query;

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Missing or invalid 'query' parameter" }, { status: 400 });
    }

    const response = await executeTavilySearch(query, {
      maxResults: body.max_results || 6,
      searchDepth: body.depth || "advanced",
      includeAnswer: body.include_answer ?? true,
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Search execution failed", details: String(error) },
      { status: 500 }
    );
  }
}
