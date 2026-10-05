export type ModelCategory =
  | "text-generation"
  | "code-generation"
  | "image-generation"
  | "video-generation"
  | "audio-speech"
  | "audio-transcription"
  | "embedding"
  | "vision"
  | "multimodal"
  | "reasoning";

export interface GitHubRepo {
  id: string;
  slug: string;
  name: string;
  full_name: string;
  owner: string;
  description: string;
  stars: number;
  forks: number;
  watchers: number;
  open_issues: number;
  language: string;
  license: string;
  default_branch: string;
  github_url: string;
  clone_url: string;
  readme_html: string;
  readme_markdown: string;
  tags: string[];
  topics: string[];
  category: "inference" | "video" | "multimodal-brain" | "agent-runtime" | "fine-tuning" | "vector-db";
  updated_at: string;
}

export type ModelLicense =
  | "apache-2.0"
  | "mit"
  | "llama-community"
  | "deepseek-community"
  | "qwen-research"
  | "cc-by-4.0"
  | "cc-by-nc-4.0"
  | "custom";

export interface Model {
  id: string;
  slug: string;
  name: string;
  provider: string;
  category: ModelCategory;
  license: ModelLicense;
  description: string | null;
  context_window: number | null;
  parameters: string | null;
  architecture: string | null;
  input_price_per_m: number | null;
  output_price_per_m: number | null;
  our_input_price: number | null;
  our_output_price: number | null;
  api_model_id: string;
  api_provider_key: string;
  is_featured: boolean;
  is_available: boolean;
  huggingface_url?: string | null;
  github_url?: string | null;
  weights_url?: string | null;
  tags: string[];
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Paper {
  id: string;
  arxiv_id: string | null;
  title: string;
  abstract: string | null;
  summary?: string | null;
  authors: string[];
  categories: string[];
  published_at: string | null;
  pdf_url: string | null;
  source_url: string | null;
  citation_count: number;
  tags: string[];
  is_curated: boolean;
  created_at: string;
}

export type HarnessType = "evaluation" | "benchmark" | "testing" | "deployment";
export type InfrastructureLayer = "runtime" | "harness" | "framework";

export interface Harness {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  type: HarnessType | "local-runtime" | "agent-framework" | "fine-tuning" | "observability" | "structured-output" | "gateway";
  layer?: InfrastructureLayer;
  github_url: string | null;
  documentation_url: string | null;
  install_command: string | null;
  download_url?: string | null;
  docker_command?: string | null;
  website_url?: string | null;
  tags: string[];
  stars: number;
  is_featured: boolean;
  created_at: string;
}

export interface Combo {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  model: string;
  runtime: string;
  harness: string;
  sandbox?: string;
  database?: string;
  category: "coding" | "research" | "local-private" | "enterprise-rag" | "serving-cluster" | "fine-tuning" | "multi-agent";
  difficulty: "beginner" | "intermediate" | "production-grade";
  docker_compose: string;
  run_command: string;
  architecture_notes: string[];
  stars: number;
}

export interface Sandbox {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  kernel_session_id: string | null;
  status: "idle" | "running" | "active" | "stopped" | "error";
  config: Record<string, any>;
  created_at: string;
  last_active_at: string | null;
}

export interface Database {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category: string;
  github_url: string | null;
  documentation_url: string | null;
  license: string | null;
  docker_pull?: string | null;
  download_url?: string | null;
  website_url?: string | null;
  tags: string[];
  stars: number;
  is_featured: boolean;
  created_at: string;
}

export interface ApiKey {
  id: string;
  user_id: string;
  org_id: string | null;
  name: string;
  key_prefix: string;
  permissions: string[];
  rate_limit: number;
  is_active: boolean;
  last_used_at: string | null;
  created_at: string;
}

export interface UsageLog {
  id: string;
  api_key_id: string | null;
  user_id: string | null;
  model_id: string | null;
  endpoint: string;
  input_tokens: number;
  output_tokens: number;
  latency_ms: number | null;
  upstream_cost: number | null;
  billed_cost: number | null;
  status: string;
  created_at: string;
}

export interface Profile {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  avatar_url: string | null;
  plan: "free" | "pro" | "enterprise";
  created_at: string;
}

// ─── Cloud Infrastructure ────────────────────────────────────────────

export type ClusterRegion =
  | "us-east-1"
  | "us-west-2"
  | "eu-west-1"
  | "eu-central-1"
  | "ap-southeast-1"
  | "ap-northeast-1";

export type GpuType =
  | "NVIDIA H100 SXM"
  | "NVIDIA H200 SXM"
  | "NVIDIA A100 80GB"
  | "NVIDIA L40S"
  | "AMD MI300X";

export type ClusterStatus =
  | "provisioning"
  | "running"
  | "scaling"
  | "degraded"
  | "stopped";

export interface Cluster {
  id: string;
  name: string;
  region: ClusterRegion;
  gpu_type: GpuType;
  gpu_count: number;
  node_count: number;
  status: ClusterStatus;
  vpc_cidr: string;
  subnet: string;
  endpoint: string;
  gpu_utilization: number;
  memory_utilization: number;
  vram_used_gb: number;
  vram_total_gb: number;
  queue_depth: number;
  monthly_cost: number;
  created_at: string;
}

export type DeploymentStatus =
  | "deploying"
  | "active"
  | "scaling"
  | "idle"
  | "failed";

export interface Deployment {
  id: string;
  name: string;
  cluster_id: string;
  model_id: string;
  model_name: string;
  replicas: number;
  min_replicas: number;
  max_replicas: number;
  autoscale_metric: "latency" | "utilization" | "queue_depth";
  autoscale_target: number;
  status: DeploymentStatus;
  gpu_allocation: number;
  latency_p50: number;
  latency_p99: number;
  requests_per_minute: number;
  tokens_today: number;
  cost_today: number;
  endpoint: string;
  created_at: string;
}

export interface UsageDailySummary {
  date: string;
  input_tokens: number;
  output_tokens: number;
  total_cost: number;
  requests: number;
}
