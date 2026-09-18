"use client";

import { useReveal } from "@/hooks/useReveal";

const DOCS = [
  {
    label: "Quickstart",
    tagline: "Up in 5 minutes",
    description: "Build your first RAG pipeline or agent. pip install, configure a provider, ship.",
    href: "https://synapsekit.github.io/synapsekit-docs/docs/getting-started/quickstart",
    code: `from synapsekit import RAGPipeline\n\npipeline = RAGPipeline(llm=llm, store=store)\nresult = await pipeline.query("How does X work?")`,
    featured: true,
  },
  {
    label: "SynapseKit Live",
    tagline: "Glass-box dashboard",
    description: "Watch every LLM call, tool, retrieval, memory write, and cost stream to your browser in real time. Zero extra dependencies.",
    href: "https://synapsekit.github.io/synapsekit-docs/docs/observability/live",
    code: `import synapsekit.live as live\n\nlive.enable()            # dashboard opens\nawait agent.arun("...")  # streams live`,
  },
  {
    label: "RAG Guide",
    tagline: "Retrieval-augmented generation",
    description: "Pipelines, loaders, hybrid retrieval, vector stores, evaluation.",
    href: "https://synapsekit.github.io/synapsekit-docs/docs/rag/pipeline",
    code: `loader = PDFLoader("paper.pdf")\ndocs  = await loader.load()\nawait store.add(docs)`,
  },
  {
    label: "Agents",
    tagline: "ReAct, tools, memory",
    description: "Function calling, tool use, episodic memory, and AgentFederation across services.",
    href: "https://synapsekit.github.io/synapsekit-docs/docs/agents/overview",
    code: `agent = Agent(llm=llm, tools=[search, sql])\nresult = await agent.run(task)`,
  },
  {
    label: "Graph Workflows",
    tagline: "DAG, parallel, conditional",
    description: "Compose pipelines as graphs. Branch, merge, loop, and run subgraphs in parallel.",
    href: "https://synapsekit.github.io/synapsekit-docs/docs/graph/overview",
    code: `graph = Graph()\ngraph.add_edge(fetch, summarize)\ngraph.add_edge(fetch, classify)`,
  },
  {
    label: "LLM Providers",
    tagline: "46 providers, one interface",
    description: "ReasoningLLM, CostQualityRouter, streaming, structured output across all providers.",
    href: "https://synapsekit.github.io/synapsekit-docs/docs/llms/overview",
    code: `llm = LLM(model="gpt-4o")            # OpenAI\nllm = LLM(model="claude-sonnet-5")   # Anthropic\nllm = LLM(model="gemini-pro")        # Google`,
  },
  {
    label: "EvalCI",
    tagline: "Quality gates on every PR",
    description: "LLM eval suites that run as a GitHub Action, so regressions get caught before merge, not in production.",
    href: "https://synapsekit.github.io/synapsekit-docs/docs/evalci/overview",
    code: `@eval_case\ndef test_summary_quality():\n    assert score >= 0.85`,
  },
  {
    label: "API Reference",
    tagline: "Every class, every method",
    description: "Full reference for every public symbol, parameter, return type, and exception.",
    href: "https://synapsekit.github.io/synapsekit-docs/docs/api/llm",
    code: `# Auto-generated from source\n# Searchable, versioned, always current`,
  },
];

export default function Docs() {
  const { ref } = useReveal();

  return (
    <section id="docs" style={{ background: "var(--bg)" }} className="px-6 py-24">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div ref={ref} className="reveal mb-14">
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
                padding: "0.65rem 1.4rem", borderRadius: "var(--radius)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                fontFamily: "var(--font-dm-sans)", fontWeight: 600, fontSize: "0.875rem",
                textDecoration: "none", whiteSpace: "nowrap",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
            >
              All docs
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
              className="reveal stagger-1 feature-card"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0",
                background: "var(--surface)",
                textDecoration: "none",
                overflow: "hidden",
                marginBottom: "1px",
              }}
            >
              {/* Left */}
              <div style={{ padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <p style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "0.75rem", fontWeight: 600,
                    color: "var(--accent)",
                    marginBottom: "1rem",
                  }}>
                    {d.tagline}
                  </p>
                  <h3 style={{ fontFamily: "var(--font-syne)", fontSize: "1.75rem", fontWeight: 800, color: "var(--text)", lineHeight: 1.2, marginBottom: "0.75rem" }}>
                    {d.label}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    {d.description}
                  </p>
                </div>
                <span style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)", fontWeight: 600, fontSize: "0.875rem" }}>
                  Read the guide
                </span>
              </div>
              {/* Right — code */}
              <div style={{
                background: "var(--dark-bg)",
                padding: "2.5rem",
                display: "flex", alignItems: "center",
                borderLeft: "1px solid var(--dark-border)",
              }}>
                <pre className="code-block" style={{
                  color: "#cdd9e5", margin: 0, whiteSpace: "pre-wrap",
                }}>
                  {d.code.split("\n").map((line, i) => {
                    const kws = ["from", "import", "await", "async"];
                    const parts = line.split(/(\b(?:from|import|await|async)\b)/);
                    return (
                      <div key={i}>
                        {parts.map((part, j) =>
                          kws.includes(part)
                            ? <span key={j} className="tok-keyword">{part}</span>
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

        {/* Card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            background: "var(--border)",
            border: "1px solid var(--border)",
          }}
        >
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
                background: "var(--surface)",
                textDecoration: "none",
              }}
            >
              {/* Code preview */}
              <div className="code-block" style={{
                background: "var(--dark-bg)",
                padding: "1rem",
                fontSize: "0.68rem",
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
                  fontSize: "0.7rem", fontWeight: 600,
                  color: "var(--accent)", marginBottom: "0.4rem", display: "block",
                }}>
                  {d.tagline}
                </span>
                <h3 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "0.95rem", color: "var(--text)", marginBottom: "0.5rem" }}>
                  {d.label}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", lineHeight: 1.6, flex: 1 }}>
                  {d.description}
                </p>
                <span style={{ color: "var(--text)", fontSize: "0.78rem", fontWeight: 600, marginTop: "0.85rem", display: "block" }}>
                  Read
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
