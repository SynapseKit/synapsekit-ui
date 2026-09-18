"use client";

import { useReveal } from "@/hooks/useReveal";

const PAINS = [
  {
    title: "Most frameworks pull in half of PyPI.",
    body: "50+ dependencies for a 200 MB install is common. Every import is a surprise. SynapseKit needs only numpy and rank-bm25. Everything else is an optional extra.",
  },
  {
    title: "Async gets bolted on, not designed in.",
    body: "Partial async support is unpredictable: some methods await, others block the event loop without warning. SynapseKit is async/await native at every layer.",
  },
  {
    title: "Cost tracking is usually a separate SaaS product.",
    body: "Observability shouldn't require a subscription or an external agent. SynapseKit tracks cost, tokens, and latency out of the box, and streams it locally.",
  },
];

export default function Problem() {
  const { ref } = useReveal();

  return (
    <section id="problem" style={{ background: "var(--surface2)" }} className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div ref={ref} className="reveal mb-14 max-w-2xl">
          <h2
            style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}
            className="text-3xl font-extrabold md:text-5xl"
          >
            Existing frameworks accumulate weight.
          </h2>
          <p style={{ color: "var(--text-muted)" }} className="mt-4 text-lg leading-relaxed">
            Dependency bloat, inconsistent async, and paid observability are the
            three complaints that come up most from teams evaluating alternatives.
          </p>
        </div>

        <div className="grid gap-px md:grid-cols-3" style={{ background: "var(--border)" }}>
          {PAINS.map((pain, i) => (
            <div key={pain.title} className={`reveal stagger-${i + 1}`} ref={ref}>
              <div
                style={{ background: "var(--bg)" }}
                className="h-full p-7"
              >
                <h3
                  style={{ color: "var(--text)", fontFamily: "var(--font-syne)" }}
                  className="mb-3 text-lg font-bold"
                >
                  {pain.title}
                </h3>
                <p style={{ color: "var(--text-muted)" }} className="text-sm leading-relaxed">
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
