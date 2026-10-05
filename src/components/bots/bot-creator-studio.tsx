"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Bot, 
  Sparkles, 
  Terminal, 
  ShieldCheck, 
  Box, 
  Search, 
  Database, 
  Code2, 
  Briefcase, 
  Film, 
  Scale, 
  Play, 
  Copy, 
  Check, 
  ChevronRight, 
  Zap, 
  RefreshCw, 
  Layers, 
  Globe, 
  Send, 
  MessageSquare,
  Lock,
  Cpu,
  User,
  ArrowRight
} from "lucide-react";

interface QuickTemplate {
  name: string;
  role: string;
  description: string;
  iconBg: string;
  accentColor: string;
  model: string;
  runtime: string;
  tools: {
    microvm: boolean;
    browser: boolean;
    search: boolean;
    memory: boolean;
  };
  prompt: string;
}

const TEMPLATES: Record<string, QuickTemplate> = {
  grokbot: {
    name: "GrokBot",
    role: "Autonomous Reasoning & Algorithmic Specialist",
    description: "Razor-sharp, witty, deeply technical pair assistant with zero fluff. Solves algorithmic bottlenecks and writes robust system code.",
    iconBg: "bg-blue-600",
    accentColor: "text-[#2997FF]",
    model: "deepseek-v4-pro",
    runtime: "vllm",
    tools: { microvm: true, browser: false, search: true, memory: true },
    prompt: "You are GrokBot, a sovereign, razor-sharp autonomous engineer. You speak directly with zero corporate filler. When presented with code or architecture problems, analyze root causes immediately and produce production-grade diffs.",
  },
  sdrhunter: {
    name: "SDR-Hunter",
    role: "Enterprise Lead Researcher & Outbound Strategist",
    description: "Analyzes financial transcripts, SEC 10-Ks, and tech stacks to qualify enterprise buyers and craft high-conversion outreach.",
    iconBg: "bg-emerald-600",
    accentColor: "text-[#30D158]",
    model: "kimi-k3",
    runtime: "sglang",
    tools: { microvm: false, browser: true, search: true, memory: true },
    prompt: "You are SDR-Hunter, an elite enterprise sales intelligence bot. You analyze target companies, extract cloud spend pain points, and craft personalized C-level outreach that highlights verifiable ROI.",
  },
  codesentinel: {
    name: "CodeSentinel",
    role: "24/7 Autonomous Bug Fixer & PR Reviewer",
    description: "Listens to GitHub webhook events, spins up isolated microVM test runners, identifies regressions, and commits verified patches.",
    iconBg: "bg-purple-600",
    accentColor: "text-[#BF5AF2]",
    model: "deepseek-v4-pro",
    runtime: "vllm",
    tools: { microvm: true, browser: false, search: false, memory: true },
    prompt: "You are CodeSentinel, a continuous autonomous code review bot. You execute test suites in isolated microVMs, detect race conditions and memory leaks, and generate clean git commits with 100% test passing guarantees.",
  },
  cinemadirector: {
    name: "CinemaDirector",
    role: "1080p Video Prompt Engineer & VFX Supervisor",
    description: "Directs photorealistic generative video with Wan 2.1 14B diffusion, camera motion kinematics, and SAM 2 temporal tracking.",
    iconBg: "bg-amber-600",
    accentColor: "text-[#FF9F0A]",
    model: "wan-2.1-video",
    runtime: "vllm-omni",
    tools: { microvm: false, browser: false, search: false, memory: true },
    prompt: "You are CinemaDirector, an expert visual effects director. You translate natural creative ideas into precise 24fps prompt pacing, anamorphic camera trajectories, and volumetric lighting directives for Wan 2.1.",
  },
};

export function BotCreatorStudio() {
  const [botName, setBotName] = useState<string>("GrokBot");
  const [botRole, setBotRole] = useState<string>("Autonomous Reasoning & Code Specialist");
  const [botDesc, setBotDesc] = useState<string>(
    "Razor-sharp, witty, deeply technical pair assistant with zero fluff. Solves algorithmic bottlenecks and writes robust system code."
  );
  const [accentColor, setAccentColor] = useState<string>("bg-blue-600");
  const [selectedModel, setSelectedModel] = useState<string>("deepseek-v4-pro");
  const [selectedRuntime, setSelectedRuntime] = useState<string>("vllm");
  const [toolMicroVM, setToolMicroVM] = useState<boolean>(true);
  const [toolBrowser, setToolBrowser] = useState<boolean>(false);
  const [toolSearch, setToolSearch] = useState<boolean>(true);
  const [toolMemory, setToolMemory] = useState<boolean>(true);
  const [systemDirective, setSystemDirective] = useState<string>(
    "You are GrokBot, a sovereign, razor-sharp autonomous engineer. You speak directly with zero corporate filler. When presented with code or architecture problems, analyze root causes immediately and produce production-grade diffs."
  );

  // Chat State
  const [messages, setMessages] = useState<Array<{ role: "bot" | "user"; text: string; toolUsed?: string }>>([
    {
      role: "bot",
      text: "GrokBot online. Running on DeepSeek V4 Pro via vLLM with isolated Kernel.sh microVM access. Give me a challenge—bug to squash, architecture to tear down, or prompt to roast.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [copiedCurl, setCopiedCurl] = useState<boolean>(false);

  const applyTemplate = (key: string) => {
    const t = TEMPLATES[key];
    if (!t) return;
    setBotName(t.name);
    setBotRole(t.role);
    setBotDesc(t.description);
    setAccentColor(t.iconBg);
    setSelectedModel(t.model);
    setSelectedRuntime(t.runtime);
    setToolMicroVM(t.tools.microvm);
    setToolBrowser(t.tools.browser);
    setToolSearch(t.tools.search);
    setToolMemory(t.tools.memory);
    setSystemDirective(t.prompt);

    setMessages([
      {
        role: "bot",
        text: `${t.name} initialized. Assigned role: ${t.role}. All sovereign layers loaded and standing by in private cluster.`,
      },
    ]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "";
      let toolName = "";

      if (userText.toLowerCase().includes("race") || userText.toLowerCase().includes("bug") || userText.toLowerCase().includes("code")) {
        toolName = toolMicroVM ? "Kernel.sh MicroVM (Session #4819)" : "Direct Code Evaluation";
        botResponse = `Root cause identified in 1.4s. The mutex in your connection pool lacks exponential jitter on contention, triggering cascade thundering herds under >2k concurrent RPS. Here is your drop-in patch:\n\n\`\`\`typescript\n// Applied Redis NX lease with 250ms backoff jitter\nconst lease = await redis.set(key, 'locked', 'NX', 'PX', 250);\nif (!lease) await sleep(Math.random() * 50 + 10);\n\`\`\`\nVerified inside microVM sandbox: 48/48 unit tests passing.`;
      } else if (userText.toLowerCase().includes("sales") || userText.toLowerCase().includes("lead") || userText.toLowerCase().includes("pitch")) {
        toolName = toolBrowser ? "Stealth Chromium CDP Scraper" : "Tavily Live Grounding";
        botResponse = `Scanned target prospect. Their Q3 financials show $3.8M in cloud compute egress. I drafted a personalized briefing showing how their data remains 100% air-gapped on-premise with DeepSeek V4 at 85% lower TCO. Ready to queue in CRM?`;
      } else {
        botResponse = `Processed with ${selectedModel.toUpperCase()} via ${selectedRuntime.toUpperCase()}. Directive verified: 100% data sovereignty preserved, zero telemetry transmitted outside cluster. What is the next task?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: botResponse,
          toolUsed: toolName || undefined,
        },
      ]);
      setIsTyping(false);
    }, 700);
  };

  const copyCurl = () => {
    const curl = `curl https://osi.arcanetechnologies.org/api/v1/chat/completions \\
  -H "Authorization: Bearer $OSI_API_KEY" \\
  -d '{
    "bot": "${botName.toLowerCase().replace(/\\s+/g, "-")}",
    "model": "${selectedModel}",
    "system": "${systemDirective.replace(/"/g, '\\"')}",
    "messages": [{"role": "user", "content": "Hello"}]
  }'`;
    navigator.clipboard.writeText(curl);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  return (
    <div className="space-y-10">
      {/* ── 1-Click Bot Inspiration Strip ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-[#86868B] uppercase tracking-wider block">
            1-Click Bot Templates (Instant Preset)
          </span>
          <span className="text-xs text-[#2997FF] font-medium hidden sm:inline">
            Click to load & customize
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(TEMPLATES).map(([key, t]) => (
            <button
              key={key}
              onClick={() => applyTemplate(key)}
              className={`p-3.5 rounded-2xl border text-left transition-all group cursor-pointer ${
                botName === t.name
                  ? "bg-[#1C1C1E] border-white/20 shadow-md"
                  : "bg-[#161617] border-white/[0.08] hover:border-white/16 hover:bg-[#1A1A1C]"
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`w-6 h-6 rounded-lg ${t.iconBg} flex items-center justify-center text-white text-[11px] font-bold`}>
                  {t.name.charAt(0)}
                </div>
                <span className="text-xs font-semibold text-white group-hover:text-[#2997FF] transition-colors">
                  {t.name}
                </span>
              </div>
              <p className="text-[11px] text-[#86868B] line-clamp-1">
                {t.role}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* ── Master 2-Column Bot Studio Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Assembling the Pieces (Form) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="luxury-card rounded-[28px] p-7 sm:p-8 border-white/[0.08] space-y-6 shadow-xl">
            <div className="pb-4 border-b border-white/[0.08]">
              <span className="text-xs font-semibold text-[#2997FF] uppercase tracking-normal block mb-1">
                Step 01 · Identity & Purpose
              </span>
              <h2 className="text-xl font-semibold tracking-tight text-white">
                Name & Configure Your Bot
              </h2>
            </div>

            {/* Bot Name & Icon Row */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#86868B] block">Bot Name</label>
              <div className="flex gap-3">
                {/* Avatar color selector */}
                <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/60 border border-white/[0.08]">
                  {["bg-blue-600", "bg-emerald-600", "bg-purple-600", "bg-amber-600"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setAccentColor(c)}
                      className={`w-6 h-6 rounded-xl ${c} transition-transform ${
                        accentColor === c ? "scale-110 ring-2 ring-white" : "opacity-60 hover:opacity-100"
                      }`}
                    />
                  ))}
                </div>

                <input
                  type="text"
                  value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                  placeholder="e.g. GrokBot"
                  className="flex-1 px-4 py-2 rounded-2xl bg-black/60 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-white/30"
                />
              </div>
            </div>

            {/* Bot Role */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#86868B] block">Role & Title</label>
              <input
                type="text"
                value={botRole}
                onChange={(e) => setBotRole(e.target.value)}
                placeholder="e.g. Staff Full-Stack Engineer"
                className="w-full px-4 py-2 rounded-2xl bg-black/60 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-white/30"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#86868B] block">Short Bio / Description</label>
              <input
                type="text"
                value={botDesc}
                onChange={(e) => setBotDesc(e.target.value)}
                placeholder="What this steady agent specializes in..."
                className="w-full px-4 py-2 rounded-2xl bg-black/60 border border-white/[0.08] text-xs text-[#A1A1A6] focus:outline-none focus:border-white/30"
              />
            </div>

            {/* Step 02: Brain & Runtime */}
            <div className="pt-4 border-t border-white/[0.08] space-y-4">
              <div>
                <span className="text-xs font-semibold text-[#30D158] uppercase tracking-normal block mb-1">
                  Step 02 · Brain & Silicon Engine
                </span>
                <h3 className="text-sm font-semibold text-white">Select Foundation Model & Engine</h3>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedModel("deepseek-v4-pro")}
                  className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                    selectedModel === "deepseek-v4-pro"
                      ? "bg-white/[0.1] border-white/20 text-white font-medium shadow-sm"
                      : "bg-white/[0.02] border-white/[0.06] text-[#86868B] hover:border-white/10"
                  }`}
                >
                  <span className="font-semibold text-white block">DeepSeek V4 Pro</span>
                  <span className="text-[11px] text-[#86868B]">1.6T MoE · 51.2% SWE-bench</span>
                </button>

                <button
                  onClick={() => setSelectedModel("kimi-k3")}
                  className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                    selectedModel === "kimi-k3"
                      ? "bg-white/[0.1] border-white/20 text-white font-medium shadow-sm"
                      : "bg-white/[0.02] border-white/[0.06] text-[#86868B] hover:border-white/10"
                  }`}
                >
                  <span className="font-semibold text-white block">Moonshot Kimi K3</span>
                  <span className="text-[11px] text-[#86868B]">1,000,000 Tokens (1M)</span>
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedRuntime("vllm")}
                  className={`flex-1 py-2 px-3 rounded-full text-xs font-semibold transition-all ${
                    selectedRuntime === "vllm"
                      ? "bg-white text-black shadow-sm"
                      : "bg-white/[0.04] text-[#86868B] hover:text-white"
                  }`}
                >
                  vLLM GPU Engine
                </button>
                <button
                  onClick={() => setSelectedRuntime("sglang")}
                  className={`flex-1 py-2 px-3 rounded-full text-xs font-semibold transition-all ${
                    selectedRuntime === "sglang"
                      ? "bg-white text-black shadow-sm"
                      : "bg-white/[0.04] text-[#86868B] hover:text-white"
                  }`}
                >
                  SGLang RadixAttention
                </button>
                <button
                  onClick={() => setSelectedRuntime("ollama")}
                  className={`flex-1 py-2 px-3 rounded-full text-xs font-semibold transition-all ${
                    selectedRuntime === "ollama"
                      ? "bg-white text-black shadow-sm"
                      : "bg-white/[0.04] text-[#86868B] hover:text-white"
                  }`}
                >
                  Local Mac / CPU
                </button>
              </div>
            </div>

            {/* Step 03: Superpowers & Sandboxes */}
            <div className="pt-4 border-t border-white/[0.08] space-y-4">
              <div>
                <span className="text-xs font-semibold text-[#BF5AF2] uppercase tracking-normal block mb-1">
                  Step 03 · Superpowers & Sandboxes
                </span>
                <h3 className="text-sm font-semibold text-white">Attach Tools & Isolation</h3>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* Superpower 1: Kernel MicroVM */}
                <button
                  onClick={() => setToolMicroVM(!toolMicroVM)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    toolMicroVM
                      ? "bg-blue-500/10 border-blue-500/30 text-white"
                      : "bg-white/[0.02] border-white/[0.06] text-[#86868B]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Box className="w-4 h-4 text-[#2997FF]" />
                    <span className="text-[10px] font-semibold">{toolMicroVM ? "ENABLED" : "OFF"}</span>
                  </div>
                  <span className="font-semibold block text-white">Kernel MicroVM</span>
                  <span className="text-[11px] text-[#86868B]">Bash code execution</span>
                </button>

                {/* Superpower 2: Stealth Browser */}
                <button
                  onClick={() => setToolBrowser(!toolBrowser)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    toolBrowser
                      ? "bg-emerald-500/10 border-emerald-500/30 text-white"
                      : "bg-white/[0.02] border-white/[0.06] text-[#86868B]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Globe className="w-4 h-4 text-[#30D158]" />
                    <span className="text-[10px] font-semibold">{toolBrowser ? "ENABLED" : "OFF"}</span>
                  </div>
                  <span className="font-semibold block text-white">Stealth Chromium</span>
                  <span className="text-[11px] text-[#86868B]">Web scraping & CDP</span>
                </button>

                {/* Superpower 3: Tavily Search */}
                <button
                  onClick={() => setToolSearch(!toolSearch)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    toolSearch
                      ? "bg-purple-500/10 border-purple-500/30 text-white"
                      : "bg-white/[0.02] border-white/[0.06] text-[#86868B]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Search className="w-4 h-4 text-[#BF5AF2]" />
                    <span className="text-[10px] font-semibold">{toolSearch ? "ENABLED" : "OFF"}</span>
                  </div>
                  <span className="font-semibold block text-white">Tavily Grounding</span>
                  <span className="text-[11px] text-[#86868B]">Live news & preprints</span>
                </button>

                {/* Superpower 4: Vector Memory */}
                <button
                  onClick={() => setToolMemory(!toolMemory)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    toolMemory
                      ? "bg-amber-500/10 border-amber-500/30 text-white"
                      : "bg-white/[0.02] border-white/[0.06] text-[#86868B]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Database className="w-4 h-4 text-[#FF9F0A]" />
                    <span className="text-[10px] font-semibold">{toolMemory ? "ENABLED" : "OFF"}</span>
                  </div>
                  <span className="font-semibold block text-white">Vector Memory</span>
                  <span className="text-[11px] text-[#86868B]">Long-term Qdrant recall</span>
                </button>
              </div>
            </div>

            {/* Step 04: System Directive */}
            <div className="pt-4 border-t border-white/[0.08] space-y-2">
              <label className="text-xs font-medium text-[#86868B] block">Bot System Directive / Instructions</label>
              <textarea
                rows={3}
                value={systemDirective}
                onChange={(e) => setSystemDirective(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-black/60 border border-white/[0.08] text-xs text-[#F5F5F7] focus:outline-none focus:border-white/30 leading-relaxed resize-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column: The Live Bot Preview & Interactive Chat */}
        <div className="lg:col-span-6 space-y-6">
          {/* Assembled Bot ID Card */}
          <div className="luxury-card rounded-[28px] p-6 sm:p-7 border-white/[0.08] shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3.5">
                <div className={`w-14 h-14 rounded-2xl ${accentColor} flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                  {botName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-white tracking-tight">
                      {botName || "Unnamed Bot"}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#30D158] bg-[#30D158]/10 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />
                      <span>STEADY AGENT LIVE</span>
                    </span>
                  </div>
                  <p className="text-xs text-[#86868B] mt-0.5">{botRole}</p>
                </div>
              </div>

              <button
                onClick={copyCurl}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] transition"
              >
                {copiedCurl ? <Check className="w-3.5 h-3.5 text-[#30D158]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCurl ? "Copied API" : "Copy cURL"}</span>
              </button>
            </div>

            {/* Active Specs Bar */}
            <div className="flex flex-wrap gap-2 pt-3 text-[11px] text-[#A1A1A6]">
              <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
                Brain: {selectedModel}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
                Engine: {selectedRuntime}
              </span>
              {toolMicroVM && (
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-[#2997FF] border border-blue-500/20">
                  MicroVM Ready
                </span>
              )}
              {toolBrowser && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-[#30D158] border border-emerald-500/20">
                  Browser Ready
                </span>
              )}
              {toolSearch && (
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-[#BF5AF2] border border-purple-500/20">
                  Tavily Grounded
                </span>
              )}
            </div>

            {/* Interactive Live Chat Box with the Bot */}
            <div className="mt-5 space-y-3">
              <div className="rounded-2xl bg-black/80 border border-white/[0.08] p-4 h-[280px] overflow-y-auto space-y-3">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                        m.role === "user"
                          ? "bg-white text-black font-medium rounded-tr-sm"
                          : "bg-white/[0.06] text-[#F5F5F7] rounded-tl-sm border border-white/[0.06]"
                      }`}
                    >
                      {m.toolUsed && (
                        <span className="text-[10px] font-mono text-[#2997FF] block mb-1">
                          ⚡ Tool: {m.toolUsed}
                        </span>
                      )}
                      <p className="whitespace-pre-wrap">{m.text}</p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-1.5 text-xs text-[#86868B] p-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:0.4s]" />
                    <span>{botName} is thinking & executing tools...</span>
                  </div>
                )}
              </div>

              {/* Chat Input Bar */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={`Message ${botName}... (e.g. "Fix our redis race condition" or "Find Acme Corp leads")`}
                  className="flex-1 px-4 py-2.5 rounded-full bg-black/60 border border-white/[0.08] text-xs text-white focus:outline-none focus:border-white/30"
                />
                <button
                  onClick={handleSendMessage}
                  className="w-10 h-10 rounded-full bg-white hover:bg-[#E8E8ED] text-black flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-md"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>

            {/* Bot Deployment Action Card */}
            <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[#86868B]">
                <ShieldCheck className="w-4 h-4 text-[#30D158]" />
                <span>100% Private Weights · Zero Data Retention</span>
              </div>

              <Link
                href="/sandboxes"
                className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#0071E3] hover:bg-[#0077ED] transition-all shadow-md"
              >
                <span>Deploy Steady Bot</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
