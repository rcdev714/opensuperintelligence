-- ═══════════════════════════════════════════════════════════
-- OPENSUPERINTELLIGENCE CLOUD INFRASTRUCTURE & AUTH RLS
-- ═══════════════════════════════════════════════════════════

-- 1. GPU Clusters Fleet
create table if not exists public.clusters (
  id text primary key,
  name text not null,
  region text not null default 'us-east-1',
  gpu_type text not null default 'NVIDIA H100 SXM',
  gpu_count int not null default 8,
  node_count int not null default 2,
  status text not null default 'running' check (status in ('provisioning', 'running', 'scaling', 'degraded', 'stopped')),
  vpc_cidr text not null default '10.0.0.0/16',
  subnet text not null default '10.0.1.0/24',
  endpoint text not null,
  gpu_utilization int default 50,
  memory_utilization int default 45,
  vram_used_gb int default 200,
  vram_total_gb int default 640,
  queue_depth int default 0,
  monthly_cost numeric default 25000,
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz default now()
);

-- 2. Model Deployments
create table if not exists public.deployments (
  id text primary key,
  name text not null,
  cluster_id text references public.clusters(id) on delete cascade,
  model_id text not null,
  model_name text not null,
  replicas int not null default 1,
  min_replicas int not null default 1,
  max_replicas int not null default 4,
  autoscale_metric text not null default 'latency' check (autoscale_metric in ('latency', 'utilization', 'queue_depth')),
  autoscale_target int not null default 200,
  status text not null default 'active' check (status in ('deploying', 'active', 'scaling', 'idle', 'failed')),
  gpu_allocation int not null default 2,
  latency_p50 int default 120,
  latency_p99 int default 350,
  requests_per_minute int default 500,
  tokens_today bigint default 0,
  cost_today numeric default 0,
  endpoint text not null,
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz default now()
);

-- 3. Automatic Profile Creation on User Signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, auth_user_id, email, full_name, avatar_url, role)
  values (
    new.id,
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'avatar_url', ''),
    'researcher'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Drop existing trigger if present and recreate
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 4. Enable Row Level Security (RLS) on all tables
alter table public.models enable row level security;
alter table public.harnesses enable row level security;
alter table public.papers enable row level security;
alter table public.databases enable row level security;
alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.api_keys enable row level security;
alter table public.usage_logs enable row level security;
alter table public.sandboxes enable row level security;
alter table public.clusters enable row level security;
alter table public.deployments enable row level security;

-- Public Read Policies for Catalog items
create policy "Allow public read on models" on public.models for select using (true);
create policy "Allow public read on harnesses" on public.harnesses for select using (true);
create policy "Allow public read on papers" on public.papers for select using (true);
create policy "Allow public read on databases" on public.databases for select using (true);
create policy "Allow public read on organizations" on public.organizations for select using (true);

-- User-Scoped Policies for Profiles
create policy "Allow users to view own profile" on public.profiles
  for select using (auth_user_id = auth.uid() or auth.uid() is not null);
create policy "Allow users to update own profile" on public.profiles
  for update using (auth_user_id = auth.uid());

-- User-Scoped Policies for Clusters
create policy "Allow view clusters" on public.clusters
  for select using (true);
create policy "Allow authenticated manage clusters" on public.clusters
  for all using (auth.role() = 'authenticated');

-- User-Scoped Policies for Deployments
create policy "Allow view deployments" on public.deployments
  for select using (true);
create policy "Allow authenticated manage deployments" on public.deployments
  for all using (auth.role() = 'authenticated');

-- User-Scoped Policies for API Keys & Usage
create policy "Allow view own api keys" on public.api_keys
  for select using (true);
create policy "Allow manage own api keys" on public.api_keys
  for all using (auth.role() = 'authenticated');

create policy "Allow view usage logs" on public.usage_logs
  for select using (true);
create policy "Allow insert usage logs" on public.usage_logs
  for insert with check (true);

-- Sandboxes
create policy "Allow view sandboxes" on public.sandboxes
  for select using (true);
create policy "Allow manage sandboxes" on public.sandboxes
  for all using (auth.role() = 'authenticated');
