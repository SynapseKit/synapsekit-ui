"use client";

import { useReveal } from "@/hooks/useReveal";

const DOCS = "https://synapsekit.github.io/synapsekit-docs/docs";
const CHANGELOG = "https://github.com/SynapseKit/SynapseKit/blob/main/CHANGELOG.md";

const CATEGORIES: {
  title: string;
  items: { name: string; description: string; href: string }[];
}[] = [
  {
    title: "Trust and verification",
    items: [
      {
        name: "Verifiable Agents",
        description: "Signed, hash-chained audit trails with a standalone MATCH / DRIFT / UNVERIFIABLE verifier.",
        href: `${DOCS}/audit`,
      },
      {
        name: "Guardrails",
        description: "Policy middleware for any LLM call: block, redact, flag, or require human review, with HIPAA/GDPR/PCI-DSS rulepacks.",
        href: CHANGELOG,
      },
      {
        name: "NeuroSymbolicAgent",
        description: "The LLM proposes constraints, a Z3, SymPy, MiniZinc, or Prolog solver checks them before you trust the answer.",
        href: `${DOCS}/agents/neuro-symbolic`,
      },
      {
        name: "Orchestration eval",
        description: "Detects handoff loops, per-transfer context loss, and non-deterministic mis-routing across multi-agent runs.",
        href: CHANGELOG,
      },
    ],
  },
  {
    title: "Memory and retrieval",
    items: [
      {
        name: "Living Memory",
        description: "Agents propose signed, diffable patches to their memory files instead of silently overwriting them.",
        href: `${DOCS}/memory/living-memory`,
      },
      {
        name: "Property Graph RAG, WorldModelRAG",
        description: "Vector search fused with graph traversal, plus a temporal knowledge graph with causal links.",
        href: `${DOCS}/rag/property-graph`,
      },
      {
        name: "Personal Knowledge Mesh",
        description: "Local-first, incremental indexing across every project on your machine, with a CLI and MCP tools.",
        href: `${DOCS}/mesh`,
      },
      {
        name: "Embeddings and reranker layer",
        description: "A provider-agnostic BaseEmbeddings contract across 9 hosted providers, plus a Reranker interface.",
        href: CHANGELOG,
      },
    ],
  },
  {
    title: "Agents",
    items: [
      {
        name: "AgentSwarm",
        description: "Market-based routing across distributed agents: sealed-bid, Vickrey, English, and coalition auctions.",
        href: `${DOCS}/agents/swarm`,
      },
      {
        name: "SelfImprovingAgent",
        description: "Eval-gated config evolution with signed patches and canary rollout. Every bad patch is blocked by the gate.",
        href: `${DOCS}/agents/self-improving`,
      },
      {
        name: "EdgeRuntime",
        description: "Local-first inference with policy-gated cloud fallback and PII redaction before any data leaves the device.",
        href: `${DOCS}/edge`,
      },
      {
        name: "Dream Mode, Ambient daemon",
        description: "Offline reflection over past runs, and a background daemon that watches for moments to intervene.",
        href: CHANGELOG,
      },
      {
        name: "Code Archaeology agent",
        description: "Reasons across a repo's history: as-of scoping, drift detection, and generated change narratives.",
        href: `${DOCS}/agents/time-travel`,
      },
      {
        name: "Digital Twin, Hive Mode, Agent OS Shell",
        description: "A versioned profile of your voice for drafting in your style, multi-agent coordination, and a local agent shell.",
        href: `${DOCS}/agents/digital-twin`,
      },
    ],
  },
  {
    title: "Operations",
    items: [
      {
        name: "SynapseKit Live",
        description: "A zero-dependency, real-time dashboard. Every LLM call, tool, retrieval, and cost streams to your browser.",
        href: `${DOCS}/observability/live`,
      },
      {
        name: "Official Docker images",
        description: "docker pull ghcr.io/synapsekit/synapsekit: core and all-extras variants, published on every release.",
        href: `${DOCS}/getting-started/docker`,
      },
      {
        name: "CAG/RAG router",
        description: "Routes between cache-augmented and retrieval-augmented generation, with a llama.cpp KV-cache backend.",
        href: CHANGELOG,
      },
      {
        name: "Signed agent marketplace, PC Twin",
        description: "Ed25519-signed agent bundles with a hardened install flow, and a sandboxed environment for safe automation.",
        href: `${DOCS}/agents/marketplace`,
      },
    ],
  },
];

export default function WhatsNew() {
  const { ref } = useReveal();

  return (
    <section id="whats-new" style={{ background: "var(--bg)" }} className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div ref={ref} className="reveal mb-14 max-w-2xl">
          <h2
            style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}
            className="text-3xl font-extrabold md:text-5xl"
          >
            What&apos;s new
          </h2>
          <p style={{ color: "var(--text-muted)" }} className="mt-4 text-sm leading-relaxed md:text-base">
            The 2.x line is about trust and autonomy in production: provable agent behavior,
            self-managing memory, richer retrieval, local-first operation, and policy
            enforcement at the LLM boundary. All additive, no breaking changes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {CATEGORIES.map((cat) => (
            <div key={cat.title}>
              <h3
                style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--text-muted)" }}
                className="mb-4 text-xs font-semibold"
              >
                {cat.title}
              </h3>
              <ul className="flex flex-col" style={{ borderTop: "1px solid var(--border)" }}>
                {cat.items.map((item) => (
                  <li key={item.name} style={{ borderBottom: "1px solid var(--border)" }}>
                    <a
                      href={item.href}
                      target={item.href === CHANGELOG ? "_blank" : undefined}
                      rel={item.href === CHANGELOG ? "noopener noreferrer" : undefined}
                      className="group flex flex-col gap-1 py-4 no-underline"
                    >
                      <span
                        style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}
                        className="text-base font-bold transition-colors group-hover:text-[var(--accent)]"
                      >
                        {item.name}
                      </span>
                      <span style={{ color: "var(--text-muted)" }} className="text-sm leading-relaxed">
                        {item.description}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <a
            href={CHANGELOG}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent)", fontFamily: "var(--font-jetbrains-mono)" }}
            className="text-sm font-medium hover:underline"
          >
            Read the full changelog
          </a>
        </div>
      </div>
    </section>
  );
}
