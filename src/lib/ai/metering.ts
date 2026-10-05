import { createServiceClient } from "@/lib/supabase/server";

interface MeterUsageParams {
  apiKeyId?: string;
  userId?: string;
  modelSlug: string;
  modelId?: string;
  endpoint: string;
  inputTokens: number;
  outputTokens: number;
  latencyMs: number;
  status?: string;
}

// Pricing multiplier — our margin over upstream costs
const MARGIN_MULTIPLIER = 1.2;

// Upstream costs per 1M tokens (input / output)
const UPSTREAM_PRICING: Record<string, { input: number; output: number }> = {
  "deepseek-v4-pro": { input: 3.0, output: 15.0 },
  "deepseek-v4-flash": { input: 0.3, output: 1.5 },
  "kimi-k3": { input: 3.0, output: 15.0 },
  "kimi-k3-fast": { input: 1.0, output: 5.0 },
  "qwen-3-235b": { input: 1.5, output: 7.5 },
  "qwen-2.5-coder": { input: 0.75, output: 3.0 },
  "llama-4-maverick": { input: 0.3, output: 0.45 },
};

function calculateCost(
  modelSlug: string,
  inputTokens: number,
  outputTokens: number
) {
  const pricing = UPSTREAM_PRICING[modelSlug];
  if (!pricing) return { upstream: 0, billed: 0 };

  const upstream =
    (inputTokens / 1_000_000) * pricing.input +
    (outputTokens / 1_000_000) * pricing.output;

  return {
    upstream,
    billed: upstream * MARGIN_MULTIPLIER,
  };
}

export async function meterUsage(params: MeterUsageParams) {
  try {
    const supabase = await createServiceClient();
    const costs = calculateCost(
      params.modelSlug,
      params.inputTokens,
      params.outputTokens
    );

    await supabase.from("usage_logs").insert({
      api_key_id: params.apiKeyId || null,
      user_id: params.userId || null,
      model_id: params.modelId || null,
      endpoint: params.endpoint,
      input_tokens: params.inputTokens,
      output_tokens: params.outputTokens,
      latency_ms: params.latencyMs,
      upstream_cost: costs.upstream,
      billed_cost: costs.billed,
      status: params.status || "success",
    });
  } catch (error) {
    // Don't let metering failures break inference
    console.error("[metering] Failed to log usage:", error);
  }
}
