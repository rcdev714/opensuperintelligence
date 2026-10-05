import { createServerClient as createSSRClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const FALLBACK_SUPABASE_URL = "https://dooeyllxueyibsaddrgd.supabase.co";
const FALLBACK_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvb2V5bGx4dWV5aWJzYWRkcmdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExNjMyMTksImV4cCI6MjEwNjczOTIxOX0.GHvuzPfBJj8X-HF6iyurhmUwOpEFzkeRLpOoURRHtfQ";

export async function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_SUPABASE_ANON_KEY;

  try {
    const cookieStore = await cookies();

    return createSSRClient(url, anonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component — cookies are read-only
          }
        },
      },
    });
  } catch {
    // If cookies() is unavailable (e.g. during certain static generation contexts)
    return createSSRClient(url, anonKey, {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {},
      },
    });
  }
}

export async function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_SUPABASE_ANON_KEY;

  try {
    const cookieStore = await cookies();

    return createSSRClient(url, serviceKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component — cookies are read-only
          }
        },
      },
    });
  } catch {
    return createSSRClient(url, serviceKey, {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {},
      },
    });
  }
}
