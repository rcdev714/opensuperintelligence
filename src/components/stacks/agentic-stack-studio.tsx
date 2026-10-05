"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Cpu, 
  Terminal, 
  Box, 
  Database, 
  Layers, 
  Sparkles, 
  Check, 
  Copy, 
  Play, 
  RefreshCw, 
  ShieldCheck, 
  Zap, 
  BrainCircuit, 
  Film, 
  Scale, 
  UserCheck, 
  Search, 
  ExternalLink,
  ChevronRight,
  Code2,
  Briefcase,
  GitBranch,
  Lock,
  ArrowRight
} from "lucide-react";

interface AgentStackPreset {
  id: string;
  name: string;
  subtitle: string;
  category: "coding" | "sales" | "video" | "legal";
  persona: string;
  accentColor: string;
  iconBg: string;
  icon: typeof Code2;
  stats: {
    intelligence: number;
    autonomy: number;
    speed: number;
    context: number;
    costPerRun: string;
  };
  layers: {
    persona: { name: string; desc: string };
    model: { name: string; provider: string; specs: string };
    runtime: { name: string; engine: string; specs: string };
    framework: { name: string; pattern: string; tools: string[] };
    sandbox: { name: string; env: string; features: string };
    memory: { name: string; type: string; details: string };
  };
  liveSimulation: {
    terminalLogs: string[];
    outputTitle: string;
    outputSubtitle: string;
    outputDetails: { label: string; val: string }[];
    sandboxPreview: string;
  };
  dockerCompose: string;
  runCommand: string;
}

const STACK_PRESETS: AgentStackPreset[] = [
  {
    id: "swe-coding-agent",
    name: "Autonomous SWE Pair Engineer",
    subtitle: "End-to-End Bug Fixes, Code Refactoring & Automated PRs",
    category: "coding",
    persona: "Staff Full-Stack Software Engineer",
    accentColor: "text-[#2997FF]",
    iconBg: "bg-blue-600",
    icon: Code2,
    stats: {
      intelligence: 96,
      autonomy: 94,
      speed: 92,
      context: 88,
      costPerRun: "$0.04 / solved PR",
    },
    layers: {
      persona: {
        name: "Senior Autonomous Software Engineer",
        desc: "Analyzes stack traces, locates reproducing test cases, edits multi-file repositories, and verifies test suites.",
      },
      model: {
        name: "DeepSeek V4 Pro",
        provider: "DeepSeek AI",
        specs: "1.6T MoE (37B active) · 131k Context · 51.2% SWE-bench",
      },
      runtime: {
        name: "vLLM High-Throughput Engine",
        engine: "PagedAttention v3 + Continuous Batching",
        specs: "CUDA 12.4 · FlashAttention-3 · 140 tok/s",
      },
      framework: {
        name: "Aider CLI + Open-Instruct Loop",
        pattern: "Multi-file AST graph traversal & git commit validation",
        tools: ["ast_grep", "git_commit_verify", "test_runner_bash", "mcp_file_system"],
      },
      sandbox: {
        name: "Kernel.sh MicroVM Sandbox",
        env: "Ubuntu 24.04 LTS · Node 22 · Python 3.12 · Docker-in-MicroVM",
        features: "Sub-150ms startup · Air-gapped network namespace",
      },
      memory: {
        name: "Qdrant Vector Code Graph",
        type: "Dense Vector AST Indexing",
        details: "Semantic code search across 500,000 LOC codebases",
      },
    },
    liveSimulation: {
      terminalLogs: [
        "[00:00.12] [KERNEL.SH] Provisioned isolated microVM instance (sess_swe_88192)",
        "[00:00.45] [GIT] Cloned https://github.com/enterprise/payment-gateway on branch main",
        "[00:01.20] [TEST] Ran reproducing test: npm test -- --grep 'idempotency_key_collision'",
        "[00:01.35] [TEST] FAIL: Expected 200 OK, got 409 Conflict (src/ledger/lock.ts:42)",
        "[00:02.10] [DEEPSEEK-V4] Analyzing call graph in src/ledger/lock.ts with MLA attention...",
        "[00:03.40] [AIDER] Patch generated: Applied distributed Redis mutex with 500ms lease renewal",
        "[00:04.15] [TEST] Re-running test suite in sandbox...",
        "[00:04.80] [TEST] PASS: 48 passed, 0 failed, 100% test coverage preserved",
        "[00:05.10] [GIT] Created commit 9f12ab4: 'fix(ledger): resolve mutex race in idempotency key'",
        "[00:05.30] [AGENT] Pull Request #142 ready for human review · Total Cost: $0.038",
      ],
      outputTitle: "Pull Request #142: Idempotency Mutex Race Resolved",
      outputSubtitle: "Verified across 48 unit tests inside isolated Kernel.sh microVM",
      outputDetails: [
        { label: "Target Repo", val: "enterprise/payment-gateway" },
        { label: "Files Modified", val: "src/ledger/lock.ts (+14, -4)" },
        { label: "Verification", val: "100% Passing Tests (48/48)" },
        { label: "Compute TCO", val: "$0.038 (-92% vs Claude 3.7)" },
      ],
      sandboxPreview: "diff --git a/src/ledger/lock.ts b/src/ledger/lock.ts\nindex 42f1a..88b02 100644\n--- a/src/ledger/lock.ts\n+++ b/src/ledger/lock.ts\n@@ -39,7 +39,12 @@ export async function acquireLock(key: string) {\n-  return await redis.set(key, 'locked', 'NX');\n+  const lease = await redis.set(key, 'locked', 'NX', 'PX', 500);\n+  if (!lease) {\n+    await backoffJitter(25, 100);\n+    return await redis.set(key, 'locked', 'NX', 'PX', 500);\n+  }\n+  return lease;\n }",
    },
    dockerCompose: `version: '3.8'
services:
  vllm-deepseek:
    image: vllm/vllm-openai:latest
    deploy:
      resources:
        reservations:
          devices:
            - capabilities: [gpu]
    environment:
      - MODEL=deepseek-ai/DeepSeek-V3
      - TENSOR_PARALLEL_SIZE=4
    ports:
      - "8000:8000"

  swe-agent:
    image: osi/swe-agent-aider:latest
    environment:
      - OPENAI_API_BASE=http://vllm-deepseek:8000/v1
      - KERNEL_API_KEY=\${KERNEL_API_KEY}
      - QDRANT_URL=http://qdrant:6333
    depends_on:
      - vllm-deepseek
      - qdrant

  qdrant:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"`,
    runCommand: "osi stack up swe-coding-agent --model deepseek-v4-pro --sandbox kernel-vm",
  },
  {
    id: "sales-sdr-agent",
    name: "Autonomous Enterprise SDR & Account Executive",
    subtitle: "Inbound Lead Qualification, SEC 10-K Analysis & Tailored Pitch Swarms",
    category: "sales",
    persona: "Strategic Enterprise Account Executive",
    accentColor: "text-[#30D158]",
    iconBg: "bg-emerald-600",
    icon: Briefcase,
    stats: {
      intelligence: 95,
      autonomy: 91,
      speed: 95,
      context: 100,
      costPerRun: "$0.06 / qualified lead",
    },
    layers: {
      persona: {
        name: "Enterprise Account Executive Swarm",
        desc: "Researches prospect technology stacks, reads financial transcripts, identifies decision-makers, and drafts hyper-personalized proposals.",
      },
      model: {
        name: "Moonshot Kimi K3 Ultra",
        provider: "Moonshot AI",
        specs: "2.8T MoE · 1,000,000 Continuous Tokens · Delta Attention (KDA)",
      },
      runtime: {
        name: "SGLang with RadixAttention",
        engine: "Multi-Turn KV Cache Tree Re-use",
        specs: "Sub-200ms TTFT across 500-page CRM and SEC filings",
      },
      framework: {
        name: "CrewAI Multi-Agent Swarm",
        pattern: "Role-playing delegation: Researcher + Strategist + Copywriter",
        tools: ["tavily_search", "linkedin_cdp_scraper", "crm_postgres_sync", "pdf_sec_filing_parser"],
      },
      sandbox: {
        name: "Kernel.sh Stealth Chromium VM",
        env: "Headless Chromium · Anti-bot fingerprint emulation · Residential proxies",
        features: "Scrapes enterprise sites, careers pages, and news without CAPTCHAs",
      },
      memory: {
        name: "Neo4j Graph + PostgreSQL CRM",
        type: "Stakeholder Organization Hierarchy Graph",
        details: "Maps reporting structures, tech budget approvals, and renewal dates",
      },
    },
    liveSimulation: {
      terminalLogs: [
        "[00:00.10] [CREWAI] Initialized SDR Swarm: Researcher, Account Strategist, Copywriter",
        "[00:00.35] [KERNEL.SH] Launched stealth Chromium microVM with residential IP (sess_sdr_4412)",
        "[00:01.05] [TAVILY] Scanning Q3 2026 earnings transcript & press releases for Acme Corp...",
        "[00:01.95] [KIMI-K3] Ingesting 142-page 10-K filing into 1M context horizon (tokens: 184,200)...",
        "[00:02.80] [ANALYSIS] Extracted strategic pain point: 'Legacy cloud inference egress costs exceeded $4.2M in FY25'",
        "[00:03.20] [NEO4J] Identified target buyer: Sarah Jenkins (VP of Infrastructure & Platform Engineering)",
        "[00:04.10] [COPYWRITER] Generating personalized sovereign infrastructure ROI proposal...",
        "[00:04.75] [CRM] Enriched lead score: 94/100 (Tier 1 Strategic Target)",
        "[00:05.10] [EMAIL] Drafted personalized outreach highlighting 78% TCO reduction with DeepSeek on-prem",
        "[00:05.25] [AGENT] Outreach queued in CRM with personalized ROI deck attached · Total Cost: $0.058",
      ],
      outputTitle: "Qualified Account: Acme Corp ($4.2M Cloud Egress Pain Point)",
      outputSubtitle: "Hyper-personalized briefing generated from 184k tokens of SEC filings",
      outputDetails: [
        { label: "Target Account", val: "Acme Corp (NYSE: ACME)" },
        { label: "Buyer Persona", val: "Sarah Jenkins (VP Infrastructure)" },
        { label: "Identified Pain", val: "$4.2M AWS Inference Egress Spend" },
        { label: "Proposed Solution", val: "Airgapped DeepSeek V4 Cluster (-82% TCO)" },
      ],
      sandboxPreview: "Subject: Eliminating Acme Corp's $4.2M inference egress with sovereign DeepSeek\n\nHi Sarah,\n\nI noticed in Acme's Q3 10-K report that inference egress across your microservices surpassed $4.2M this year.\n\nWith OpenSuperIntelligence, you can deploy DeepSeek V4 and Kimi K3 directly inside your private VPC with zero data retention and 78% lower unit economics than OpenAI.\n\nWe benchmarked your exact token workload: Acme would save $3.4M annually.\n\nWould you be open to a 10-minute architecture review this Thursday at 2pm?\n\nBest,\nAutonomous SDR Agent",
    },
    dockerCompose: `version: '3.8'
services:
  sglang-kimi:
    image: lmsysorg/sglang:latest
    deploy:
      resources:
        reservations:
          devices:
            - capabilities: [gpu]
    environment:
      - MODEL=moonshotai/Kimi-K3
    ports:
      - "30000:30000"

  sales-crew:
    image: osi/sales-sdr-crew:latest
    environment:
      - SGLANG_HOST=http://sglang-kimi:30000
      - TAVILY_API_KEY=\${TAVILY_API_KEY}
      - KERNEL_API_KEY=\${KERNEL_API_KEY}
      - NEO4J_URI=bolt://neo4j:7687
    depends_on:
      - sglang-kimi
      - neo4j

  neo4j:
    image: neo4j:latest
    ports:
      - "7474:7474"
      - "7687:7687"`,
    runCommand: "osi stack up sales-sdr-agent --model kimi-k3 --tools tavily,kernel-stealth",
  },
  {
    id: "cinema-vfx-agent",
    name: "Cinematic VFX & Video Director",
    subtitle: "1080p Anamorphic Diffusion, Camera Kinematics & SAM 2 Tracking",
    category: "video",
    persona: "Visual Effects & Creative Film Director",
    accentColor: "text-[#BF5AF2]",
    iconBg: "bg-purple-600",
    icon: Film,
    stats: {
      intelligence: 94,
      autonomy: 92,
      speed: 86,
      context: 95,
      costPerRun: "$0.12 / 5s 1080p clip",
    },
    layers: {
      persona: {
        name: "Creative Cinema Director",
        desc: "Translates high-level screenplay scripts into 24fps prompt pacing, camera angle pathing, and volumetric lighting directives.",
      },
      model: {
        name: "Wan 2.1 14B + SAM 2 Content Brain",
        provider: "Alibaba Wan Team & Meta AI",
        specs: "14B Flow-DiT Diffusion · 1080p @ 24fps · Spatiotemporal Tracking",
      },
      runtime: {
        name: "vLLM-Omni Video Engine",
        engine: "3D Causal VAE with FlashAttention-3",
        specs: "Sub-second frame latent interpolation across 8x H100 SXM5",
      },
      framework: {
        name: "LangGraph Cyclic Storyboard Director",
        pattern: "Shot sequencing, frame continuity validation & automated color grading",
        tools: ["camera_path_generator", "sam2_mask_tracker", "upscale_esrgan", "color_lut_engine"],
      },
      sandbox: {
        name: "Confidential GPU Render Node",
        env: "CUDA 12.6 · TensorRT 10.2 · FFmpeg Hardware Encoder",
        features: "Lossless ProRes 422 export directly to AWS S3 bucket",
      },
      memory: {
        name: "Milvus Spatiotemporal Vector Index",
        type: "High-Dimensional Latent Video Index",
        details: "Zero-shot visual retrieval across 10,000+ b-roll clips",
      },
    },
    liveSimulation: {
      terminalLogs: [
        "[00:00.15] [LANGGRAPH] Loaded screenplay prompt: 'Anamorphic cyberpunk server lab push-in'",
        "[00:00.40] [CAMERA] Calculated 3D kinematics path: Slow Drone Push-In, 2.39:1 scope",
        "[00:01.10] [WAN-2.1] Generating 3D Causal Latents: 120 frames @ 24fps (1920x1080)...",
        "[00:02.50] [DIFFUSION] Denoising step 25/25 complete across 8x H100 Hopper nodes",
        "[00:03.20] [SAM-2] Tracking spatiotemporal object masks on titanium server rack...",
        "[00:03.80] [COLOR] Applying anamorphic cyan/teal color grade with volumetric bloom",
        "[00:04.40] [FFMPEG] Rendered ProRes 422 video stream at 48Mbps bitrate",
        "[00:04.90] [AGENT] Video render completed successfully · Total Latency: 4.9s · Cost: $0.118",
      ],
      outputTitle: "1080p Cinema Master: 'Cyberpunk Titanium Laboratory'",
      outputSubtitle: "Wan 2.1 14B Cinema Scope @ 24 FPS with SAM 2 visual continuity",
      outputDetails: [
        { label: "Framing", val: "2.39:1 Anamorphic Scope" },
        { label: "Pacing", val: "120 Frames @ 24 FPS (5.0s)" },
        { label: "Camera", val: "Slow Drone Push-In + Tilt" },
        { label: "Render Time", val: "4.9s on 8x H100 Node" },
      ],
      sandboxPreview: "{\n  \"shot_id\": \"sh_001\",\n  \"engine\": \"wan_2.1_14b_dit\",\n  \"aspect_ratio\": \"2.39:1\",\n  \"fps\": 24,\n  \"duration_seconds\": 5.0,\n  \"camera_motion\": \"Slow Drone Push-In\",\n  \"lighting\": \"Volumetric cyan rim lighting\",\n  \"render_status\": \"COMPLETE_1080P\"\n}",
    },
    dockerCompose: `version: '3.8'
services:
  sundance-engine:
    image: osi/sundance-wan2-dit:latest
    deploy:
      resources:
        reservations:
          devices:
            - capabilities: [gpu]
    ports:
      - "9000:9000"`,
    runCommand: "osi stack up cinema-vfx-agent --model wan-2.1 --aspect 2.39:1",
  },
  {
    id: "legal-auditor-agent",
    name: "Sovereign Legal & Contract Auditor",
    subtitle: "500-Page MSA Compliance, Redline Verification & Liability Detection",
    category: "legal",
    persona: "General Counsel & Compliance Auditor",
    accentColor: "text-[#FF9F0A]",
    iconBg: "bg-amber-600",
    icon: Scale,
    stats: {
      intelligence: 98,
      autonomy: 89,
      speed: 91,
      context: 100,
      costPerRun: "$0.08 / 500-page audit",
    },
    layers: {
      persona: {
        name: "General Counsel Auditor",
        desc: "Reviews Master Service Agreements, GDPR/HIPAA terms, indemnification clauses, and flags non-standard liability shifts.",
      },
      model: {
        name: "Moonshot Kimi K3 Ultra",
        provider: "Moonshot AI",
        specs: "1,000,000 Continuous Tokens · Full Repository & Contract Ingestion",
      },
      runtime: {
        name: "vLLM with Chunked Prefill",
        engine: "Zero quadratic cost explosion on million-token contexts",
        specs: "Airgapped inference on isolated Hopper SXM5 hardware",
      },
      framework: {
        name: "LlamaIndex Enterprise Workflows",
        pattern: "Hierarchical clause tree parsing & cross-document citation",
        tools: ["doc_redline_engine", "sec_compliance_checker", "clause_diff_analyzer"],
      },
      sandbox: {
        name: "Confidential Enclave MicroVM",
        env: "Zero network egress policy · Memory encrypted at rest & transit",
        features: "Certified for Attorney-Client Privileged documents",
      },
      memory: {
        name: "Qdrant Dense Encryption Store",
        type: "Hardware-Encrypted Vector Store",
        details: "Air-gapped retention with instantaneous key shredding",
      },
    },
    liveSimulation: {
      terminalLogs: [
        "[00:00.10] [SECURITY] Booted confidential microVM with zero external egress",
        "[00:00.50] [PARSER] Ingested 384-page Master Cloud Vendor Agreement (tokens: 312,400)",
        "[00:01.80] [KIMI-K3] Evaluating 42 sections against enterprise corporate risk policy...",
        "[00:03.10] [ALERT] Section 14.2 (Indemnification): Uncapped liability detected for indirect damages",
        "[00:03.65] [ALERT] Section 21.4 (Data Governance): Telemetry sharing permitted with US affiliates",
        "[00:04.20] [REDLINE] Generated redline amendment with standard 12-month fee cap & GDPR data lock",
        "[00:04.90] [AUDIT] Generated 6-page Executive Legal Memorandum · Total Cost: $0.076",
      ],
      outputTitle: "Contract Audit Completed: 2 Critical Risks Redlined",
      outputSubtitle: "384-page Master Service Agreement analyzed in 4.9 seconds",
      outputDetails: [
        { label: "Document", val: "Global Cloud Master Services Agreement.pdf" },
        { label: "Context Scanned", val: "312,400 Continuous Tokens" },
        { label: "Critical Risks", val: "2 (Uncapped Liability & Data Egress)" },
        { label: "Compliance Status", val: "Redlined & Ready for Counsel Sign-off" },
      ],
      sandboxPreview: "AMENDMENT TO SECTION 14.2 (LIMITATION OF LIABILITY):\n- IN NO EVENT SHALL EITHER PARTY'S LIABILITY BE LIMITED FOR CONSEQUENTIAL DAMAGES.\n+ EXCEPT FOR WILLFUL MISCONDUCT OR BREACH OF CONFIDENTIALITY, EACH PARTY'S TOTAL AGGREGATE LIABILITY UNDER THIS AGREEMENT SHALL BE STRICTLY LIMITED TO THE FEES PAID IN THE PRECEDING TWELVE (12) MONTHS.",
    },
    dockerCompose: `version: '3.8'
services:
  legal-agent:
    image: osi/legal-auditor:latest
    environment:
      - AIRGAPPED_MODE=true
      - ZERO_EGRESS=1`,
    runCommand: "osi stack up legal-auditor-agent --airgapped --model kimi-k3",
  },
];

export function AgenticStackStudio() {
  const [selectedStackId, setSelectedStackId] = useState<string>("swe-coding-agent");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeConsoleTab, setActiveConsoleTab] = useState<"logs" | "preview" | "docker">("logs");
  const [copied, setCopied] = useState<boolean>(false);

  const selectedStack = STACK_PRESETS.find((s) => s.id === selectedStackId) || STACK_PRESETS[0];

  const handleRunAgent = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 1800);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10">
      {/* ── Videogame Loadout Selector Bar ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-[#86868B] uppercase tracking-wider block">
            Select Predefined Agentic Stack (Videogame Loadout)
          </span>
          <span className="text-xs text-[#2997FF] font-medium hidden sm:inline">
            4 Production Turnkey Stacks Ready
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STACK_PRESETS.map((stack) => {
            const isSelected = stack.id === selectedStackId;
            const Icon = stack.icon;
            return (
              <button
                key={stack.id}
                onClick={() => setSelectedStackId(stack.id)}
                className={`p-5 rounded-[22px] border text-left transition-all duration-300 relative group cursor-pointer ${
                  isSelected
                    ? "bg-[#1C1C1E] border-white/30 shadow-xl shadow-black/50 scale-[1.02]"
                    : "bg-[#161617] border-white/[0.08] hover:border-white/16 hover:bg-[#1A1A1C]"
                }`}
              >
                {/* Active Indicator Pin */}
                {isSelected && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-semibold text-[#30D158] bg-[#30D158]/10 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />
                    <span>LOADOUT ACTIVE</span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-2xl ${stack.iconBg} flex items-center justify-center text-white shrink-0 shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-white leading-tight">
                      {stack.name}
                    </h3>
                    <p className="text-[11px] text-[#86868B] mt-0.5 truncate">
                      {stack.persona}
                    </p>
                  </div>
                </div>

                {/* Stat meters */}
                <div className="space-y-1.5 pt-2 border-t border-white/[0.06] text-xs">
                  <div className="flex justify-between text-[#86868B] text-[11px]">
                    <span>Autonomy</span>
                    <span className="text-white font-medium">{stack.stats.autonomy}%</span>
                  </div>
                  <div className="w-full h-1 rounded-full bg-white/[0.08] overflow-hidden">
                    <div 
                      className="h-full bg-white rounded-full transition-all duration-500" 
                      style={{ width: `${stack.stats.autonomy}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[#86868B] text-[11px] pt-1">
                    <span>Est. Unit TCO</span>
                    <span className="text-[#30D158] font-medium">{stack.stats.costPerRun}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── The Physical Layered Stack Visualizer ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: The 5-Layer Stack Architecture */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Layered Stack Topology
            </h3>
            <span className="text-xs text-[#86868B]">5 Turnkey Layers</span>
          </div>

          <div className="space-y-2.5">
            {/* Layer 5: Mission / Persona */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all space-y-1">
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">
                <span>Layer 05 · Mission & Persona</span>
                <span className="text-[#2997FF]">Cognitive Top</span>
              </div>
              <h4 className="text-sm font-semibold text-white">{selectedStack.layers.persona.name}</h4>
              <p className="text-xs text-[#86868B] leading-relaxed">{selectedStack.layers.persona.desc}</p>
            </div>

            {/* Layer 4: Foundation Model */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all space-y-1">
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">
                <span>Layer 04 · Foundation Model</span>
                <span className="text-[#30D158]">Sovereign Weights</span>
              </div>
              <h4 className="text-sm font-semibold text-white">{selectedStack.layers.model.name}</h4>
              <p className="text-xs text-[#86868B]">{selectedStack.layers.model.specs}</p>
            </div>

            {/* Layer 3: Serving Runtime */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all space-y-1">
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">
                <span>Layer 03 · Serving Runtime</span>
                <span className="text-[#BF5AF2]">Silicon Inference</span>
              </div>
              <h4 className="text-sm font-semibold text-white">{selectedStack.layers.runtime.name}</h4>
              <p className="text-xs text-[#86868B]">{selectedStack.layers.runtime.specs}</p>
            </div>

            {/* Layer 2: Agent Framework & Tools */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all space-y-1">
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">
                <span>Layer 02 · Agent Framework</span>
                <span className="text-[#FF9F0A]">Tool Protocol</span>
              </div>
              <h4 className="text-sm font-semibold text-white">{selectedStack.layers.framework.name}</h4>
              <p className="text-xs text-[#86868B] mb-2">{selectedStack.layers.framework.pattern}</p>
              <div className="flex flex-wrap gap-1">
                {selectedStack.layers.framework.tools.map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-[#A1A1A6]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Layer 1: Isolated Environment & Memory */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all space-y-1">
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">
                <span>Layer 01 · Sandbox & Memory</span>
                <span className="text-[#64D2FF]">Hardware Isolation</span>
              </div>
              <h4 className="text-sm font-semibold text-white">{selectedStack.layers.sandbox.name}</h4>
              <p className="text-xs text-[#86868B]">{selectedStack.layers.sandbox.env}</p>
              <p className="text-[11px] text-[#A1A1A6] pt-1 border-t border-white/[0.04]">
                Memory: {selectedStack.layers.memory.name} ({selectedStack.layers.memory.type})
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Execution Environment */}
        <div className="lg:col-span-7 space-y-6">
          <div className="luxury-card rounded-[28px] p-7 border-white/[0.08] space-y-6 shadow-2xl">
            {/* Header with Run Trigger */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
              <div>
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span>Interactive Agent Sandbox</span>
                  <span className="w-2 h-2 rounded-full bg-[#30D158]" />
                </h3>
                <p className="text-xs text-[#86868B] mt-0.5">
                  Test and execute this agentic stack in an isolated live microVM environment
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunAgent}
                  disabled={isRunning}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-black bg-white hover:bg-[#E8E8ED] transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  <Play className={`w-3.5 h-3.5 fill-black ${isRunning ? "animate-spin" : ""}`} />
                  <span>{isRunning ? "Executing In MicroVM..." : "Test Working Agent"}</span>
                </button>
              </div>
            </div>

            {/* Segmented View Switcher */}
            <div className="flex items-center justify-between">
              <div className="flex items-center p-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
                <button
                  onClick={() => setActiveConsoleTab("logs")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeConsoleTab === "logs"
                      ? "bg-white text-black shadow-md"
                      : "text-[#86868B] hover:text-white"
                  }`}
                >
                  Execution Logs
                </button>
                <button
                  onClick={() => setActiveConsoleTab("preview")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeConsoleTab === "preview"
                      ? "bg-white text-black shadow-md"
                      : "text-[#86868B] hover:text-white"
                  }`}
                >
                  Artifact Output
                </button>
                <button
                  onClick={() => setActiveConsoleTab("docker")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeConsoleTab === "docker"
                      ? "bg-white text-black shadow-md"
                      : "text-[#86868B] hover:text-white"
                  }`}
                >
                  Docker Compose
                </button>
              </div>

              <span className="text-xs text-[#30D158] font-medium hidden sm:inline">
                {selectedStack.stats.costPerRun}
              </span>
            </div>

            {/* Console Body */}
            {activeConsoleTab === "logs" && (
              <div className="rounded-2xl bg-black/90 border border-white/[0.08] p-5 font-mono text-xs text-[#A1A1A6] space-y-2 h-[340px] overflow-y-auto leading-relaxed">
                <div className="text-[11px] text-[#86868B] pb-2 border-b border-white/[0.06] flex justify-between">
                  <span>SANDBOX SESSION: active · 4 Cores · 8GB RAM</span>
                  <span className="text-[#30D158]">CONNECTED</span>
                </div>
                {selectedStack.liveSimulation.terminalLogs.map((log, idx) => (
                  <p key={idx} className={log.includes("PASS") || log.includes("ready") || log.includes("Total Cost") ? "text-[#30D158]" : log.includes("FAIL") || log.includes("ALERT") ? "text-[#FF453A]" : "text-[#F5F5F7]"}>
                    {log}
                  </p>
                ))}
              </div>
            )}

            {activeConsoleTab === "preview" && (
              <div className="rounded-2xl bg-black/90 border border-white/[0.08] p-6 space-y-4 h-[340px] overflow-y-auto">
                <div>
                  <h4 className="text-base font-semibold text-white">
                    {selectedStack.liveSimulation.outputTitle}
                  </h4>
                  <p className="text-xs text-[#86868B] mt-0.5">
                    {selectedStack.liveSimulation.outputSubtitle}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  {selectedStack.liveSimulation.outputDetails.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <span className="text-[#86868B] block text-[11px]">{item.label}</span>
                      <span className="font-semibold text-white mt-0.5 block">{item.val}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-black border border-white/[0.06] font-mono text-xs text-[#A1A1A6] overflow-x-auto whitespace-pre">
                  <code>{selectedStack.liveSimulation.sandboxPreview}</code>
                </div>
              </div>
            )}

            {activeConsoleTab === "docker" && (
              <div className="rounded-2xl bg-black/90 border border-white/[0.08] p-5 space-y-3 h-[340px] overflow-y-auto font-mono text-xs text-[#A1A1A6]">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-white/[0.06]">
                  <span className="text-[#86868B]">docker-compose.yml</span>
                  <button
                    onClick={() => copyToClipboard(selectedStack.dockerCompose)}
                    className="inline-flex items-center gap-1 text-xs text-[#2997FF] hover:underline"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#30D158]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy Manifest"}</span>
                  </button>
                </div>
                <pre className="overflow-x-auto select-all text-xs text-[#F5F5F7] leading-relaxed">
                  <code>{selectedStack.dockerCompose}</code>
                </pre>
              </div>
            )}

            {/* Quick Actions Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.08] text-xs">
              <div className="flex items-center gap-2 text-[#86868B] font-mono">
                <span className="text-[#30D158]">$</span>
                <span className="truncate select-all max-w-[280px] sm:max-w-none">
                  {selectedStack.runCommand}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(selectedStack.runCommand)}
                  className="px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white font-medium transition"
                >
                  {copied ? "Copied Command" : "Copy CLI Run"}
                </button>
                <Link
                  href="/sandboxes"
                  className="px-3.5 py-1.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-semibold transition"
                >
                  Deploy Stack
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
