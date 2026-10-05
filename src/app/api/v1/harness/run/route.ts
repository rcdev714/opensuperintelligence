import { NextResponse } from "next/server";
import { runAgentHarness } from "@/lib/agent/harness";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const goal = body.goal || body.prompt;

    if (!goal || typeof goal !== "string") {
      return NextResponse.json({ error: "Missing or invalid 'goal' parameter" }, { status: 400 });
    }

    const result = await runAgentHarness({
      goal,
      modelSlug: body.model || "deepseek-v4-pro",
      apiKeyId: body.apiKeyId,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Agent harness execution failed", details: String(error) },
      { status: 500 }
    );
  }
}
