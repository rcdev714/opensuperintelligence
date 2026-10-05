"use client";

import { useState, useEffect } from "react";
import { Key, Plus, Copy, Check, ShieldAlert, Trash2 } from "lucide-react";
import type { ApiKey } from "@/types/database";

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [newKeyName, setNewKeyName] = useState("");
  const [newSecretKey, setNewSecretKey] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchKeys = async () => {
    try {
      const res = await fetch("/api/v1/keys");
      if (res.ok) {
        const data = await res.json();
        setKeys(data.data || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      const res = await fetch("/api/v1/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newKeyName.trim() }),
      });
      if (res.ok) {
        const data = await res.json();
        setNewSecretKey(data.secretKey);
        setNewKeyName("");
        await fetchKeys();
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (secret: string) => {
    navigator.clipboard.writeText(secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 mb-2">
          <Key className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400">
            SECURITY & CREDENTIALS
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
          API Key Provisioning
        </h1>
        <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
          Create Bearer tokens to access the OpenSuperIntelligence high-speed inference gateway, Tavily search endpoint, and Kernel.sh sandboxes.
        </p>
      </div>

      {/* Secret Key Modal / Banner if just created */}
      {newSecretKey && (
        <div className="luxury-card rounded-xl p-6 border-emerald-500/30 bg-emerald-500/[0.04] space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-medium">
            <ShieldAlert className="w-4 h-4" />
            <span>New Secret Key Generated — Copy Now (Will Not Be Shown Again)</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-black/80 border border-white/[0.1] font-mono text-xs text-white">
            <span className="flex-1 truncate">{newSecretKey}</span>
            <button
              onClick={() => handleCopy(newSecretKey)}
              className="px-3 py-1.5 rounded bg-white text-black font-medium hover:bg-zinc-200 transition flex items-center gap-1.5 shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <p className="text-[11px] text-zinc-400 font-sans">
            Store this in your application environment variable as `OPENAI_API_KEY` or `OSI_API_KEY`.
          </p>
        </div>
      )}

      {/* Generation Form */}
      <div className="luxury-card rounded-xl p-6">
        <h2 className="text-sm font-medium text-white mb-2">Create New Secret Key</h2>
        <form onSubmit={handleGenerate} className="flex gap-3">
          <input
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            placeholder="Key Description (e.g., Production Kubernetes Cluster, Dev Evaluator)"
            className="flex-1 h-10 px-3.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50"
          />
          <button
            type="submit"
            disabled={isGenerating || !newKeyName.trim()}
            className="px-4 h-10 rounded-lg bg-white text-black font-mono text-xs font-medium hover:bg-zinc-200 disabled:opacity-40 transition shrink-0 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Generate Key</span>
          </button>
        </form>
      </div>

      {/* Keys Table */}
      <div className="luxury-card rounded-xl overflow-hidden border border-white/[0.08]">
        <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            Active Keys ({keys.length})
          </h2>
          <span className="text-[11px] font-mono text-zinc-500">
            Rate limit: 300 RPM default
          </span>
        </div>

        <div className="divide-y divide-white/[0.06] text-xs font-mono">
          {keys.map((k) => (
            <div key={k.id} className="p-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-medium text-white font-sans">{k.name}</div>
                <div className="text-zinc-500 mt-1">
                  Prefix: <span className="text-zinc-300">{k.key_prefix}...</span> · Created:{" "}
                  {new Date(k.created_at).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
