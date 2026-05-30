"use client";

import { useEffect, useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const TERMINAL_LINES = [
  { text: "$ synapsekit eval run --suite tests/evals/", color: "rgba(255,255,255,0.9)" },
  { text: "→ Running 24 eval cases against gpt-4o-mini...", color: "rgba(255,255,255,0.55)" },
  { text: "→ Comparing against baseline (main@f3a9c1b)...", color: "rgba(255,255,255,0.55)" },
  { text: "", color: "" },
  { text: "  ✓ factual_accuracy     0.94  (+0.02)", color: "#00cc6a" },
  { text: "  ✓ context_relevance    0.91  (±0.00)", color: "#00cc6a" },
  { text: "  ✓ answer_faithfulness  0.88  (+0.03)", color: "#00cc6a" },
  { text: "  ✓ cost_per_query       $0.0012  (-8%)", color: "#00cc6a" },
  { text: "", color: "" },
  { text: "  24/24 passed   0 regressions   GitHub PR: ✅ approved", color: "#ffffff" },
];

export default function EvalCI() {
  const { ref } = useReveal();
  const termRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const lines = termRef.current?.querySelectorAll<HTMLElement>("[data-line]");
          lines?.forEach((line, i) => {
            setTimeout(() => {
              line.style.opacity = "1";
              line.style.transform = "none";
            }, i * 200);
          });
        }
      },
      { threshold: 0.3 }
    );
    if (termRef.current) observer.observe(termRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="evalci"
      style={{ background: "var(--bg)" }}
      className="px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left: copy */}
          <div>
            <div ref={ref} className="reveal">
              <p
                style={{ color: "var(--accent)", fontFamily: "var(--font-jetbrains-mono)" }}
                className="mb-3 text-xs font-medium tracking-widest uppercase"
              >
                EvalCI
              </p>
              <h2
                style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}
                className="mb-5 text-3xl font-extrabold md:text-5xl"
              >
                Ship with confidence.
                <br />
                <span style={{ color: "var(--accent)" }}>Gate quality on every PR.</span>
              </h2>
              <p style={{ color: "var(--text-muted)" }} className="mb-6 text-lg leading-relaxed">
                EvalCI is a GitHub Action that runs your LLM evaluation suite on every pull
                request — before anything merges. Catch regressions automatically, not
                manually.
              </p>

              <ul className="mb-8 flex flex-col gap-3">
                {[
                  "Define eval cases with @eval_case decorator",
                  "Compare every PR against a baseline model output",
                  "Block merges when quality drops below threshold",
                  "Track factual accuracy, faithfulness, cost per query",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span style={{ color: "var(--green)" }} className="text-sm font-bold">
                      ✓
                    </span>
                    <span style={{ color: "var(--text)" }} className="text-sm">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="https://synapsekit.github.io/synapsekit-docs/docs/evalci/overview"
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: "var(--accent)" }}
                className="inline-block rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                View EvalCI docs →
              </a>
            </div>
          </div>

          {/* Right: terminal */}
          <div
            ref={termRef}
            style={{
              background: "#0e1420",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
            }}
          >
            {/* Title bar */}
            <div
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "12px 16px" }}
              className="flex items-center gap-2"
            >
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <span
                style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-jetbrains-mono)" }}
                className="ml-3 text-xs"
              >
                evalci · PR #247
              </span>
            </div>

            <div className="p-6">
              {TERMINAL_LINES.map((line, i) => (
                <div
                  key={i}
                  data-line
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "0.8rem",
                    lineHeight: "1.8",
                    color: line.color || "transparent",
                    opacity: 0,
                    transform: "translateY(4px)",
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                    minHeight: "1.44rem",
                  }}
                >
                  {line.text || " "}
                </div>
              ))}
              <span
                className="cursor-blink"
                style={{
                  color: "var(--green)",
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "0.8rem",
                }}
              >
                ▋
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
