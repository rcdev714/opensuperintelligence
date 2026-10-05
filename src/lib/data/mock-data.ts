import type { Model, Paper, Harness, Combo, Database, Sandbox, ApiKey, UsageLog, GitHubRepo } from "@/types/database";

export const SEED_MODELS: Model[] = [
  {
    id: "mod_01",
    slug: "deepseek-v4-pro",
    name: "DeepSeek V4 Pro",
    provider: "DeepSeek",
    category: "reasoning",
    license: "deepseek-community",
    description: "Frontier 1.6-trillion parameter sparse MoE model engineered for advanced multi-step algorithmic reasoning, system architecture, and formal verification.",
    context_window: 131072,
    parameters: "1.6T MoE (37B active)",
    architecture: "Multi-Head Latent Attention (MLA) + DeepSeekMoE",
    input_price_per_m: 3.00,
    output_price_per_m: 15.00,
    our_input_price: 3.60,
    our_output_price: 18.00,
    api_model_id: "deepseek-chat",
    api_provider_key: "deepseek",
    is_featured: true,
    is_available: true,
    huggingface_url: "https://huggingface.co/deepseek-ai/DeepSeek-V3",
    github_url: "https://github.com/deepseek-ai/DeepSeek-V3",
    weights_url: "https://huggingface.co/deepseek-ai/DeepSeek-V3/tree/main",
    tags: ["frontier", "reasoning", "moe", "mla", "code"],
    metadata: {
      mmlu: "90.8%",
      swe_bench: "51.2%",
      throughput_tokens_per_sec: 72,
      first_token_latency_ms: 320,
    },
    created_at: "2026-09-15T00:00:00Z",
    updated_at: "2026-10-04T00:00:00Z",
  },
  {
    id: "mod_02",
    slug: "deepseek-v4-flash",
    name: "DeepSeek V4.1 Flash",
    provider: "DeepSeek",
    category: "text-generation",
    license: "deepseek-community",
    description: "Ultra-low-latency high-throughput model with native multimodal reasoning and sub-200ms TTFT for real-time autonomous agent loops.",
    context_window: 131072,
    parameters: "16B Active MoE",
    architecture: "Sparse MoE + Native Vision Encoder",
    input_price_per_m: 0.28,
    output_price_per_m: 1.40,
    our_input_price: 0.35,
    our_output_price: 1.75,
    api_model_id: "deepseek-reasoner",
    api_provider_key: "deepseek",
    is_featured: true,
    is_available: true,
    huggingface_url: "https://huggingface.co/deepseek-ai/deepseek-coder-6.7b-instruct",
    github_url: "https://github.com/deepseek-ai/DeepSeek-Coder-V2",
    weights_url: "https://huggingface.co/deepseek-ai/DeepSeek-V2.5",
    tags: ["flash", "real-time", "agents", "low-latency"],
    metadata: {
      mmlu: "85.4%",
      throughput_tokens_per_sec: 145,
      first_token_latency_ms: 180,
    },
    created_at: "2026-09-10T00:00:00Z",
    updated_at: "2026-10-04T00:00:00Z",
  },
  {
    id: "mod_03",
    slug: "kimi-k3",
    name: "Kimi K3 (Moonshot)",
    provider: "Moonshot AI",
    category: "text-generation",
    license: "custom",
    description: "Moonshot AI flagship 2.8T MoE architecture featuring Kimi Delta Attention (KDA) with 1,000,000 token context window for full-repository analysis.",
    context_window: 1048576,
    parameters: "2.8T MoE",
    architecture: "Kimi Delta Attention (KDA)",
    input_price_per_m: 3.00,
    output_price_per_m: 15.00,
    our_input_price: 3.75,
    our_output_price: 18.75,
    api_model_id: "kimi-k3",
    api_provider_key: "moonshot",
    is_featured: true,
    is_available: true,
    huggingface_url: "https://huggingface.co/moonshotai",
    github_url: "https://github.com/MoonshotAI",
    weights_url: "https://kimi.moonshot.cn",
    tags: ["1m-context", "long-horizon", "codebases", "frontier"],
    metadata: {
      context_needle_in_haystack: "99.8%",
      swe_bench: "48.9%",
      max_prompt_tokens: 1000000,
    },
    created_at: "2026-09-01T00:00:00Z",
    updated_at: "2026-10-04T00:00:00Z",
  },
  {
    id: "mod_04",
    slug: "kimi-k3-fast",
    name: "Kimi K3 Fast",
    provider: "Moonshot AI",
    category: "text-generation",
    license: "custom",
    description: "Optimized Kimi K3 deployment tier balanced for cost-efficient enterprise document parsing and recursive context summarization.",
    context_window: 262144,
    parameters: "2.8T MoE Distilled",
    architecture: "Linear Delta Attention",
    input_price_per_m: 1.00,
    output_price_per_m: 5.00,
    our_input_price: 1.25,
    our_output_price: 6.25,
    api_model_id: "kimi-k3-fast",
    api_provider_key: "moonshot",
    is_featured: false,
    is_available: true,
    huggingface_url: "https://huggingface.co/moonshotai",
    github_url: "https://github.com/MoonshotAI",
    weights_url: "https://kimi.moonshot.cn",
    tags: ["high-throughput", "cost-efficient", "search-synthesis"],
    metadata: {
      throughput_tokens_per_sec: 120,
    },
    created_at: "2026-09-05T00:00:00Z",
    updated_at: "2026-10-04T00:00:00Z",
  },
  {
    id: "mod_05",
    slug: "qwen-2-5-coder-32b",
    name: "Qwen 2.5 Coder 32B",
    provider: "Alibaba",
    category: "code-generation",
    license: "apache-2.0",
    description: "The premier open-weights coding model. SOTA on HumanEval, SWE-bench, and multi-file code editing, beating proprietary code models.",
    context_window: 131072,
    parameters: "32B Dense",
    architecture: "RoPE Transformer",
    input_price_per_m: 0.80,
    output_price_per_m: 3.20,
    our_input_price: 1.00,
    our_output_price: 4.00,
    api_model_id: "qwen2.5-coder-32b-instruct",
    api_provider_key: "custom",
    is_featured: true,
    is_available: true,
    huggingface_url: "https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct",
    github_url: "https://github.com/QwenLM/Qwen2.5-Coder",
    weights_url: "https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct/tree/main",
    tags: ["swe-bench", "code-review", "fullstack", "apache-2.0"],
    metadata: {
      humaneval: "92.7%",
      swe_bench_verified: "41.6%",
    },
    created_at: "2026-08-20T00:00:00Z",
    updated_at: "2026-10-04T00:00:00Z",
  },
  {
    id: "mod_06",
    slug: "qwen-3-235b",
    name: "Qwen 3 235B Reasoning MoE",
    provider: "Alibaba",
    category: "reasoning",
    license: "apache-2.0",
    description: "Frontier open MoE architecture with 235B total parameters and 22B active per token. Built with native test-time compute scaling and formal logic synthesis.",
    context_window: 131072,
    parameters: "235B MoE (22B active)",
    architecture: "SwiGLU MoE + GQA",
    input_price_per_m: 1.80,
    output_price_per_m: 7.20,
    our_input_price: 2.20,
    our_output_price: 8.80,
    api_model_id: "qwen-3-235b-instruct",
    api_provider_key: "custom",
    is_featured: true,
    is_available: true,
    huggingface_url: "https://huggingface.co/Qwen/Qwen-3-235B-A22B",
    github_url: "https://github.com/QwenLM/Qwen3",
    weights_url: "https://huggingface.co/Qwen/Qwen-3-235B-A22B/tree/main",
    tags: ["frontier-moe", "reasoning", "math", "apache-2.0"],
    metadata: {
      math_500: "94.2%",
      gpqa_diamond: "68.4%",
    },
    created_at: "2026-09-28T00:00:00Z",
    updated_at: "2026-10-04T00:00:00Z",
  },
  {
    id: "mod_07",
    slug: "llama-4-maverick",
    name: "Llama 4 Maverick",
    provider: "Meta",
    category: "text-generation",
    license: "llama-community",
    description: "Meta frontier open foundation model with native multimodal reasoning, instruction-tuning, and calibrated enterprise tool calling.",
    context_window: 1048576,
    parameters: "400B MoE",
    architecture: "Grouped-Query Attention (GQA)",
    input_price_per_m: 0.30,
    output_price_per_m: 0.45,
    our_input_price: 0.38,
    our_output_price: 0.58,
    api_model_id: "llama-4-maverick",
    api_provider_key: "custom",
    is_featured: false,
    is_available: true,
    huggingface_url: "https://huggingface.co/meta-llama",
    github_url: "https://github.com/meta-llama/llama",
    weights_url: "https://llama.meta.com",
    tags: ["meta", "open-weights", "tool-calling", "multimodal"],
    metadata: {
      context_length: "1M",
    },
    created_at: "2026-09-18T00:00:00Z",
    updated_at: "2026-10-04T00:00:00Z",
  },
  {
    id: "mod_08",
    slug: "mistral-large-2411",
    name: "Mistral Large 2 (123B)",
    provider: "Mistral AI",
    category: "text-generation",
    license: "custom",
    description: "Mistral flagship model with 123B dense parameters, 128k context window, exceptional multilingual capabilities across 80+ languages, and top-tier function calling.",
    context_window: 131072,
    parameters: "123B Dense",
    architecture: "Decoupled GQA + Sliding Window",
    input_price_per_m: 2.00,
    output_price_per_m: 6.00,
    our_input_price: 2.50,
    our_output_price: 7.50,
    api_model_id: "mistral-large-2411",
    api_provider_key: "custom",
    is_featured: false,
    is_available: true,
    huggingface_url: "https://huggingface.co/mistralai/Mistral-Large-Instruct-2411",
    github_url: "https://github.com/mistralai/mistral-src",
    weights_url: "https://huggingface.co/mistralai/Mistral-Large-Instruct-2411/tree/main",
    tags: ["mistral", "multilingual", "function-calling", "128k"],
    metadata: {
      mmlu: "84.0%",
    },
    created_at: "2026-08-25T00:00:00Z",
    updated_at: "2026-10-04T00:00:00Z",
  },
  {
    id: "mod_09",
    slug: "starcoder-2-15b",
    name: "StarCoder 2 15B",
    provider: "BigCode Project",
    category: "code-generation",
    license: "apache-2.0",
    description: "Trained on 600+ programming languages from The Stack v2. Transparently licensed open code intelligence model with fill-in-the-middle capability.",
    context_window: 16384,
    parameters: "15B Dense",
    architecture: "Multi-Query Attention (MQA)",
    input_price_per_m: 0.20,
    output_price_per_m: 0.60,
    our_input_price: 0.25,
    our_output_price: 0.75,
    api_model_id: "starcoder2-15b",
    api_provider_key: "custom",
    is_featured: false,
    is_available: true,
    huggingface_url: "https://huggingface.co/bigcode/starcoder2-15b",
    github_url: "https://github.com/bigcode-project/starcoder2",
    weights_url: "https://huggingface.co/bigcode/starcoder2-15b/tree/main",
    tags: ["code-infilling", "bigcode", "the-stack", "apache-2.0"],
    metadata: {
      languages: "600+",
    },
    created_at: "2026-07-20T00:00:00Z",
    updated_at: "2026-10-04T00:00:00Z",
  },
  {
    id: "mod_10",
    slug: "phi-4",
    name: "Microsoft Phi-4 (14B)",
    provider: "Microsoft Research",
    category: "reasoning",
    license: "mit",
    description: "SOTA 14B parameter reasoning model trained exclusively on synthetic textbooks and high-grade verified logic data. Surpasses models 5x its parameter count.",
    context_window: 16384,
    parameters: "14B Dense",
    architecture: "Dense Transformer",
    input_price_per_m: 0.15,
    output_price_per_m: 0.45,
    our_input_price: 0.19,
    our_output_price: 0.58,
    api_model_id: "phi-4",
    api_provider_key: "custom",
    is_featured: false,
    is_available: true,
    huggingface_url: "https://huggingface.co/microsoft/phi-4",
    github_url: "https://github.com/microsoft/Phi-4",
    weights_url: "https://huggingface.co/microsoft/phi-4/tree/main",
    tags: ["compact-reasoner", "synthetic-data", "mit", "math"],
    metadata: {
      math_competition: "80.4%",
    },
    created_at: "2026-09-01T00:00:00Z",
    updated_at: "2026-10-04T00:00:00Z",
  },
  {
    id: "mod_11",
    slug: "flux-2-pro",
    name: "FLUX.2 Pro Image",
    provider: "Black Forest Labs",
    category: "image-generation",
    license: "apache-2.0",
    description: "State-of-the-art open diffusion model with supreme typography adherence, complex spatial prompt comprehension, and photorealistic rendering.",
    context_window: null,
    parameters: "12B Flow Transformer",
    architecture: "Rectified Flow Transformer",
    input_price_per_m: 0.03,
    output_price_per_m: 0.03,
    our_input_price: 0.04,
    our_output_price: 0.04,
    api_model_id: "flux-2",
    api_provider_key: "custom",
    is_featured: false,
    is_available: true,
    huggingface_url: "https://huggingface.co/black-forest-labs/FLUX.1-schnell",
    github_url: "https://github.com/black-forest-labs/flux",
    weights_url: "https://huggingface.co/black-forest-labs/FLUX.1-schnell/tree/main",
    tags: ["diffusion", "photorealism", "typography", "design"],
    metadata: {
      resolution: "Up to 2048x2048",
      latency_seconds: 4.2,
    },
    created_at: "2026-08-10T00:00:00Z",
    updated_at: "2026-10-04T00:00:00Z",
  },
  {
    id: "mod_12",
    slug: "whisper-large-v3",
    name: "Whisper Large V3 Turbo",
    provider: "OpenAI / Open-Weights",
    category: "audio-transcription",
    license: "mit",
    description: "Universal multi-lingual speech-to-text with zero-shot timestamping, speaker diarization tags, and robust acoustic background noise rejection.",
    context_window: null,
    parameters: "1.5B Encoder-Decoder",
    architecture: "Seq2Seq Transformer",
    input_price_per_m: 0.006,
    output_price_per_m: 0.006,
    our_input_price: 0.008,
    our_output_price: 0.008,
    api_model_id: "whisper-large-v3",
    api_provider_key: "custom",
    is_featured: false,
    is_available: true,
    huggingface_url: "https://huggingface.co/openai/whisper-large-v3-turbo",
    github_url: "https://github.com/openai/whisper",
    weights_url: "https://huggingface.co/openai/whisper-large-v3-turbo/tree/main",
    tags: ["audio", "transcription", "subtitles", "multilingual"],
    metadata: {
      wer_librispeech: "2.1%",
    },
    created_at: "2026-07-15T00:00:00Z",
    updated_at: "2026-10-04T00:00:00Z",
  },
  {
    id: "mod_13",
    slug: "kokoro-82m",
    name: "Kokoro 82M Neural TTS",
    provider: "Hexgrad / Open Source",
    category: "audio-speech",
    license: "apache-2.0",
    description: "Ultra-lightweight 82M parameter neural speech synthesizer capable of real-time edge voice streaming with natural inflection and human cadence.",
    context_window: null,
    parameters: "82M",
    architecture: "StyleTTS2 + iSTFTNet",
    input_price_per_m: 0.002,
    output_price_per_m: 0.002,
    our_input_price: 0.003,
    our_output_price: 0.003,
    api_model_id: "kokoro-v1",
    api_provider_key: "custom",
    is_featured: false,
    is_available: true,
    huggingface_url: "https://huggingface.co/hexgrad/Kokoro-82M",
    github_url: "https://github.com/hexgrad/kokoro",
    weights_url: "https://huggingface.co/hexgrad/Kokoro-82M/tree/main",
    tags: ["tts", "real-time-voice", "edge", "apache-2.0"],
    metadata: {
      rtf: 0.02,
      voices: ["af_bella", "af_sarah", "am_adam", "am_michael"],
    },
    created_at: "2026-08-01T00:00:00Z",
    updated_at: "2026-10-04T00:00:00Z",
  },
  {
    id: "mod_14",
    slug: "bge-m3",
    name: "BAAI BGE-M3 Multilingual Embedding",
    provider: "BAAI (Beijing Academy of AI)",
    category: "embedding",
    license: "mit",
    description: "Universal multilingual embedding model supporting dense retrieval, multi-vector (ColBERT-style), and sparse lexical retrieval simultaneously across 100+ languages.",
    context_window: 8192,
    parameters: "567M",
    architecture: "XLM-RoBERTa + Multi-Granularity Head",
    input_price_per_m: 0.02,
    output_price_per_m: 0.02,
    our_input_price: 0.025,
    our_output_price: 0.025,
    api_model_id: "bge-m3",
    api_provider_key: "custom",
    is_featured: false,
    is_available: true,
    huggingface_url: "https://huggingface.co/BAAI/bge-m3",
    github_url: "https://github.com/FlagOpen/FlagEmbedding",
    weights_url: "https://huggingface.co/BAAI/bge-m3/tree/main",
    tags: ["dense-sparse-hybrid", "embedding", "multilingual", "rag"],
    metadata: {
      dim: 1024,
      mteb_score: "64.8",
    },
    created_at: "2026-08-15T00:00:00Z",
    updated_at: "2026-10-04T00:00:00Z",
  },
  {
    id: "mod_15",
    slug: "wan-2-1-video",
    name: "Wan 2.1 Video (Sundance)",
    provider: "Wan-Video / Open Source",
    category: "video-generation",
    license: "apache-2.0",
    description: "SOTA 14B open-weights video foundation model powering Sundance Cinematic Studio. Generates photorealistic 1080p video at 16fps with 3D Causal VAE and flow matching.",
    context_window: null,
    parameters: "14B Flow DiT",
    architecture: "3D Causal VAE + Flow Matching Diffusion Transformer",
    input_price_per_m: 0.05,
    output_price_per_m: 0.05,
    our_input_price: 0.06,
    our_output_price: 0.06,
    api_model_id: "wan-2.1-video-14b",
    api_provider_key: "custom",
    is_featured: true,
    is_available: true,
    huggingface_url: "https://huggingface.co/Wan-AI/Wan2.1-T2V-14B",
    github_url: "https://github.com/Wan-Video/Wan2.1",
    weights_url: "https://huggingface.co/Wan-AI/Wan2.1-T2V-14B/tree/main",
    tags: ["video", "sundance", "1080p", "cinematic", "flow-matching"],
    metadata: {
      max_resolution: "1080p",
      fps: 16,
      motion_quality: "96.4%",
      sundance_studio_ready: true,
    },
    created_at: "2026-09-20T00:00:00Z",
    updated_at: "2026-10-04T00:00:00Z",
  },
  {
    id: "mod_16",
    slug: "hunyuan-video",
    name: "HunyuanVideo Foundation",
    provider: "Tencent / Open-Weights",
    category: "video-generation",
    license: "apache-2.0",
    description: "Frontier open-weights 13B dual-stream diffusion transformer for high-resolution cinematic video synthesis with dynamic camera kinematics.",
    context_window: null,
    parameters: "13B Dual-Stream DiT",
    architecture: "Dual-Stream Transformer + Spatio-Temporal VAE",
    input_price_per_m: 0.04,
    output_price_per_m: 0.04,
    our_input_price: 0.05,
    our_output_price: 0.05,
    api_model_id: "hunyuan-video",
    api_provider_key: "custom",
    is_featured: false,
    is_available: true,
    huggingface_url: "https://huggingface.co/tencent/HunyuanVideo",
    github_url: "https://github.com/Tencent/HunyuanVideo",
    weights_url: "https://huggingface.co/tencent/HunyuanVideo/tree/main",
    tags: ["video", "cinematic", "dit", "camera-motion"],
    metadata: {
      resolution: "720p/1080p",
      fps: 24,
    },
    created_at: "2026-09-10T00:00:00Z",
    updated_at: "2026-10-04T00:00:00Z",
  },
  {
    id: "mod_17",
    slug: "meta-content-brain",
    name: "Meta Content Brain (Multimodal)",
    provider: "Meta AI",
    category: "multimodal",
    license: "llama-community",
    description: "Meta omnimodal intelligence foundation combining Segment Anything 2 (SAM 2) video spatial tracking with Llama 4 Scout cross-modal knowledge graph memory.",
    context_window: 1048576,
    parameters: "400B MoE + SAM 2",
    architecture: "Meta Chameleon + SAM 2 Spatial Tracking + Cross-Modal Graph",
    input_price_per_m: 0.80,
    output_price_per_m: 2.40,
    our_input_price: 1.00,
    our_output_price: 3.00,
    api_model_id: "meta-content-brain-v1",
    api_provider_key: "custom",
    is_featured: true,
    is_available: true,
    huggingface_url: "https://huggingface.co/facebook/sam2",
    github_url: "https://github.com/facebookresearch/sam2",
    weights_url: "https://ai.meta.com/research",
    tags: ["meta", "content-brain", "sam-2", "video-tracking", "omnimodal"],
    metadata: {
      video_tokens_per_stream: "128k",
      sam2_mask_fps: 30,
      graph_indexing: "Neo4j / Cypher",
    },
    created_at: "2026-09-25T00:00:00Z",
    updated_at: "2026-10-04T00:00:00Z",
  },
];

export const SEED_HARNESSES: Harness[] = [
  {
    id: "harn_01",
    slug: "vllm",
    name: "vLLM High-Throughput Inference Engine",
    description: "High-throughput and memory-efficient LLM serving engine featuring PagedAttention, continuous batching, and chunked prefill.",
    type: "deployment",
    github_url: "https://github.com/vllm-project/vllm",
    documentation_url: "https://docs.vllm.ai",
    website_url: "https://vllm.ai",
    install_command: "pip install vllm",
    docker_command: "docker run --gpus all -v ~/.cache/huggingface:/root/.cache/huggingface -p 8000:8000 --ipc=host vllm/vllm-openai:latest",
    tags: ["serving", "paged-attention", "gpu-cluster", "openai-compatible"],
    stars: 42800,
    is_featured: true,
    created_at: "2026-09-01T00:00:00Z",
  },
  {
    id: "harn_02",
    slug: "sglang",
    name: "SGLang Structured Generation Runtime",
    description: "Fast serving framework for large language models and vision-language models with RadixAttention for multi-turn KV cache reuse.",
    type: "deployment",
    github_url: "https://github.com/sgl-project/sglang",
    documentation_url: "https://sgl-project.github.io",
    website_url: "https://sgl-project.github.io",
    install_command: 'pip install "sglang[all]"',
    docker_command: "docker run --gpus all -p 30000:30000 --ipc=host lmsysorg/sglang:latest",
    tags: ["radix-attention", "structured-outputs", "vision", "kv-cache-reuse"],
    stars: 12500,
    is_featured: true,
    created_at: "2026-08-28T00:00:00Z",
  },
  {
    id: "harn_03",
    slug: "tensorrt-llm",
    name: "NVIDIA TensorRT-LLM Serving",
    description: "NVIDIA open-source library for compiling and deploying LLMs on Tensor Core GPUs with in-flight batching, FP8 GEMMs, and tensor parallelism.",
    type: "deployment",
    github_url: "https://github.com/NVIDIA/TensorRT-LLM",
    documentation_url: "https://nvidia.github.io/TensorRT-LLM",
    website_url: "https://developer.nvidia.com/tensorrt-llm",
    install_command: "pip install tensorrt_llm -U --extra-index-url https://pypi.nvidia.com",
    docker_command: "docker run --gpus all -it --ipc=host nvcr.io/nvidia/tritonserver:24.08-trtllm-py3",
    tags: ["nvidia", "hopper-fp8", "in-flight-batching", "tensor-parallel"],
    stars: 11200,
    is_featured: false,
    created_at: "2026-08-20T00:00:00Z",
  },
  {
    id: "harn_04",
    slug: "tgi",
    name: "Hugging Face Text Generation Inference (TGI)",
    description: "Production toolkit for deploying LLMs at scale with FlashAttention, speculative decoding, and native token streaming.",
    type: "deployment",
    github_url: "https://github.com/huggingface/text-generation-inference",
    documentation_url: "https://huggingface.co/docs/text-generation-inference",
    website_url: "https://huggingface.co",
    install_command: "cargo install --path router",
    docker_command: "docker run --gpus all --shm-size 1g -p 8080:80 -v $volume:/data ghcr.io/huggingface/text-generation-inference:latest",
    tags: ["huggingface", "speculative-decoding", "flash-attention", "production"],
    stars: 21500,
    is_featured: true,
    created_at: "2026-08-15T00:00:00Z",
  },
  {
    id: "harn_05",
    slug: "ollama",
    name: "Ollama Local Inference Server",
    description: "Get up and running with Llama 3.3, DeepSeek, and Hermes locally with unified REST API, GPU acceleration, and zero-config binary.",
    type: "local-runtime",
    github_url: "https://github.com/ollama/ollama",
    documentation_url: "https://ollama.com",
    website_url: "https://ollama.com",
    install_command: "curl -fsSL https://ollama.com/install.sh | sh",
    download_url: "https://ollama.com/download",
    docker_command: "docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama",
    tags: ["local-runtime", "apple-metal", "cuda", "zero-config"],
    stars: 118000,
    is_featured: true,
    created_at: "2026-09-18T00:00:00Z",
  },
  {
    id: "harn_06",
    slug: "llama-cpp",
    name: "llama.cpp Pure C/C++ Inference",
    description: "Ultra-fast LLM inference in pure C/C++ with zero external dependencies. State-of-the-art quantization (GGUF, 2-bit to 8-bit) and Apple Metal / CUDA acceleration.",
    type: "local-runtime",
    github_url: "https://github.com/ggerganov/llama.cpp",
    documentation_url: "https://github.com/ggerganov/llama.cpp/tree/master/docs",
    website_url: "https://github.com/ggerganov/llama.cpp",
    install_command: "brew install llama.cpp # or git clone && make",
    download_url: "https://github.com/ggerganov/llama.cpp/releases",
    docker_command: "docker run -p 8080:8080 -v /models:/models ghcr.io/ggerganov/llama.cpp:server -m /models/model.gguf",
    tags: ["gguf", "quantization", "apple-metal", "pure-cpp"],
    stars: 76400,
    is_featured: true,
    created_at: "2026-08-01T00:00:00Z",
  },
  {
    id: "harn_07",
    slug: "litellm",
    name: "LiteLLM Enterprise AI Gateway & Proxy",
    description: "Unified OpenAI-compatible proxy gateway for 100+ LLMs with dynamic load-balancing, spend tracking, prompt guardrails, and automated failover routing.",
    type: "gateway",
    github_url: "https://github.com/BerriAI/litellm",
    documentation_url: "https://docs.litellm.ai",
    website_url: "https://litellm.ai",
    install_command: "pip install litellm",
    docker_command: "docker run -p 4000:4000 ghcr.io/berriai/litellm:main-latest",
    tags: ["proxy-gateway", "load-balancing", "spend-tracking", "openai-compatible"],
    stars: 22800,
    is_featured: true,
    created_at: "2026-09-15T00:00:00Z",
  },
  {
    id: "harn_08",
    slug: "hermes-agent",
    name: "Nous Research Hermes Agent Harness",
    description: "Autonomous task execution framework engineered for Hermes 3, utilizing native XML tool schemas, persistent session state, and MCP server bridges.",
    type: "agent-framework",
    github_url: "https://github.com/NousResearch/Hermes-Function-Calling",
    documentation_url: "https://hermes.nousresearch.com/docs",
    website_url: "https://nousresearch.com",
    install_command: "pip install hermes-agent",
    tags: ["tool-calling", "nous-research", "mcp-ready", "autonomous-loop"],
    stars: 8400,
    is_featured: true,
    created_at: "2026-09-22T00:00:00Z",
  },
  {
    id: "harn_09",
    slug: "langgraph",
    name: "LangGraph Multi-Agent Orchestrator",
    description: "Build stateful, multi-actor applications with LLMs using graph-based control flow, cyclic execution loops, human-in-the-loop validation, and persistent checkpoints.",
    type: "agent-framework",
    github_url: "https://github.com/langchain-ai/langgraph",
    documentation_url: "https://langchain-ai.github.io/langgraph",
    website_url: "https://langchain.com/langgraph",
    install_command: "pip install -U langgraph",
    tags: ["cyclic-graphs", "human-in-the-loop", "stateful-agents", "checkpointing"],
    stars: 18900,
    is_featured: true,
    created_at: "2026-09-08T00:00:00Z",
  },
  {
    id: "harn_10",
    slug: "llamaindex",
    name: "LlamaIndex Enterprise RAG Framework",
    description: "The complete data framework for LLMs: connecting private data sources to foundation models via advanced document parsing, hierarchical indexing, and query engines.",
    type: "agent-framework",
    github_url: "https://github.com/run-llama/llama_index",
    documentation_url: "https://docs.llamaindex.ai",
    website_url: "https://llamaindex.ai",
    install_command: "pip install llama-index",
    tags: ["enterprise-rag", "document-parsing", "query-engine", "hybrid-search"],
    stars: 39200,
    is_featured: true,
    created_at: "2026-08-25T00:00:00Z",
  },
  {
    id: "harn_11",
    slug: "crewai",
    name: "CrewAI Autonomous Agent Swarms",
    description: "Framework for orchestrating role-playing, autonomous AI agents. Foster collaborative intelligence where agents delegate tasks, invoke tools, and share memory.",
    type: "agent-framework",
    github_url: "https://github.com/crewAIInc/crewAI",
    documentation_url: "https://docs.crewai.com",
    website_url: "https://crewai.com",
    install_command: "pip install crewai",
    tags: ["multi-agent", "role-playing", "delegation", "task-swarms"],
    stars: 28400,
    is_featured: true,
    created_at: "2026-09-10T00:00:00Z",
  },
  {
    id: "harn_12",
    slug: "dspy",
    name: "DSPy Declarative Agent Framework",
    description: "Stanford framework for programming—rather than prompting—foundation models with automatic compilation and teleprompter optimization.",
    type: "agent-framework",
    github_url: "https://github.com/stanfordnlp/dspy",
    documentation_url: "https://dspy-docs.vercel.app",
    website_url: "https://dspy.ai",
    install_command: "pip install dspy-ai",
    tags: ["prompt-compiler", "optimization", "teleprompter"],
    stars: 21200,
    is_featured: false,
    created_at: "2026-08-12T00:00:00Z",
  },
  {
    id: "harn_13",
    slug: "aider",
    name: "Aider Terminal AI Pair Programmer",
    description: "Command line pair programming in your terminal. Edits multiple git-tracked files with automatic commit hashes and diff verification.",
    type: "agent-framework",
    github_url: "https://github.com/paul-gauthier/aider",
    documentation_url: "https://aider.chat",
    website_url: "https://aider.chat",
    install_command: "pip install aider-chat",
    tags: ["git-workflow", "cli", "code-editing", "swe-agent"],
    stars: 28900,
    is_featured: true,
    created_at: "2026-09-02T00:00:00Z",
  },
  {
    id: "harn_14",
    slug: "open-interpreter",
    name: "Open Interpreter Local Code Execution",
    description: "Open-source, locally executing code interpreter that gives LLMs a bash shell, Python runtime, and browser control to accomplish complex computer tasks.",
    type: "agent-framework",
    github_url: "https://github.com/openinterpreter/open-interpreter",
    documentation_url: "https://docs.openinterpreter.com",
    website_url: "https://openinterpreter.com",
    install_command: "pip install open-interpreter",
    tags: ["local-execution", "bash", "python-repl", "computer-use"],
    stars: 56100,
    is_featured: true,
    created_at: "2026-08-18T00:00:00Z",
  },
  {
    id: "harn_15",
    slug: "kernel-agent-runtime",
    name: "Kernel.sh Agent BaaS Harness",
    description: "High-performance unikernel browser infrastructure with remote Chromium microVMs, Playwright integration, and sub-150ms startup.",
    type: "deployment",
    github_url: "https://github.com/onkernel/kernel",
    documentation_url: "https://kernel.sh/docs",
    website_url: "https://kernel.sh",
    install_command: "npm install @onkernel/ai-sdk",
    tags: ["browser-agent", "sandboxes", "playwright", "stealth"],
    stars: 6400,
    is_featured: true,
    created_at: "2026-09-10T00:00:00Z",
  },
  {
    id: "harn_16",
    slug: "lm-evaluation-harness",
    name: "EleutherAI LM Evaluation Harness",
    description: "The standard framework for few-shot evaluation of language models across hundreds of benchmarks (MMLU, GSM8K, HumanEval, ARC).",
    type: "evaluation",
    github_url: "https://github.com/EleutherAI/lm-evaluation-harness",
    documentation_url: "https://github.com/EleutherAI/lm-evaluation-harness/blob/main/docs/README.md",
    website_url: "https://www.eleuther.ai",
    install_command: "pip install lm_eval",
    tags: ["benchmark", "evaluation", "mmlu", "gsm8k"],
    stars: 18500,
    is_featured: false,
    created_at: "2026-08-15T00:00:00Z",
  },
  {
    id: "harn_17",
    slug: "open-webui",
    name: "Open-WebUI Enterprise Interface",
    description: "Self-hosted AI interface for enterprise teams. Integrates seamlessly with Ollama, vLLM, and OpenSuperIntelligence proxy endpoints with RBAC.",
    type: "observability",
    github_url: "https://github.com/open-webui/open-webui",
    documentation_url: "https://docs.openwebui.com",
    website_url: "https://openwebui.com",
    install_command: "docker run -d -p 3000:8080 -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main",
    docker_command: "docker run -d -p 3000:8080 -e OPENAI_API_BASE_URL=http://localhost:3000/api/v1 ghcr.io/open-webui/open-webui:main",
    tags: ["web-ui", "enterprise-rbac", "chatgpt-alternative"],
    stars: 68500,
    is_featured: true,
    created_at: "2026-09-05T00:00:00Z",
  },
  {
    id: "harn_18",
    slug: "unsloth",
    name: "Unsloth High-Speed Fine-Tuner",
    description: "5x faster fine-tuning for DeepSeek, Llama, and Qwen with 80% less VRAM usage. Native export to GGUF, Ollama, and HuggingFace Hub.",
    type: "fine-tuning",
    github_url: "https://github.com/unslothai/unsloth",
    documentation_url: "https://docs.unsloth.ai",
    website_url: "https://unsloth.ai",
    install_command: 'pip install "unsloth[colab-new] @ git+https://github.com/unslothai/unsloth.git"',
    tags: ["fine-tuning", "vram-efficient", "lora", "qlora"],
    stars: 24500,
    is_featured: true,
    created_at: "2026-09-12T00:00:00Z",
  },
  {
    id: "harn_19",
    slug: "outlines",
    name: "Outlines Guided Text Generation",
    description: "Guarantees that language model completions match arbitrary regex patterns, Pydantic JSON schemas, and grammar rules with zero parse errors.",
    type: "structured-output",
    github_url: "https://github.com/dottxt-ai/outlines",
    documentation_url: "https://outlines-dev.github.io/outlines",
    website_url: "https://dottxt.co",
    install_command: "pip install outlines",
    tags: ["json-schema", "finite-state-machine", "regex-guidance"],
    stars: 12200,
    is_featured: false,
    created_at: "2026-08-30T00:00:00Z",
  },
  {
    id: "harn_20",
    slug: "arize-phoenix",
    name: "Arize Phoenix AI Tracing & Observability",
    description: "AI observability platform for LLM evaluation, trace visualization, latency decomposition, and automated evals using the OpenInference standard.",
    type: "observability",
    github_url: "https://github.com/Arize-ai/phoenix",
    documentation_url: "https://docs.arize.com/phoenix",
    website_url: "https://phoenix.arize.com",
    install_command: "pip install arize-phoenix",
    docker_command: "docker run -p 6006:6006 arizephoenix/phoenix:latest",
    tags: ["observability", "tracing", "evals", "openinference"],
    stars: 6200,
    is_featured: false,
    created_at: "2026-09-01T00:00:00Z",
  },
];

export const SEED_COMBOS: Combo[] = [
  {
    id: "combo_01",
    slug: "autonomous-web-researcher",
    title: "Autonomous Web & ArXiv Research Swarm",
    tagline: "DeepSeek V4.1 Flash + Hermes Agent + Kernel.sh Browser + Tavily AI",
    description: "End-to-end autonomous research swarm that investigates technical questions, opens remote Chromium tabs in Kernel.sh to bypass CAPTCHAs, searches ArXiv preprints via Tavily, and compiles verified technical reports.",
    model: "DeepSeek V4.1 Flash (Sub-200ms TTFT)",
    runtime: "OpenSuperIntelligence Inference Gateway (/api/v1/chat/completions)",
    harness: "Nous Research Hermes Agent Harness (Native XML Tool Loops)",
    sandbox: "Kernel.sh MicroVM (Chromium ARM64 + Residential Stealth)",
    database: "ClickHouse Columnar Telemetry",
    category: "research",
    difficulty: "production-grade",
    stars: 480,
    architecture_notes: [
      "Hermes Agent loop emits <tool_call> tags intercepted by OpenSuperIntelligence proxy.",
      "Kernel.sh provisions sub-150ms remote browser microVMs for live DOM extraction.",
      "Tavily grounding verifies citations against peer-reviewed ArXiv and GitHub sources.",
      "All requests metered with transparent +20% operating margin via API key.",
    ],
    run_command: "osi run combo:autonomous-web-researcher --goal='Benchmark FP8 attention on Hopper GPUs'",
    docker_compose: `version: "3.8"
services:
  hermes-research-agent:
    image: nousresearch/hermes-agent:latest
    environment:
      - OPENAI_API_BASE=https://osi.arcanetechnologies.org/api/v1
      - OPENAI_API_KEY=\${OSI_API_KEY}
      - KERNEL_API_KEY=\${KERNEL_API_KEY}
      - TAVILY_API_KEY=\${TAVILY_API_KEY}
      - DEFAULT_MODEL=deepseek-v4-flash
    command: ["run", "--harness", "research-swarm"]
    restart: unless-stopped`,
  },
  {
    id: "combo_02",
    slug: "sovereign-coding-agent",
    title: "Sovereign Enterprise Code Intelligence",
    tagline: "Qwen 2.5 Coder 32B + vLLM Serving + Aider / Claude Code + Docker",
    description: "Private code generation and repository debugging environment. Beats proprietary alternatives on SWE-bench without leaking intellectual property or training data.",
    model: "Qwen 2.5 Coder 32B Instruct",
    runtime: "vLLM Continuous Batching (Tensor Parallel 2 on 2x A100/H100)",
    harness: "Aider CLI / OpenSuperIntelligence MCP for Claude Code",
    sandbox: "Isolated Docker Execution Container",
    database: "Qdrant Vector DB (Repo AST Chunk Indexing)",
    category: "coding",
    difficulty: "production-grade",
    stars: 920,
    architecture_notes: [
      "vLLM PagedAttention achieves 4.2x higher throughput than unoptimized baselines.",
      "Qdrant indexes syntax tree chunks with dense embeddings for semantic search.",
      "Claude Code / Cursor connects via OpenSuperIntelligence MCP server protocol.",
      "Automatic git commits and test suite verification in Docker sandboxes.",
    ],
    run_command: "aider --openai-api-base http://localhost:3000/api/v1 --model qwen-2-5-coder-32b",
    docker_compose: `version: "3.8"
services:
  vllm-qwen:
    image: vllm/vllm-openai:latest
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 2
              capabilities: [gpu]
    command: ["--model", "Qwen/Qwen2.5-Coder-32B-Instruct", "--tensor-parallel-size", "2", "--port", "8000"]
    ports:
      - "8000:8000"

  qdrant:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"
    volumes:
      - qdrant_storage:/qdrant/storage

volumes:
  qdrant_storage:`,
  },
  {
    id: "combo_03",
    slug: "airgapped-private-copilot",
    title: "Airgapped Local Enterprise Copilot",
    tagline: "Nous Hermes 3 70B + Ollama + Open-WebUI + DuckDB",
    description: "Zero external network reliance. Runs completely on Mac Studio / workstation clusters with high-speed Apple Silicon Unified Memory or single-node NVIDIA workstation.",
    model: "Nous Hermes 3 Llama-3.1 70B (GGUF Q4_K_M)",
    runtime: "Ollama Local Engine (Metal / CUDA)",
    harness: "Open-WebUI Multi-User Enterprise Workspace",
    database: "DuckDB In-Process Analytics",
    category: "local-private",
    difficulty: "beginner",
    stars: 1450,
    architecture_notes: [
      "100% offline and confidential — no data leaves local hardware.",
      "Open-WebUI provides full RBAC, document RAG, and prompt library.",
      "Ollama manages model weights, memory offloading, and continuous warmup.",
    ],
    run_command: "ollama run hermes3:70b && docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway ghcr.io/open-webui/open-webui:main",
    docker_compose: `version: "3.8"
services:
  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ollama_models:/root/.ollama

  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    ports:
      - "8080:8080"
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434
    depends_on:
      - ollama

volumes:
  ollama_models:`,
  },
  {
    id: "combo_04",
    slug: "long-horizon-enterprise-rag",
    title: "Long-Horizon Regulatory & Contract Analysis",
    tagline: "Kimi K3 (1M Context) + DSPy Teleprompter + Qdrant + ClickHouse",
    description: "Ingests entire 500-page corporate filing corpora, legal filings, and technical specifications into a single 1,000,000 token context window with linear attention scaling.",
    model: "Moonshot Kimi K3 (Kimi Delta Attention)",
    runtime: "OpenSuperIntelligence Proxy Gateway",
    harness: "DSPy Compiled Retrieval & Multi-Hop Reasoner",
    database: "Qdrant Vector + ClickHouse Audit Ledger",
    category: "enterprise-rag",
    difficulty: "production-grade",
    stars: 610,
    architecture_notes: [
      "Ingests up to 1,000,000 tokens per prompt with 99.8% needle-in-haystack recall.",
      "DSPy compiles recursive self-correcting prompt strategies automatically.",
      "ClickHouse logs full citation trees and token economics for internal compliance.",
    ],
    run_command: "osi run combo:long-horizon-enterprise-rag --corpus='./corporate-filings/*.pdf'",
    docker_compose: `version: "3.8"
services:
  rag-orchestrator:
    build: .
    environment:
      - OSI_API_KEY=\${OSI_API_KEY}
      - OSI_MODEL=kimi-k3
      - QDRANT_URL=http://qdrant:6333
      - CLICKHOUSE_URL=http://clickhouse:8123
    depends_on:
      - qdrant
      - clickhouse

  qdrant:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"

  clickhouse:
    image: clickhouse/clickhouse-server:latest
    ports:
      - "8123:8123"`,
  },
  {
    id: "combo_05",
    slug: "crewai-swarms",
    title: "Multi-Agent Enterprise Strategy & Code Swarm",
    tagline: "DeepSeek V4 Pro + CrewAI + Kernel.sh + Qdrant",
    description: "Multi-agent collaborative swarm where Product Manager, System Architect, and SWE agents autonomously deliberate, plan architecture specs, run tests in microVMs, and output audited PRs.",
    model: "DeepSeek V4 Pro (Frontier 1.6T MoE)",
    runtime: "OpenSuperIntelligence Gateway (/api/v1/chat/completions)",
    harness: "CrewAI Multi-Agent Delegation Framework",
    sandbox: "Kernel.sh MicroVM Testbed",
    database: "Qdrant Vector Knowledge Base",
    category: "multi-agent",
    difficulty: "production-grade",
    stars: 780,
    architecture_notes: [
      "Role-based agent hierarchies with structured delegation and tool verification.",
      "Kernel.sh provisions isolated bash environments for unit test execution.",
      "DeepSeek V4 Pro performs complex algorithmic reasoning and architectural design.",
    ],
    run_command: "python -m crewai run --agents=architect,engineer,qa",
    docker_compose: `version: "3.8"
services:
  crewai-manager:
    image: crewai/crewai:latest
    environment:
      - OPENAI_API_BASE=https://osi.arcanetechnologies.org/api/v1
      - OPENAI_API_KEY=\${OSI_API_KEY}
      - DEFAULT_MODEL=deepseek-v4-pro
    volumes:
      - ./:/workspace
    restart: unless-stopped`,
  },
  {
    id: "combo_06",
    slug: "unsloth-lora-distillation",
    title: "Continuous Domain Model Distillation & Fine-Tuning",
    tagline: "Qwen 2.5 Coder 32B + Unsloth + Ollama + HuggingFace Hub",
    description: "High-speed LoRA fine-tuning pipeline for enterprise codebases. Takes git commits and PR reviews, distills knowledge with Unsloth in 20 minutes, and automatically deploys GGUF weights to Ollama.",
    model: "Qwen 2.5 Coder 32B (Base & Instruct)",
    runtime: "Unsloth FastLanguageModel + CUDA FP16/BF16",
    harness: "Unsloth High-Speed Fine-Tuner",
    database: "DuckDB Local Training Set Store",
    category: "fine-tuning",
    difficulty: "production-grade",
    stars: 540,
    architecture_notes: [
      "80% VRAM reduction using Unsloth customized RoPE kernels and manual backprop.",
      "Direct 16-bit GGUF export straight into local Ollama runtime.",
      "Automated evaluation against EleutherAI LM Harness before production promotion.",
    ],
    run_command: "python train_lora.py --base_model=Qwen/Qwen2.5-Coder-32B --export=gguf",
    docker_compose: `version: "3.8"
services:
  unsloth-trainer:
    image: unsloth/unsloth:latest
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
    command: ["python", "train.py"]`,
  },
  {
    id: "combo_07",
    slug: "litellm-enterprise-guardrails",
    title: "Enterprise Multi-Provider Fallback Router",
    tagline: "LiteLLM Proxy + OpenSuperIntelligence + Outlines + Arize Phoenix",
    description: "Highly available enterprise AI proxy with sub-second failover across self-hosted vLLM clusters and OpenSuperIntelligence hosted endpoints. Enforces Pydantic schemas via Outlines.",
    model: "DeepSeek V4.1 Flash + Moonshot Kimi K3 + Self-Hosted vLLM",
    runtime: "LiteLLM High-Availability Gateway",
    harness: "LiteLLM Enterprise AI Gateway + Outlines Guided Generation",
    database: "ClickHouse Token & Latency Telemetry",
    category: "serving-cluster",
    difficulty: "production-grade",
    stars: 890,
    architecture_notes: [
      "Sub-50ms router latency with automatic retry and rate-limit backoff.",
      "Guarantees 100% compliant JSON outputs using Outlines regex constraints.",
      "Arize Phoenix logs OpenInference spans for comprehensive latency decomposition.",
    ],
    run_command: "litellm --config ./config.yaml --port 4000",
    docker_compose: `version: "3.8"
services:
  litellm-proxy:
    image: ghcr.io/berriai/litellm:main-latest
    ports:
      - "4000:4000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/litellm
    volumes:
      - ./litellm-config.yaml:/app/config.yaml
    command: ["--config", "/app/config.yaml"]`,
  },
  {
    id: "combo_08",
    slug: "graphrag-knowledge-engine",
    title: "Enterprise GraphRAG Knowledge Reasoning Engine",
    tagline: "DeepSeek V4 Pro + Neo4j Graph DB + Qdrant + LlamaIndex",
    description: "Combines dense vector similarity with symbolic knowledge graph traversal. Discovers hidden structural relationships across millions of enterprise documents that vector search alone misses.",
    model: "DeepSeek V4 Pro (1.6T MoE)",
    runtime: "OpenSuperIntelligence Proxy Gateway",
    harness: "LlamaIndex Knowledge Graph & Vector Query Engine",
    database: "Neo4j Community Graph DB + Qdrant Vector DB",
    category: "enterprise-rag",
    difficulty: "production-grade",
    stars: 710,
    architecture_notes: [
      "Extracts entity-relationship triplets using DeepSeek V4 structured outputs.",
      "Neo4j indexes graph topology and community hierarchy using Cypher queries.",
      "LlamaIndex executes hybrid graph-vector traversals for holistic summaries.",
    ],
    run_command: "osi run combo:graphrag-knowledge-engine --index='./company-wiki'",
    docker_compose: `version: "3.8"
services:
  neo4j:
    image: neo4j:5.22
    ports:
      - "7474:7474"
      - "7687:7687"
    environment:
      - NEO4J_AUTH=neo4j/openintelligence

  qdrant:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"`,
  },
  {
    id: "combo_09",
    slug: "sundance-cinematic-studio",
    title: "Sundance AI Cinematic Video Studio",
    tagline: "Wan 2.1 14B + HunyuanVideo + ComfyUI Headless + Kernel.sh Render VM",
    description: "Film-grade generative video pipeline. Features text-to-video, image-to-video, and prompt-directed camera controls (dolly, pan, tilt, zoom) rendered on high-speed GPU clusters.",
    model: "Wan 2.1 14B (Sundance Open Video) + HunyuanVideo",
    runtime: "ComfyUI Headless Server (CUDA FlashAttention-3)",
    harness: "Sundance Video Sequencer & Interpolation Engine",
    sandbox: "Kernel.sh GPU Render MicroVM",
    database: "ClickHouse Clip Asset Ledger",
    category: "coding",
    difficulty: "production-grade",
    stars: 1240,
    architecture_notes: [
      "Wan 2.1 generates 1080p 16fps video with 3D Causal VAE frame coherence.",
      "Kernel.sh provisions GPU instances with sub-second orchestration for render jobs.",
      "Headless ComfyUI graph executes frame interpolation and temporal upscaling.",
      "Integrated with OpenSuperIntelligence API for automated clip synthesis.",
    ],
    run_command: "osi run combo:sundance-cinematic-studio --prompt='Cinematic drone shot of brutalist server lab'",
    docker_compose: `version: "3.8"
services:
  sundance-video-engine:
    image: wanvideo/wan2.1:latest
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
    ports:
      - "8188:8188"
    environment:
      - MODEL_WEIGHTS=Wan2.1-T2V-14B
      - RESOLUTION=1080p
      - FPS=16`,
  },
  {
    id: "combo_10",
    slug: "meta-content-brain-rag",
    title: "Meta Content Brain: Omnimodal Enterprise Memory",
    tagline: "Meta Content Brain + SAM 2 + Qdrant Vector + Neo4j Graph + Llama 4",
    description: "Unified cross-modal knowledge intelligence. Ingests corporate video archives, screen recordings, slides, audio transcripts, and builds a connected knowledge graph for executive recall.",
    model: "Meta Content Brain (Chameleon + SAM 2)",
    runtime: "OpenSuperIntelligence Multimodal Gateway",
    harness: "SAM 2 Continuous Masking + Neo4j Graph Builder",
    database: "Qdrant Vector DB + Neo4j Graph DB",
    category: "enterprise-rag",
    difficulty: "production-grade",
    stars: 980,
    architecture_notes: [
      "SAM 2 generates real-time segmentation masks across 30fps video streams.",
      "Cross-modal embeddings stored in Qdrant with timestamp and bounding box metadata.",
      "Neo4j indexes speaker identities, entity mentions, and corporate decisions.",
      "Llama 4 synthesizes multi-hour video archives into structured executive briefs.",
    ],
    run_command: "osi run combo:meta-content-brain-rag --video-corpus='./all-hands-meetings/*.mp4'",
    docker_compose: `version: "3.8"
services:
  content-brain-worker:
    image: meta/content-brain:latest
    environment:
      - OSI_API_KEY=\${OSI_API_KEY}
      - QDRANT_URL=http://qdrant:6333
      - NEO4J_URL=http://neo4j:7687
    depends_on:
      - qdrant
      - neo4j

  qdrant:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"

  neo4j:
    image: neo4j:5.22
    ports:
      - "7474:7474"
      - "7687:7687"
    environment:
      - NEO4J_AUTH=neo4j/contentbrain`,
  },
];

export const SEED_PAPERS: Paper[] = [
  {
    id: "pap_01",
    arxiv_id: "2412.19437",
    title: "DeepSeek-V3 Technical Report: Architecture, Training, and System Optimizations",
    abstract: "We present DeepSeek-V3, a strong Mixture-of-Experts (MoE) language model with 671B total parameters with 37B activated for each token. DeepSeek-V3 adopts Multi-head Latent Attention (MLA) and DeepSeekMoE architecture for efficient inference and cost-effective training.",
    authors: ["DeepSeek-AI Team", "Hao Shao", "Daya Guo", "Zhenda Xie"],
    categories: ["cs.CL", "cs.AI", "cs.LG"],
    published_at: "2024-12-27T00:00:00Z",
    pdf_url: "https://arxiv.org/pdf/2412.19437.pdf",
    source_url: "https://arxiv.org/abs/2412.19437",
    citation_count: 1420,
    tags: ["moe", "mla", "fp8-mixed-precision", "frontier"],
    is_curated: true,
    created_at: "2024-12-27T00:00:00Z",
  },
  {
    id: "pap_02",
    arxiv_id: "2501.12948",
    title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning",
    abstract: "We introduce our first-generation reasoning models: DeepSeek-R1-Zero and DeepSeek-R1. DeepSeek-R1-Zero trains via large-scale reinforcement learning (RL) without supervised fine-tuning (SFT) as a preliminary step, demonstrating emergent self-reflection and verification behaviors.",
    authors: ["DeepSeek-AI Team", "Daya Guo", "Zhengyang Tang", "Chengqi Deng"],
    categories: ["cs.AI", "cs.LG", "cs.CL"],
    published_at: "2025-01-22T00:00:00Z",
    pdf_url: "https://arxiv.org/pdf/2501.12948.pdf",
    source_url: "https://arxiv.org/abs/2501.12948",
    citation_count: 2840,
    tags: ["pure-rl", "reasoning", "cot", "verification"],
    is_curated: true,
    created_at: "2025-01-22T00:00:00Z",
  },
  {
    id: "pap_03",
    arxiv_id: "2409.12183",
    title: "Qwen2.5-Coder Technical Report: Advancing Open-Weights Code Intelligence",
    abstract: "We open-source the Qwen2.5-Coder series, state-of-the-art open-weights code LLMs ranging from 0.5B to 32B parameters. Trained on 5.5 trillion tokens of code, math, and synthetic reasoning data.",
    authors: ["Qwen Team", "Binyuan Hui", "Jian Yang", "Zeyu Cui"],
    categories: ["cs.SE", "cs.CL", "cs.AI"],
    published_at: "2024-09-18T00:00:00Z",
    pdf_url: "https://arxiv.org/pdf/2409.12183.pdf",
    source_url: "https://arxiv.org/abs/2409.12183",
    citation_count: 680,
    tags: ["code-intelligence", "swe-bench", "token-curation"],
    is_curated: true,
    created_at: "2024-09-18T00:00:00Z",
  },
  {
    id: "pap_04",
    arxiv_id: "2407.01449",
    title: "FlashAttention-3: Fast and Accurate Attention with Asynchrony and Low-Precision",
    abstract: "Hardware-accelerated attention for Hopper GPUs leveraging asynchronous warp-specialized Tensor Core instructions and FP8 GEMMs.",
    authors: ["Tri Dao", "Jay Shah"],
    categories: ["cs.LG", "cs.PF"],
    published_at: "2024-07-01T00:00:00Z",
    pdf_url: "https://arxiv.org/pdf/2407.01449.pdf",
    source_url: "https://arxiv.org/abs/2407.01449",
    citation_count: 530,
    tags: ["kernels", "cuda", "fp8", "h100"],
    is_curated: false,
    created_at: "2024-07-01T00:00:00Z",
  },
  {
    id: "pap_05",
    arxiv_id: "2502.04128",
    title: "Kimi K3: Linear Delta Attention for 1M Context Window Inference",
    abstract: "Moonshot AI presents Kimi Delta Attention (KDA), achieving constant-memory state updates during inference while preserving associative recall across 1,000,000 continuous tokens.",
    authors: ["Moonshot AI Research", "Jianlin Su", "Zhe Yuan"],
    categories: ["cs.CL", "cs.AI"],
    published_at: "2025-02-10T00:00:00Z",
    pdf_url: "https://arxiv.org/pdf/2502.04128.pdf",
    source_url: "https://arxiv.org/abs/2502.04128",
    citation_count: 310,
    tags: ["linear-attention", "1m-context", "delta-rule", "long-context"],
    is_curated: true,
    created_at: "2025-02-10T00:00:00Z",
  },
  {
    id: "pap_06",
    arxiv_id: "2404.16130",
    title: "GraphRAG: Unlocking LLM Discovery on Narrative Private Data",
    abstract: "Using LLM-generated knowledge graphs to substantially improve question-answering performance on complex information corpora compared to naive semantic vector retrieval.",
    authors: ["Darren Edge", "Ha Trinh", "Newman Cheng", "Joshua Bradley"],
    categories: ["cs.CL", "cs.AI", "cs.IR"],
    published_at: "2024-04-24T00:00:00Z",
    pdf_url: "https://arxiv.org/pdf/2404.16130.pdf",
    source_url: "https://arxiv.org/abs/2404.16130",
    citation_count: 890,
    tags: ["graphrag", "knowledge-graphs", "hierarchical-summarization"],
    is_curated: true,
    created_at: "2024-04-24T00:00:00Z",
  },
  {
    id: "pap_07",
    arxiv_id: "2305.18290",
    title: "Direct Preference Optimization: Your Language Model is Secretly a Reward Model",
    abstract: "A simple, stable alternative to RLHF that optimizes policy directly from human feedback using a closed-form implicit reward formulation, eliminating reward model training instability.",
    authors: ["Rafael Rafailov", "Archit Sharma", "Eric Mitchell", "Stefano Ermon", "Christopher D. Manning", "Chelsea Finn"],
    categories: ["cs.LG", "cs.AI", "cs.CL"],
    published_at: "2023-05-29T00:00:00Z",
    pdf_url: "https://arxiv.org/pdf/2305.18290.pdf",
    source_url: "https://arxiv.org/abs/2305.18290",
    citation_count: 3410,
    tags: ["alignment", "dpo", "rlhf", "preference-learning"],
    is_curated: true,
    created_at: "2023-05-29T00:00:00Z",
  },
  {
    id: "pap_08",
    arxiv_id: "2305.14314",
    title: "QLoRA: Efficient Finetuning of Quantized LLMs",
    abstract: "An efficient finetuning approach that reduces memory usage enough to finetune a 65B parameter model on a single 48GB GPU while preserving full 16-bit finetuning task performance.",
    authors: ["Tim Dettmers", "Artidoro Pagnoni", "Ari Holtzman", "Luke Zettlemoyer"],
    categories: ["cs.LG", "cs.AI"],
    published_at: "2023-05-23T00:00:00Z",
    pdf_url: "https://arxiv.org/pdf/2305.14314.pdf",
    source_url: "https://arxiv.org/abs/2305.14314",
    citation_count: 4200,
    tags: ["qlora", "4bit-quantization", "nf4", "vram-efficiency"],
    is_curated: true,
    created_at: "2023-05-23T00:00:00Z",
  },
];

export const SEED_DATABASES: Database[] = [
  {
    id: "db_01",
    slug: "qdrant",
    name: "Qdrant Vector Database",
    description: "High-performance Rust-based vector search engine with payload-based filtering, scalar quantization, and distributed clustering support.",
    category: "vector",
    github_url: "https://github.com/qdrant/qdrant",
    documentation_url: "https://qdrant.tech/documentation",
    website_url: "https://qdrant.tech",
    license: "Apache-2.0",
    docker_pull: "docker pull qdrant/qdrant:latest",
    tags: ["rust", "vector-search", "hnsw", "payload-filtering"],
    stars: 23100,
    is_featured: true,
    created_at: "2026-08-01T00:00:00Z",
  },
  {
    id: "db_02",
    slug: "milvus",
    name: "Milvus Distributed Vector Engine",
    description: "Cloud-native, open-source vector database built to manage trillions of embedding vectors with billion-scale search latency.",
    category: "vector",
    github_url: "https://github.com/milvus-io/milvus",
    documentation_url: "https://milvus.io/docs",
    website_url: "https://milvus.io",
    license: "Apache-2.0",
    docker_pull: "docker pull milvusdb/milvus:latest",
    tags: ["distributed", "billion-scale", "kubernetes-native", "rag"],
    stars: 34200,
    is_featured: true,
    created_at: "2026-08-01T00:00:00Z",
  },
  {
    id: "db_03",
    slug: "clickhouse",
    name: "ClickHouse Columnar OLAP",
    description: "Fastest open-source columnar database management system for real-time analytical reporting and large-scale AI log telemetry.",
    category: "analytical",
    github_url: "https://github.com/ClickHouse/ClickHouse",
    documentation_url: "https://clickhouse.com/docs",
    website_url: "https://clickhouse.com",
    license: "Apache-2.0",
    docker_pull: "docker pull clickhouse/clickhouse-server:latest",
    tags: ["olap", "telemetry", "analytics", "high-throughput"],
    stars: 41500,
    is_featured: true,
    created_at: "2026-07-15T00:00:00Z",
  },
  {
    id: "db_04",
    slug: "duckdb",
    name: "DuckDB In-Process Analytical Engine",
    description: "Zero-dependency in-process SQL OLAP database designed for fast analytical queries on local parquet files and Arrow tables.",
    category: "analytical",
    github_url: "https://github.com/duckdb/duckdb",
    documentation_url: "https://duckdb.org/docs",
    website_url: "https://duckdb.org",
    license: "MIT",
    tags: ["in-process", "parquet", "arrow", "local-rag"],
    stars: 29400,
    is_featured: false,
    created_at: "2026-08-10T00:00:00Z",
  },
  {
    id: "db_05",
    slug: "weaviate",
    name: "Weaviate Cloud-Native Vector DB",
    description: "Open-source AI-first vector database featuring GraphQL, hybrid search (BM25 + dense), automated modular vectorization, and multi-tenancy.",
    category: "vector",
    github_url: "https://github.com/weaviate/weaviate",
    documentation_url: "https://weaviate.io/developers/weaviate",
    website_url: "https://weaviate.io",
    license: "BSD-3-Clause",
    docker_pull: "docker pull cr.weaviate.io/semitechnologies/weaviate:latest",
    tags: ["hybrid-search", "bm25", "multi-tenancy", "graphql"],
    stars: 12800,
    is_featured: true,
    created_at: "2026-08-15T00:00:00Z",
  },
  {
    id: "db_06",
    slug: "lancedb",
    name: "LanceDB Serverless Vector Database",
    description: "Developer-friendly serverless vector database powered by the Lance columnar data format for lightning-fast multi-modal search on disk and S3.",
    category: "vector",
    github_url: "https://github.com/lancedb/lancedb",
    documentation_url: "https://lancedb.github.io/lancedb",
    website_url: "https://lancedb.com",
    license: "Apache-2.0",
    tags: ["serverless", "lance-format", "multimodal", "zero-copy"],
    stars: 7600,
    is_featured: false,
    created_at: "2026-08-20T00:00:00Z",
  },
  {
    id: "db_07",
    slug: "chroma",
    name: "Chroma AI-Native Embedding DB",
    description: "The AI-native open-source embedding database designed for simplicity, prototyping, and seamless integration with LangChain and LlamaIndex.",
    category: "vector",
    github_url: "https://github.com/chroma-core/chroma",
    documentation_url: "https://docs.trychroma.com",
    website_url: "https://trychroma.com",
    license: "Apache-2.0",
    docker_pull: "docker pull chromadb/chroma:latest",
    tags: ["embedding-db", "python-native", "zero-config"],
    stars: 16500,
    is_featured: false,
    created_at: "2026-08-05T00:00:00Z",
  },
  {
    id: "db_08",
    slug: "neo4j",
    name: "Neo4j Graph Database (GraphRAG)",
    description: "World leading graph database management system. Essential for GraphRAG architectures linking structured entities and conversational knowledge.",
    category: "graph",
    github_url: "https://github.com/neo4j/neo4j",
    documentation_url: "https://neo4j.com/docs",
    website_url: "https://neo4j.com",
    license: "GPL-3.0",
    docker_pull: "docker pull neo4j:latest",
    tags: ["graph-database", "cypher", "graphrag", "knowledge-graphs"],
    stars: 14800,
    is_featured: true,
    created_at: "2026-07-28T00:00:00Z",
  },
];

export const SEED_SANDBOXES: Sandbox[] = [
  {
    id: "sbx_01",
    user_id: "user_enterprise_01",
    name: "Primary Agent Sandbox (Cluster 01)",
    description: "Chromium microVM instance dedicated to live web browsing, DOM inspection, and authenticated multi-step automation.",
    kernel_session_id: "ksess_prod_88293f0b",
    status: "running",
    config: {
      runtime: "kernel-browser-chromium-arm64",
      stealth: true,
      memoryMb: 4096,
      cpus: 2,
    },
    created_at: "2026-10-04T12:00:00Z",
    last_active_at: "2026-10-04T17:40:00Z",
  },
  {
    id: "sbx_02",
    user_id: "user_enterprise_01",
    name: "Evaluation Sandbox (SWE-Bench Testbed)",
    description: "Isolated containerized harness executing automated git patches and pytest testsuites.",
    kernel_session_id: "ksess_eval_1992ad41",
    status: "idle",
    config: {
      runtime: "kernel-exec-python-debian",
      memoryMb: 8192,
      cpus: 4,
    },
    created_at: "2026-10-03T16:30:00Z",
    last_active_at: "2026-10-04T15:20:00Z",
  },
];

export const SEED_API_KEYS: ApiKey[] = [
  {
    id: "key_01",
    user_id: "user_enterprise_01",
    org_id: "org_01",
    name: "Production Cluster Inference Key",
    key_prefix: "osi_live_8f2a",
    permissions: ["inference:read", "inference:write", "sandboxes:exec", "search:read"],
    rate_limit: 600,
    is_active: true,
    last_used_at: "2026-10-04T17:35:12Z",
    created_at: "2026-09-01T10:00:00Z",
  },
  {
    id: "key_02",
    user_id: "user_enterprise_01",
    org_id: "org_01",
    name: "Staging & Evaluation Harness Key",
    key_prefix: "osi_live_c19d",
    permissions: ["inference:read", "inference:write"],
    rate_limit: 120,
    is_active: true,
    last_used_at: "2026-10-04T16:10:45Z",
    created_at: "2026-09-15T14:30:00Z",
  },
];

export const SEED_USAGE_LOGS: UsageLog[] = [
  {
    id: "log_01",
    api_key_id: "key_01",
    user_id: "user_enterprise_01",
    model_id: "mod_01",
    endpoint: "/api/v1/chat/completions",
    input_tokens: 3840,
    output_tokens: 1120,
    latency_ms: 640,
    upstream_cost: 0.0283,
    billed_cost: 0.0340,
    status: "200 OK",
    created_at: "2026-10-04T17:38:00Z",
  },
  {
    id: "log_02",
    api_key_id: "key_01",
    user_id: "user_enterprise_01",
    model_id: "mod_03",
    endpoint: "/api/v1/chat/completions",
    input_tokens: 84200,
    output_tokens: 4100,
    latency_ms: 1820,
    upstream_cost: 0.3141,
    billed_cost: 0.3770,
    status: "200 OK",
    created_at: "2026-10-04T17:32:00Z",
  },
  {
    id: "log_03",
    api_key_id: "key_01",
    user_id: "user_enterprise_01",
    model_id: "mod_02",
    endpoint: "/api/v1/chat/completions",
    input_tokens: 1250,
    output_tokens: 450,
    latency_ms: 195,
    upstream_cost: 0.0010,
    billed_cost: 0.0013,
    status: "200 OK",
    created_at: "2026-10-04T17:25:00Z",
  },
  {
    id: "log_04",
    api_key_id: "key_02",
    user_id: "user_enterprise_01",
    model_id: "mod_05",
    endpoint: "/api/v1/chat/completions",
    input_tokens: 14200,
    output_tokens: 2800,
    latency_ms: 890,
    upstream_cost: 0.0203,
    billed_cost: 0.0254,
    status: "200 OK",
    created_at: "2026-10-04T17:15:00Z",
  },
];

export const SEED_REPOS: GitHubRepo[] = [
  {
    id: "repo_01",
    slug: "wan-video",
    name: "Wan2.1",
    full_name: "Wan-Video/Wan2.1",
    owner: "Wan-Video",
    description: "Open-source video foundation model suite powering the Sundance Cinematic Studio. Features 14B Diffusion Transformer, 3D Causal VAE, and flow matching for photorealistic 1080p generation.",
    stars: 38500,
    forks: 3420,
    watchers: 820,
    open_issues: 42,
    language: "Python",
    license: "Apache-2.0",
    default_branch: "main",
    github_url: "https://github.com/Wan-Video/Wan2.1",
    clone_url: "https://github.com/Wan-Video/Wan2.1.git",
    category: "video",
    tags: ["video-generation", "sundance", "1080p", "flow-matching", "vae"],
    topics: ["deep-learning", "text-to-video", "image-to-video", "diffusion-models", "sundance"],
    updated_at: "2026-10-03T18:20:00Z",
    readme_markdown: `# Wan 2.1: Open-Weights Cinematic Video Foundation Model

> **Sundance Cinematic Studio Engine**: Generates 1080p photorealistic video clips at 16fps with temporally consistent 3D Causal VAE.

## Features
- **Cinematic Quality**: Native 1080p resolution with realistic lighting and physics.
- **Dual Architecture**: Supports both 1.3B (edge preview) and 14B (Sundance flagship) variants.
- **Camera Kinematics**: Programmatic dolly, zoom, pan, and tilt prompts.
- **FlashAttention-3**: Accelerated multi-GPU inference on NVIDIA Hopper/Blackwell.

## Quickstart
\`\`\`bash
pip install wan-video
python -m wan.generate --prompt "Cinematic drone shot of brutalist concrete server lab bathed in neon emerald rain" --resolution 1080p --fps 16
\`\`\`
`,
    readme_html: `<div class="apple-markdown">
  <div class="mb-6 pb-6 border-b border-white/[0.08]">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot"></span>
      <span>Sundance Cinematic Video Engine</span>
    </div>
    <h1 class="text-2xl sm:text-3xl font-medium tracking-tight text-white mb-2">Wan 2.1 Open Video Suite</h1>
    <p class="text-sm text-zinc-400 leading-relaxed">State-of-the-art open-source video generation models. Engineered with a 3D Causal VAE and continuous flow matching for fluid cinematic motion, physical object interaction, and zero-flicker temporal consistency.</p>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
    <div class="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
      <span class="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Architecture</span>
      <span class="text-sm font-mono font-medium text-white">14B Flow DiT + 3D VAE</span>
    </div>
    <div class="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
      <span class="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Max Resolution</span>
      <span class="text-sm font-mono font-medium text-emerald-400">1080p @ 16/24 fps</span>
    </div>
    <div class="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
      <span class="text-[10px] font-mono uppercase text-zinc-500 block mb-1">License</span>
      <span class="text-sm font-mono font-medium text-zinc-200">Apache-2.0 Open Weights</span>
    </div>
  </div>

  <h2 class="text-lg font-medium text-white mb-3 tracking-tight">Key Innovations</h2>
  <ul class="space-y-2 mb-8 text-sm text-zinc-300">
    <li class="flex items-start gap-2.5">
      <span class="text-emerald-400 mt-1">•</span>
      <span><strong>Temporal Spatio-Causal VAE:</strong> Compresses high-framerate 1080p footage without ghosting artifacts or motion tear.</span>
    </li>
    <li class="flex items-start gap-2.5">
      <span class="text-emerald-400 mt-1">•</span>
      <span><strong>Camera Kinematics:</strong> Ingests natural language directives for dolly zoom, orbit pan, and rack focus.</span>
    </li>
    <li class="flex items-start gap-2.5">
      <span class="text-emerald-400 mt-1">•</span>
      <span><strong>ComfyUI Headless Integration:</strong> First-class node support for automated batch rendering pipelines.</span>
    </li>
  </ul>

  <h2 class="text-lg font-medium text-white mb-3 tracking-tight">CLI Installation & Execution</h2>
  <pre class="p-4 rounded-xl bg-black/80 border border-white/[0.08] font-mono text-xs text-zinc-200 mb-6 overflow-x-auto"><code>git clone https://github.com/Wan-Video/Wan2.1.git
cd Wan2.1 && pip install -r requirements.txt

# Run Sundance 1080p Cinematic Synthesis
python generate.py \\
  --task t2v-14B \\
  --size 1280*720 \\
  --prompt "Cinematic anamorphic drone shot of brutalist server lab in foggy dusk" \\
  --fps 16</code></pre>
</div>`,
  },
  {
    id: "repo_02",
    slug: "meta-sam2",
    name: "segment-anything-2",
    full_name: "facebookresearch/sam2",
    owner: "facebookresearch",
    description: "Meta open foundation model for visual segment tracking across real-time video streams. The visual cortex of the Meta Content Brain architecture.",
    stars: 52100,
    forks: 4890,
    watchers: 1100,
    open_issues: 68,
    language: "Python",
    license: "Apache-2.0",
    default_branch: "main",
    github_url: "https://github.com/facebookresearch/sam2",
    clone_url: "https://github.com/facebookresearch/sam2.git",
    category: "multimodal-brain",
    tags: ["meta", "sam-2", "content-brain", "video-segmentation", "vision"],
    topics: ["computer-vision", "video-tracking", "object-detection", "meta-ai"],
    updated_at: "2026-10-02T14:15:00Z",
    readme_markdown: `# Segment Anything 2 (SAM 2) & Meta Content Brain

Meta SAM 2 is a unified model for promptable visual segmentation in images and video streams. It treats images as single-frame videos and executes memory-attention tracking in real-time.
`,
    readme_html: `<div class="apple-markdown">
  <div class="mb-6 pb-6 border-b border-white/[0.08]">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
      <span class="w-1.5 h-1.5 rounded-full bg-blue-400 pulse-dot"></span>
      <span>Meta Content Brain Vision Core</span>
    </div>
    <h1 class="text-2xl sm:text-3xl font-medium tracking-tight text-white mb-2">Meta Segment Anything 2 (SAM 2)</h1>
    <p class="text-sm text-zinc-400 leading-relaxed">The perceptual visual foundation for the Meta Content Brain. Delivers zero-shot object mask propagation across continuous multi-hour video feeds at up to 44 frames per second.</p>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
    <div class="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
      <span class="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Tracking Speed</span>
      <span class="text-sm font-mono font-medium text-emerald-400">44 FPS Real-Time</span>
    </div>
    <div class="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
      <span class="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Memory Horizon</span>
      <span class="text-sm font-mono font-medium text-white">Streaming FIFO Memory</span>
    </div>
    <div class="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
      <span class="text-[10px] font-mono uppercase text-zinc-500 block mb-1">License</span>
      <span class="text-sm font-mono font-medium text-zinc-200">Apache-2.0</span>
    </div>
  </div>

  <h2 class="text-lg font-medium text-white mb-3 tracking-tight">Role in Meta Content Brain</h2>
  <p class="text-sm text-zinc-300 leading-relaxed mb-6">In the OpenSuperIntelligence enterprise blueprint, SAM 2 segments every visual entity in meeting recordings, product demo screens, and laboratory feeds, indexing spatial bounding boxes and semantic vectors into Qdrant for natural language question-answering.</p>

  <pre class="p-4 rounded-xl bg-black/80 border border-white/[0.08] font-mono text-xs text-zinc-200 mb-6 overflow-x-auto"><code>pip install git+https://github.com/facebookresearch/sam2.git

from sam2.build_sam import build_sam2_video_predictor
predictor = build_sam2_video_predictor("sam2_hiera_l.pt")
# Propagate masks across video stream
with predictor.inference_session(video_path="corporate_archive.mp4") as session:
    predictor.add_new_points_or_box(session, frame_idx=0, obj_id=1, points=[[400, 300]])</code></pre>
</div>`,
  },
  {
    id: "repo_03",
    slug: "vllm",
    name: "vllm",
    full_name: "vllm-project/vllm",
    owner: "vllm-project",
    description: "High-throughput and memory-efficient LLM serving engine with PagedAttention, continuous batching, and chunked prefill for production deployments.",
    stars: 42800,
    forks: 6410,
    watchers: 940,
    open_issues: 120,
    language: "Python / C++",
    license: "Apache-2.0",
    default_branch: "main",
    github_url: "https://github.com/vllm-project/vllm",
    clone_url: "https://github.com/vllm-project/vllm.git",
    category: "inference",
    tags: ["inference", "serving", "paged-attention", "continuous-batching"],
    topics: ["llm-serving", "deep-learning", "gpu-acceleration", "openai-compatible"],
    updated_at: "2026-10-04T12:00:00Z",
    readme_markdown: `# vLLM: Easy, Fast, and Cheap LLM Serving for Everyone

vLLM is a high-throughput and memory-efficient inference and serving engine for LLMs.
`,
    readme_html: `<div class="apple-markdown">
  <div class="mb-6 pb-6 border-b border-white/[0.08]">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
      <span class="w-1.5 h-1.5 rounded-full bg-amber-400 pulse-dot"></span>
      <span>Enterprise Serving Engine</span>
    </div>
    <h1 class="text-2xl sm:text-3xl font-medium tracking-tight text-white mb-2">vLLM Inference Server</h1>
    <p class="text-sm text-zinc-400 leading-relaxed">The de facto standard for open-source high-throughput GPU inference. Eliminates 96% of KV cache memory waste through PagedAttention virtual memory paging.</p>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
    <div class="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
      <span class="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Throughput Boost</span>
      <span class="text-sm font-mono font-medium text-emerald-400">4.2x vs HuggingFace</span>
    </div>
    <div class="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
      <span class="text-[10px] font-mono uppercase text-zinc-500 block mb-1">KV Cache Wastage</span>
      <span class="text-sm font-mono font-medium text-white">&lt; 4% Near Zero</span>
    </div>
    <div class="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
      <span class="text-[10px] font-mono uppercase text-zinc-500 block mb-1">API Protocol</span>
      <span class="text-sm font-mono font-medium text-zinc-200">100% OpenAI Drop-In</span>
    </div>
  </div>

  <pre class="p-4 rounded-xl bg-black/80 border border-white/[0.08] font-mono text-xs text-zinc-200 mb-6 overflow-x-auto"><code>pip install vllm

# Launch DeepSeek / Qwen Server
vllm serve Qwen/Qwen2.5-Coder-32B-Instruct \\
  --tensor-parallel-size 2 \\
  --port 8000 \\
  --gpu-memory-utilization 0.95</code></pre>
</div>`,
  },
  {
    id: "repo_04",
    slug: "ollama",
    name: "ollama",
    full_name: "ollama/ollama",
    owner: "ollama",
    description: "Get up and running with Llama 3.3, Mistral, DeepSeek, and Hermes locally on macOS, Linux, and Windows with zero configuration.",
    stars: 118000,
    forks: 11200,
    watchers: 2800,
    open_issues: 210,
    language: "Go",
    license: "MIT",
    default_branch: "main",
    github_url: "https://github.com/ollama/ollama",
    clone_url: "https://github.com/ollama/ollama.git",
    category: "inference",
    tags: ["local-ai", "metal", "cuda", "zero-config"],
    topics: ["local-llm", "apple-silicon", "gguf", "developer-tools"],
    updated_at: "2026-10-04T08:30:00Z",
    readme_markdown: `# Ollama: Get up and running with large language models locally.
`,
    readme_html: `<div class="apple-markdown">
  <div class="mb-6 pb-6 border-b border-white/[0.08]">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot"></span>
      <span>Local Sovereign Runtime</span>
    </div>
    <h1 class="text-2xl sm:text-3xl font-medium tracking-tight text-white mb-2">Ollama Local Engine</h1>
    <p class="text-sm text-zinc-400 leading-relaxed">Package, run, and manage open foundation models on workstation hardware. Native Apple Silicon Metal acceleration, multi-GPU offloading, and background daemon architecture.</p>
  </div>

  <pre class="p-4 rounded-xl bg-black/80 border border-white/[0.08] font-mono text-xs text-zinc-200 mb-6 overflow-x-auto"><code>curl -fsSL https://ollama.com/install.sh | sh
ollama run deepseek-coder:33b</code></pre>
</div>`,
  },
  {
    id: "repo_05",
    slug: "litellm",
    name: "litellm",
    full_name: "BerriAI/litellm",
    owner: "BerriAI",
    description: "Enterprise proxy and router for 100+ LLMs with unified OpenAI formatting, load balancing, virtual API keys, prompt guardrails, and spend tracking.",
    stars: 22800,
    forks: 3100,
    watchers: 490,
    open_issues: 94,
    language: "Python",
    license: "MIT",
    default_branch: "main",
    github_url: "https://github.com/BerriAI/litellm",
    clone_url: "https://github.com/BerriAI/litellm.git",
    category: "agent-runtime",
    tags: ["proxy", "gateway", "load-balancer", "router", "guardrails"],
    topics: ["llm-gateway", "openai-proxy", "enterprise-ai", "rate-limiting"],
    updated_at: "2026-10-03T22:10:00Z",
    readme_markdown: `# LiteLLM: Call 100+ LLMs using OpenAI format
`,
    readme_html: `<div class="apple-markdown">
  <div class="mb-6 pb-6 border-b border-white/[0.08]">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-3">
      <span class="w-1.5 h-1.5 rounded-full bg-purple-400 pulse-dot"></span>
      <span>Enterprise AI Gateway</span>
    </div>
    <h1 class="text-2xl sm:text-3xl font-medium tracking-tight text-white mb-2">LiteLLM Enterprise Router</h1>
    <p class="text-sm text-zinc-400 leading-relaxed">Dynamic load balancer with sub-second failover between self-hosted vLLM clusters and hosted OpenSuperIntelligence endpoints.</p>
  </div>

  <pre class="p-4 rounded-xl bg-black/80 border border-white/[0.08] font-mono text-xs text-zinc-200 mb-6 overflow-x-auto"><code>pip install litellm
litellm --model deepseek/deepseek-v4-pro --port 4000</code></pre>
</div>`,
  },
  {
    id: "repo_06",
    slug: "qdrant",
    name: "qdrant",
    full_name: "qdrant/qdrant",
    owner: "qdrant",
    description: "Vector similarity search engine and database written in Rust. Designed for extended filtering, scalar quantization, and distributed high-scale clustering.",
    stars: 23100,
    forks: 1840,
    watchers: 420,
    open_issues: 38,
    language: "Rust",
    license: "Apache-2.0",
    default_branch: "master",
    github_url: "https://github.com/qdrant/qdrant",
    clone_url: "https://github.com/qdrant/qdrant.git",
    category: "vector-db",
    tags: ["rust", "vector-db", "hnsw", "rag", "embeddings"],
    topics: ["vector-search", "similarity-search", "rust-database", "ai-infrastructure"],
    updated_at: "2026-10-04T09:40:00Z",
    readme_markdown: `# Qdrant: Vector Database for the next generation of AI applications
`,
    readme_html: `<div class="apple-markdown">
  <div class="mb-6 pb-6 border-b border-white/[0.08]">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
      <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-dot"></span>
      <span>Vector Storage Engine</span>
    </div>
    <h1 class="text-2xl sm:text-3xl font-medium tracking-tight text-white mb-2">Qdrant Vector Database</h1>
    <p class="text-sm text-zinc-400 leading-relaxed">High-performance Rust-based vector search engine powering the retrieval layer of the Meta Content Brain and autonomous research swarms.</p>
  </div>

  <pre class="p-4 rounded-xl bg-black/80 border border-white/[0.08] font-mono text-xs text-zinc-200 mb-6 overflow-x-auto"><code>docker run -p 6333:6333 -v $(pwd)/qdrant_storage:/qdrant/storage qdrant/qdrant</code></pre>
</div>`,
  },
];

