"use client";

import { useReveal } from "@/hooks/useReveal";

const PAINS = [
  {
    icon: "✗",
    title: "50+ dependencies. 200 MB install. For what?",
    body: "Most LLM frameworks pull in half of PyPI. Every import is a surprise. SynapseKit needs only numpy and rank-bm25.",
  },
  {
    icon: "✗",
    title: "Async was bolted on. Not designed in.",
    body: "Partial async support is unpredictable and fragile. SynapseKit is async/await native at every layer — no sync wrapper surprises.",
  },
  {
    icon: "✗",
    title: "Cost tracking sold separately as a SaaS product.",
    body: "Observability shouldn't require a subscription. SynapseKit tracks cost, tokens, and latency out of the box — locally.",
  },
];

export default function Problem() {
  const { ref } = useReveal();

  return (
    <section
      id="problem"
      style={{ background: "var(--dark-bg)" }}
      className="px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div ref={ref} className="reveal mb-14 text-center">
          <p
            style={{ color: "var(--red)", fontFamily: "var(--font-jetbrains-mono)" }}
            className="mb-3 text-xs font-medium tracking-widest uppercase"
          >
            The Problem
          </p>
          <h2
            style={{ fontFamily: "var(--font-syne)", color: "#ffffff" }}
            className="text-3xl font-extrabold md:text-5xl"
          >
            Existing frameworks are bloated mazes.
            <br />
            <span style={{ color: "var(--red)" }}>You deserve better.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PAINS.map((pain, i) => (
            <div
              key={pain.title}
              className={`reveal stagger-${i + 1}`}
              ref={ref}
            >
              <div
                style={{
                  background: "var(--dark-surface)",
                  border: "1px solid var(--dark-border)",
                }}
                className="h-full rounded-2xl p-7"
              >
                <span
                  style={{ color: "var(--red)" }}
                  className="mb-4 block text-2xl font-bold"
                >
                  {pain.icon}
                </span>
                <h3
                  style={{ color: "#ffffff", fontFamily: "var(--font-syne)" }}
                  className="mb-3 text-lg font-bold"
                >
                  {pain.title}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.55)" }} className="text-sm leading-relaxed">
                  {pain.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
