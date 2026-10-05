---
name: osi-superintelligence
description: Connects Claude Code or Cursor to the OpenSuperIntelligence sovereign AI inference gateway and MCP server. Enables direct model routing (DeepSeek V4 Pro, Flash, Kimi K3, Qwen 2.5 Coder), ArXiv research search via Tavily, Kernel.sh browser sandboxing, and production-grade enterprise combos.
---

# OpenSuperIntelligence (OSI) — Agent Skill

This skill equips coding assistants (Claude Code, Cursor, Windsurf, Codex) with the OpenSuperIntelligence sovereign infrastructure gateway.

## 1. Quick MCP Server Connection

To connect Claude Code to your local OpenSuperIntelligence instance:

```bash
claude mcp add osi --transport http http://localhost:3000/api/mcp
```

Or for Cursor, add to your `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "osi": {
      "url": "http://localhost:3000/api/mcp",
      "headers": {
        "Authorization": "Bearer osi_live_YOUR_KEY"
      }
    }
  }
}
```

## 2. Core Available MCP Tools

| Tool | Purpose | Usage Example |
| :--- | :--- | :--- |
| `osi_chat` | Run inference via DeepSeek V4 Pro/Flash, Kimi K3 (1M context), or Qwen 2.5 Coder. | `{"prompt": "Analyze FP8 attention kernels", "model": "deepseek-v4-pro"}` |
| `osi_search` | Search ArXiv preprints, GitHub repos, and serving documentation grounded via Tavily. | `{"query": "DeepSeek Multi-Head Latent Attention compression"}` |
| `osi_sandbox_exec` | Execute Playwright/CDP automation inside Kernel.sh isolated Chromium microVMs. | `{"command": "page.goto('https://huggingface.co'); return page.title();"}` |
| `osi_get_combo` | Retrieve complete `docker-compose.yml` and blueprint for a production stack. | `{"slug": "autonomous-web-researcher"}` |
| `osi_list_models` | Inspect real-time token pricing, context horizons, and active foundation models. | `{}` |

## 3. Direct OpenAI SDK / cURL Compatibility

You can also use OpenSuperIntelligence as a drop-in inference provider with standard OpenAI SDKs:

```typescript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "http://localhost:3000/api/v1",
  apiKey: process.env.OSI_API_KEY || "osi_live_default",
});

const completion = await client.chat.completions.create({
  model: "deepseek-v4-pro", // or "kimi-k3", "deepseek-v4-flash", "qwen-2-5-coder-32b"
  messages: [{ role: "user", content: "Explain Kimi Delta Attention." }],
});

console.log(completion.choices[0].message.content);
```

## 4. Production Combos

* **Autonomous Web & ArXiv Researcher**: `DeepSeek V4.1 Flash` + `Hermes Agent` + `Kernel.sh Browser` + `Tavily`
* **Sovereign Enterprise Code Intelligence**: `Qwen 2.5 Coder 32B` + `vLLM` + `Aider` + `Docker`
* **Airgapped Local Copilot**: `Nous Hermes 3 70B` + `Ollama` + `Open-WebUI` + `DuckDB`
* **Long-Horizon Regulatory RAG**: `Kimi K3 (1M Context)` + `DSPy` + `Qdrant` + `ClickHouse`
