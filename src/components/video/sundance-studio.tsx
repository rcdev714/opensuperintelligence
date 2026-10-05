"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Film, 
  Play, 
  Pause, 
  Sparkles, 
  BrainCircuit, 
  Layers, 
  Video, 
  Camera, 
  Download, 
  ChevronRight,
  Clock
} from "lucide-react";

export function SundanceStudio() {
  const [activeTab, setActiveTab] = useState<"sundance" | "content-brain">("sundance");
  const [model, setModel] = useState<"wan-2.1" | "hunyuan">("wan-2.1");
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16" | "2.39:1">("16:9");
  const [cameraMotion, setCameraMotion] = useState<string>("Slow Drone Push-In");
  const [prompt, setPrompt] = useState(
    "Cinematic anamorphic drone sweep through brutalist titanium server laboratory, rain reflections on polished concrete, volumetric cyan backlight, photorealistic 1080p, 24fps."
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Content Brain State
  const [brainQuery, setBrainQuery] = useState(
    "Synthesize all GPU memory allocation decisions discussed across the last 3 engineering all-hands recordings."
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const cameraPresets = [
    "Slow Drone Push-In",
    "360° Orbit Pan",
    "Low-Angle Dolly Track",
    "Rack Focus Macro",
    "Steadicam Tracking",
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 10;
      });
    }, 250);
  };

  return (
    <div className="space-y-8">
      {/* ── Apple-Style Master Segmented Control ── */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <div className="flex items-center p-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
          <button
            onClick={() => setActiveTab("sundance")}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === "sundance"
                ? "bg-white text-black shadow-md"
                : "text-[#86868B] hover:text-white"
            }`}
          >
            <Film className="w-3.5 h-3.5 text-[#BF5AF2]" />
            <span>Sundance Video Studio</span>
          </button>

          <button
            onClick={() => setActiveTab("content-brain")}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === "content-brain"
                ? "bg-white text-black shadow-md"
                : "text-[#86868B] hover:text-white"
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5 text-[#2997FF]" />
            <span>Meta Content Brain</span>
          </button>
        </div>

        <span className="text-xs text-[#86868B] hidden sm:inline">
          {activeTab === "sundance" ? "Wan 2.1 14B Cinema Engine" : "SAM 2 Omnimodal Cortex"}
        </span>
      </div>

      {/* ── Tab 1: Sundance Video Studio ── */}
      {activeTab === "sundance" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="luxury-card rounded-[28px] p-8 border-white/[0.08] space-y-6">
              <div>
                <span className="text-xs font-semibold text-[#86868B] uppercase tracking-normal block mb-1">
                  Camera & Render Directives
                </span>
                <h2 className="text-xl font-semibold tracking-tight text-white">
                  Scene Parameters
                </h2>
              </div>

              {/* Model Picker */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-[#86868B] block">Diffusion Engine</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setModel("wan-2.1")}
                    className={`p-3.5 rounded-2xl border text-left text-xs transition-all ${
                      model === "wan-2.1"
                        ? "bg-white/[0.1] border-white/20 text-white font-medium shadow-sm"
                        : "bg-white/[0.02] border-white/[0.06] text-[#86868B] hover:border-white/10"
                    }`}
                  >
                    <span className="font-semibold text-white block">Wan 2.1 14B</span>
                    <span className="text-[11px] text-[#86868B]">1080p Cinema Scope</span>
                  </button>

                  <button
                    onClick={() => setModel("hunyuan")}
                    className={`p-3.5 rounded-2xl border text-left text-xs transition-all ${
                      model === "hunyuan"
                        ? "bg-white/[0.1] border-white/20 text-white font-medium shadow-sm"
                        : "bg-white/[0.02] border-white/[0.06] text-[#86868B] hover:border-white/10"
                    }`}
                  >
                    <span className="font-semibold text-white block">Hunyuan 13B</span>
                    <span className="text-[11px] text-[#86868B]">Dual-Stream DiT</span>
                  </button>
                </div>
              </div>

              {/* Aspect Ratio Pills */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-[#86868B] block">Aspect Ratio</label>
                <div className="flex gap-2">
                  {(["16:9", "9:16", "2.39:1"] as const).map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => setAspectRatio(ratio)}
                      className={`flex-1 py-2 px-3 rounded-full text-xs font-semibold transition-all ${
                        aspectRatio === ratio
                          ? "bg-white text-black shadow-sm"
                          : "bg-white/[0.03] text-[#86868B] hover:text-white border border-white/[0.06]"
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              {/* Camera Kinematics */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-[#86868B] flex items-center justify-between">
                  <span>Camera Kinematics Motion</span>
                  <Camera className="w-3.5 h-3.5 text-[#86868B]" />
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {cameraPresets.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setCameraMotion(preset)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                        cameraMotion === preset
                          ? "bg-white/[0.12] border-white/20 text-white font-semibold"
                          : "bg-white/[0.02] border-white/[0.06] text-[#86868B] hover:text-white"
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt Textarea */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-[#86868B] block">Prompt Description</label>
                <textarea
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-black/60 border border-white/[0.08] text-xs text-[#F5F5F7] focus:outline-none focus:border-white/30 leading-relaxed resize-none"
                />
              </div>

              {/* Render Action Button */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-3.5 rounded-full bg-white hover:bg-[#E8E8ED] text-black text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-[#BF5AF2]" />
                <span>{isGenerating ? `Synthesizing Frames... ${progress}%` : "Generate Cinema Sequence"}</span>
              </button>
            </div>
          </div>

          {/* Interactive Player Frame */}
          <div className="lg:col-span-7 space-y-6">
            <div className="luxury-card rounded-[28px] p-7 border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between text-xs text-[#86868B]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#30D158]" />
                  <span className="text-white font-medium">Studio Viewfinder (1080p)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{aspectRatio}</span>
                  <span>•</span>
                  <span>24 fps</span>
                  <span>•</span>
                  <span className="text-white font-medium">{cameraMotion}</span>
                </div>
              </div>

              {/* Simulated Video Player Frame */}
              <div className="relative rounded-2xl bg-black/90 border border-white/[0.08] aspect-video overflow-hidden flex flex-col justify-between p-6 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/20 via-zinc-900 to-black/90 pointer-events-none" />

                {/* Top Overlay */}
                <div className="relative z-10 flex items-center justify-between text-xs text-[#A1A1A6]">
                  <span className="px-3 py-1 rounded-full bg-black/60 border border-white/[0.1] text-[#30D158] font-medium">
                    REC [00:04:16]
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/60 border border-white/[0.1]">
                    Wan 2.1 14B • 3D Causal VAE
                  </span>
                </div>

                {/* Center Action */}
                <div className="relative z-10 flex flex-col items-center justify-center space-y-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white transition-all scale-100 hover:scale-105 shadow-2xl cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
                  </button>
                  <p className="text-xs text-[#F5F5F7] max-w-md text-center line-clamp-2 px-4 py-1.5 rounded-full bg-black/60 border border-white/[0.08] backdrop-blur-md">
                    &quot;{prompt}&quot;
                  </p>
                </div>

                {/* Bottom Timeline Controls */}
                <div className="relative z-10 space-y-2">
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden cursor-pointer">
                    <div className="h-full bg-white rounded-full w-2/3" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#86868B]">
                    <span>00:02.80 / 00:05.00</span>
                    <div className="flex items-center gap-3">
                      <span>4K Ready</span>
                      <Download className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Frame Sequencer Strip */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-medium text-[#86868B] block">
                  Temporal Frame Coherence (3D Causal Interpolation)
                </span>
                <div className="grid grid-cols-6 gap-2">
                  {[0, 16, 32, 48, 64, 80].map((frame) => (
                    <div
                      key={frame}
                      className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center"
                    >
                      <div className="aspect-video rounded-lg bg-black/40 border border-white/[0.04] mb-1.5 flex items-center justify-center text-[10px] text-[#86868B]">
                        Frame {frame}
                      </div>
                      <span className="text-[10px] font-semibold text-white">{(frame / 16).toFixed(1)}s</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab 2: Meta Content Brain ── */}
      {activeTab === "content-brain" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="luxury-card rounded-[28px] p-8 border-white/[0.08] space-y-6">
              <div>
                <span className="text-xs font-semibold text-[#2997FF] uppercase tracking-normal block mb-1">
                  Omnimodal Memory Cortex
                </span>
                <h2 className="text-xl font-semibold tracking-tight text-white">
                  Content Brain Query
                </h2>
                <p className="text-xs text-[#86868B] mt-1">
                  Query across video archives, whiteboard recordings, and audio streams simultaneously with SAM 2 spatial grounding.
                </p>
              </div>

              {/* 3 Active Perception Layers */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-[#86868B] block">
                  Active Perception Layers
                </span>
                <div className="space-y-2">
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Video className="w-4 h-4 text-[#2997FF]" />
                      <div>
                        <span className="text-xs font-semibold text-white block">SAM 2 Spatial Tracking</span>
                        <span className="text-[11px] text-[#86868B]">44 FPS real-time bounding masks</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-[#30D158]">Active</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#BF5AF2]" />
                      <div>
                        <span className="text-xs font-semibold text-white block">Continuous Speech Diarization</span>
                        <span className="text-[11px] text-[#86868B]">Whisper Large V3 multi-speaker timestamps</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-[#30D158]">Active</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Layers className="w-4 h-4 text-[#FF9F0A]" />
                      <div>
                        <span className="text-xs font-semibold text-white block">Cross-Modal Topology</span>
                        <span className="text-[11px] text-[#86868B]">Entity relations & decision graphs</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-[#30D158]">Active</span>
                  </div>
                </div>
              </div>

              {/* Query Input */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-[#86868B] block">Natural Language Query</label>
                <textarea
                  rows={4}
                  value={brainQuery}
                  onChange={(e) => setBrainQuery(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-black/60 border border-white/[0.08] text-xs text-[#F5F5F7] focus:outline-none focus:border-white/30 leading-relaxed resize-none"
                />
              </div>

              <button
                onClick={() => {
                  setIsAnalyzing(true);
                  setTimeout(() => setIsAnalyzing(false), 800);
                }}
                className="w-full py-3.5 rounded-full bg-white hover:bg-[#E8E8ED] text-black text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <BrainCircuit className="w-4 h-4" />
                <span>{isAnalyzing ? "Traversing Omnimodal Graph..." : "Query Content Brain"}</span>
              </button>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="luxury-card rounded-[28px] p-8 border-white/[0.08] space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Synthesized Findings
                  </h3>
                  <p className="text-xs text-[#86868B] mt-0.5">Cross-verified against 3 video streams</p>
                </div>

                <span className="text-xs font-semibold text-[#30D158] bg-[#30D158]/10 px-3 py-1 rounded-full">
                  99.8% Grounded Recall
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4 text-xs text-[#F5F5F7] leading-relaxed">
                <div>
                  <h4 className="font-semibold text-sm text-white mb-1">
                    Decision Summary: GPU Memory Tiering
                  </h4>
                  <p className="text-[#86868B]">
                    During the Systems Engineering Sync (timestamp <strong>14:22 – 18:40</strong>), the team resolved to deploy <strong>vLLM PagedAttention with chunked prefill</strong> across all 8x H100 Hopper nodes. This reduced KV cache memory waste from 32% to under 4%, unlocking 131k token context without requiring 8-bit weights quantization.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06]">
                  <h5 className="font-semibold text-xs text-[#86868B] uppercase tracking-wider mb-2">
                    Evidence Citations
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-black/60 border border-white/[0.06] space-y-1">
                      <span className="text-[#30D158] font-semibold block">Video Clip #01 [14:22]</span>
                      <span className="text-[#86868B] block">Whiteboard architecture diagram</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-black/60 border border-white/[0.06] space-y-1">
                      <span className="text-[#2997FF] font-semibold block">Audio Transcription</span>
                      <span className="text-[#86868B] block">&quot;We cannot afford quadratic KV spikes...&quot;</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                <span className="text-xs text-[#86868B]">Meta SAM 2 + Llama 4 Cortex</span>
                <Link
                  href="/combos"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#2997FF] hover:underline"
                >
                  <span>Inspect Blueprint</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
