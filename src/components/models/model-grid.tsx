"use client";

import { useState, useMemo } from "react";
import type { Model } from "@/types/database";
import { ModelCard } from "./model-card";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ModelGridProps {
  initialModels: Model[];
}

export function ModelGrid({ initialModels }: ModelGridProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProvider, setSelectedProvider] = useState<string>("all");

  const categories = [
    { label: "All Categories", value: "all" },
    { label: "Reasoning", value: "reasoning" },
    { label: "Text Generation", value: "text-generation" },
    { label: "Video Generation", value: "video-generation" },
    { label: "Code Generation", value: "code-generation" },
    { label: "Embeddings", value: "embedding" },
    { label: "Image Generation", value: "image-generation" },
    { label: "Audio & Speech", value: "audio" },
  ];

  const providers = useMemo(() => {
    const unique = Array.from(new Set(initialModels.map((m) => m.provider))).sort();
    return ["all", ...unique];
  }, [initialModels]);

  const filteredModels = useMemo(() => {
    return initialModels.filter((m) => {
      const matchesSearch =
        search === "" ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.description?.toLowerCase().includes(search.toLowerCase()) ||
        m.provider.toLowerCase().includes(search.toLowerCase()) ||
        m.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchesCategory =
        selectedCategory === "all" ||
        (selectedCategory === "audio"
          ? m.category.includes("audio")
          : m.category === selectedCategory);

      const matchesProvider =
        selectedProvider === "all" ||
        m.provider.toLowerCase() === selectedProvider.toLowerCase();

      return matchesSearch && matchesCategory && matchesProvider;
    });
  }, [initialModels, search, selectedCategory, selectedProvider]);

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter models by name, architecture, tag, provider..."
            className="pl-9 h-9 bg-white/[0.02] border-white/[0.08] text-xs placeholder:text-zinc-500 text-white"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="h-9 px-3 rounded-md bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-300 focus:outline-none focus:border-emerald-500/50"
          >
            {providers.map((p) => (
              <option key={p} value={p} className="bg-[#0F0F14] text-white">
                {p === "all" ? "All Providers" : p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                isActive
                  ? "bg-white/[0.1] text-white border border-white/20 font-medium"
                  : "bg-white/[0.02] text-zinc-400 hover:text-white border border-white/[0.05] hover:bg-white/[0.05]"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filteredModels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center rounded-xl border border-white/[0.06] bg-white/[0.01]">
          <p className="text-sm font-mono text-zinc-400">No models match your query criteria.</p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("all");
              setSelectedProvider("all");
            }}
            className="mt-3 text-xs font-mono text-emerald-400 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
