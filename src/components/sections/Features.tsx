"use client";

import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

/* ─── Shared card shell ─────────────────────────────────────────────────── */
function Card({
  children,
  className = "",
  style = {},
  revealRef,
  delay = "",
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  revealRef?: (el: HTMLElement | null) => void;
  delay?: string;
}) {
  return (
    <div
      ref={revealRef}
      className={`reveal ${delay} group`}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "20px",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
        ...style,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "0 8px 40px rgba(0,0,0,0.08)";
        el.style.borderColor = "rgba(0,168,140,0.28)";
        el.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "";
        el.style.borderColor = "";
        el.style.transform = "";
      }}
    >
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: "var(--font-jetbrains-mono)",
      fontSize: "10px",
      fontWeight: 600,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--accent)",
      marginBottom: "0.5rem",
    }}>
      {children}
    </p>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{
      fontFamily: "var(--font-syne)",
      fontSize: "1.2rem",
      fontWeight: 800,
      color: "var(--text)",
      marginBottom: "0.5rem",
      lineHeight: 1.2,
    }}>
      {children}
    </h3>
  );
}

function Body({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.65, ...style }}>
      {children}
    </p>
  );
}

/* ─── Card A: Async-Native (wide) ─────────────────────────────────────────
   Shows async vs sync performance bar + code snippet                        */
function AsyncCard({ revealRef }: { revealRef: (el: HTMLElement | null) => void }) {
  return (
    <Card revealRef={revealRef} delay="stagger-1" style={{ gridColumn: "span 2" }}>
      <Label>Core architecture</Label>
      <Title>Async-Native — built in, not bolted on.</Title>
      <Body>Every API is async/await first. Sync wrappers for scripts. No event-loop surprises.</Body>

      <div style={{ marginTop: "1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        {/* Code block */}
        <div style={{
          background: "#0D1824",
          borderRadius: "12px",
          padding: "1rem 1.2rem",
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "0.78rem",
          lineHeight: 1.9,
        }}>
          <div style={{ color: "#8B949E", marginBottom: "4px" }}># async by default</div>
          <div>
            <span style={{ color: "#00A88C" }}>result</span>
            <span style={{ color: "#cdd9e5" }}> = </span>
            <span style={{ color: "#00A88C" }}>await</span>
            <span style={{ color: "#cdd9e5" }}> agent.</span>
            <span style={{ color: "#d2a8ff" }}>run</span>
            <span style={{ color: "#cdd9e5" }}>(prompt)</span>
          </div>
          <div>
            <span style={{ color: "#00A88C" }}>async for</span>
            <span style={{ color: "#cdd9e5" }}> token </span>
            <span style={{ color: "#00A88C" }}>in</span>
            <span style={{ color: "#cdd9e5" }}> llm.</span>
            <span style={{ color: "#d2a8ff" }}>stream</span>
            <span style={{ color: "#cdd9e5" }}>(prompt):</span>
          </div>
          <div style={{ color: "#cdd9e5", paddingLeft: "1.2rem" }}>
            <span style={{ color: "#d2a8ff" }}>print</span>(token, end=
            <span style={{ color: "#a8d8a8" }}>&quot;&quot;</span>)
          </div>
        </div>

        {/* Throughput bars */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "12px" }}>
          {[
            { label: "SynapseKit", pct: 94, color: "var(--accent)" },
            { label: "Sync frameworks", pct: 31, color: "rgba(0,0,0,0.15)" },
          ].map(b => (
            <div key={b.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 500 }}>{b.label}</span>
                {b.pct === 94 && <span style={{ fontSize: "11px", color: "var(--accent)", fontWeight: 700 }}>~3× faster</span>}
              </div>
              <div style={{ height: "7px", background: "var(--subtle)", borderRadius: "99px", overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${b.pct}%`,
                  background: b.color,
                  borderRadius: "99px",
                  transition: "width 1.2s ease",
                }} />
              </div>
            </div>
          ))}
          <p style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "4px" }}>
            Concurrent throughput, 100 parallel requests
          </p>
        </div>
      </div>
    </Card>
  );
}

/* ─── Card B: 2 Dependencies (tall) ────────────────────────────────────── */
function DepsCard({ revealRef }: { revealRef: (el: HTMLElement | null) => void }) {
  const numRef = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !counted.current) {
        counted.current = true;
        let v = 0;
        const target = 2;
        const interval = setInterval(() => {
          v++;
          if (numRef.current) numRef.current.textContent = String(v);
          if (v >= target) clearInterval(interval);
        }, 300);
      }
    }, { threshold: 0.5 });
    if (numRef.current) obs.observe(numRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <Card revealRef={revealRef} delay="stagger-2" style={{ gridRow: "span 2", display: "flex", flexDirection: "column" }}>
      <Label>Minimal footprint</Label>
      <Title>2 Dependencies.</Title>
      <Body>numpy + rank-bm25. Every other integration is optional. Install only what you need.</Body>

      {/* Big number */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "0.25rem",
        margin: "1.5rem 0",
      }}>
        <span
          ref={numRef}
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "6rem",
            fontWeight: 800,
            lineHeight: 1,
            color: "var(--accent)",
          }}
        >
          0
        </span>
        <span style={{ fontFamily: "var(--font-syne)", fontSize: "0.9rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.05em" }}>
          HARD DEPENDENCIES
        </span>
      </div>

      {/* vs bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {[
          { label: "SynapseKit", val: 2, max: 50, color: "var(--accent)" },
          { label: "LangChain", val: 50, max: 50, color: "rgba(0,0,0,0.15)" },
          { label: "LlamaIndex", val: 22, max: 50, color: "rgba(0,0,0,0.15)" },
        ].map(b => (
          <div key={b.label}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{b.label}</span>
              <span style={{ fontSize: "11px", fontWeight: 700, color: b.color === "var(--accent)" ? "var(--accent)" : "var(--text-muted)" }}>
                {b.val}{b.val === 50 ? "+" : ""}
              </span>
            </div>
            <div style={{ height: "6px", background: "var(--subtle)", borderRadius: "99px", overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${(b.val / 50) * 100}%`,
                background: b.color,
                borderRadius: "99px",
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Chips */}
      <div style={{ display: "flex", gap: "8px", marginTop: "1.2rem", flexWrap: "wrap" }}>
        {["numpy", "rank-bm25"].map(dep => (
          <span key={dep} style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "11px",
            padding: "4px 10px",
            borderRadius: "6px",
            background: "var(--accent-dim)",
            color: "var(--accent)",
            border: "1px solid rgba(0,168,140,0.2)",
            fontWeight: 500,
          }}>
            {dep}
          </span>
        ))}
      </div>
    </Card>
  );
}

/* ─── Card C: Streaming-First ───────────────────────────────────────────── */
function StreamCard({ revealRef }: { revealRef: (el: HTMLElement | null) => void }) {
  const [tokens, setTokens] = useState<string[]>([]);
  const FULL = "Revenue grew 34% YoY driven by enterprise adoption and new markets...".split(" ");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const idxRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        intervalRef.current = setInterval(() => {
          if (idxRef.current < FULL.length) {
            const word = FULL[idxRef.current];
            setTokens(prev => [...prev, word]);
            idxRef.current++;
          } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setTimeout(() => { setTokens([]); idxRef.current = 0; }, 1800);
            setTimeout(() => {
              intervalRef.current = setInterval(() => {
                if (idxRef.current < FULL.length) {
                  setTokens(prev => [...prev, FULL[idxRef.current]]);
                  idxRef.current++;
                } else {
                  clearInterval(intervalRef.current!);
                }
              }, 80);
            }, 2200);
          }
        }, 80);
      }
    }, { threshold: 0.5 });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => { obs.disconnect(); if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <Card revealRef={revealRef} delay="stagger-3">
      <Label>Output</Label>
      <Title>Streaming-First.</Title>
      <Body>Token-level streaming is the default across all 33 providers.</Body>

      <div ref={containerRef} style={{
        marginTop: "1.2rem",
        background: "var(--bg)",
        borderRadius: "10px",
        padding: "0.9rem 1rem",
        minHeight: "64px",
        fontFamily: "var(--font-jetbrains-mono)",
        fontSize: "0.8rem",
        lineHeight: 1.75,
        color: "var(--text)",
      }}>
        <span style={{ color: "var(--text-muted)", display: "block", marginBottom: "4px", fontSize: "10px" }}>
          streaming output ▸
        </span>
        {tokens.join(" ")}
        {tokens.length < FULL.length && (
          <span style={{
            display: "inline-block", width: "2px", height: "1em",
            background: "var(--accent)", verticalAlign: "text-bottom",
            marginLeft: "2px", animation: "blink 0.7s step-end infinite",
          }} />
        )}
      </div>
    </Card>
  );
}

/* ─── Card D: 33 Providers ──────────────────────────────────────────────── */
const PROVIDERS = [
  "OpenAI","Anthropic","Gemini","Ollama","Bedrock",
  "Mistral","Groq","Together","DeepSeek","Cohere",
  "Fireworks","Replicate","HuggingFace","xAI","vLLM",
  "LM Studio","Writer","Novita","Azure","Vertex",
];

function ProvidersCard({ revealRef }: { revealRef: (el: HTMLElement | null) => void }) {
  return (
    <Card revealRef={revealRef} delay="stagger-4" style={{ gridColumn: "span 2" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <Label>Ecosystem</Label>
          <Title>33 Providers. One interface.</Title>
          <Body style={{ maxWidth: "360px" }}>OpenAI, Anthropic, Gemini, Ollama, Bedrock and 28 more — same API, zero rewrites when you switch.</Body>
        </div>
        <div style={{
          fontFamily: "var(--font-syne)",
          fontSize: "4rem",
          fontWeight: 800,
          color: "var(--accent)",
          lineHeight: 1,
          opacity: 0.18,
          alignSelf: "center",
        }}>33</div>
      </div>

      <div style={{
        marginTop: "1.4rem",
        display: "flex",
        flexWrap: "wrap",
        gap: "7px",
      }}>
        {PROVIDERS.map((p, i) => (
          <span key={p} style={{
            fontSize: "11px",
            padding: "5px 11px",
            borderRadius: "6px",
            border: "1px solid var(--border)",
            background: i < 5 ? "var(--accent-dim)" : "var(--surface)",
            color: i < 5 ? "var(--accent)" : "var(--text-muted)",
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 500,
            transition: "all 0.2s",
          }}>
            {p}
          </span>
        ))}
        <span style={{
          fontSize: "11px",
          padding: "5px 11px",
          borderRadius: "6px",
          border: "1px solid var(--border)",
          color: "var(--text-muted)",
          fontFamily: "var(--font-dm-sans)",
        }}>
          +13 more
        </span>
      </div>
    </Card>
  );
}

/* ─── Card E: Transparent ──────────────────────────────────────────────── */
function TransparentCard({ revealRef }: { revealRef: (el: HTMLElement | null) => void }) {
  return (
    <Card revealRef={revealRef} delay="stagger-5">
      <Label>No black boxes</Label>
      <Title>Transparent by Design.</Title>
      <Body>No hidden chains. No global state. Every step is plain Python.</Body>

      {/* Pipeline steps — vertical */}
      <div style={{ marginTop: "1.3rem", display: "flex", flexDirection: "column", gap: "6px" }}>
        {[
          { step: "@tool",    comment: "# decorate any function" },
          { step: "agent()",  comment: "# plain Python class" },
          { step: ".run()",   comment: "# call it — no magic" },
          { step: "result",   comment: "# just a dict", accent: true },
        ].map(({ step, comment, accent }) => (
          <div key={step} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              padding: "5px 12px",
              borderRadius: "7px",
              background: accent ? "var(--accent-dim)" : "var(--bg)",
              border: `1px solid ${accent ? "rgba(0,168,140,0.3)" : "var(--border)"}`,
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "11px",
              color: accent ? "var(--accent)" : "var(--text)",
              fontWeight: 600,
              minWidth: "80px",
            }}>
              {step}
            </div>
            <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-jetbrains-mono)" }}>
              {comment}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ─── Card F: Cost Tracking ─────────────────────────────────────────────── */
function CostCard({ revealRef }: { revealRef: (el: HTMLElement | null) => void }) {
  return (
    <Card revealRef={revealRef} delay="stagger-6">
      <Label>Observability</Label>
      <Title>Cost Tracking Built-In.</Title>
      <Body>Per-call cost, tokens, and latency — tracked automatically. No SaaS needed.</Body>

      {/* Mini cost dashboard */}
      <div style={{
        marginTop: "1.3rem",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "8px",
      }}>
        {[
          { label: "Cost / query", value: "$0.0012", delta: "↓ 8%", good: true },
          { label: "Avg latency",  value: "1.34s",   delta: "↓ 12%", good: true },
          { label: "Tokens used",  value: "2.4M",    delta: "this week", good: null },
          { label: "Total spend",  value: "$2.87",   delta: "↑ $0.34", good: false },
        ].map(item => (
          <div key={item.label} style={{
            background: "var(--bg)",
            borderRadius: "10px",
            padding: "10px 12px",
            border: "1px solid var(--border)",
          }}>
            <p style={{ fontSize: "10px", color: "var(--text-muted)", marginBottom: "4px", fontWeight: 500 }}>
              {item.label}
            </p>
            <p style={{
              fontFamily: "var(--font-syne)",
              fontSize: "1.15rem",
              fontWeight: 800,
              color: "var(--text)",
              lineHeight: 1,
            }}>
              {item.value}
            </p>
            <p style={{
              fontSize: "10px",
              marginTop: "3px",
              color: item.good === true ? "var(--accent)" : item.good === false ? "var(--orange)" : "var(--text-muted)",
            }}>
              {item.delta}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ─── Section ───────────────────────────────────────────────────────────── */
export default function Features() {
  const { ref } = useReveal();

  return (
    <section
      id="features"
      style={{ background: "var(--bg)" }}
      className="px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div ref={ref} className="reveal mb-14 text-center">
          <p
            style={{ color: "var(--accent)", fontFamily: "var(--font-jetbrains-mono)" }}
            className="mb-3 text-xs font-medium tracking-widest uppercase"
          >
            Why SynapseKit
          </p>
          <h2
            style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}
            className="text-3xl font-extrabold md:text-5xl"
          >
            Every choice made{" "}
            <span style={{ color: "var(--accent)" }}>deliberately.</span>
          </h2>
        </div>

        {/* Bento grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "auto",
          gap: "16px",
        }}>
          <AsyncCard       revealRef={ref} />
          <DepsCard        revealRef={ref} />
          <StreamCard      revealRef={ref} />
          <TransparentCard revealRef={ref} />
          <ProvidersCard   revealRef={ref} />
          <CostCard        revealRef={ref} />
        </div>
      </div>
    </section>
  );
}
