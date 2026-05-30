"use client";

import { useReveal } from "@/hooks/useReveal";

const ROWS = [
  { label: "Hard dependencies", sk: "✅ 2", a: "❌ 50+", b: "❌ 20+" },
  { label: "Install size", sk: "✅ ~5 MB", a: "❌ ~200 MB+", b: "❌ ~100 MB+" },
  { label: "Async-native", sk: "✅ Default", a: "⚠️ Partial", b: "⚠️ Partial" },
  { label: "Streaming", sk: "✅ Default", a: "⚠️ Varies", b: "⚠️ Varies" },
  { label: "Cost tracking", sk: "✅ Built-in", a: "❌ SaaS add-on", b: "❌ No" },
  { label: "Evaluation / EvalCI", sk: "✅ CLI + GitHub Action", a: "❌ SaaS add-on", b: "⚠️ Built-in" },
  { label: "Graph workflows", sk: "✅ Built-in", a: "⚠️ Separate pkg", b: "❌ No" },
  { label: "Agent federation", sk: "✅ Built-in", a: "❌ No", b: "❌ No" },
  { label: "Reasoning LLMs", sk: "✅ Unified adapter", a: "⚠️ Manual", b: "⚠️ Manual" },
  { label: "Structured output", sk: "✅ Provider-agnostic", a: "⚠️ Provider-specific", b: "⚠️ Provider-specific" },
  { label: "Agent memory", sk: "✅ 4 built-in backends", a: "⚠️ Community plugins", b: "⚠️ Community plugins" },
  { label: "Observability", sk: "✅ Prometheus + Grafana", a: "❌ No", b: "❌ No" },
  { label: "Type safety", sk: "✅ Strict dataclasses", a: "⚠️ Partial", b: "⚠️ Partial" },
  { label: "License", sk: "Apache 2.0", a: "MIT", b: "MIT" },
];

type Status = "good" | "bad" | "warn" | "neutral";

function parseCell(value: string): { status: Status; text: string } {
  if (value.startsWith("✅")) return { status: "good", text: value.slice(2).trim() };
  if (value.startsWith("❌")) return { status: "bad", text: value.slice(2).trim() };
  if (value.startsWith("⚠️")) return { status: "warn", text: value.slice(3).trim() };
  return { status: "neutral", text: value };
}

const STATUS_DOT: Record<Status, { bg: string; ring: string }> = {
  good:    { bg: "#00A88C", ring: "rgba(0,168,140,0.25)" },
  bad:     { bg: "#FF3B3B", ring: "rgba(255,59,59,0.2)" },
  warn:    { bg: "#FF9F1C", ring: "rgba(255,159,28,0.2)" },
  neutral: { bg: "transparent", ring: "transparent" },
};

function StatusDot({ status }: { status: Status }) {
  if (status === "neutral") return null;
  const { bg, ring } = STATUS_DOT[status];
  return (
    <span
      style={{
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: bg,
        boxShadow: `0 0 0 3px ${ring}`,
        flexShrink: 0,
        marginTop: 1,
      }}
    />
  );
}

function Cell({ value, highlight }: { value: string; highlight?: boolean }) {
  const { status, text } = parseCell(value);
  const textColor = highlight
    ? status === "good" ? "var(--accent)" : status === "bad" ? "#FF6B6B" : status === "warn" ? "#FFB347" : "var(--text)"
    : status === "good" ? "var(--green)" : status === "bad" ? "var(--red)" : status === "warn" ? "#E8900A" : "var(--text-muted)";

  return (
    <td
      style={{
        padding: "14px 20px",
        background: highlight ? "rgba(0,168,140,0.05)" : "transparent",
        borderLeft: highlight ? "2px solid rgba(0,168,140,0.3)" : "none",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <StatusDot status={status} />
        <span
          style={{
            fontSize: "0.8125rem",
            color: textColor,
            fontWeight: highlight ? 600 : 400,
            fontFamily: highlight ? "var(--font-dm-sans)" : undefined,
            lineHeight: 1.4,
          }}
        >
          {text}
        </span>
      </span>
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
          <p style={{ color: "var(--text-muted)", marginTop: "0.75rem", fontSize: "1rem" }}>
            SynapseKit vs LangChain vs LlamaIndex — side by side.
          </p>
        </div>

        <div
          ref={ref}
          className="reveal overflow-x-auto rounded-2xl"
          style={{
            border: "1px solid var(--border)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
            background: "var(--surface)",
          }}
        >
          <table className="w-full min-w-[640px]" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th
                  style={{
                    padding: "18px 20px",
                    textAlign: "left",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    background: "var(--surface2)",
                    borderBottom: "1px solid var(--border)",
                    width: "30%",
                  }}
                >
                  Feature
                </th>
                {(["SynapseKit", "LangChain", "LlamaIndex"] as const).map((h, i) => (
                  <th
                    key={h}
                    style={{
                      padding: "18px 20px",
                      textAlign: "left",
                      background: i === 0 ? "rgba(0,168,140,0.08)" : "var(--surface2)",
                      borderBottom: "1px solid var(--border)",
                      borderLeft: i === 0 ? "2px solid var(--accent)" : "none",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span
                        style={{
                          fontFamily: "var(--font-syne)",
                          fontSize: "0.9375rem",
                          fontWeight: 700,
                          color: i === 0 ? "var(--accent)" : "var(--text-muted)",
                        }}
                      >
                        {h}
                      </span>
                      {i === 0 && (
                        <span
                          style={{
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            background: "var(--accent)",
                            color: "#fff",
                            padding: "2px 7px",
                            borderRadius: 99,
                            lineHeight: 1.6,
                          }}
                        >
                          Best
                        </span>
                      )}
                    </span>
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
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLTableRowElement).style.background = "rgba(0,168,140,0.03)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLTableRowElement).style.background = "transparent";
                  }}
                >
                  <td
                    style={{
                      padding: "14px 20px",
                      fontSize: "0.8125rem",
                      fontWeight: 500,
                      color: "var(--text)",
                    }}
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
