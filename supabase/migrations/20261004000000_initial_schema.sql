-- ═══════════════════════════════════════════════════════════
-- OPENSUPERINTELLIGENCE (OSI) CORE SCHEMA
-- ═══════════════════════════════════════════════════════════

create extension if not exists "uuid-ossp";

-- 1. Organizations & Profiles
create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  avatar_url text,
  plan text not null default 'enterprise_tier' check (plan in ('developer', 'pro', 'enterprise_tier')),
  created_at timestamptz default now()
);

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid,
  email text,
  full_name text,
  avatar_url text,
  role text default 'researcher',
  created_at timestamptz default now()
);

-- 2. Open-Source Models Registry
create table if not exists public.models (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  provider text not null,              -- 'deepseek', 'moonshot', 'alibaba', 'meta', etc.
  category text not null,              -- 'text-generation', 'reasoning', 'code-generation', 'image-generation', 'audio-speech', etc.
  license text not null default 'apache-2.0',
  description text,
  context_window int default 131072,
  parameters text,                     -- '1.6T MoE', '2.8T MoE', '32B Dense', etc.
  architecture text default 'Transformer MoE',
  input_price_per_m numeric default 3.0,     -- upstream cost / 1M tokens
  output_price_per_m numeric default 15.0,
  our_input_price numeric default 3.75,      -- our price (with margin)
  our_output_price numeric default 18.75,
  api_model_id text not null,          -- upstream ID e.g. 'deepseek-chat', 'kimi-k3'
  api_provider_key text not null,      -- 'deepseek', 'moonshot', 'custom'
  is_featured boolean default false,
  is_available boolean default true,
  tags text[] default '{}',
  metadata jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_models_category on public.models(category);
create index if not exists idx_models_provider on public.models(provider);
create index if not exists idx_models_featured on public.models(is_featured) where is_featured = true;

-- 3. Enterprise API Keys & Metering
create table if not exists public.api_keys (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  key_prefix text not null,             -- e.g. 'osi_live_8f9a'
  key_hash text not null,
  permissions text[] default '{"inference:read", "inference:write", "sandboxes:exec", "search:read"}',
  rate_limit_rpm int default 300,
  is_active boolean default true,
  last_used_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists public.usage_logs (
  id uuid primary key default gen_random_uuid(),
  api_key_id uuid references public.api_keys(id) on delete set null,
  model_slug text not null,
  endpoint text not null,
  prompt_tokens int default 0,
  completion_tokens int default 0,
  total_tokens int default 0,
  latency_ms int default 0,
  upstream_cost numeric default 0,
  billed_cost numeric default 0,
  margin_earned numeric default 0,
  status text default 'completed',
  client_ip text,
  created_at timestamptz default now()
);

create index if not exists idx_usage_created_at on public.usage_logs(created_at desc);

-- 4. Kernel.sh Agent Sandboxes
create table if not exists public.sandboxes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  runtime text default 'kernel-browser-chromium-arm64',
  kernel_session_id text,
  status text default 'active' check (status in ('idle', 'active', 'terminating', 'terminated')),
  memory_mb int default 4096,
  cpus numeric default 2,
  live_url text,
  metadata jsonb default '{}',
  created_at timestamptz default now(),
  last_active_at timestamptz default now()
);

-- 5. Open-Source AI Harnesses
create table if not exists public.harnesses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  type text not null,                  -- 'evaluation', 'inference-engine', 'agent-runtime', 'synthetic-data'
  github_url text not null,
  stars int default 0,
  license text default 'Apache-2.0',
  install_command text,
  config_sample text,
  tags text[] default '{}',
  is_featured boolean default false,
  created_at timestamptz default now()
);

-- 6. ArXiv Research Papers
create table if not exists public.papers (
  id uuid primary key default gen_random_uuid(),
  arxiv_id text unique not null,
  title text not null,
  abstract text,
  authors text[] default '{}',
  categories text[] default '{}',
  published_at timestamptz,
  pdf_url text,
  github_url text,
  citation_count int default 0,
  summary text,
  is_frontier boolean default false,
  created_at timestamptz default now()
);

-- 7. Open-Source AI Databases
create table if not exists public.databases (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  category text not null,              -- 'vector', 'analytical', 'graph', 'distributed-cache'
  github_url text not null,
  stars int default 0,
  license text default 'Apache-2.0',
  docker_pull text,
  tags text[] default '{}',
  is_featured boolean default false,
  created_at timestamptz default now()
);
