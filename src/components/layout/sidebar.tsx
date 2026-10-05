"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import { useLanguage } from "@/context/language-context";
import { 
  Terminal,
  Cpu, 
  Server,
  Key, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Layers,
  Film,
  GitBranch,
  Box,
  Database,
  FileText,
  Search,
  Sparkles
} from "lucide-react";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLabs, setShowLabs] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  // Core Inference Provider Navigation
  const CORE_ITEMS = [
    { name: t("nav.playground"), href: "/playground", icon: Terminal, badge: "Live" },
    { name: t("nav.models"), href: "/models", icon: Cpu },
    { name: t("nav.clusters"), href: "/cloud/clusters", icon: Server },
    { name: t("nav.apikeys"), href: "/settings/api-keys", icon: Key },
    { name: t("nav.usage"), href: "/cloud/usage", icon: BarChart3 },
  ];

  // Secondary Labs items (tucked away to avoid clutter)
  const LAB_ITEMS = [
    { name: "Agentic Stacks", href: "/combos", icon: Layers },
    { name: "Video Studio", href: "/video", icon: Film },
    { name: "MicroVM Sandboxes", href: "/sandboxes", icon: Box },
    { name: "Sovereign Repos", href: "/repos", icon: GitBranch },
    { name: "Vector Stores", href: "/databases", icon: Database },
    { name: "Research Feed", href: "/papers", icon: FileText },
  ];

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-black/40 backdrop-blur-2xl border-r border-white/[0.08] transition-all duration-300 select-none",
        isCollapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      {/* Brand Header */}
      <div className="flex h-12 items-center px-4">
        <Logo className={cn(isCollapsed && "scale-75 origin-left")} />
      </div>

      {/* Main Core Navigation */}
      <div className="flex-1 overflow-y-auto py-3 px-3 flex flex-col gap-5">
        <div>
          {!isCollapsed && (
            <h3 className="mb-1.5 px-2.5 text-[10px] font-mono uppercase tracking-[0.2em] text-[#86868B]">
              Inference Cloud
            </h3>
          )}
          <nav className="flex flex-col gap-0.5">
            {CORE_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.name : undefined}
                  className={cn(
                    "flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-[13px] font-medium transition-all",
                    isActive
                      ? "bg-white/[0.12] text-[#F5F5F7] shadow-xs"
                      : "text-[#86868B] hover:text-[#F5F5F7] hover:bg-white/[0.05]"
                  )}
                >
                  <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-[#2997FF]" : "text-[#86868B]")} />
                  {!isCollapsed && (
                    <div className="flex-1 flex items-center justify-between">
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Labs / Advanced Accordion (Simplified into the background) */}
        {!isCollapsed && (
          <div className="pt-2 border-t border-white/[0.06]">
            <button
              onClick={() => setShowLabs(!showLabs)}
              className="w-full flex items-center justify-between px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-[#86868B] hover:text-[#F5F5F7] transition-colors"
            >
              <span>{t("nav.labs")}</span>
              <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", showLabs && "rotate-180")} />
            </button>

            {showLabs && (
              <nav className="flex flex-col gap-0.5 mt-1.5 animate-in fade-in duration-150">
                {LAB_ITEMS.map((item) => {
                  const isActive = pathname?.startsWith(item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-normal transition-all",
                        isActive
                          ? "bg-white/[0.10] text-[#F5F5F7]"
                          : "text-[#86868B] hover:text-[#F5F5F7] hover:bg-white/[0.04]"
                      )}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 text-[#86868B]" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>
        )}
      </div>

      {/* Footer Area */}
      <div className="p-3 border-t border-white/[0.08]">
        <nav className="flex flex-col gap-0.5 mb-2">
          <Link
            href="/settings"
            title={isCollapsed ? t("nav.preferences") : undefined}
            className={cn(
              "flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[13px] font-medium transition-all",
              pathname?.startsWith("/settings") && !pathname?.includes("/api-keys")
                ? "bg-white/[0.12] text-[#F5F5F7]"
                : "text-[#86868B] hover:text-[#F5F5F7] hover:bg-white/[0.05]"
            )}
          >
            <Settings className="h-4 w-4 shrink-0 text-[#86868B]" />
            {!isCollapsed && <span>{t("nav.preferences")}</span>}
          </Link>
        </nav>

        {!isCollapsed && (
          <div className="mb-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />
              <span className="text-[11px] text-[#A1A1A6] truncate">{t("console.cluster_status")}</span>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex w-full items-center justify-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-[#86868B] hover:text-[#F5F5F7] hover:bg-white/[0.05] transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <>
              <ChevronLeft className="h-3.5 w-3.5" />
              <span className="flex-1 text-left text-xs text-[#86868B]">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
