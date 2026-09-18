"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Router diagram: the actual mental model of the product ────────────────
   Many providers → one interface (BaseLLM) → three capabilities.
   Drawn once on load. No loop, no particles, no glow. ────────────────────── */

const INPUTS = [
  { label: "OpenAI", y: 40 },
  { label: "Anthropic", y: 96 },
  { label: "Gemini", y: 152 },
  { label: "Mistral", y: 208 },
  { label: "Ollama", y: 264 },
  { label: "+ 41 more", y: 320, muted: true },
];

const OUTPUTS = [
  { label: "RAG", desc: "Retrieval", y: 64 },
  { label: "Agents", desc: "ReAct, tools", y: 180 },
  { label: "Graph", desc: "Workflows", y: 296 },
];

const BUS_X = 430;
const BUS_TOP = 40;
const BUS_BOTTOM = 320;
const IN_X = 180;
const OUT_X = 620;

function RouterDiagram() {
  return (
    <svg
      viewBox="0 0 900 360"
      className="w-full"
      style={{ maxWidth: 900 }}
      role="img"
      aria-label="Diagram: many LLM providers connect through SynapseKit's single BaseLLM interface, out to RAG, agent, and graph workflows"
    >
      {/* input lines */}
      {INPUTS.map((n, i) => {
        const len = BUS_X - IN_X;
        return (
          <line
            key={n.label}
            x1={IN_X} y1={n.y} x2={BUS_X} y2={n.y}
            stroke={n.muted ? "var(--border)" : "var(--text-muted)"}
            strokeWidth={1}
            className="router-line"
            style={{ ["--len" as string]: len, ["--delay" as string]: `${0.05 * i}s` }}
          />
        );
      })}

      {/* bus */}
      <line
        x1={BUS_X} y1={BUS_TOP} x2={BUS_X} y2={BUS_BOTTOM}
        stroke="var(--accent)" strokeWidth={2}
        className="router-line"
        style={{ ["--len" as string]: BUS_BOTTOM - BUS_TOP, ["--delay" as string]: "0.3s" }}
      />

      {/* output lines */}
      {OUTPUTS.map((n, i) => {
        const dx = OUT_X - BUS_X, dy = n.y - 180;
        const len = Math.hypot(dx, dy);
        return (
          <line
            key={n.label}
            x1={BUS_X} y1={180} x2={OUT_X} y2={n.y}
            stroke="var(--text-muted)" strokeWidth={1}
            className="router-line"
            style={{ ["--len" as string]: len, ["--delay" as string]: `${0.4 + 0.08 * i}s` }}
          />
        );
      })}

      {/* input nodes + labels */}
      {INPUTS.map((n, i) => (
        <g key={n.label} className="router-node" style={{ ["--delay" as string]: `${0.5 + 0.04 * i}s` }}>
          <circle cx={IN_X} cy={n.y} r={3} fill={n.muted ? "var(--border)" : "var(--text-muted)"} />
          <text
            x={IN_X - 12} y={n.y + 4} textAnchor="end"
            fontFamily="var(--font-jetbrains-mono)" fontSize={12}
            fill={n.muted ? "var(--text-muted)" : "var(--text)"}
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* bus label */}
      <g className="router-node" style={{ ["--delay" as string]: "0.75s" }}>
        <rect x={BUS_X - 46} y={150} width={92} height={60} fill="var(--bg)" stroke="var(--accent)" strokeWidth={1.5} />
        <text x={BUS_X} y={176} textAnchor="middle" fontFamily="var(--font-jetbrains-mono)" fontSize={12} fontWeight={700} fill="var(--text)">
          BaseLLM
        </text>
        <text x={BUS_X} y={194} textAnchor="middle" fontFamily="var(--font-jetbrains-mono)" fontSize={9.5} fill="var(--text-muted)">
          one interface
        </text>
      </g>

      {/* output nodes + labels */}
      {OUTPUTS.map((n, i) => (
        <g key={n.label} className="router-node" style={{ ["--delay" as string]: `${0.85 + 0.06 * i}s` }}>
          <circle cx={OUT_X} cy={n.y} r={3} fill="var(--accent)" />
          <text x={OUT_X + 14} y={n.y - 1} fontFamily="var(--font-syne)" fontSize={14} fontWeight={700} fill="var(--text)">
            {n.label}
          </text>
          <text x={OUT_X + 14} y={n.y + 15} fontFamily="var(--font-dm-sans)" fontSize={11} fill="var(--text-muted)">
            {n.desc}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ─── Stats ─────────────────────────────────────────────────────────────── */
const STATS: { label: string; value: number; suffix?: string }[] = [
  { label: "LLM providers", value: 46 },
  { label: "vector stores", value: 32 },
  { label: "data loaders", value: 83 },
  { label: "hard dependencies", value: 2 },
];

function animateCounter(el: HTMLElement, target: number, dur = 900) {
  const start = performance.now();
  const run = (now: number) => {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = String(Math.floor(ease * target));
    if (p < 1) requestAnimationFrame(run);
    else el.textContent = String(target);
  };
  requestAnimationFrame(run);
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const counted = useRef(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    queueMicrotask(() => setReduced(mql.matches));
  }, []);

  useEffect(() => {
    if (reduced) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !counted.current) {
          counted.current = true;
          statsRef.current?.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
            animateCounter(el, Number(el.dataset.count));
          });
        }
      },
      { threshold: 0.4 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, [reduced]);

  return (
    <section
      style={{ background: "var(--bg)", position: "relative" }}
      className="flex flex-col items-center px-6 pt-32 pb-20"
    >
      {/* faint grid, structural not decorative: reads as blueprint graph paper */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(to bottom, black, transparent 85%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 85%)",
        }}
      />

      <div className="mx-auto w-full max-w-3xl text-center" style={{ position: "relative" }}>
        {/* Badge */}
        <a
          href="https://synapsekit.github.io/synapsekit-docs/docs/changelog"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
            fontFamily: "var(--font-jetbrains-mono)",
            padding: "5px 14px",
            fontSize: "11.5px",
            marginBottom: "2rem",
            textDecoration: "none",
          }}
        >
          <span style={{ color: "var(--accent)" }}>v2.x</span>
          Guardrails, orchestration eval, embeddings layer
        </a>

        <h1
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.6rem, 6.4vw, 4.6rem)",
            lineHeight: 1.04,
            color: "var(--text)",
            letterSpacing: "-0.02em",
          }}
        >
          One interface.
          <br />
          Every LLM backend.
        </h1>

        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "1.15rem",
            lineHeight: 1.7,
            maxWidth: "560px",
            margin: "1.5rem auto 2.25rem",
          }}
        >
          SynapseKit is an async-first Python framework for RAG, agents, and graph
          workflows. Two hard dependencies. Plain Python you can read end to end.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="#install"
            style={{
              background: "var(--text)",
              color: "var(--bg)",
              fontWeight: 600,
              padding: "12px 24px",
              borderRadius: "var(--radius)",
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            pip install synapsekit
          </a>
          <a
            href="https://github.com/SynapseKit/SynapseKit"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              border: "1px solid var(--border)",
              color: "var(--text)",
              padding: "12px 24px",
              borderRadius: "var(--radius)",
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            View source
          </a>
        </div>
      </div>

      {/* The one bold move: the router diagram */}
      <div className="mt-16 w-full" style={{ position: "relative", maxWidth: 900 }}>
        <RouterDiagram />
      </div>

      {/* Stats: quiet, inline, no cards */}
      <div
        ref={statsRef}
        style={{
          position: "relative",
          display: "flex",
          gap: "2.5rem",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "2rem",
          paddingTop: "1.75rem",
          borderTop: "1px solid var(--border)",
          width: "100%",
          maxWidth: 720,
        }}
      >
        {STATS.map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                color: "var(--text)",
                fontSize: "1.4rem",
                fontWeight: 600,
              }}
            >
              <span data-count={s.value}>{reduced ? s.value : 0}</span>
              {s.suffix ?? ""}
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.78rem", marginTop: "2px" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
