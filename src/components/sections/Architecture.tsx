"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const LAYERS = [
  {
    label: "Application Layer",
    sublabel: "Your code — scripts, FastAPI services, Jupyter notebooks",
    color: "#00A88C",
    pills: ["Scripts", "FastAPI", "Notebooks", "Services"],
  },
  {
    label: "Tools & CLI",
    sublabel: "CLI commands, PromptHub versioned prompts, 47+ extensible tools",
    color: "#0EA5E9",
    pills: ["CLI", "PromptHub", "Plugins", "47+ Tools"],
  },
  {
    label: "Core Orchestration",
    sublabel: "RAG Pipelines, ReAct Agents, Graph Workflows, AgentFederation",
    color: "#8B5CF6",
    pills: ["RAGPipeline", "Agent", "StateGraph", "Federation"],
  },
  {
    label: "Data & Memory",
    sublabel: "53 loaders, 11 vector stores, 20 retrieval strategies, 9 memory backends",
    color: "#F97316",
    pills: ["53 Loaders", "11 Stores", "Hybrid Search", "9 Backends"],
  },
  {
    label: "LLM Providers",
    sublabel: "33 providers, one BaseLLM interface — streaming and structured output",
    color: "#EC4899",
    pills: ["OpenAI", "Anthropic", "Gemini", "+30 more"],
  },
  {
    label: "Async Core",
    sublabel: "numpy and rank-bm25 only — fully async, sync wrappers available",
    color: "#22C55E",
    pills: ["async/await", "Streaming", "numpy", "rank-bm25"],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function Architecture() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="architecture" ref={sectionRef} style={{ background: "var(--surface)", padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "3rem" }}
        >
          <p style={{
            color: "var(--accent)", fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase", marginBottom: "0.75rem",
          }}>
            Architecture
          </p>
          <h2 style={{
            fontFamily: "var(--font-syne)", color: "var(--text)",
            fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 900,
            lineHeight: 1.1, margin: 0,
          }}>
            Six composable layers.<br />
            <span style={{ color: "var(--accent)" }}>Use any. Use all.</span>
          </h2>
        </motion.div>

        {/* Layer stack */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          style={{ display: "flex", flexDirection: "column", gap: "6px" }}
        >
          {LAYERS.map((layer, i) => (
            <motion.div
              key={layer.label}
              variants={item}
              whileHover={{
                y: -2,
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                transition: { duration: 0.2 },
              }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "1.1rem 1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
                cursor: "default",
              }}
            >
              {/* Index */}
              <span style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "0.65rem", fontWeight: 700,
                color: layer.color, opacity: 0.55,
                flexShrink: 0, width: "16px", textAlign: "right",
              }}>
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: "var(--font-syne)", fontWeight: 800,
                  fontSize: "0.9rem", color: "var(--text)",
                  marginBottom: "2px",
                }}>
                  {layer.label}
                </div>
                <div style={{
                  fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.62rem",
                  color: "var(--text-muted)",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                  {layer.sublabel}
                </div>
              </div>

              {/* Pills */}
              <div style={{
                display: "flex", gap: "5px", flexShrink: 0,
                flexWrap: "wrap", justifyContent: "flex-end", maxWidth: "260px",
              }}>
                {layer.pills.map(p => (
                  <span key={p} style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "0.6rem", fontWeight: 700,
                    padding: "3px 9px", borderRadius: "5px",
                    background: `${layer.color}12`,
                    color: layer.color,
                    border: `1px solid ${layer.color}28`,
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
          transition={{ delay: 0.65, duration: 0.5 }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "1rem", marginTop: "2rem",
          }}
        >
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {[
              ["33", "LLM Providers"],
              ["53", "Loaders"],
              ["11", "Vector Stores"],
              ["47+", "Tools"],
            ].map(([n, label]) => (
              <div key={label} style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span style={{
                  fontFamily: "var(--font-syne)", fontWeight: 900,
                  fontSize: "1.25rem", color: "var(--accent)",
                }}>{n}</span>
                <span style={{
                  fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.62rem",
                  color: "var(--text-muted)",
                }}>{label}</span>
              </div>
            ))}
          </div>
          <motion.a
            href="https://synapsekit.github.io/synapsekit-docs/docs/architecture"
            target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-syne)", fontWeight: 700,
              fontSize: "0.82rem", color: "var(--accent)", textDecoration: "none",
            }}
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.15 }}
          >
            Architecture docs →
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
