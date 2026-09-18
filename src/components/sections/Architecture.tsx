"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const LAYERS = [
  {
    label: "Application layer",
    sublabel: "Your code: scripts, FastAPI services, Jupyter notebooks",
    pills: ["Scripts", "FastAPI", "Notebooks"],
  },
  {
    label: "Tools and CLI",
    sublabel: "CLI commands, PromptHub versioned prompts, 56 built-in tools",
    pills: ["CLI", "PromptHub", "56 tools"],
  },
  {
    label: "Core orchestration",
    sublabel: "RAG pipelines, ReAct and function-calling agents, graph workflows, guardrails, AgentSwarm",
    pills: ["RAGPipeline", "Agent", "StateGraph", "Guardrails"],
  },
  {
    label: "Data and memory",
    sublabel: "83 loaders, 32 vector stores, 9 embeddings/reranker providers, 10 memory backends",
    pills: ["83 loaders", "32 stores", "10 backends"],
  },
  {
    label: "LLM providers",
    sublabel: "46 providers, one BaseLLM interface, streaming and structured output by default",
    pills: ["OpenAI", "Anthropic", "Gemini", "+43 more"],
  },
  {
    label: "Async core",
    sublabel: "numpy and rank-bm25 only. Fully async, sync wrappers available",
    pills: ["async/await", "numpy", "rank-bm25"],
  },
];

const STATS: [string, string][] = [
  ["46", "LLM providers"],
  ["83", "Loaders"],
  ["32", "Vector stores"],
  ["56", "Tools"],
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function Architecture() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="architecture" ref={sectionRef} style={{ background: "var(--surface)", padding: "6rem 1.5rem", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "3rem" }}
        >
          <h2 style={{
            fontFamily: "var(--font-syne)", color: "var(--text)",
            fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 800,
            lineHeight: 1.1, margin: 0,
          }}>
            Six layers. Use one, use all.
          </h2>
          <p style={{
            color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.65,
            maxWidth: "560px", marginTop: "0.9rem",
          }}>
            Each layer is a normal Python import, not a hidden dependency. Take the
            vector store without the agent runtime, or the graph engine without the CLI.
          </p>
        </motion.div>

        {/* Layer stack */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)", border: "1px solid var(--border)" }}
        >
          {LAYERS.map((layer, i) => (
            <motion.div
              key={layer.label}
              variants={item}
              style={{
                background: "var(--surface)",
                padding: "1.1rem 1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
                flexWrap: "wrap",
              }}
            >
              {/* Index */}
              <span style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "0.7rem", fontWeight: 600,
                color: "var(--text-muted)",
                flexShrink: 0, width: "18px",
              }}>
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Text */}
              <div style={{ flex: "1 1 260px", minWidth: 0 }}>
                <div style={{
                  fontFamily: "var(--font-syne)", fontWeight: 700,
                  fontSize: "0.92rem", color: "var(--text)",
                  marginBottom: "2px",
                }}>
                  {layer.label}
                </div>
                <div style={{
                  fontSize: "0.8rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.5,
                }}>
                  {layer.sublabel}
                </div>
              </div>

              {/* Pills */}
              <div style={{
                display: "flex", gap: "6px", flexShrink: 0,
                flexWrap: "wrap", justifyContent: "flex-end", maxWidth: "280px",
              }}>
                {layer.pills.map(p => (
                  <span key={p} style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "0.65rem", fontWeight: 500,
                    padding: "3px 8px",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    color: "var(--text-muted)",
                    whiteSpace: "nowrap",
                  }}>{p}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.4 }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "1rem", marginTop: "2rem",
            paddingTop: "1.5rem", borderTop: "1px solid var(--border)",
          }}
        >
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {STATS.map(([n, label]) => (
              <div key={label} style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span style={{
                  fontFamily: "var(--font-jetbrains-mono)", fontWeight: 700,
                  fontSize: "1.1rem", color: "var(--text)",
                }}>{n}</span>
                <span style={{
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                }}>{label}</span>
              </div>
            ))}
          </div>
          <a
            href="https://synapsekit.github.io/synapsekit-docs/docs/architecture"
            target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-dm-sans)", fontWeight: 600,
              fontSize: "0.85rem", color: "var(--accent)", textDecoration: "none",
            }}
          >
            Read the architecture docs
          </a>
        </motion.div>

      </div>
    </section>
  );
}
