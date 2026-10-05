import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const FALLBACK_SUPABASE_URL = "https://dooeyllxueyibsaddrgd.supabase.co";
const FALLBACK_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvb2V5bGx4dWV5aWJzYWRkcmdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExNjMyMTksImV4cCI6MjEwNjczOTIxOX0.GHvuzPfBJj8X-HF6iyurhmUwOpEFzkeRLpOoURRHtfQ";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_SUPABASE_ANON_KEY;

  const supabase = createServerClient(
    url,
    anonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // If user is already authenticated and visits /login, redirect to console
    if (user && request.nextUrl.pathname === "/login") {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/cloud";
      return NextResponse.redirect(redirectUrl);
    }
  } catch {
    // Ignore auth check error during edge/prerendering
  }

  return supabaseResponse;
}
