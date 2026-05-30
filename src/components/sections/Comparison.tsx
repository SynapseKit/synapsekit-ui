"use client";

import { useReveal } from "@/hooks/useReveal";

const ROWS = [
  { label: "Hard dependencies", sk: "2", a: "50+", b: "20+" },
  { label: "Install size", sk: "~5 MB", a: "~200 MB+", b: "~100 MB+" },
  { label: "Async-native", sk: "✅ Default", a: "⚠️ Partial", b: "⚠️ Partial" },
  { label: "Streaming", sk: "✅ Default", a: "⚠️ Varies", b: "⚠️ Varies" },
  { label: "Cost tracking", sk: "✅ Built-in", a: "❌ SaaS add-on", b: "❌ No" },
  { label: "Evaluation / EvalCI", sk: "✅ CLI + GitHub Action", a: "❌ SaaS add-on", b: "✅ Built-in" },
  { label: "Graph workflows", sk: "✅ Built-in", a: "✅ Separate package", b: "❌ No" },
  { label: "Agent federation", sk: "✅ Built-in", a: "❌ No", b: "❌ No" },
  { label: "Reasoning LLMs", sk: "✅ Unified adapter", a: "⚠️ Manual", b: "⚠️ Manual" },
  { label: "Structured output", sk: "✅ Provider-agnostic", a: "⚠️ Provider-specific", b: "⚠️ Provider-specific" },
  { label: "Agent memory backends", sk: "✅ 4 built-in", a: "⚠️ Community plugins", b: "⚠️ Community plugins" },
  { label: "Observability", sk: "✅ Prometheus + Grafana", a: "❌ No", b: "❌ No" },
  { label: "Type safety", sk: "✅ Strict dataclasses", a: "⚠️ Partial", b: "⚠️ Partial" },
  { label: "License", sk: "Apache 2.0", a: "MIT", b: "MIT" },
];

const HEADERS = ["SynapseKit", "LangChain", "LlamaIndex"] as const;

function Cell({ value, highlight }: { value: string; highlight?: boolean }) {
  const isGood = value.startsWith("✅");
  const isBad = value.startsWith("❌");
  return (
    <td
      className={`px-5 py-4 text-sm ${highlight ? "table-highlight font-semibold" : ""}`}
      style={{
        color: highlight
          ? "var(--accent)"
          : isGood
          ? "var(--green)"
          : isBad
          ? "var(--red)"
          : "var(--text-muted)",
      }}
    >
      {value}
    </td>
  );
}

export default function Comparison() {
  const { ref } = useReveal();

  return (
    <section
      id="compare"
      style={{ background: "var(--bg)" }}
      className="px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div ref={ref} className="reveal mb-14 text-center">
          <p
            style={{ color: "var(--accent)", fontFamily: "var(--font-jetbrains-mono)" }}
            className="mb-3 text-xs font-medium tracking-widest uppercase"
          >
            Comparison
          </p>
          <h2
            style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}
            className="text-3xl font-extrabold md:text-5xl"
          >
            How we stack up.
          </h2>
        </div>

        <div
          ref={ref}
          className="reveal overflow-x-auto rounded-2xl"
          style={{ border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)" }}
        >
          <table className="w-full min-w-[640px]">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <th
                  className="px-5 py-4 text-left text-sm font-semibold"
                  style={{ color: "var(--text-muted)", background: "var(--surface)" }}
                >
                  Feature
                </th>
                {HEADERS.map((h, i) => (
                  <th
                    key={h}
                    className="px-5 py-4 text-left text-sm font-semibold"
                    style={{
                      fontFamily: "var(--font-syne)",
                      color: i === 0 ? "var(--accent)" : "var(--text-muted)",
                      background: i === 0 ? "rgba(0,71,255,0.04)" : "var(--surface)",
                      borderLeft: i === 0 ? "3px solid var(--accent)" : undefined,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr
                  key={row.label}
                  style={{
                    borderTop: "1px solid var(--border)",
                    background: i % 2 === 0 ? "var(--surface)" : "var(--bg)",
                  }}
                >
                  <td
                    className="px-5 py-4 text-sm font-medium"
                    style={{ color: "var(--text)" }}
                  >
                    {row.label}
                  </td>
                  <Cell value={row.sk} highlight />
                  <Cell value={row.a} />
                  <Cell value={row.b} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
