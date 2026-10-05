import { createServerClient } from "@/lib/supabase/server";
import {
  SEED_MODELS,
  SEED_HARNESSES,
  SEED_COMBOS,
  SEED_PAPERS,
  SEED_DATABASES,
  SEED_SANDBOXES,
  SEED_API_KEYS,
  SEED_USAGE_LOGS,
  SEED_REPOS,
} from "./mock-data";
import type { Model, Harness, Combo, Paper, Database, Sandbox, ApiKey, UsageLog, GitHubRepo } from "@/types/database";

// In-memory runtime state for mutations when Supabase is not connected
const runtimeState = {
  sandboxes: [...SEED_SANDBOXES],
  apiKeys: [...SEED_API_KEYS],
  usageLogs: [...SEED_USAGE_LOGS],
};

export async function getModels(): Promise<Model[]> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase.from("models").select("*").order("is_featured", { ascending: false });
    if (!error && data && data.length > 0) return data as Model[];
  } catch {
    // fallback
  }
  return SEED_MODELS;
}

export async function getModelBySlug(slug: string): Promise<Model | null> {
  const models = await getModels();
  return models.find((m) => m.slug === slug) ?? null;
}

export async function getHarnesses(): Promise<Harness[]> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase.from("harnesses").select("*").order("stars", { ascending: false });
    if (!error && data && data.length > 0) return data as Harness[];
  } catch {
    // fallback
  }
  return SEED_HARNESSES;
}

export async function getHarnessBySlug(slug: string): Promise<Harness | null> {
  const harnesses = await getHarnesses();
  return harnesses.find((h) => h.slug === slug) ?? null;
}

export async function getPapers(): Promise<Paper[]> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase.from("papers").select("*").order("citation_count", { ascending: false });
    if (!error && data && data.length > 0) return data as Paper[];
  } catch {
    // fallback
  }
  return SEED_PAPERS;
}

export async function getPaperById(idOrArxiv: string): Promise<Paper | null> {
  const papers = await getPapers();
  return papers.find((p) => p.id === idOrArxiv || p.arxiv_id === idOrArxiv) ?? null;
}

export async function getDatabases(): Promise<Database[]> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase.from("databases").select("*").order("stars", { ascending: false });
    if (!error && data && data.length > 0) return data as Database[];
  } catch {
    // fallback
  }
  return SEED_DATABASES;
}

export async function getDatabaseBySlug(slug: string): Promise<Database | null> {
  const databases = await getDatabases();
  return databases.find((d) => d.slug === slug) ?? null;
}

export async function getSandboxes(): Promise<Sandbox[]> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase.from("sandboxes").select("*").order("created_at", { ascending: false });
    if (!error && data && data.length > 0) return data as Sandbox[];
  } catch {
    // fallback
  }
  return runtimeState.sandboxes;
}

export async function createSandbox(params: { name: string; description?: string; runtime?: string }): Promise<Sandbox> {
  const newSandbox: Sandbox = {
    id: `sbx_${Date.now()}`,
    user_id: "user_enterprise_01",
    name: params.name,
    description: params.description ?? "Ephemeral agent sandbox environment.",
    kernel_session_id: `ksess_${Math.random().toString(36).substring(2, 10)}`,
    status: "running",
    config: {
      runtime: params.runtime ?? "kernel-browser-chromium-arm64",
      memoryMb: 4096,
      cpus: 2,
    },
    created_at: new Date().toISOString(),
    last_active_at: new Date().toISOString(),
  };

  try {
    const supabase = await createServerClient();
    await supabase.from("sandboxes").insert(newSandbox);
  } catch {
    // fallback
  }

  runtimeState.sandboxes.unshift(newSandbox);
  return newSandbox;
}

export async function getApiKeys(): Promise<ApiKey[]> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase.from("api_keys").select("*").order("created_at", { ascending: false });
    if (!error && data && data.length > 0) return data as ApiKey[];
  } catch {
    // fallback
  }
  return runtimeState.apiKeys;
}

export async function createApiKey(name: string): Promise<{ apiKey: ApiKey; secretKey: string }> {
  const randomSuffix = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
  const secretKey = `osi_live_${randomSuffix}`;
  const prefix = secretKey.substring(0, 14);

  const newKey: ApiKey = {
    id: `key_${Date.now()}`,
    user_id: "user_enterprise_01",
    org_id: "org_01",
    name,
    key_prefix: prefix,
    permissions: ["inference:read", "inference:write", "sandboxes:exec", "search:read"],
    rate_limit: 300,
    is_active: true,
    last_used_at: null,
    created_at: new Date().toISOString(),
  };

  try {
    const supabase = await createServerClient();
    await supabase.from("api_keys").insert({
      name: newKey.name,
      key_prefix: newKey.key_prefix,
      key_hash: secretKey,
      permissions: newKey.permissions,
      rate_limit_rpm: newKey.rate_limit,
    });
  } catch {
    // fallback
  }

  runtimeState.apiKeys.unshift(newKey);
  return { apiKey: newKey, secretKey };
}

export async function getUsageLogs(): Promise<UsageLog[]> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase.from("usage_logs").select("*").order("created_at", { ascending: false });
    if (!error && data && data.length > 0) return data as UsageLog[];
  } catch {
    // fallback
  }
  return runtimeState.usageLogs;
}

export async function recordUsage(log: Omit<UsageLog, "id" | "created_at">): Promise<void> {
  const newLog: UsageLog = {
    ...log,
    id: `log_${Date.now()}`,
    created_at: new Date().toISOString(),
  };
  runtimeState.usageLogs.unshift(newLog);

  try {
    const supabase = await createServerClient();
    await supabase.from("usage_logs").insert(newLog);
  } catch {
    // fallback
  }
}

export async function getCombos(): Promise<Combo[]> {
  return SEED_COMBOS;
}

export async function getComboBySlug(slug: string): Promise<Combo | null> {
  const combos = await getCombos();
  return combos.find((c) => c.slug === slug) ?? null;
}

export async function getRepos(): Promise<GitHubRepo[]> {
  return SEED_REPOS;
}

export async function getRepoBySlug(slug: string): Promise<GitHubRepo | null> {
  return SEED_REPOS.find((r) => r.slug === slug) ?? null;
}
