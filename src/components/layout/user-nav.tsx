"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { User as UserIcon, LogOut, Settings, Key, Cloud, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export function UserNav() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    // Check initial session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setIsOpen(false);
    await supabase.auth.signOut();
    router.refresh();
  };

  if (!user) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-xs font-medium text-foreground transition-all shadow-sm"
      >
        <span>Sign In</span>
      </Link>
    );
  }

  const displayName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Operator";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-7 w-7 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/[0.12] flex items-center justify-center transition-all focus:outline-none focus:ring-1 focus:ring-[#2997FF]"
        title={user.email}
      >
        <span className="text-[11px] font-semibold text-foreground">{initial}</span>
        <span className="sr-only">User menu</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#161617]/95 backdrop-blur-2xl border border-white/[0.08] shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3.5 py-2 border-b border-white/[0.06]">
            <p className="text-xs font-medium text-foreground truncate">{displayName}</p>
            <p className="text-[11px] text-[#86868B] truncate mt-0.5 font-mono">{user.email}</p>
          </div>

          <div className="py-1">
            <Link
              href="/cloud"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-[#86868B] hover:text-foreground hover:bg-white/[0.05] transition-colors"
            >
              <Cloud className="w-3.5 h-3.5 text-[#2997FF]" />
              <span>VPC Clusters</span>
            </Link>

            <Link
              href="/settings/api-keys"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-[#86868B] hover:text-foreground hover:bg-white/[0.05] transition-colors"
            >
              <Key className="w-3.5 h-3.5 text-[#BF5AF2]" />
              <span>API Keys</span>
            </Link>

            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-[#86868B] hover:text-foreground hover:bg-white/[0.05] transition-colors"
            >
              <Settings className="w-3.5 h-3.5 text-[#86868B]" />
              <span>Preferences</span>
            </Link>
          </div>

          <div className="border-t border-white/[0.06] pt-1 mt-1">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-[#FF453A] hover:bg-[#FF453A]/10 transition-colors text-left"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
