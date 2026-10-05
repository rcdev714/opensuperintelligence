import { getUsageLogs } from "@/lib/data/repository";
import { BarChart3, Activity, Zap, TrendingUp, Layers } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export default async function UsagePage() {
  const logs = await getUsageLogs();

  const totalInputTokens = logs.reduce((acc, curr) => acc + (curr.input_tokens || 0), 0);
  const totalOutputTokens = logs.reduce((acc, curr) => acc + (curr.output_tokens || 0), 0);
  const totalBilled = logs.reduce((acc, curr) => acc + (curr.billed_cost || 0), 0);
  const totalUpstream = logs.reduce((acc, curr) => acc + (curr.upstream_cost || 0), 0);
  const grossMargin = totalBilled - totalUpstream;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400">
            METERING & UNIT ECONOMICS
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
          Usage & Revenue Telemetry
        </h1>
        <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
          Granular per-token telemetry tracking compute consumption, upstream provider costs, and platform operating margin.
        </p>
      </div>

      {/* Financial Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="luxury-card rounded-xl p-5">
          <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Total Prompt Tokens</span>
          <div className="text-2xl font-mono font-medium text-white">{formatNumber(totalInputTokens)}</div>
          <span className="text-[11px] font-mono text-zinc-500 mt-1 block">Context Ingested</span>
        </div>

        <div className="luxury-card rounded-xl p-5">
          <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Generated Output Tokens</span>
          <div className="text-2xl font-mono font-medium text-white">{formatNumber(totalOutputTokens)}</div>
          <span className="text-[11px] font-mono text-zinc-500 mt-1 block">Synthesis Emitted</span>
        </div>

        <div className="luxury-card rounded-xl p-5">
          <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Gross Billed Volume</span>
          <div className="text-2xl font-mono font-medium text-emerald-400">${totalBilled.toFixed(4)}</div>
          <span className="text-[11px] font-mono text-zinc-500 mt-1 block">Customer Invoiced</span>
        </div>

        <div className="luxury-card rounded-xl p-5">
          <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Gross Platform Margin</span>
          <div className="text-2xl font-mono font-medium text-white">${grossMargin.toFixed(4)}</div>
          <span className="text-[11px] font-mono text-emerald-400 mt-1 block">+20% Operation Margin</span>
        </div>
      </div>

      {/* Usage Logs Table */}
      <div className="luxury-card rounded-xl overflow-hidden border border-white/[0.08]">
        <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            Real-Time Request Telemetry ({logs.length})
          </h2>
          <span className="text-[11px] font-mono text-emerald-400">Live Metered Feed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-white/[0.02] border-b border-white/[0.06] text-zinc-500 text-[10px] uppercase">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Endpoint</th>
                <th className="py-3 px-4">Model</th>
                <th className="py-3 px-4 text-right">Tokens (In / Out)</th>
                <th className="py-3 px-4 text-right">Latency</th>
                <th className="py-3 px-4 text-right">Billed Cost</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 text-zinc-400 text-[11px]">
                    {new Date(log.created_at).toLocaleTimeString()}
                  </td>
                  <td className="py-3 px-4 text-zinc-300">{log.endpoint}</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">{log.model_id || "default"}</td>
                  <td className="py-3 px-4 text-right text-zinc-300">
                    {log.input_tokens.toLocaleString()} / {log.output_tokens.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-zinc-400">{log.latency_ms}ms</td>
                  <td className="py-3 px-4 text-right text-white font-medium">
                    ${(log.billed_cost || 0).toFixed(4)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
