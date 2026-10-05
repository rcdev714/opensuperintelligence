import { NextResponse } from "next/server";
import { getSandboxes, createSandbox } from "@/lib/data/repository";
import { createKernelSession, executeInKernelSandbox } from "@/lib/sandbox/kernel";

export async function GET() {
  const sandboxes = await getSandboxes();
  return NextResponse.json({
    object: "list",
    data: sandboxes,
    total: sandboxes.length,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const action = body.action || "create";

    if (action === "exec") {
      const { sessionId, command } = body;
      if (!sessionId || !command) {
        return NextResponse.json({ error: "Missing sessionId or command" }, { status: 400 });
      }
      const result = await executeInKernelSandbox(sessionId, command);
      return NextResponse.json(result);
    }

    // Default: create a new sandbox
    const kernelSession = await createKernelSession({
      runtime: body.runtime || "kernel-browser-chromium-arm64",
      stealth: body.stealth ?? true,
      memoryMb: body.memoryMb || 4096,
    });

    const sandbox = await createSandbox({
      name: body.name || `Agent Sandbox ${new Date().toLocaleTimeString()}`,
      description: body.description || "MicroVM Chromium browser session for agent autonomous navigation.",
      runtime: kernelSession.runtime,
    });

    return NextResponse.json({
      sandbox,
      kernelSession,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Sandbox operation failed", details: String(error) },
      { status: 500 }
    );
  }
}
