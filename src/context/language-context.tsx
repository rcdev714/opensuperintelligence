"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "es";

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav & General
    "nav.playground": "Playground",
    "nav.models": "Models & Endpoints",
    "nav.clusters": "Dedicated VPC Clusters",
    "nav.apikeys": "API Keys",
    "nav.usage": "Usage & Costs",
    "nav.labs": "Advanced Labs",
    "nav.preferences": "Preferences",
    "nav.signin": "Sign In",
    "nav.signout": "Sign Out",
    "nav.console": "Console",
    "nav.search_placeholder": "Search models, endpoints, clusters...",

    // Positioning & Hero
    "hero.badge": "High-Throughput Sovereign Cloud Inference",
    "hero.title_1": "Own your intelligence.",
    "hero.title_2": "At a fraction of the cost.",
    "hero.subtitle": "Enterprise cloud inference provider for frontier open models. Drop-in OpenAI compatibility, sub-200ms latency, 100% data sovereignty, and 85% lower compute spend.",
    "hero.cta_keys": "Get API Key",
    "hero.cta_playground": "Open Playground",
    "hero.cta_clusters": "Deploy Dedicated VPC",
    "hero.drop_in_label": "Drop-In OpenAI Compatibility",
    "hero.drop_in_sub": "Change 1 line of code. Compatible with OpenAI Python/TypeScript SDKs, LangChain, and LlamaIndex.",

    // Core Value Props
    "value.sovereignty.title": "1. 100% Data Sovereignty",
    "value.sovereignty.desc": "Your prompts and weights never train external models. Operate via serverless endpoints or private air-gapped VPC clusters. Zero data retention.",
    "value.sovereignty.tag": "SOC 2 Type II & HIPAA-ready VPC isolation",

    "value.cost.title": "2. 85% Cost Reduction",
    "value.cost.desc": "DeepSeek V4 Pro and Kimi K3 deliver matching or superior coding and reasoning to GPT-4o and Claude 3.5 at up to 90% lower token pricing.",
    "value.cost.tag": "$0.70 vs $2.50 per 1M input tokens",

    "value.dedicated.title": "3. Dedicated VPC GPU Fleets",
    "value.dedicated.desc": "Spin up dedicated NVIDIA H100, H200, and AMD MI300X clusters with custom CIDR subnets, guaranteed throughput, and zero noisy neighbors.",
    "value.dedicated.tag": "Zero cold-starts & custom SLAs",

    // Benchmarks
    "benchmarks.badge": "Inference Performance & Economics",
    "benchmarks.title": "Frontier Open Weights vs Closed APIs",
    "benchmarks.subtitle": "Independent performance metrics and cost comparison for production workloads.",
    "benchmarks.col_model": "Model",
    "benchmarks.col_context": "Context Window",
    "benchmarks.col_swe": "Coding SOTA",
    "benchmarks.col_input": "Input Price / 1M",
    "benchmarks.col_output": "Output Price / 1M",
    "benchmarks.col_sovereign": "Private VPC",

    // Features Section
    "features.badge": "Developer-First Infrastructure",
    "features.title": "Engineered for Autonomous Agents & Production Scale",
    "features.f1_title": "Real-Time Telemetry",
    "features.f1_desc": "Sub-millisecond token metering, TTFT (time-to-first-token), and request-level cost attribution.",
    "features.f2_title": "Model Context Protocol (MCP)",
    "features.f2_desc": "Direct integration with Claude Code, Cursor, and agent frameworks via our native HTTP transport.",
    "features.f3_title": "High-Throughput Clusters",
    "features.f3_desc": "Powered by vLLM with PagedAttention and Multi-Head Latent Attention (MLA) optimization.",

    // CTA Bottom
    "cta.title": "Start running frontier inference today",
    "cta.subtitle": "Provision API keys in 10 seconds. Enjoy $5 in complimentary compute credits.",
    "cta.button": "Create Developer Account",
    "cta.footer": "© 2026 OpenSuperIntelligence. An Arcane Echos Technologies SAS product. All rights reserved.",

    // Console headers
    "console.cluster_status": "Global Cluster: Operational",
    "console.switch_lang": "Language",
  },
  es: {
    // Nav & General
    "nav.playground": "Playground",
    "nav.models": "Modelos y Endpoints",
    "nav.clusters": "Clusters VPC Dedicados",
    "nav.apikeys": "Claves API",
    "nav.usage": "Consumo y Costos",
    "nav.labs": "Laboratorios Avanzados",
    "nav.preferences": "Preferencias",
    "nav.signin": "Iniciar Sesión",
    "nav.signout": "Cerrar Sesión",
    "nav.console": "Consola",
    "nav.search_placeholder": "Buscar modelos, endpoints, clusters...",

    // Positioning & Hero
    "hero.badge": "Inferencia Cloud Soberana de Alto Rendimiento",
    "hero.title_1": "Sé dueño de tu inteligencia.",
    "hero.title_2": "A una fracción del costo.",
    "hero.subtitle": "Proveedor de inferencia cloud empresarial para modelos abiertos de frontera. Compatibilidad total con OpenAI, latencia sub-200ms, 100% soberanía de datos y 85% menor costo en cómputo.",
    "hero.cta_keys": "Obtener Clave API",
    "hero.cta_playground": "Abrir Playground",
    "hero.cta_clusters": "Desplegar VPC Dedicada",
    "hero.drop_in_label": "Compatibilidad Directa con OpenAI",
    "hero.drop_in_sub": "Cambia 1 línea de código. Compatible con los SDKs de OpenAI para Python/TypeScript, LangChain y LlamaIndex.",

    // Core Value Props
    "value.sovereignty.title": "1. 100% Soberanía de Datos",
    "value.sovereignty.desc": "Tus prompts y pesos nunca entrenan modelos externos. Opera mediante endpoints serverless o clusters privados VPC en entornos aislados. Cero retención de datos.",
    "value.sovereignty.tag": "Aislamiento VPC certificado para SOC 2 y HIPAA",

    "value.cost.title": "2. Reducción del 85% en Costos",
    "value.cost.desc": "DeepSeek V4 Pro y Kimi K3 igualan o superan la capacidad de código y razonamiento de GPT-4o y Claude 3.5 con hasta un 90% menor precio por token.",
    "value.cost.tag": "$0.70 vs $2.50 por millón de tokens de entrada",

    "value.dedicated.title": "3. Flotas GPU en VPC Dedicadas",
    "value.dedicated.desc": "Inicia clusters dedicados NVIDIA H100, H200 y AMD MI300X con subredes CIDR personalizadas, rendimiento garantizado y sin interferencia de otros usuarios.",
    "value.dedicated.tag": "Sin inicios en frío y con SLAs a medida",

    // Benchmarks
    "benchmarks.badge": "Rendimiento y Economía de Inferencia",
    "benchmarks.title": "Pesos Abiertos de Frontera vs APIs Propietarias",
    "benchmarks.subtitle": "Métricas de rendimiento independientes y comparativa de costos para cargas de producción.",
    "benchmarks.col_model": "Modelo",
    "benchmarks.col_context": "Ventana de Contexto",
    "benchmarks.col_swe": "Código SOTA",
    "benchmarks.col_input": "Precio Entrada / 1M",
    "benchmarks.col_output": "Precio Salida / 1M",
    "benchmarks.col_sovereign": "VPC Privada",

    // Features Section
    "features.badge": "Infraestructura para Desarrolladores",
    "features.title": "Diseñado para Agentes Autónomos y Escala de Producción",
    "features.f1_title": "Telemetría en Tiempo Real",
    "features.f1_desc": "Medición de tokens con precisión sub-milisegundo, TTFT y atribución de costos por solicitud.",
    "features.f2_title": "Protocolo de Contexto de Modelo (MCP)",
    "features.f2_desc": "Integración directa con Claude Code, Cursor y entornos agénticos mediante nuestro transporte HTTP nativo.",
    "features.f3_title": "Clusters de Alto Rendimiento",
    "features.f3_desc": "Impulsado por vLLM con PagedAttention y optimización de Multi-Head Latent Attention (MLA).",

    // CTA Bottom
    "cta.title": "Comienza a ejecutar inferencia de frontera hoy",
    "cta.subtitle": "Genera tus claves API en 10 segundos. Recibe $5 en créditos de cómputo de bienvenida.",
    "cta.button": "Crear Cuenta de Desarrollador",
    "cta.footer": "© 2026 OpenSuperIntelligence. Un producto de Arcane Echos Technologies SAS. Todos los derechos reservados.",

    // Console headers
    "console.cluster_status": "Cluster Global: Operativo",
    "console.switch_lang": "Idioma",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("osi_lang") as Language;
    if (saved === "en" || saved === "es") {
      setLanguageState(saved);
    } else {
      // Auto detect Spanish if browser language starts with 'es'
      const browserLang = navigator.language?.toLowerCase();
      if (browserLang.startsWith("es")) {
        setLanguageState("es");
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("osi_lang", lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations["en"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
