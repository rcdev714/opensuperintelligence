"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import { 
  Cpu, 
  Search, 
  FileText, 
  Terminal, 
  Box, 
  TestTube2, 
  Database, 
  Layers,
  Settings, 
  Key, 
  BarChart3, 
  ChevronLeft,
  ChevronRight,
  GitBranch,
  Film,
  Cloud,
  Server,
  Rocket,
  Activity
} from "lucide-react";

const NAV_GROUPS = [
  {
    label: "Intelligence Layer",
    items: [
      { name: "Foundation Models", href: "/models", icon: Cpu },
      { name: "GitHub Repositories", href: "/repos", icon: GitBranch },
      { name: "Sundance Video Studio", href: "/video", icon: Film },
      { name: "Research Grounding", href: "/search", icon: Search },
    ],
  },
  {
    label: "Execution & Agents",
    items: [
      { name: "Runtimes, Agents & Harnesses", href: "/harnesses", icon: TestTube2 },
      { name: "Agentic Stacks", href: "/combos", icon: Layers },
      { name: "MicroVM Sandboxes", href: "/sandboxes", icon: Box },
      { name: "Interactive Console", href: "/playground", icon: Terminal },
    ],
  },
  {
    label: "Cloud Infrastructure",
    items: [
      { name: "Cloud Overview", href: "/cloud", icon: Cloud },
      { name: "GPU Clusters", href: "/cloud/clusters", icon: Server },
      { name: "Model Deployments", href: "/cloud/deployments", icon: Rocket },
      { name: "Usage & Analytics", href: "/cloud/usage", icon: Activity },
    ],
  },
  {
    label: "Storage & Knowledge",
    items: [
      { name: "Vector & Graph Stores", href: "/databases", icon: Database },
      { name: "Research Literature", href: "/papers", icon: FileText },
    ],
  },
];

const BOTTOM_ITEMS = [
  { name: "API Keys", href: "/settings/api-keys", icon: Key },
  { name: "Usage & Ledger", href: "/settings/usage", icon: BarChart3 },
  { name: "Preferences", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-black/40 backdrop-blur-2xl border-r border-white/[0.08] transition-all duration-300 select-none",
        isCollapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      <div className="flex h-12 items-center px-4">
        <Logo className={cn(isCollapsed && "scale-75 origin-left")} />
      </div>

      <div className="flex-1 overflow-y-auto py-3 flex flex-col gap-5">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="px-3">
            {!isCollapsed && (
              <h3 className="mb-1 px-2.5 text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">
                {group.label}
              </h3>
            )}
            <nav className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={isCollapsed ? item.name : undefined}
                    className={cn(
                      "flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[13px] font-medium transition-all",
                      isActive
                        ? "bg-white/[0.12] text-[#F5F5F7]"
                        : "text-[#86868B] hover:text-[#F5F5F7] hover:bg-white/[0.05]"
                    )}
                  >
                    <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-[#2997FF]" : "text-[#86868B]")} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-white/[0.08]">
        <nav className="flex flex-col gap-0.5 mb-2">
          {BOTTOM_ITEMS.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={isCollapsed ? item.name : undefined}
                className={cn(
                  "flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[13px] font-medium transition-all",
                  isActive
                    ? "bg-white/[0.12] text-[#F5F5F7]"
                    : "text-[#86868B] hover:text-[#F5F5F7] hover:bg-white/[0.05]"
                )}
              >
                <Icon className="h-4 w-4 shrink-0 text-[#86868B]" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {!isCollapsed && (
          <div className="mb-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />
              <span className="text-[11px] text-[#A1A1A6]">Global Cluster</span>
            </div>
            <span className="text-[10px] text-[#30D158] font-medium">
              Operational
            </span>
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
              <span className="flex-1 text-left text-xs text-[#86868B]">Sidebar</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
