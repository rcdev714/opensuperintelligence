import { createBrowserClient } from "@supabase/ssr";

const FALLBACK_SUPABASE_URL = "https://dooeyllxueyibsaddrgd.supabase.co";
const FALLBACK_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvb2V5bGx4dWV5aWJzYWRkcmdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExNjMyMTksImV4cCI6MjEwNjczOTIxOX0.GHvuzPfBJj8X-HF6iyurhmUwOpEFzkeRLpOoURRHtfQ";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_SUPABASE_ANON_KEY;

  return createBrowserClient(url, anonKey);
}
