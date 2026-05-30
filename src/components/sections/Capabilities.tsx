"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const TABS = ["RAG", "Agents", "Graph Workflows"] as const;
type Tab = (typeof TABS)[number];

const CONTENT: Record<Tab, { stats: { label: string; value: string }[]; points: string[] }> = {
  RAG: {
    stats: [
      { label: "Loaders", value: "53" },
      { label: "Vector Stores", value: "11" },
      { label: "Retrieval Modes", value: "3" },
    ],
    points: [
      "53 loaders — PDF, Word, YouTube, S3, Notion, HubSpot, BigQuery, Salesforce, Airtable, Obsidian, and more",
      "11 vector stores — Chroma, Pinecone, Weaviate, pgvector, Redis, MongoDB Atlas, SQLiteVec, and more",
      "Hybrid search — semantic vector search + multi-hop Knowledge Graph retrieval in one call",
      "Built-in RAG evaluation — cost/benefit tracking, Slack alert sinks, per-call scoring",
      "Anthropic prompt caching via SmartContextManager — cuts costs on repeated context",
    ],
  },
  Agents: {
    stats: [
      { label: "Built-in Tools", value: "47+" },
      { label: "Memory Backends", value: "4" },
      { label: "Registry Modes", value: "2" },
    ],
    points: [
      "ReAct loop and function calling — composable, inspectable, debuggable",
      "47+ tools — Browser (Playwright), SQL, Shell, Python REPL, GitHub, Slack, Stripe, Twilio, Jira, and more",
      "AgentFederation + AgentRegistry — route tasks across distributed agents (in-memory or Redis)",
      "Persistent memory — episodic + semantic, 4 backends: SQLite, Redis, Postgres, in-memory",
      "CostQualityRouter — learning-based LLM selection using Pareto frontier exploration/exploitation",
    ],
  },
  "Graph Workflows": {
    stats: [
      { label: "Node Types", value: "∞" },
      { label: "Execution Modes", value: "3" },
      { label: "Subgraph Depth", value: "N" },
    ],
    points: [
      "DAG pipelines — define directed acyclic graphs of LLM + tool + Python nodes",
      "Conditional routing — branch on any output value, dynamic graph traversal",
      "Parallel execution — run independent nodes concurrently with asyncio",
      "Recursive subgraphs — embed graphs inside graphs for modular composition",
      "Every node is plain Python — no DSL, no YAML, no magic",
    ],
  },
};

export default function Capabilities() {
  const [active, setActive] = useState<Tab>("RAG");
  const { ref } = useReveal();
  const content = CONTENT[active];

  return (
    <section
      style={{ background: "var(--surface)" }}
      className="px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div ref={ref} className="reveal mb-12 text-center">
          <p
            style={{ color: "var(--accent)", fontFamily: "var(--font-jetbrains-mono)" }}
            className="mb-3 text-xs font-medium tracking-widest uppercase"
          >
            Capabilities
          </p>
          <h2
            style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}
            className="text-3xl font-extrabold md:text-5xl"
          >
            Everything you need.{" "}
            <span style={{ color: "var(--accent)" }}>Nothing you don't.</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="mb-10 flex justify-center gap-3">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${active === tab ? "active" : ""}`}
              onClick={() => setActive(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div
          style={{ border: "1px solid var(--border)", background: "var(--bg)" }}
          className="rounded-2xl p-8"
        >
          {/* Stats row */}
          <div className="mb-8 grid grid-cols-3 gap-4">
            {content.stats.map((s) => (
              <div
                key={s.label}
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                className="rounded-xl p-5 text-center"
              >
                <p
                  style={{ fontFamily: "var(--font-syne)", color: "var(--accent)" }}
                  className="text-3xl font-extrabold"
                >
                  {s.value}
                </p>
                <p style={{ color: "var(--text-muted)" }} className="mt-1 text-xs font-medium">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Points */}
          <ul className="flex flex-col gap-4">
            {content.points.map((point) => (
              <li key={point} className="flex items-start gap-4">
                <span
                  style={{
                    background: "rgba(0,71,255,0.1)",
                    color: "var(--accent)",
                    minWidth: "1.5rem",
                    height: "1.5rem",
                  }}
                  className="flex items-center justify-center rounded-full text-xs font-bold"
                >
                  →
                </span>
                <p style={{ color: "var(--text)" }} className="text-sm leading-relaxed">
                  {point}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
