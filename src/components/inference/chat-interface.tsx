"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Terminal, Settings2, Trash2, Copy, Check, Sparkles, Cpu } from "lucide-react";
import { SUPPORTED_MODELS } from "@/lib/ai/providers";
import { formatTokenPrice } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

export function ChatInterface({ initialModel = "deepseek-v4-pro" }: { initialModel?: string }) {
  const [model, setModel] = useState(initialModel);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg_welcome",
      role: "assistant",
      content: `Welcome to the OpenSuperIntelligence Inference Gateway.
Connected to **${SUPPORTED_MODELS[initialModel]?.name || "DeepSeek V4 Pro"}**.

You can run direct inference, stress test code synthesis, or invoke autonomous tool calling via the API.`,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [temperature, setTemperature] = useState(0.7);
  const [stats, setStats] = useState({ promptTokens: 0, completionTokens: 0, costUsd: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeModelConfig = SUPPORTED_MODELS[model] || SUPPORTED_MODELS["deepseek-v4-pro"];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput("");

    const newMsg: Message = {
      id: `usr_${Date.now()}`,
      role: "user",
      content: userText,
      timestamp: new Date().toLocaleTimeString(),
    };

    const nextMessages = [...messages, newMsg];
    setMessages(nextMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/v1/inference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
          temperature,
          stream: false,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const replyText = data.choices?.[0]?.message?.content || "No response received.";
        const assistantMsg: Message = {
          id: `ast_${Date.now()}`,
          role: "assistant",
          content: replyText,
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, assistantMsg]);

        if (data.usage) {
          const pt = data.usage.prompt_tokens || 0;
          const ct = data.usage.completion_tokens || 0;
          const cost = data.osi_billing?.billed_cost_usd || 0;
          setStats((prev) => ({
            promptTokens: prev.promptTokens + pt,
            completionTokens: prev.completionTokens + ct,
            costUsd: prev.costUsd + cost,
          }));
        }
      } else {
        const errData = await response.json();
        setMessages((prev) => [
          ...prev,
          {
            id: `err_${Date.now()}`,
            role: "assistant",
            content: `**Inference Error:** ${errData.error || "Failed to process request."}`,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: "assistant",
          content: `**Network Error:** Unable to reach gateway. Check connection.`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] bg-[#08080C]">
      {/* Playground Header / Controls */}
      <div className="h-12 border-b border-white/[0.06] px-6 flex items-center justify-between bg-white/[0.01]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-zinc-500">Model:</span>
          </div>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="h-7 px-2.5 rounded bg-white/[0.04] border border-white/[0.1] text-xs font-mono text-white focus:outline-none focus:border-emerald-500/50"
          >
            {Object.values(SUPPORTED_MODELS).map((m) => (
              <option key={m.slug} value={m.slug} className="bg-[#0F0F14] text-white">
                {m.name} ({formatTokenPrice(m.pricing.ourInputPerM)})
              </option>
            ))}
          </select>
        </div>

        {/* Telemetry bar */}
        <div className="flex items-center gap-4 text-[11px] font-mono text-zinc-400">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-zinc-500">Session Tokens:</span>
            <span className="text-zinc-200">{stats.promptTokens + stats.completionTokens}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">Metered Cost:</span>
            <span className="text-emerald-400 font-medium">${stats.costUsd.toFixed(4)}</span>
          </div>
          <button
            onClick={() => {
              setMessages([]);
              setStats({ promptTokens: 0, completionTokens: 0, costUsd: 0 });
            }}
            className="p-1 rounded text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04] transition-colors"
            title="Clear Chat Session"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-3xl ${
                isUser ? "ml-auto" : "mr-auto"
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5 text-[10px] font-mono text-zinc-500">
                <span>{isUser ? "Client Request" : activeModelConfig.name}</span>
                <span>·</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`group relative rounded-xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? "bg-white/[0.08] text-white border border-white/[0.12] rounded-br-sm"
                    : "bg-white/[0.02] text-zinc-200 border border-white/[0.06] rounded-bl-sm"
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">{msg.content}</div>

                {!isUser && (
                  <button
                    onClick={() => handleCopy(msg.id, msg.content)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition"
                    title="Copy message"
                  >
                    {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex flex-col items-start max-w-3xl mr-auto">
            <div className="flex items-center gap-2 mb-1.5 text-[10px] font-mono text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
              <span>{activeModelConfig.name} is reasoning...</span>
            </div>
            <div className="rounded-xl p-4 bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-zinc-400">
              Allocating KV cache · routing through inference proxy...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Prompt Dock */}
      <div className="p-4 border-t border-white/[0.06] bg-[#08080C]/80 backdrop-blur-xl">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto flex items-end gap-2">
          <div className="flex-1 relative rounded-xl bg-white/[0.03] border border-white/[0.08] focus-within:border-emerald-500/40 transition">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
              placeholder={`Send message or prompt to ${activeModelConfig.name}... (Enter to send, Shift+Enter for newline)`}
              rows={2}
              className="w-full bg-transparent px-4 py-3 text-xs sm:text-sm text-white placeholder:text-zinc-500 resize-none outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="h-11 px-4 rounded-xl bg-white text-black font-mono text-xs font-medium hover:bg-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center gap-1.5 shrink-0"
          >
            <span>Run</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
