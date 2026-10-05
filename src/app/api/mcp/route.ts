import { NextResponse } from "next/server";
import { handleMcpRpc, MCP_TOOLS } from "@/lib/mcp/protocol";

export async function GET() {
  // Discovery & health status
  return NextResponse.json({
    status: "ok",
    server: "OpenSuperIntelligence MCP Server by Arcane Echos Technologies SAS",
    version: "1.0.0",
    protocolVersion: "2024-11-05",
    toolsAvailable: MCP_TOOLS.map((t) => t.name),
    instructions: "Connect this endpoint to Claude Code (claude mcp add osi http://localhost:3000/api/mcp) or Cursor.",
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const response = await handleMcpRpc(body);
    return NextResponse.json(response);
  } catch (err: any) {
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id: null,
        error: { code: -32700, message: "Parse error", data: err.message },
      },
      { status: 400 }
    );
  }
}
