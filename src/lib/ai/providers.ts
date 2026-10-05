import { createOpenAI } from "@ai-sdk/openai";

// ── Direct Provider Gateways (No OpenRouter) ─────────────────────────

// 1. DeepSeek Official Gateway
export const deepseekGateway = createOpenAI({
  name: "deepseek",
  baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY || "",
});

// 2. Moonshot AI (Kimi) Official Gateway
export const moonshotGateway = createOpenAI({
  name: "moonshot",
  baseURL: process.env.MOONSHOT_BASE_URL || "https://api.moonshot.cn/v1",
  apiKey: process.env.MOONSHOT_API_KEY || "",
});

// 3. Enterprise Open-Source Infrastructure (vLLM / SGLang / Self-hosted Clusters)
export const ossClusterGateway = createOpenAI({
  name: "oss-cluster",
  baseURL: process.env.OSS_INFERENCE_BASE_URL || "http://127.0.0.1:8000/v1",
  apiKey: process.env.OSS_INFERENCE_API_KEY || "empty",
});

export interface ModelConfig {
  slug: string;
  name: string;
  provider: "deepseek" | "moonshot" | "oss-cluster";
  upstreamModelId: string;
  hasActiveKey: () => boolean;
  getSdkModel: () => ReturnType<typeof deepseekGateway>;
  pricing: {
    upstreamInputPerM: number;
    upstreamOutputPerM: number;
    ourInputPerM: number;
    ourOutputPerM: number;
  };
}

export const SUPPORTED_MODELS: Record<string, ModelConfig> = {
  "deepseek-v4-pro": {
    slug: "deepseek-v4-pro",
    name: "DeepSeek V4 Pro",
    provider: "deepseek",
    upstreamModelId: "deepseek-chat",
    hasActiveKey: () => Boolean(process.env.DEEPSEEK_API_KEY),
    getSdkModel: () => deepseekGateway("deepseek-chat"),
    pricing: {
      upstreamInputPerM: 3.00,
      upstreamOutputPerM: 15.00,
      ourInputPerM: 3.60,
      ourOutputPerM: 18.00,
    },
  },
  "deepseek-v4-flash": {
    slug: "deepseek-v4-flash",
    name: "DeepSeek V4.1 Flash",
    provider: "deepseek",
    upstreamModelId: "deepseek-reasoner",
    hasActiveKey: () => Boolean(process.env.DEEPSEEK_API_KEY),
    getSdkModel: () => deepseekGateway("deepseek-reasoner"),
    pricing: {
      upstreamInputPerM: 0.28,
      upstreamOutputPerM: 1.40,
      ourInputPerM: 0.35,
      ourOutputPerM: 1.75,
    },
  },
  "kimi-k3": {
    slug: "kimi-k3",
    name: "Kimi K3 (Moonshot)",
    provider: "moonshot",
    upstreamModelId: "kimi-k3",
    hasActiveKey: () => Boolean(process.env.MOONSHOT_API_KEY),
    getSdkModel: () => moonshotGateway("kimi-k3"),
    pricing: {
      upstreamInputPerM: 3.00,
      upstreamOutputPerM: 15.00,
      ourInputPerM: 3.75,
      ourOutputPerM: 18.75,
    },
  },
  "kimi-k3-fast": {
    slug: "kimi-k3-fast",
    name: "Kimi K3 Fast",
    provider: "moonshot",
    upstreamModelId: "kimi-k3-fast",
    hasActiveKey: () => Boolean(process.env.MOONSHOT_API_KEY),
    getSdkModel: () => moonshotGateway("kimi-k3-fast"),
    pricing: {
      upstreamInputPerM: 1.00,
      upstreamOutputPerM: 5.00,
      ourInputPerM: 1.25,
      ourOutputPerM: 6.25,
    },
  },
  "qwen-2-5-coder-32b": {
    slug: "qwen-2-5-coder-32b",
    name: "Qwen 2.5 Coder 32B",
    provider: "oss-cluster",
    upstreamModelId: "qwen2.5-coder-32b-instruct",
    hasActiveKey: () => Boolean(process.env.OSS_INFERENCE_API_KEY || process.env.OSS_INFERENCE_BASE_URL),
    getSdkModel: () => ossClusterGateway("qwen2.5-coder-32b-instruct"),
    pricing: {
      upstreamInputPerM: 0.80,
      upstreamOutputPerM: 3.20,
      ourInputPerM: 1.00,
      ourOutputPerM: 4.00,
    },
  },
  "llama-4-maverick": {
    slug: "llama-4-maverick",
    name: "Llama 4 Maverick",
    provider: "oss-cluster",
    upstreamModelId: "llama-4-maverick",
    hasActiveKey: () => Boolean(process.env.OSS_INFERENCE_API_KEY || process.env.OSS_INFERENCE_BASE_URL),
    getSdkModel: () => ossClusterGateway("llama-4-maverick"),
    pricing: {
      upstreamInputPerM: 0.30,
      upstreamOutputPerM: 0.45,
      ourInputPerM: 0.38,
      ourOutputPerM: 0.58,
    },
  },
};

export function getModelConfig(slug: string): ModelConfig {
  const model = SUPPORTED_MODELS[slug] || SUPPORTED_MODELS["deepseek-v4-pro"];
  return model;
}

export function getAllModelConfigs(): ModelConfig[] {
  return Object.values(SUPPORTED_MODELS);
}
