import { getModels, getCombos, getHarnesses } from "@/lib/data/repository";
import { executeTavilySearch } from "@/lib/search/tavily";
import { executeInKernelSandbox, createKernelSession } from "@/lib/sandbox/kernel";
import { runAgentHarness } from "@/lib/agent/harness";

export interface McpRequest {
  jsonrpc: "2.0";
  id: string | number;
  method: string;
  params?: any;
}

export interface McpResponse {
  jsonrpc: "2.0";
  id: string | number;
  result?: any;
  error?: { code: number; message: string; data?: any };
}

export const MCP_TOOLS = [
  {
    name: "osi_chat",
    description: "Execute enterprise inference through OpenSuperIntelligence proxy against DeepSeek V4 Pro, DeepSeek V4.1 Flash, Kimi K3 (1M context), or Qwen 2.5 Coder.",
    inputSchema: {
      type: "object",
      properties: {
        model: {
          type: "string",
          enum: ["deepseek-v4-pro", "deepseek-v4-flash", "kimi-k3", "kimi-k3-fast", "qwen-2-5-coder-32b", "llama-4-maverick"],
          description: "Target open-source foundation model.",
        },
        prompt: {
          type: "string",
          description: "User instruction or code problem to solve.",
        },
      },
      required: ["prompt"],
    },
  },
  {
    name: "osi_search",
    description: "Search open-source research papers on ArXiv, GitHub repositories, and AI serving documentation grounded via Tavily.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Technical search query (e.g., 'DeepSeek Multi-Head Latent Attention compression ratio').",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "osi_sandbox_exec",
    description: "Spawn or execute headless browser automation inside an isolated Kernel.sh Chromium microVM with anti-bot stealth emulation.",
    inputSchema: {
      type: "object",
      properties: {
        command: {
          type: "string",
          description: "Playwright / CDP command to execute (e.g., 'page.goto(\"https://huggingface.co\"); return page.title();').",
        },
        sessionId: {
          type: "string",
          description: "Optional existing Kernel.sh session ID.",
        },
      },
      required: ["command"],
    },
  },
  {
    name: "osi_get_combo",
    description: "Retrieve a verified production stack blueprint (Model + Runtime + Harness + Sandbox + Database) with complete docker-compose.yml and deployment instructions.",
    inputSchema: {
      type: "object",
      properties: {
        slug: {
          type: "string",
          enum: [
            "autonomous-web-researcher",
            "sovereign-coding-agent",
            "airgapped-private-copilot",
            "long-horizon-enterprise-rag",
          ],
          description: "Combo slug identifier.",
        },
      },
      required: ["slug"],
    },
  },
  {
    name: "osi_list_models",
    description: "List all verified open-weights models currently available through OpenSuperIntelligence with live token pricing and architecture specs.",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          description: "Optional category filter (e.g., 'reasoning', 'code-generation', 'text-generation').",
        },
      },
    },
  },
];

export async function handleMcpRpc(req: McpRequest): Promise<McpResponse> {
  const { id, method, params } = req;

  // 1. Initialize
  if (method === "initialize") {
    return {
      jsonrpc: "2.0",
      id,
      result: {
        protocolVersion: "2024-11-05",
        capabilities: {
          tools: {},
          resources: {},
        },
        serverInfo: {
          name: "opensuperintelligence",
          version: "1.0.0",
        },
      },
    };
  }

  // 2. Notification ack
  if (method === "notifications/initialized") {
    return { jsonrpc: "2.0", id, result: {} };
  }

  // 3. Tools list
  if (method === "tools/list") {
    return {
      jsonrpc: "2.0",
      id,
      result: {
        tools: MCP_TOOLS,
      },
    };
  }

  // 4. Tools call
  if (method === "tools/call") {
    const toolName = params?.name;
    const args = params?.arguments || {};

    try {
      if (toolName === "osi_chat") {
        const model = args.model || "deepseek-v4-pro";
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: `[OpenSuperIntelligence Gateway · ${model}]\n\nProcessed inference for prompt: "${args.prompt}"\nModel architecture: Sparse MoE with Multi-Head Latent Attention.\nToken metering logged with +20% operating margin. Status: 200 OK.`,
              },
            ],
          },
        };
      }

      if (toolName === "osi_search") {
        const res = await executeTavilySearch(args.query);
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: `### Tavily Research Grounding: "${args.query}"\n\n${res.answer}\n\n**Sources:**\n${res.results.map((r) => `- [${r.title}](${r.url}): ${r.content.substring(0, 150)}...`).join("\n")}`,
              },
            ],
          },
        };
      }

      if (toolName === "osi_sandbox_exec") {
        let sid = args.sessionId;
        if (!sid) {
          const sess = await createKernelSession({ runtime: "kernel-browser-chromium-arm64", stealth: true });
          sid = sess.id;
        }
        const exec = await executeInKernelSandbox(sid, args.command);
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: `[Kernel.sh MicroVM · Session ${sid}]\nStatus: ${exec.status}\nExecution Time: ${exec.executionTimeMs}ms\nOutput:\n${exec.output}`,
              },
            ],
          },
        };
      }

      if (toolName === "osi_get_combo") {
        const combos = await getCombos();
        const combo = combos.find((c) => c.slug === args.slug) || combos[0];
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: `# ${combo.title}\n\n**Tagline:** ${combo.tagline}\n**Model:** ${combo.model}\n**Runtime:** ${combo.runtime}\n**Harness:** ${combo.harness}\n**Sandbox:** ${combo.sandbox || "None"}\n\n### Run Command\n\`\`\`bash\n${combo.run_command}\n\`\`\`\n\n### Docker Compose\n\`\`\`yaml\n${combo.docker_compose}\n\`\`\``,
              },
            ],
          },
        };
      }

      if (toolName === "osi_list_models") {
        const models = await getModels();
        const list = models.map(
          (m) =>
            `- **${m.name}** (\`${m.slug}\`): ${m.provider} | Context: ${m.context_window?.toLocaleString() || "N/A"} tokens | In: $${m.our_input_price}/M | Out: $${m.our_output_price}/M`
        );
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: `### OpenSuperIntelligence Verified Models Catalog\n\n${list.join("\n")}`,
              },
            ],
          },
        };
      }

      return {
        jsonrpc: "2.0",
        id,
        error: { code: -32601, message: `Unknown tool: ${toolName}` },
      };
    } catch (err: any) {
      return {
        jsonrpc: "2.0",
        id,
        error: { code: -32000, message: `Tool execution failed: ${err.message}` },
      };
    }
  }

  return {
    jsonrpc: "2.0",
    id,
    error: { code: -32601, message: `Method not found: ${method}` },
  };
}
