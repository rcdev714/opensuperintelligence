"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, BarChart3, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { UserNav } from "@/components/layout/user-nav";

export function Header() {
  const pathname = usePathname();

  // Basic breadcrumb derived from pathname
  const sectionTitle = pathname === "/" 
    ? "Console" 
    : pathname?.split("/")[1]?.charAt(0).toUpperCase() + pathname?.split("/")[1]?.slice(1) || "";

  const handleSearchClick = () => {
    // Dispatch a custom event to open the command palette
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
  };

  return (
    <header className="h-12 flex items-center justify-between px-6 bg-black/60 backdrop-blur-2xl border-b border-white/[0.08] sticky top-0 z-40 transition-colors">
      <div className="flex-1 flex items-center gap-2">
        <h1 className="text-[13px] font-semibold tracking-tight text-[#F5F5F7]">{sectionTitle}</h1>
      </div>

      <div className="flex-1 flex justify-center">
        <button
          onClick={handleSearchClick}
          className="flex items-center gap-2 px-3.5 py-1.5 w-72 bg-white/[0.04] border border-white/[0.08] rounded-full text-xs text-[#86868B] hover:bg-white/[0.08] hover:text-[#A1A1A6] transition-all"
        >
          <Search className="h-3.5 w-3.5 shrink-0" />
          <span className="flex-1 text-left truncate">Search models, repos, tools...</span>
          <kbd className="hidden sm:inline-flex h-4 items-center gap-0.5 rounded-full bg-white/[0.08] px-1.5 font-mono text-[9px] text-[#A1A1A6]">
            <span>⌘</span>K
          </kbd>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-end gap-3">
        <Link 
          href="/video" 
          className="hidden md:flex items-center gap-1.5 text-xs font-medium text-[#2997FF] hover:underline"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sundance Studio</span>
        </Link>
        <Link 
          href="/settings/usage" 
          className="flex items-center gap-1.5 text-xs text-[#86868B] hover:text-[#F5F5F7] cursor-pointer transition-colors"
        >
          <BarChart3 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Usage</span>
        </Link>
        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  );
}
