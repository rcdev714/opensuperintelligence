import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  const claudeCodeCli = `claude mcp add osi --transport http ${baseUrl}/api/mcp`;

  const cursorConfig = {
    mcpServers: {
      opensuperintelligence: {
        url: `${baseUrl}/api/mcp`,
        headers: {
          Authorization: "Bearer osi_live_YOUR_KEY",
        },
      },
    },
  };

  const claudeDesktopConfig = {
    mcpServers: {
      opensuperintelligence: {
        command: "npx",
        args: ["-y", "@modelcontextprotocol/server-everything"],
        env: {
          OSI_GATEWAY_URL: `${baseUrl}/api/v1`,
        },
      },
    },
  };

  return NextResponse.json({
    claudeCodeCommand: claudeCodeCli,
    cursorConfig,
    claudeDesktopConfig,
    endpoints: {
      mcp: `${baseUrl}/api/mcp`,
      openaiCompletions: `${baseUrl}/api/v1/chat/completions`,
      inference: `${baseUrl}/api/v1/inference`,
      search: `${baseUrl}/api/v1/search`,
      sandboxes: `${baseUrl}/api/v1/sandboxes`,
    },
  });
}
