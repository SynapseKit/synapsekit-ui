"use client";

import { useReveal } from "@/hooks/useReveal";

const ROWS = [
  { label: "Hard dependencies", sk: "good:2", a: "bad:50+", b: "bad:20+" },
  { label: "Install size", sk: "good:~5 MB", a: "bad:~200 MB+", b: "bad:~100 MB+" },
  { label: "Async-native", sk: "good:Default", a: "warn:Partial", b: "warn:Partial" },
  { label: "Streaming", sk: "good:Default", a: "warn:Varies", b: "warn:Varies" },
  { label: "Cost tracking", sk: "good:Built-in", a: "bad:SaaS add-on", b: "bad:No" },
  { label: "Evaluation (EvalCI)", sk: "good:CLI + GitHub Action", a: "bad:SaaS add-on", b: "warn:Built-in" },
  { label: "Graph workflows", sk: "good:Built-in", a: "warn:Separate package", b: "bad:No" },
  { label: "Agent federation", sk: "good:Built-in", a: "bad:No", b: "bad:No" },
  { label: "Guardrails middleware", sk: "good:Built-in", a: "bad:No", b: "bad:No" },
  { label: "Verifiable audit trails", sk: "good:Signed, hash-chained", a: "bad:No", b: "bad:No" },
  { label: "Agent memory backends", sk: "good:10 built-in", a: "warn:Community plugins", b: "warn:Community plugins" },
  { label: "Observability", sk: "good:Prometheus + Grafana", a: "bad:No", b: "bad:No" },
  { label: "Type safety", sk: "good:Strict dataclasses", a: "warn:Partial", b: "warn:Partial" },
  { label: "LLM providers", sk: "neutral:46", a: "neutral:38+", b: "neutral:20+" },
  { label: "License", sk: "neutral:Apache 2.0", a: "neutral:MIT", b: "neutral:MIT" },
];

type Status = "good" | "bad" | "warn" | "neutral";

function parseCell(value: string): { status: Status; text: string } {
  const [status, ...rest] = value.split(":");
  return { status: status as Status, text: rest.join(":") };
}

const STATUS_COLOR: Record<Status, string> = {
  good: "var(--accent)",
  bad: "var(--red)",
  warn: "var(--ember)",
  neutral: "var(--text-muted)",
};

function StatusMark({ status }: { status: Status }) {
  if (status === "neutral") return null;
  const char = status === "good" ? "+" : status === "bad" ? "–" : "~";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 14,
        fontFamily: "var(--font-jetbrains-mono)",
        fontSize: "0.8rem",
        fontWeight: 700,
        color: STATUS_COLOR[status],
        flexShrink: 0,
      }}
    >
      {char}
    </span>
  );
}

function Cell({ value, highlight }: { value: string; highlight?: boolean }) {
  const { status, text } = parseCell(value);

  return (
    <td
      className={highlight ? "table-highlight" : undefined}
      style={{
        padding: "14px 20px",
        borderLeft: highlight ? undefined : "none",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <StatusMark status={status} />
        <span
          style={{
            fontSize: "0.8125rem",
            color: highlight ? "var(--text)" : "var(--text-muted)",
            fontWeight: highlight ? 600 : 400,
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
        <div ref={ref} className="reveal mb-14">
          <h2
            style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}
            className="text-3xl font-extrabold md:text-5xl"
          >
            How we stack up.
          </h2>
          <p style={{ color: "var(--text-muted)", marginTop: "0.75rem", fontSize: "1rem" }}>
            SynapseKit, LangChain, and LlamaIndex, side by side.
          </p>
        </div>

        <div
          ref={ref}
          className="reveal overflow-x-auto"
          style={{
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            background: "var(--surface)",
          }}
        >
          <table className="w-full min-w-[640px]" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th
                  style={{
                    padding: "16px 20px",
                    textAlign: "left",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
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
                      padding: "16px 20px",
                      textAlign: "left",
                      background: i === 0 ? "var(--accent-dim)" : "var(--surface2)",
                      borderBottom: "1px solid var(--border)",
                      borderLeft: i === 0 ? "2px solid var(--accent)" : "none",
                    }}
                  >
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
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} style={{ borderTop: "1px solid var(--border)" }}>
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

        <p style={{ color: "var(--text-muted)", marginTop: "1rem", fontSize: "0.85rem" }}>
          LangChain has more raw integrations and tutorials. SynapseKit optimizes for shipping and
          debugging a production LLM feature: readable code, predictable async behavior, and no
          surprise SaaS bill.
        </p>
      </div>
    </section>
  );
}
