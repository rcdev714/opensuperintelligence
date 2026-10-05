"use client";

import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

export function LanguageToggle({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={cn(
        "inline-flex items-center p-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono select-none",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={cn(
          "px-2 py-0.5 rounded-full transition-all text-[11px]",
          language === "en"
            ? "bg-white/[0.16] text-foreground font-semibold shadow-xs"
            : "text-[#86868B] hover:text-foreground"
        )}
        title="Switch to English"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("es")}
        className={cn(
          "px-2 py-0.5 rounded-full transition-all text-[11px]",
          language === "es"
            ? "bg-white/[0.16] text-foreground font-semibold shadow-xs"
            : "text-[#86868B] hover:text-foreground"
        )}
        title="Cambiar a Español"
      >
        ES
      </button>
    </div>
  );
}
