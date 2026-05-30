"use client";

import { useReveal } from "@/hooks/useReveal";

const PROVIDERS = [
  { name: "OpenAI",        domain: "openai.com" },
  { name: "Anthropic",     domain: "anthropic.com" },
  { name: "Google Gemini", domain: "gemini.google.com" },
  { name: "Ollama",        domain: "ollama.com" },
  { name: "AWS Bedrock",   domain: "aws.amazon.com" },
  { name: "Cohere",        domain: "cohere.com" },
  { name: "Mistral",       domain: "mistral.ai" },
  { name: "xAI Grok",      domain: "x.ai" },
  { name: "Together AI",   domain: "together.ai" },
  { name: "DeepSeek",      domain: "deepseek.com" },
  { name: "Groq",          domain: "groq.com" },
  { name: "Replicate",     domain: "replicate.com" },
  { name: "HuggingFace",   domain: "huggingface.co" },
  { name: "Writer",        domain: "writer.com" },
  { name: "Novita",        domain: "novita.ai" },
  { name: "LM Studio",     domain: "lmstudio.ai" },
  { name: "GPT4All",       domain: "gpt4all.io" },
  { name: "vLLM",          domain: "vllm.ai" },
  { name: "Azure OpenAI",  domain: "azure.microsoft.com" },
  { name: "Vertex AI",     domain: "cloud.google.com" },
  { name: "Fireworks",     domain: "fireworks.ai" },
  { name: "Perplexity",    domain: "perplexity.ai" },
  { name: "Anyscale",      domain: "anyscale.com" },
  { name: "DeepInfra",     domain: "deepinfra.com" },
  { name: "OpenRouter",    domain: "openrouter.ai" },
  { name: "Cerebras",      domain: "cerebras.ai" },
  { name: "AI21",          domain: "ai21.com" },
  { name: "Cloudflare AI", domain: "cloudflare.com" },
  { name: "Aleph Alpha",   domain: "aleph-alpha.com" },
  { name: "Voyage AI",     domain: "voyageai.com" },
  { name: "MosaicML",      domain: "mosaicml.com" },
  { name: "Predibase",     domain: "predibase.com" },
  { name: "Databricks",    domain: "databricks.com" },
];

const ROW1 = [...PROVIDERS.slice(0, 17), ...PROVIDERS.slice(0, 17)] as typeof PROVIDERS;
const ROW2 = [...PROVIDERS.slice(17), ...PROVIDERS.slice(17)] as typeof PROVIDERS;

const CATEGORIES = [
  {
    label: "Data Loaders",
    count: "53",
    headline: "Load from anywhere. Get Documents everywhere.",
    description: "Every loader returns the same Document object — whether it's a PDF, a YouTube video, a Salesforce export, or a BigQuery table. Your pipeline never needs to change.",
    code: "docs = await PDFLoader('report.pdf').load()",
    items: [
      { name: "PDF", domain: "adobe.com" },
      { name: "YouTube", domain: "youtube.com" },
      { name: "S3", domain: "aws.amazon.com" },
      { name: "Notion", domain: "notion.so" },
      { name: "HubSpot", domain: "hubspot.com" },
      { name: "BigQuery", domain: "cloud.google.com" },
      { name: "Salesforce", domain: "salesforce.com" },
      { name: "MongoDB", domain: "mongodb.com" },
    ],
  },
  {
    label: "Vector Stores",
    count: "22",
    headline: "Start local. Go prod. Zero rewrites.",
    description: "Chroma for your laptop, Pinecone for production, pgvector for your existing Postgres — all behind one interface. Change one line, not your entire codebase.",
    code: "store = ChromaVectorStore()  # swap to Pinecone later",
    items: [
      { name: "Chroma", domain: "trychroma.com" },
      { name: "Pinecone", domain: "pinecone.io" },
      { name: "Weaviate", domain: "weaviate.io" },
      { name: "Postgres", domain: "postgresql.org" },
      { name: "Redis", domain: "redis.io" },
      { name: "MongoDB", domain: "mongodb.com" },
      { name: "Qdrant", domain: "qdrant.tech" },
      { name: "OpenSearch", domain: "opensearch.org" },
    ],
  },
  {
    label: "Agent Tools",
    count: "47+",
    headline: "One decorator. Real-world actions.",
    description: "Decorate any function with @tool and your agent can call it. Browser automation, SQL queries, GitHub PRs, Slack messages — all wired up and production-tested.",
    code: "@tool\nasync def query_db(sql: str) -> str: ...",
    items: [
      { name: "GitHub", domain: "github.com" },
      { name: "Slack", domain: "slack.com" },
      { name: "Stripe", domain: "stripe.com" },
      { name: "Twilio", domain: "twilio.com" },
      { name: "Jira", domain: "atlassian.com" },
      { name: "Notion", domain: "notion.so" },
      { name: "Linear", domain: "linear.app" },
      { name: "AWS Lambda", domain: "aws.amazon.com" },
    ],
  },
  {
    label: "Memory Backends",
    count: "4",
    headline: "Agents that remember across sessions.",
    description: "Episodic memory stores what happened. Semantic memory stores what matters. Both work across SQLite, Redis, and Postgres — start in-memory, scale to Redis in one line.",
    code: "agent = Agent(memory=RedisMemory(url=REDIS_URL))",
    items: [
      { name: "SQLite", domain: "sqlite.org" },
      { name: "Redis", domain: "redis.io" },
      { name: "Postgres", domain: "postgresql.org" },
      { name: "In-memory", domain: "python.org" },
    ],
  },
];

function ProviderChip({ name, domain, dim = false }: { name: string; domain: string; dim?: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 18px",
        borderRadius: "14px",
        border: "1px solid var(--border)",
        background: dim ? "var(--bg)" : "var(--surface)",
        boxShadow: "0 2px 8px rgba(13,24,36,0.06)",
        fontFamily: "var(--font-dm-sans)",
        fontSize: "0.875rem",
        fontWeight: 500,
        color: "var(--text)",
        whiteSpace: "nowrap",
        transition: "border-color 0.2s, box-shadow 0.2s",
        flexShrink: 0,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <span
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "8px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
          alt=""
          width={20}
          height={20}
          style={{ display: "block" }}
        />
      </span>
      {name}
    </span>
  );
}

export default function Ecosystem() {
  const { ref } = useReveal();

  return (
    <section
      style={{ background: "var(--surface)" }}
      className="py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div ref={ref} className="reveal mb-14 text-center">
          <p
            style={{ color: "var(--accent)", fontFamily: "var(--font-jetbrains-mono)" }}
            className="mb-3 text-xs font-medium tracking-widest uppercase"
          >
            Ecosystem
          </p>
          <h2
            style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}
            className="text-3xl font-extrabold md:text-5xl"
          >
            Your entire stack,{" "}
            <span style={{ color: "var(--accent)" }}>already supported.</span>
          </h2>
          <p style={{ color: "var(--text-muted)", marginTop: "1rem", fontSize: "1rem" }}>
            33 LLM providers behind one unified API. Swap without rewriting a line.
          </p>
        </div>
      </div>

      {/* Two-row marquee */}
      <div
        style={{
          position: "relative",
          marginBottom: "4rem",
          overflow: "hidden",
        }}
      >
        {/* Left fade */}
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "120px",
          background: "linear-gradient(to right, var(--surface), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }} />
        {/* Right fade */}
        <div style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "120px",
          background: "linear-gradient(to left, var(--surface), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }} />

        {/* Row 1 — left to right */}
        <div
          style={{ overflow: "hidden", marginBottom: "12px" }}
          className="marquee-wrapper"
        >
          <div
            className="marquee-track"
            style={{ display: "flex", gap: "12px", width: "max-content" }}
          >
            {ROW1.map((p, i) => (
              <ProviderChip key={i} name={p.name} domain={p.domain} />
            ))}
          </div>
        </div>

        {/* Row 2 — right to left (reversed) */}
        <div
          style={{ overflow: "hidden" }}
          className="marquee-wrapper"
        >
          <div
            className="marquee-track-reverse"
            style={{ display: "flex", gap: "12px", width: "max-content" }}
          >
            {ROW2.map((p, i) => (
              <ProviderChip key={i} name={p.name} domain={p.domain} dim />
            ))}
          </div>
        </div>
      </div>

      {/* Category rows */}
      <div className="mx-auto max-w-6xl px-6">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.label}
              ref={ref}
              className={`reveal stagger-${i + 1}`}
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "2rem 2.25rem",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2.5rem",
                alignItems: "center",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(0,168,140,0.25)";
                el.style.boxShadow = "0 4px 32px rgba(0,168,140,0.07)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.borderColor = "";
                el.style.boxShadow = "";
              }}
            >
              {/* Left: text */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.75rem" }}>
                  <span style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    background: "var(--accent-dim)",
                    padding: "3px 10px",
                    borderRadius: "6px",
                  }}>
                    {cat.label}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: "0.85rem",
                    fontWeight: 800,
                    color: "var(--text-muted)",
                  }}>
                    {cat.count}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "1.15rem",
                  fontWeight: 800,
                  color: "var(--text)",
                  lineHeight: 1.3,
                  marginBottom: "0.65rem",
                }}>
                  {cat.headline}
                </h3>

                <p style={{
                  color: "var(--text-muted)",
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                  marginBottom: "1.1rem",
                }}>
                  {cat.description}
                </p>

                {/* Code snippet */}
                <div style={{
                  background: "#0D1824",
                  borderRadius: "8px",
                  padding: "0.6rem 0.9rem",
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "0.75rem",
                  color: "#00A88C",
                  lineHeight: 1.6,
                  whiteSpace: "pre",
                }}>
                  {cat.code}
                </div>
              </div>

              {/* Right: logo grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "10px",
              }}>
                {cat.items.map(item => (
                  <div
                    key={item.name}
                    title={item.name}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "6px",
                      padding: "12px 8px",
                      borderRadius: "12px",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${item.domain}&sz=64`}
                      alt={item.name}
                      width={28}
                      height={28}
                      style={{ borderRadius: "6px", display: "block" }}
                    />
                    <span style={{
                      fontSize: "10px",
                      fontWeight: 500,
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-dm-sans)",
                      textAlign: "center",
                      lineHeight: 1.2,
                    }}>
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
