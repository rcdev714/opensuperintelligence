-- ═══════════════════════════════════════════════════════════
-- OPENSUPERINTELLIGENCE SEED DATA
-- ═══════════════════════════════════════════════════════════

-- 1. Models
insert into public.models (slug, name, provider, category, license, description, context_window, parameters, architecture, input_price_per_m, output_price_per_m, our_input_price, our_output_price, api_model_id, api_provider_key, is_featured, is_available, tags)
values
(
  'deepseek-v4-pro',
  'DeepSeek V4 Pro',
  'DeepSeek',
  'reasoning',
  'deepseek-community',
  'Frontier 1.6-trillion parameter sparse MoE model engineered for advanced multi-step algorithmic reasoning, system architecture, and formal verification.',
  131072,
  '1.6T MoE (37B active)',
  'Multi-Head Latent Attention (MLA) + DeepSeekMoE',
  3.00,
  15.00,
  3.60,
  18.00,
  'deepseek-chat',
  'deepseek',
  true,
  true,
  ARRAY['frontier', 'reasoning', 'moe', 'mla', 'code']
),
(
  'deepseek-v4-flash',
  'DeepSeek V4.1 Flash',
  'DeepSeek',
  'text-generation',
  'deepseek-community',
  'Ultra-low-latency high-throughput model with native multimodal reasoning and sub-200ms TTFT for real-time autonomous agent loops.',
  131072,
  '16B Active MoE',
  'Sparse MoE + Native Vision Encoder',
  0.28,
  1.40,
  0.35,
  1.75,
  'deepseek-reasoner',
  'deepseek',
  true,
  true,
  ARRAY['flash', 'real-time', 'agents', 'low-latency']
),
(
  'kimi-k3',
  'Kimi K3 (Moonshot)',
  'Moonshot AI',
  'text-generation',
  'custom',
  'Moonshot AI flagship 2.8T MoE architecture featuring Kimi Delta Attention (KDA) with 1,000,000 token context window for full-repository analysis.',
  1048576,
  '2.8T MoE',
  'Kimi Delta Attention (KDA)',
  3.00,
  15.00,
  3.75,
  18.75,
  'kimi-k3',
  'moonshot',
  true,
  true,
  ARRAY['1m-context', 'long-horizon', 'codebases', 'frontier']
),
(
  'kimi-k3-fast',
  'Kimi K3 Fast',
  'Moonshot AI',
  'text-generation',
  'custom',
  'Optimized Kimi K3 deployment tier balanced for cost-efficient enterprise document parsing and recursive context summarization.',
  262144,
  '2.8T MoE Distilled',
  'Linear Delta Attention',
  1.00,
  5.00,
  1.25,
  6.25,
  'kimi-k3-fast',
  'moonshot',
  false,
  true,
  ARRAY['high-throughput', 'cost-efficient', 'search-synthesis']
),
(
  'qwen-2-5-coder-32b',
  'Qwen 2.5 Coder 32B',
  'Alibaba',
  'code-generation',
  'apache-2.0',
  'The premier open-weights coding model. SOTA on HumanEval, SWE-bench, and multi-file code editing, beating proprietary code models.',
  131072,
  '32B Dense',
  'RoPE Transformer',
  0.80,
  3.20,
  1.00,
  4.00,
  'qwen2.5-coder-32b-instruct',
  'custom',
  true,
  true,
  ARRAY['swe-bench', 'code-review', 'fullstack', 'apache-2.0']
),
(
  'llama-4-maverick',
  'Llama 4 Maverick',
  'Meta',
  'text-generation',
  'llama-community',
  'Meta frontier open foundation model with native multimodal reasoning, instruction-tuning, and calibrated enterprise tool calling.',
  1048576,
  '400B MoE',
  'Grouped-Query Attention (GQA)',
  0.30,
  0.45,
  0.38,
  0.58,
  'llama-4-maverick',
  'custom',
  false,
  true,
  ARRAY['meta', 'open-weights', 'tool-calling', 'multimodal']
),
(
  'flux-2-pro',
  'FLUX.2 Pro Image',
  'Black Forest Labs',
  'image-generation',
  'apache-2.0',
  'State-of-the-art open diffusion model with supreme typography adherence, complex spatial prompt comprehension, and photorealistic rendering.',
  null,
  '12B Flow Transformer',
  'Rectified Flow Transformer',
  0.03,
  0.03,
  0.04,
  0.04,
  'flux-2',
  'custom',
  false,
  true,
  ARRAY['diffusion', 'photorealism', 'typography', 'design']
),
(
  'whisper-large-v3',
  'Whisper Large V3 Turbo',
  'OpenAI / Open-Weights',
  'audio-transcription',
  'mit',
  'Universal multi-lingual speech-to-text with zero-shot timestamping, speaker diarization tags, and robust acoustic background noise rejection.',
  null,
  '1.5B Encoder-Decoder',
  'Seq2Seq Transformer',
  0.006,
  0.006,
  0.008,
  0.008,
  'whisper-large-v3',
  'custom',
  false,
  true,
  ARRAY['audio', 'transcription', 'subtitles', 'multilingual']
),
(
  'kokoro-82m',
  'Kokoro 82M Neural TTS',
  'Hexgrad / Open Source',
  'audio-speech',
  'apache-2.0',
  'Ultra-lightweight 82M parameter neural speech synthesizer capable of real-time edge voice streaming with natural inflection and human cadence.',
  null,
  '82M',
  'StyleTTS2 + iSTFTNet',
  0.002,
  0.002,
  0.003,
  0.003,
  'kokoro-v1',
  'custom',
  false,
  true,
  ARRAY['tts', 'real-time-voice', 'edge', 'apache-2.0']
);

-- 2. Harnesses
insert into public.harnesses (slug, name, description, type, github_url, stars, license, install_command, config_sample, tags, is_featured)
values
(
  'vllm',
  'vLLM High-Throughput Inference Engine',
  'A high-throughput and memory-efficient LLM serving engine featuring PagedAttention, continuous batching, and chunked prefill.',
  'inference-engine',
  'https://github.com/vllm-project/vllm',
  42000,
  'Apache-2.0',
  'pip install vllm',
  'python -m vllm.entrypoints.openai.api_server --model deepseek-ai/DeepSeek-V3 --tensor-parallel-size 8',
  ARRAY['serving', 'paged-attention', 'gpu-cluster', 'openai-compatible'],
  true
),
(
  'lm-evaluation-harness',
  'EleutherAI LM Evaluation Harness',
  'The standard framework for few-shot evaluation of language models across hundreds of benchmarks (MMLU, GSM8K, HumanEval, ARC).',
  'evaluation',
  'https://github.com/EleutherAI/lm-evaluation-harness',
  18500,
  'MIT',
  'pip install lm_eval',
  'lm_eval --model hf --model_args pretrained=deepseek-ai/DeepSeek-V3 --tasks mmlu,gsm8k --device cuda:0',
  ARRAY['benchmark', 'evaluation', 'mmlu', 'gsm8k'],
  true
),
(
  'kernel-agent-runtime',
  'Kernel.sh Agent BaaS Harness',
  'High-performance unikernel browser infrastructure with remote Chromium microVMs, Playwright integration, and sub-150ms startup.',
  'agent-runtime',
  'https://github.com/onkernel/kernel',
  6400,
  'Apache-2.0',
  'npm install @onkernel/ai-sdk',
  'import { KernelBrowser } from "@onkernel/ai-sdk";\nconst browser = await KernelBrowser.launch({ stealth: true });',
  ARRAY['browser-agent', 'sandboxes', 'playwright', 'stealth'],
  true
),
(
  'ollama',
  'Ollama Local Model Server',
  'Get up and running with Llama 3.3, DeepSeek, and Mistral locally with a single command and unified REST endpoint.',
  'inference-engine',
  'https://github.com/ollama/ollama',
  118000,
  'MIT',
  'curl -fsSL https://ollama.com/install.sh | sh',
  'ollama run deepseek-r1:32b',
  ARRAY['local-inference', 'mac-metal', 'developer-friendly'],
  false
),
(
  'sglang',
  'SGLang Structured Generation Runtime',
  'Fast serving framework for large language models and vision-language models with RadixAttention for multi-turn KV cache reuse.',
  'inference-engine',
  'https://github.com/sgl-project/sglang',
  12500,
  'Apache-2.0',
  'pip install "sglang[all]"',
  'python -m sglang.launch_server --model-path deepseek-ai/DeepSeek-V3 --port 30000',
  ARRAY['radix-attention', 'structured-outputs', 'vision'],
  true
);

-- 3. Research Papers
insert into public.papers (arxiv_id, title, abstract, authors, categories, published_at, pdf_url, citation_count, summary, is_frontier)
values
(
  '2412.19437',
  'DeepSeek-V3 Technical Report: Architecture, Training, and System Optimizations',
  'We present DeepSeek-V3, a strong Mixture-of-Experts (MoE) language model with 671B total parameters with 37B activated for each token. DeepSeek-V3 adopts Multi-head Latent Attention (MLA) and DeepSeekMoE architecture for efficient inference and cost-effective training.',
  ARRAY['DeepSeek-AI Team', 'Hao Shao', 'Daya Guo', 'Zhenda Xie'],
  ARRAY['cs.CL', 'cs.AI', 'cs.LG'],
  '2024-12-27T00:00:00Z',
  'https://arxiv.org/pdf/2412.19437.pdf',
  1420,
  'Breakthrough in cost-efficient MoE scaling and multi-head latent attention (MLA) that dropped training compute requirements by 80%.',
  true
),
(
  '2501.12948',
  'DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning',
  'We introduce our first-generation reasoning models: DeepSeek-R1-Zero and DeepSeek-R1. DeepSeek-R1-Zero trains via large-scale reinforcement learning (RL) without supervised fine-tuning (SFT) as a preliminary step, demonstrating emergent self-reflection and verification behaviors.',
  ARRAY['DeepSeek-AI Team', 'Daya Guo', 'Zhengyang Tang', 'Chengqi Deng'],
  ARRAY['cs.AI', 'cs.LG', 'cs.CL'],
  '2025-01-22T00:00:00Z',
  'https://arxiv.org/pdf/2501.12948.pdf',
  2840,
  'Demonstrated that pure reinforcement learning induces chain-of-thought verification, backtracking, and competitive mathematical reasoning.',
  true
),
(
  '2409.12183',
  'Qwen2.5-Coder Technical Report: Advancing Open-Weights Code Intelligence',
  'We open-source the Qwen2.5-Coder series, state-of-the-art open-weights code LLMs ranging from 0.5B to 32B parameters. Trained on 5.5 trillion tokens of code, math, and synthetic reasoning data.',
  ARRAY['Qwen Team', 'Binyuan Hui', 'Jian Yang', 'Zeyu Cui'],
  ARRAY['cs.SE', 'cs.CL', 'cs.AI'],
  '2024-09-18T00:00:00Z',
  'https://arxiv.org/pdf/2409.12183.pdf',
  680,
  'Benchmark-shattering open weights model proving 32B dense architectures match GPT-4o on real-world repository debugging tasks.',
  true
),
(
  '2407.01449',
  'FlashAttention-3: Fast and Accurate Attention with Asynchrony and Low-Precision',
  'Hardware-accelerated attention for Hopper GPUs leveraging asynchronous warp-specialized Tensor Core instructions and FP8 GEMMs.',
  ARRAY['Tri Dao', 'Jay Shah'],
  ARRAY['cs.LG', 'cs.PF'],
  '2024-07-01T00:00:00Z',
  'https://arxiv.org/pdf/2407.01449.pdf',
  530,
  'Crucial low-level kernel achieving 1.2 to 2x speedups in attention calculations on NVIDIA H100 clusters.',
  false
);

-- 4. Databases
insert into public.databases (slug, name, description, category, github_url, stars, license, docker_pull, tags, is_featured)
values
(
  'qdrant',
  'Qdrant Vector Database',
  'High-performance Rust-based vector search engine with payload-based filtering, quantization, and distributed clustering support.',
  'vector',
  'https://github.com/qdrant/qdrant',
  23000,
  'Apache-2.0',
  'docker run -p 6333:6333 qdrant/qdrant',
  ARRAY['rust', 'vector-search', 'hnsw', 'payload-filtering'],
  true
),
(
  'milvus',
  'Milvus Distributed Vector Engine',
  'Cloud-native, open-source vector database built to manage trillions of embedding vectors with billion-scale search latency.',
  'vector',
  'https://github.com/milvus-io/milvus',
  34000,
  'Apache-2.0',
  'docker run -d --name milvus milvusdb/milvus:latest',
  ARRAY['distributed', 'billion-scale', 'kubernetes-native', 'rag'],
  true
),
(
  'clickhouse',
  'ClickHouse Columnar OLAP',
  'Fastest open-source columnar database management system for real-time analytical reporting and large-scale AI log telemetry.',
  'analytical',
  'https://github.com/ClickHouse/ClickHouse',
  41000,
  'Apache-2.0',
  'docker run -d --name clickhouse-server -p 8123:8123 clickhouse/clickhouse-server',
  ARRAY['olap', 'telemetry', 'analytics', 'high-throughput'],
  true
),
(
  'duckdb',
  'DuckDB In-Process Analytical Database',
  'Zero-dependency in-process SQL OLAP database designed for fast analytical queries on local parquet files and Arrow tables.',
  'analytical',
  'https://github.com/duckdb/duckdb',
  29000,
  'MIT',
  'pip install duckdb',
  ARRAY['in-process', 'parquet', 'arrow', 'local-rag'],
  false
);

-- 5. Sandboxes
insert into public.sandboxes (name, description, runtime, kernel_session_id, status, memory_mb, cpus, live_url)
values
(
  'Primary Agent Sandbox (Cluster 01)',
  'Chromium microVM instance dedicated to live web browsing, DOM inspection, and authenticated multi-step automation.',
  'kernel-browser-chromium-arm64',
  'ksess_prod_88293f0b',
  'active',
  4096,
  2,
  'https://session.kernel.sh/view/ksess_prod_88293f0b'
),
(
  'Evaluation Sandbox (SWE-Bench Testbed)',
  'Isolated containerized harness executing automated git patches and pytest testsuites.',
  'kernel-exec-python-debian',
  'ksess_eval_1992ad41',
  'idle',
  8192,
  4,
  null
);

-- 6. Default API Key for demo
insert into public.api_keys (name, key_prefix, key_hash, permissions, rate_limit_rpm, is_active)
values
(
  'Enterprise Production Key',
  'osi_live_e9b2',
  '$2a$12$e8Y5t1aKjL9oP3qR2sT4uVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZa',
  ARRAY['inference:read', 'inference:write', 'sandboxes:exec', 'search:read'],
  600,
  true
);
