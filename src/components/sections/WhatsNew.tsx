"use client";

import { useReveal } from "@/hooks/useReveal";

const DOCS = "https://synapsekit.github.io/synapsekit-docs/docs";

const FEATURES = [
  {
    icon: "📡",
    label: "SynapseKit Live",
    description:
      "A zero-dependency, real-time dashboard. Every LLM call, tool, retrieval, memory write, and cost streams to your browser — enable with one line, no extra deps.",
    href: `${DOCS}/observability/live`,
  },
  {
    icon: "🐳",
    label: "Official Docker images",
    description:
      "docker pull ghcr.io/synapsekit/synapsekit — core (CLI + lib, multi-arch amd64/arm64) and all-extras variants, published on every release.",
    href: `${DOCS}/getting-started/docker`,
  },
  {
    icon: "🕸",
    label: "Open Knowledge Format",
    description:
      "Load OKF bundles as one document per concept, or ingest them as an extraction-free knowledge graph with WorldModelRAG.",
    href: `${DOCS}/rag/okf`,
  },
  {
    icon: "🧠",
    label: "Universal Memory Protocol",
    description:
      "A provider-agnostic memory-document standard with async read/write, [[wikilink]] extraction, and adapters for CLAUDE.md, Cursor, Aider, and Continue.",
    href: `${DOCS}/memory/universal-protocol`,
  },
  {
    icon: "🪞",
    label: "Digital Twin Agent",
    description:
      "Learns a versioned profile of your voice and drafts commits, PRs, and reviews in your style — gated by an enforced delegation policy.",
    href: `${DOCS}/agents/digital-twin`,
  },
  {
    icon: "⏳",
    label: "Time-Travel Codebase",
    description:
      "Reason across a repo's evolution: as-of history scoping, an AST evolution index, drift detection, and generated change narratives.",
    href: `${DOCS}/agents/time-travel`,
  },
  {
    icon: "🔏",
    label: "Signed agent marketplace",
    description:
      "Ed25519-signed .agent bundles with per-file hashing and a hardened install flow, plus a self-hostable registry with signed reviews and eval-based ranking.",
    href: `${DOCS}/agents/marketplace`,
  },
];

export default function WhatsNew() {
  const { ref } = useReveal();

  return (
    <section id="whats-new" style={{ background: "var(--bg)" }} className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div ref={ref} className="reveal mb-12 text-center">
          <p
            style={{ color: "var(--accent)", fontFamily: "var(--font-jetbrains-mono)" }}
            className="mb-3 text-xs font-medium tracking-widest uppercase"
          >
            What&apos;s new · v2.0.1
          </p>
          <h2
            style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}
            className="text-3xl font-extrabold md:text-5xl"
          >
            Live observability &{" "}
            <span style={{ color: "var(--accent)" }}>new paradigm agents.</span>
          </h2>
          <p
            style={{ color: "var(--text-muted)" }}
            className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed md:text-base"
          >
            Additive — no breaking changes. Seven new capabilities, plus a security pass to{" "}
            <strong style={{ color: "var(--text)" }}>0 known vulnerabilities</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <a
              key={f.label}
              href={f.href}
              style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
              className="group flex flex-col rounded-2xl p-6 no-underline transition-colors hover:border-[var(--accent)]"
            >
              <div className="mb-3 text-2xl" aria-hidden>
                {f.icon}
              </div>
              <h3
                style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}
                className="mb-2 text-lg font-bold"
              >
                {f.label}
              </h3>
              <p
                style={{ color: "var(--text-muted)" }}
                className="flex-1 text-sm leading-relaxed"
              >
                {f.description}
              </p>
              <span
                style={{ color: "var(--accent)", fontFamily: "var(--font-jetbrains-mono)" }}
                className="mt-4 text-xs font-medium"
              >
                Learn more →
              </span>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://synapsekit.github.io/synapsekit-docs/docs/changelog"
            style={{ color: "var(--accent)", fontFamily: "var(--font-jetbrains-mono)" }}
            className="text-sm font-medium hover:underline"
          >
            Read the full v2.0.1 changelog →
          </a>
        </div>
      </div>
    </section>
  );
}
