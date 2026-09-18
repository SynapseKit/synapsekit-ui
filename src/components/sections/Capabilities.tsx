"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const TABS = ["RAG", "Agents", "Graph Workflows"] as const;
type Tab = (typeof TABS)[number];

const CONTENT: Record<Tab, { stats: { label: string; value: string }[]; points: string[] }> = {
  RAG: {
    stats: [
      { label: "Loaders", value: "83" },
      { label: "Vector Stores", value: "32" },
      { label: "Embeddings & Reranker Providers", value: "9" },
    ],
    points: [
      "83 loaders: PDF, Word, YouTube, S3, Notion, HubSpot, BigQuery, Salesforce, Airtable, Obsidian, and more",
      "32 vector stores: Chroma, Pinecone, Weaviate, pgvector, Redis, MongoDB Atlas, SQLiteVec, and more",
      "Hybrid search: semantic vector search and multi-hop knowledge graph retrieval in one call",
      "A dedicated embeddings and reranker layer, a provider-agnostic BaseEmbeddings contract across 9 hosted providers",
      "Built-in RAG evaluation with cost and benefit tracking, alert sinks, and per-call scoring",
      "Anthropic prompt caching via SmartContextManager, which cuts costs on repeated context",
    ],
  },
  Agents: {
    stats: [
      { label: "Built-in Tools", value: "56" },
      { label: "Memory Backends", value: "10" },
      { label: "LLM Providers", value: "46" },
    ],
    points: [
      "56 built-in tools: browser automation, SQL, shell, Python REPL, GitHub, Slack, Stripe, Twilio, Jira, and more",
      "SelfImprovingAgent: eval-gated config evolution with signed patches and canary rollout",
      "NeuroSymbolicAgent: the LLM proposes constraints, a Z3, SymPy, MiniZinc, or Prolog solver checks them",
      "Verifiable agents: cryptographically signed, hash-chained audit trails you can independently verify",
      "AgentSwarm: market-based routing across distributed agents, with sealed-bid, Vickrey, English, and coalition auctions",
      "10 memory backends, including SQLite, Redis, Postgres, MongoDB, Firestore, Cosmos DB, and Cassandra",
    ],
  },
  "Graph Workflows": {
    stats: [
      { label: "Node Types", value: "Any" },
      { label: "Execution Modes", value: "3" },
      { label: "Subgraph Depth", value: "Unbounded" },
    ],
    points: [
      "DAG pipelines: define directed acyclic graphs of LLM, tool, and plain Python nodes",
      "Conditional routing: branch on any output value with dynamic graph traversal",
      "Parallel execution: run independent nodes concurrently with asyncio",
      "Recursive subgraphs: embed graphs inside graphs for modular composition",
      "Every node is plain Python. No DSL, no YAML.",
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
          <h2
            style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}
            className="text-3xl font-extrabold md:text-5xl"
          >
            Three surfaces.{" "}
            <span style={{ color: "var(--accent)" }}>One interface.</span>
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
          style={{ border: "1px solid var(--border)", background: "var(--bg)", borderRadius: "var(--radius-lg)" }}
          className="p-8"
        >
          {/* Stats row */}
          <div className="mb-8 grid grid-cols-3 gap-px" style={{ background: "var(--border)" }}>
            {content.stats.map((s) => (
              <div
                key={s.label}
                style={{ background: "var(--surface)" }}
                className="p-5 text-center"
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
              <li key={point} className="flex items-start gap-3">
                <span
                  style={{ background: "var(--accent)", minWidth: "5px", height: "5px", marginTop: "0.55rem" }}
                  aria-hidden
                />
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
