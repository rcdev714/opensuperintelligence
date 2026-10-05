"use client";

import { useState } from "react";
import { Copy, Check, Terminal, Code2, Sparkles } from "lucide-react";

export function CodeSwitch() {
  const [tab, setTab] = useState<"curl" | "typescript" | "python" | "claude">("curl");
  const [copied, setCopied] = useState(false);

  const snippets = {
    curl: `curl https://osi.arcanetechnologies.org/api/v1/chat/completions \\
  -H "Authorization: Bearer osi_live_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "deepseek-v4-pro",
    "messages": [{"role": "user", "content": "Architect an async pipeline."}],
    "temperature": 0.5
  }'`,
    typescript: `import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

const osi = createOpenAI({
  baseURL: "https://osi.arcanetechnologies.org/api/v1",
  apiKey: process.env.OSI_API_KEY,
});

const { text } = await generateText({
  model: osi("deepseek-v4-pro"),
  prompt: "Architect an async pipeline.",
});`,
    python: `from openai import OpenAI

client = OpenAI(
    base_url="https://osi.arcanetechnologies.org/api/v1",
    api_key="osi_live_YOUR_KEY"
)

response = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[{"role": "user", "content": "Architect an async pipeline."}]
)
print(response.choices[0].message.content)`,
    claude: `# Add OpenSuperIntelligence MCP to Claude Code
claude mcp add osi --transport http http://localhost:3000/api/mcp

# Or add to Cursor (.cursor/mcp.json)
{
  "mcpServers": {
    "osi": { "url": "http://localhost:3000/api/mcp" }
  }
}`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[tab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="luxury-card rounded-2xl p-6 bg-gradient-to-br from-emerald-500/[0.03] via-transparent to-transparent border-white/[0.08] space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400 font-medium">
              UNIFIED INFERENCE GATEWAY & MCP SERVER
            </span>
          </div>
          <h2 className="text-lg font-medium text-white tracking-tight">
            Drop-In Compatibility with OpenAI, Vercel AI SDK & Claude Code
          </h2>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-black/60 border border-white/[0.08] text-xs font-mono">
          <button
            onClick={() => setTab("curl")}
            className={`px-3 py-1.5 rounded-lg transition-all ${tab === "curl" ? "bg-white text-black font-medium shadow" : "text-zinc-400 hover:text-white"}`}
          >
            cURL
          </button>
          <button
            onClick={() => setTab("typescript")}
            className={`px-3 py-1.5 rounded-lg transition-all ${tab === "typescript" ? "bg-white text-black font-medium shadow" : "text-zinc-400 hover:text-white"}`}
          >
            TypeScript
          </button>
          <button
            onClick={() => setTab("python")}
            className={`px-3 py-1.5 rounded-lg transition-all ${tab === "python" ? "bg-white text-black font-medium shadow" : "text-zinc-400 hover:text-white"}`}
          >
            Python
          </button>
          <button
            onClick={() => setTab("claude")}
            className={`px-3 py-1.5 rounded-lg transition-all ${tab === "claude" ? "bg-emerald-500 text-black font-medium shadow" : "text-emerald-400 hover:text-emerald-300"}`}
          >
            MCP (Claude/Cursor)
          </button>
        </div>
      </div>

      {/* Code Editor Frame */}
      <div className="relative rounded-xl bg-black/80 border border-white/[0.08] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
            <span className="text-[11px] font-mono text-zinc-500 ml-2">
              {tab === "curl" ? "bash — cURL" : tab === "typescript" ? "inference.ts — AI SDK" : tab === "python" ? "client.py — OpenAI SDK" : "terminal — MCP Add"}
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <pre className="p-4 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed select-all max-h-56">
          <code>{snippets[tab]}</code>
        </pre>
      </div>
    </div>
  );
}
