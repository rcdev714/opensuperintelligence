"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatNumber, formatCurrency } from "@/lib/utils";
import { UsageDailySummary, Deployment, Cluster } from "@/types/database";

interface UsageAnalyticsProps {
  dailyUsage: UsageDailySummary[];
  deployments: Deployment[];
  clusters: Cluster[];
}

export default function UsageAnalytics({ dailyUsage, deployments, clusters }: UsageAnalyticsProps) {
  const totals = useMemo(() => {
    let inputTokens = 0;
    let outputTokens = 0;
    let totalCost = 0;
    let requests = 0;

    dailyUsage.forEach((day) => {
      inputTokens += day.input_tokens;
      outputTokens += day.output_tokens;
      totalCost += day.total_cost;
      requests += day.requests;
    });

    const daysCount = dailyUsage.length || 1;
    const avgDailyCost = totalCost / daysCount;

    return {
      inputTokens,
      outputTokens,
      totalTokens: inputTokens + outputTokens,
      totalCost,
      avgDailyCost,
      requests,
    };
  }, [dailyUsage]);

  const chartData = useMemo(() => {
    const last14Days = [...dailyUsage].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(-14);
    const maxCost = Math.max(...last14Days.map((d) => d.total_cost), 1);
    return last14Days.map((d) => ({
      ...d,
      dateLabel: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      percentage: (d.total_cost / maxCost) * 100,
    }));
  }, [dailyUsage]);

  const pricingComparison = [
    {
      model: "DeepSeek V4 Pro",
      osi: "$0.70 / $2.18",
      gpt4o: "$2.50 / $10.00",
      claude: "$3.00 / $15.00",
      savings: "74%",
    },
    {
      model: "DeepSeek V4 Flash",
      osi: "$0.07 / $0.22",
      gpt4o: "$0.15 / $0.60",
      claude: "$0.25 / $1.25",
      savings: "58%",
    },
    {
      model: "Kimi K3",
      osi: "$0.60 / $1.80",
      gpt4o: "$2.50 / $10.00",
      claude: "$3.00 / $15.00",
      savings: "78%",
    },
    {
      model: "Qwen 2.5 Coder",
      osi: "$0.50 / $1.40",
      gpt4o: "$2.50 / $10.00",
      claude: "N/A",
      savings: "80%",
    },
  ];

  const apiKeys = [
    { prefix: "osi_prod_***abc12", label: "Production API", tokens: 845000000, cost: 676.00, percentage: 65 },
    { prefix: "osi_dev_***xyz99", label: "Developer Env", tokens: 234000000, cost: 187.20, percentage: 18 },
    { prefix: "osi_test_***def45", label: "CI/CD Pipeline", tokens: 156000000, cost: 124.80, percentage: 12 },
    { prefix: "osi_analytics_***789", label: "Internal Tools", tokens: 65000000, cost: 52.00, percentage: 5 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Usage & Cost Analytics</h1>
        <p className="text-muted-foreground">Monitor API consumption, tokens, and compute spend.</p>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="luxury-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#86868B]">Total Tokens (30d)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{formatNumber(totals.totalTokens)}</div>
          </CardContent>
        </Card>
        <Card className="luxury-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#86868B]">Total Spend (30d)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{formatCurrency(totals.totalCost)}</div>
          </CardContent>
        </Card>
        <Card className="luxury-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#86868B]">Avg Daily Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{formatCurrency(totals.avgDailyCost)}</div>
          </CardContent>
        </Card>
        <Card className="luxury-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#86868B]">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{formatNumber(totals.requests)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Cost Comparison */}
        <Card className="luxury-card flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">Pricing Comparison</CardTitle>
            <CardDescription>OpenSuperIntelligence vs Proprietary Equivalents (per 1M tokens, Input / Output)</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-white/[0.08] dark:border-white/[0.08] text-[#86868B]">
                    <th className="py-3 px-2 font-medium">Model</th>
                    <th className="py-3 px-2 font-medium">OSI Pricing</th>
                    <th className="py-3 px-2 font-medium">GPT Equivalent</th>
                    <th className="py-3 px-2 font-medium">Claude Equivalent</th>
                    <th className="py-3 px-2 font-medium">Savings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.08] dark:divide-white/[0.08]">
                  {pricingComparison.map((row, idx) => (
                    <tr key={idx}>
                      <td className="py-3 px-2 font-medium">{row.model}</td>
                      <td className="py-3 px-2 text-[#2997FF]">{row.osi}</td>
                      <td className="py-3 px-2 text-muted-foreground">{row.gpt4o}</td>
                      <td className="py-3 px-2 text-muted-foreground">{row.claude}</td>
                      <td className="py-3 px-2">
                        <Badge variant="outline" className="text-[#30D158] border-[#30D158]/30 bg-[#30D158]/10">
                          {row.savings}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* 30-Day Spend Chart (Last 14 days rendered) */}
        <Card className="luxury-card flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">Daily Spend</CardTitle>
            <CardDescription>Compute and token costs over the last 14 days</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-end">
            <div className="space-y-2">
              {chartData.map((day, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm" title={`Cost: ${formatCurrency(day.total_cost)}`}>
                  <div className="w-12 text-right text-muted-foreground font-mono text-xs">{day.dateLabel}</div>
                  <div className="flex-1 h-5 bg-black/[0.05] dark:bg-white/[0.05] rounded overflow-hidden">
                    <div 
                      className="h-full bg-[#2997FF] rounded"
                      style={{ width: `${day.percentage}%` }}
                    />
                  </div>
                  <div className="w-16 text-right font-mono text-xs">
                    {formatCurrency(day.total_cost)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Token Breakdown */}
        <Card className="luxury-card flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">Token Breakdown</CardTitle>
            <CardDescription>Input vs Output & By Deployment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 flex-1">
            {/* By Type */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#86868B]">By Type</h4>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Input Tokens</span>
                  <span className="font-mono text-xs">{formatNumber(totals.inputTokens)}</span>
                </div>
                <div className="h-2 w-full bg-black/[0.05] dark:bg-white/[0.05] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2997FF]" style={{ width: `${(totals.inputTokens / Math.max(totals.totalTokens, 1)) * 100}%` }} />
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span>Output Tokens</span>
                  <span className="font-mono text-xs">{formatNumber(totals.outputTokens)}</span>
                </div>
                <div className="h-2 w-full bg-black/[0.05] dark:bg-white/[0.05] rounded-full overflow-hidden">
                  <div className="h-full bg-[#BF5AF2]" style={{ width: `${(totals.outputTokens / Math.max(totals.totalTokens, 1)) * 100}%` }} />
                </div>
              </div>
            </div>

            {/* By Model */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#86868B]">By Model (Today)</h4>
              <div className="space-y-2">
                {deployments.map((dep) => (
                  <div key={dep.id} className="flex items-center justify-between text-sm py-1 border-b border-white/[0.04] last:border-0">
                    <span className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />
                      {dep.model_name}
                    </span>
                    <span className="font-mono text-xs">{formatNumber(dep.tokens_today)}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Per-API-Key Attribution */}
        <Card className="luxury-card flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">API Key Attribution</CardTitle>
            <CardDescription>Cost and usage grouped by API key</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-white/[0.08] dark:border-white/[0.08] text-[#86868B]">
                    <th className="py-2 px-2 font-medium">Key / Label</th>
                    <th className="py-2 px-2 font-medium text-right">Tokens</th>
                    <th className="py-2 px-2 font-medium text-right">Cost</th>
                    <th className="py-2 px-2 font-medium text-right">%</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.08] dark:divide-white/[0.08]">
                  {apiKeys.map((key, idx) => (
                    <tr key={idx}>
                      <td className="py-3 px-2">
                        <div className="font-mono text-xs mb-0.5">{key.prefix}</div>
                        <div className="text-xs text-muted-foreground">{key.label}</div>
                      </td>
                      <td className="py-3 px-2 text-right font-mono text-xs">{formatNumber(key.tokens)}</td>
                      <td className="py-3 px-2 text-right font-mono text-xs">{formatCurrency(key.cost)}</td>
                      <td className="py-3 px-2 text-right">
                        <span className="inline-block w-8 text-right font-mono text-xs">{key.percentage}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
