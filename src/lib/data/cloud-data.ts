import type { Cluster, Deployment, UsageDailySummary } from "@/types/database";

// ─── Seed Clusters ───────────────────────────────────────────────────

export const SEED_CLUSTERS: Cluster[] = [
  {
    id: "clstr_01",
    name: "prod-inference-us",
    region: "us-east-1",
    gpu_type: "NVIDIA H100 SXM",
    gpu_count: 8,
    node_count: 2,
    status: "running",
    vpc_cidr: "10.0.0.0/16",
    subnet: "10.0.1.0/24",
    endpoint: "https://prod-us.osi-cloud.internal:8443",
    gpu_utilization: 73,
    memory_utilization: 61,
    vram_used_gb: 468,
    vram_total_gb: 640,
    queue_depth: 12,
    monthly_cost: 28400,
    created_at: "2026-08-15T10:30:00Z",
  },
  {
    id: "clstr_02",
    name: "prod-inference-eu",
    region: "eu-west-1",
    gpu_type: "NVIDIA H200 SXM",
    gpu_count: 4,
    node_count: 1,
    status: "running",
    vpc_cidr: "10.1.0.0/16",
    subnet: "10.1.1.0/24",
    endpoint: "https://prod-eu.osi-cloud.internal:8443",
    gpu_utilization: 45,
    memory_utilization: 38,
    vram_used_gb: 215,
    vram_total_gb: 564,
    queue_depth: 3,
    monthly_cost: 19200,
    created_at: "2026-09-02T14:00:00Z",
  },
  {
    id: "clstr_03",
    name: "staging-dev",
    region: "us-west-2",
    gpu_type: "NVIDIA A100 80GB",
    gpu_count: 4,
    node_count: 1,
    status: "running",
    vpc_cidr: "10.2.0.0/16",
    subnet: "10.2.1.0/24",
    endpoint: "https://staging.osi-cloud.internal:8443",
    gpu_utilization: 22,
    memory_utilization: 18,
    vram_used_gb: 58,
    vram_total_gb: 320,
    queue_depth: 0,
    monthly_cost: 8600,
    created_at: "2026-09-10T09:00:00Z",
  },
  {
    id: "clstr_04",
    name: "asia-inference",
    region: "ap-southeast-1",
    gpu_type: "NVIDIA L40S",
    gpu_count: 8,
    node_count: 2,
    status: "scaling",
    vpc_cidr: "10.3.0.0/16",
    subnet: "10.3.1.0/24",
    endpoint: "https://asia.osi-cloud.internal:8443",
    gpu_utilization: 89,
    memory_utilization: 76,
    vram_used_gb: 292,
    vram_total_gb: 384,
    queue_depth: 47,
    monthly_cost: 12800,
    created_at: "2026-09-20T06:00:00Z",
  },
  {
    id: "clstr_05",
    name: "fine-tuning-cluster",
    region: "us-east-1",
    gpu_type: "NVIDIA H100 SXM",
    gpu_count: 16,
    node_count: 4,
    status: "running",
    vpc_cidr: "10.4.0.0/16",
    subnet: "10.4.1.0/24",
    endpoint: "https://finetune.osi-cloud.internal:8443",
    gpu_utilization: 94,
    memory_utilization: 88,
    vram_used_gb: 1140,
    vram_total_gb: 1280,
    queue_depth: 2,
    monthly_cost: 56800,
    created_at: "2026-07-01T12:00:00Z",
  },
  {
    id: "clstr_06",
    name: "eu-compliance",
    region: "eu-central-1",
    gpu_type: "AMD MI300X",
    gpu_count: 4,
    node_count: 1,
    status: "degraded",
    vpc_cidr: "10.5.0.0/16",
    subnet: "10.5.1.0/24",
    endpoint: "https://eu-de.osi-cloud.internal:8443",
    gpu_utilization: 31,
    memory_utilization: 27,
    vram_used_gb: 173,
    vram_total_gb: 768,
    queue_depth: 0,
    monthly_cost: 14200,
    created_at: "2026-09-28T08:00:00Z",
  },
];

// ─── Seed Deployments ────────────────────────────────────────────────

export const SEED_DEPLOYMENTS: Deployment[] = [
  {
    id: "dpl_01",
    name: "deepseek-v4-pro-prod",
    cluster_id: "clstr_01",
    model_id: "deepseek-v4-pro",
    model_name: "DeepSeek V4 Pro",
    replicas: 3,
    min_replicas: 2,
    max_replicas: 8,
    autoscale_metric: "latency",
    autoscale_target: 200,
    status: "active",
    gpu_allocation: 4,
    latency_p50: 142,
    latency_p99: 387,
    requests_per_minute: 1240,
    tokens_today: 48_700_000,
    cost_today: 34.09,
    endpoint: "https://prod-us.osi-cloud.internal:8443/v1/deepseek-v4-pro",
    created_at: "2026-08-15T11:00:00Z",
  },
  {
    id: "dpl_02",
    name: "kimi-k3-longctx",
    cluster_id: "clstr_01",
    model_id: "kimi-k3",
    model_name: "Kimi K3 (1M Context)",
    replicas: 2,
    min_replicas: 1,
    max_replicas: 4,
    autoscale_metric: "queue_depth",
    autoscale_target: 10,
    status: "active",
    gpu_allocation: 2,
    latency_p50: 310,
    latency_p99: 890,
    requests_per_minute: 320,
    tokens_today: 12_400_000,
    cost_today: 7.44,
    endpoint: "https://prod-us.osi-cloud.internal:8443/v1/kimi-k3",
    created_at: "2026-08-20T09:00:00Z",
  },
  {
    id: "dpl_03",
    name: "deepseek-v4-flash-eu",
    cluster_id: "clstr_02",
    model_id: "deepseek-v4-flash",
    model_name: "DeepSeek V4.1 Flash",
    replicas: 2,
    min_replicas: 1,
    max_replicas: 6,
    autoscale_metric: "utilization",
    autoscale_target: 75,
    status: "active",
    gpu_allocation: 2,
    latency_p50: 68,
    latency_p99: 195,
    requests_per_minute: 2100,
    tokens_today: 31_200_000,
    cost_today: 4.99,
    endpoint: "https://prod-eu.osi-cloud.internal:8443/v1/deepseek-v4-flash",
    created_at: "2026-09-02T15:00:00Z",
  },
  {
    id: "dpl_04",
    name: "qwen-coder-staging",
    cluster_id: "clstr_03",
    model_id: "qwen-2-5-coder",
    model_name: "Qwen 2.5 Coder 32B",
    replicas: 1,
    min_replicas: 0,
    max_replicas: 2,
    autoscale_metric: "latency",
    autoscale_target: 300,
    status: "idle",
    gpu_allocation: 1,
    latency_p50: 0,
    latency_p99: 0,
    requests_per_minute: 0,
    tokens_today: 0,
    cost_today: 0,
    endpoint: "https://staging.osi-cloud.internal:8443/v1/qwen-coder",
    created_at: "2026-09-10T10:00:00Z",
  },
  {
    id: "dpl_05",
    name: "deepseek-v4-pro-asia",
    cluster_id: "clstr_04",
    model_id: "deepseek-v4-pro",
    model_name: "DeepSeek V4 Pro",
    replicas: 4,
    min_replicas: 2,
    max_replicas: 8,
    autoscale_metric: "queue_depth",
    autoscale_target: 15,
    status: "scaling",
    gpu_allocation: 4,
    latency_p50: 198,
    latency_p99: 520,
    requests_per_minute: 1800,
    tokens_today: 62_300_000,
    cost_today: 43.61,
    endpoint: "https://asia.osi-cloud.internal:8443/v1/deepseek-v4-pro",
    created_at: "2026-09-20T07:00:00Z",
  },
  {
    id: "dpl_06",
    name: "llama-4-maverick-eu",
    cluster_id: "clstr_02",
    model_id: "llama-4-maverick",
    model_name: "Llama 4 Maverick",
    replicas: 1,
    min_replicas: 1,
    max_replicas: 3,
    autoscale_metric: "utilization",
    autoscale_target: 70,
    status: "active",
    gpu_allocation: 2,
    latency_p50: 185,
    latency_p99: 440,
    requests_per_minute: 450,
    tokens_today: 8_900_000,
    cost_today: 3.56,
    endpoint: "https://prod-eu.osi-cloud.internal:8443/v1/llama-4-maverick",
    created_at: "2026-09-15T12:00:00Z",
  },
  {
    id: "dpl_07",
    name: "deepseek-v4-pro-compliance",
    cluster_id: "clstr_06",
    model_id: "deepseek-v4-pro",
    model_name: "DeepSeek V4 Pro",
    replicas: 1,
    min_replicas: 1,
    max_replicas: 2,
    autoscale_metric: "latency",
    autoscale_target: 250,
    status: "active",
    gpu_allocation: 2,
    latency_p50: 220,
    latency_p99: 610,
    requests_per_minute: 180,
    tokens_today: 5_600_000,
    cost_today: 3.92,
    endpoint: "https://eu-de.osi-cloud.internal:8443/v1/deepseek-v4-pro",
    created_at: "2026-09-28T09:00:00Z",
  },
];

// ─── Seed Daily Usage Summaries (last 30 days) ──────────────────────

function generateDailyUsage(): UsageDailySummary[] {
  const summaries: UsageDailySummary[] = [];
  const now = new Date("2026-10-04");
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseRequests = isWeekend ? 8000 : 24000;
    const jitter = Math.sin(i * 0.7) * 0.3 + 1;
    const requests = Math.round(baseRequests * jitter);
    const avgTokensPerReq = 1200 + Math.round(Math.sin(i * 0.4) * 300);
    const inputTokens = Math.round(requests * avgTokensPerReq * 0.6);
    const outputTokens = Math.round(requests * avgTokensPerReq * 0.4);
    const costPerMInput = 0.70;
    const costPerMOutput = 2.18;
    const totalCost = (inputTokens / 1_000_000) * costPerMInput + (outputTokens / 1_000_000) * costPerMOutput;

    summaries.push({
      date: d.toISOString().split("T")[0],
      input_tokens: inputTokens,
      output_tokens: outputTokens,
      total_cost: Math.round(totalCost * 100) / 100,
      requests,
    });
  }
  return summaries;
}

import { createServerClient } from "@/lib/supabase/server";

export const SEED_DAILY_USAGE = generateDailyUsage();

// ─── Data Accessors ──────────────────────────────────────────────────

export async function getClusters(): Promise<Cluster[]> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase.from("clusters").select("*").order("created_at", { ascending: true });
    if (!error && data && data.length > 0) return data as Cluster[];
  } catch {
    // fallback
  }
  return SEED_CLUSTERS;
}

export async function getClusterById(id: string): Promise<Cluster | undefined> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase.from("clusters").select("*").eq("id", id).maybeSingle();
    if (!error && data) return data as Cluster;
  } catch {
    // fallback
  }
  return SEED_CLUSTERS.find((c) => c.id === id);
}

export async function getDeployments(): Promise<Deployment[]> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase.from("deployments").select("*").order("created_at", { ascending: true });
    if (!error && data && data.length > 0) return data as Deployment[];
  } catch {
    // fallback
  }
  return SEED_DEPLOYMENTS;
}

export async function getDeploymentsByCluster(clusterId: string): Promise<Deployment[]> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase.from("deployments").select("*").eq("cluster_id", clusterId);
    if (!error && data && data.length > 0) return data as Deployment[];
  } catch {
    // fallback
  }
  return SEED_DEPLOYMENTS.filter((d) => d.cluster_id === clusterId);
}

export function getDailyUsage(): UsageDailySummary[] {
  return SEED_DAILY_USAGE;
}
