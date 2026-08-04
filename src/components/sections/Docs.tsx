"use client";

import { useReveal } from "@/hooks/useReveal";

const DOCS = [
  {
    label: "Quickstart",
    tagline: "Up in 3 minutes",
    description: "Build your first RAG pipeline or agent. pip install, configure a provider, ship.",
    href: "https://synapsekit.github.io/synapsekit-docs/docs/getting-started/quickstart",
    code: `from synapsekit import RAGPipeline\n\npipeline = RAGPipeline(llm=llm, store=store)\nresult = await pipeline.query("How does X work?")`,
    accent: "var(--accent)",
    featured: true,
  },
  {
    label: "RAG Guide",
    tagline: "Retrieval-Augmented Generation",
    description: "Pipelines, loaders, hybrid retrieval, vector stores, evaluation.",
    href: "https://synapsekit.github.io/synapsekit-docs/docs/rag/pipeline",
    code: `loader = PDFLoader("paper.pdf")\ndocs  = await loader.load()\nawait store.add(docs)`,
    accent: "var(--accent)",
  },
  {
    label: "Agents",
    tagline: "ReAct · tools · memory",
    description: "Function calling, tool use, episodic memory, and AgentFederation across services.",
    href: "https://synapsekit.github.io/synapsekit-docs/docs/agents/overview",
    code: `agent = Agent(llm=llm, tools=[search, sql])\nresult = await agent.run(task)`,
    accent: "var(--accent)",
  },
  {
    label: "Graph Workflows",
    tagline: "DAG · parallel · conditional",
    description: "Compose pipelines as graphs. Branch, merge, loop, and run subgraphs in parallel.",
    href: "https://synapsekit.github.io/synapsekit-docs/docs/graph/overview",
    code: `graph = Graph()\ngraph.add_edge(fetch, summarize)\ngraph.add_edge(fetch, classify)`,
    accent: "var(--accent)",
  },
  {
    label: "LLM Providers",
    tagline: "35 providers · one interface",
    description: "ReasoningLLM, CostQualityRouter, streaming, structured output across all providers.",
    href: "https://synapsekit.github.io/synapsekit-docs/docs/llms/overview",
    code: `llm = LLM(model="gpt-4o")       # OpenAI\nllm = LLM(model="claude-3-5-sonnet") # Anthropic\nllm = LLM(model="gemini-pro")   # Google`,
    accent: "var(--accent)",
  },
  {
    label: "API Reference",
    tagline: "Every class · every method",
    description: "Full reference for every public symbol, parameter, return type, and exception.",
    href: "https://synapsekit.github.io/synapsekit-docs/docs/api/llm",
    code: `# Auto-generated from source\n# Searchable, versioned, always current`,
    accent: "var(--accent)",
  },
];

export default function Docs() {
  const { ref } = useReveal();

  return (
    <section id="docs" style={{ background: "var(--bg)" }} className="px-6 py-24">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div ref={ref} className="reveal mb-14">
          <p style={{ color: "var(--accent)", fontFamily: "var(--font-jetbrains-mono)" }}
            className="mb-3 text-xs font-medium tracking-widest uppercase">
            Documentation
          </p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <h2 style={{ fontFamily: "var(--font-syne)", color: "var(--text)", lineHeight: 1.1 }}
              className="text-3xl font-extrabold md:text-5xl">
              Everything documented.<br />
              <span style={{ color: "var(--accent)" }}>Nothing hidden.</span>
            </h2>
            <a
              href="https://synapsekit.github.io/synapsekit-docs/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "0.65rem 1.4rem", borderRadius: "99px",
                background: "var(--accent)", color: "#fff",
                fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "0.875rem",
                textDecoration: "none", transition: "opacity 0.2s", whiteSpace: "nowrap",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              All docs →
            </a>
          </div>
        </div>

        {/* Featured card — Quickstart */}
        {(() => {
          const d = DOCS[0];
          return (
            <a
              ref={ref}
              href={d.href}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal stagger-1"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0",
                borderRadius: "20px",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                textDecoration: "none",
                overflow: "hidden",
                marginBottom: "16px",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.borderColor = `${d.accent}55`;
                el.style.boxShadow = `0 8px 40px ${d.accent}18`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.borderColor = "";
                el.style.boxShadow = "";
              }}
            >
              {/* Left */}
              <div style={{ padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <span style={{
                    display: "inline-block",
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "10px", fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: d.accent, background: `${d.accent}18`,
                    padding: "3px 10px", borderRadius: "6px", marginBottom: "1.1rem",
                  }}>
                    {d.tagline}
                  </span>
                  <h3 style={{ fontFamily: "var(--font-syne)", fontSize: "1.75rem", fontWeight: 800, color: "var(--text)", lineHeight: 1.2, marginBottom: "0.75rem" }}>
                    {d.label}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    {d.description}
                  </p>
                </div>
                <span style={{ color: d.accent, fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "0.875rem" }}>
                  Read the guide →
                </span>
              </div>
              {/* Right — code */}
              <div style={{
                background: "#0D1824",
                padding: "2.5rem",
                display: "flex", alignItems: "center",
                borderLeft: `3px solid ${d.accent}40`,
              }}>
                <pre style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "0.82rem", lineHeight: 2,
                  color: "#cdd9e5", margin: 0, whiteSpace: "pre-wrap",
                }}>
                  {d.code.split("\n").map((line, i) => {
                    const kws = ["from", "import", "await", "async"];
                    const parts = line.split(/(\b(?:from|import|await|async)\b)/);
                    return (
                      <div key={i}>
                        {parts.map((part, j) =>
                          kws.includes(part)
                            ? <span key={j} style={{ color: d.accent }}>{part}</span>
                            : <span key={j}>{part}</span>
                        )}
                      </div>
                    );
                  })}
                </pre>
              </div>
            </a>
          );
        })()}

        {/* 5-card grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }}>
          {DOCS.slice(1).map((d, i) => (
            <a
              key={d.label}
              ref={ref}
              href={d.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`reveal stagger-${i + 2}`}
              style={{
                display: "flex", flexDirection: "column",
                borderRadius: "16px",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                textDecoration: "none",
                overflow: "hidden",
                transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.borderColor = `${d.accent}55`;
                el.style.boxShadow = `0 6px 28px ${d.accent}18`;
                el.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.borderColor = "";
                el.style.boxShadow = "";
                el.style.transform = "";
              }}
            >
              {/* Code preview */}
              <div style={{
                background: "#0D1824",
                padding: "1rem",
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "0.68rem",
                lineHeight: 1.8,
                color: "rgba(205,217,229,0.7)",
                flexShrink: 0,
              }}>
                {d.code.split("\n").slice(0, 2).map((line, i) => (
                  <div key={i} style={{ whiteSpace: "pre" }}>{line}</div>
                ))}
              </div>

              {/* Text */}
              <div style={{ padding: "1.1rem 1.1rem 1.25rem", flex: 1, display: "flex", flexDirection: "column" }}>
                <span style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "9px", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: d.accent, marginBottom: "0.4rem", display: "block",
                }}>
                  {d.tagline}
                </span>
                <h3 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "0.95rem", color: "var(--text)", marginBottom: "0.5rem" }}>
                  {d.label}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", lineHeight: 1.6, flex: 1 }}>
                  {d.description}
                </p>
                <span style={{ color: d.accent, fontSize: "0.78rem", fontWeight: 700, marginTop: "0.85rem", display: "block" }}>
                  Read →
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
