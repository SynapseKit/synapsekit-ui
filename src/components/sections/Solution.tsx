"use client";

import { useReveal } from "@/hooks/useReveal";

const CODE_LINES = [
  { tokens: [{ cls: "tok-keyword", text: "from" }, { cls: "", text: " synapsekit " }, { cls: "tok-keyword", text: "import" }, { cls: "", text: " agent, tool" }] },
  { tokens: [] },
  { tokens: [{ cls: "tok-decorator", text: "@tool" }] },
  { tokens: [{ cls: "tok-keyword", text: "def" }, { cls: "", text: " " }, { cls: "tok-fn", text: "get_weather" }, { cls: "", text: "(" }, { cls: "tok-param", text: "city" }, { cls: "", text: ": " }, { cls: "tok-builtin", text: "str" }, { cls: "", text: ") -> " }, { cls: "tok-builtin", text: "str" }, { cls: "", text: ":" }] },
  { tokens: [{ cls: "", text: "    " }, { cls: "tok-keyword", text: "return" }, { cls: "", text: " " }, { cls: "tok-string", text: 'f"Sunny, 22°C in {city}"' }] },
  { tokens: [] },
  { tokens: [{ cls: "tok-comment", text: "# One line to create a full agent" }] },
  { tokens: [{ cls: "", text: "my_agent = " }, { cls: "tok-fn", text: "agent" }, { cls: "", text: "(" }] },
  { tokens: [{ cls: "", text: '    model=' }, { cls: "tok-string", text: '"gpt-4o-mini"' }, { cls: "", text: "," }] },
  { tokens: [{ cls: "", text: '    api_key=' }, { cls: "tok-string", text: '"sk-..."' }, { cls: "", text: "," }] },
  { tokens: [{ cls: "", text: "    tools=[get_weather]," }] },
  { tokens: [{ cls: "", text: ")" }] },
  { tokens: [] },
  { tokens: [{ cls: "tok-builtin", text: "print" }, { cls: "", text: "(my_agent." }, { cls: "tok-fn", text: "run" }, { cls: "", text: '(' }, { cls: "tok-string", text: '"What\'s the weather in Tokyo?"' }, { cls: "", text: "))" }] },
];

const CHECKS = [
  "Full async/await throughout — no sync/async mismatch",
  "Token-level streaming from every provider",
  "Swap model or provider in one line",
  "Cost tracking on every call, no SaaS needed",
  "No hidden chains. Every step is plain Python.",
];

export default function Solution() {
  const { ref } = useReveal();

  return (
    <section
      id="solution"
      style={{ background: "var(--bg)" }}
      className="px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div ref={ref} className="reveal mb-14 text-center">
          <p
            style={{ color: "var(--accent)", fontFamily: "var(--font-jetbrains-mono)" }}
            className="mb-3 text-xs font-medium tracking-widest uppercase"
          >
            The Solution
          </p>
          <h2
            style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}
            className="text-3xl font-extrabold md:text-5xl"
          >
            SynapseKit does the same{" "}
            <span style={{ color: "var(--accent)" }}>in 10 lines.</span>
          </h2>
          <p style={{ color: "var(--text-muted)" }} className="mx-auto mt-4 max-w-xl text-lg">
            Plain Python. No magic classes. No global state. Just functions you
            can read, debug, and extend.
          </p>
        </div>

        <div className="grid items-start gap-10 md:grid-cols-2">
          {/* Code block */}
          <div
            ref={ref}
            className="reveal stagger-1"
            style={{
              background: "#0e1420",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-lg)",
              overflow: "hidden",
            }}
          >
            {/* Window bar */}
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
                agent_example.py
              </span>
            </div>

            <pre className="code-block overflow-x-auto p-6 text-sm leading-7" style={{ color: "rgba(255,255,255,0.85)" }}>
              <code>
                {CODE_LINES.map((line, i) => (
                  <div key={i}>
                    {line.tokens.length === 0 ? (
                      " "
                    ) : (
                      line.tokens.map((tok, j) => (
                        <span key={j} className={tok.cls}>
                          {tok.text}
                        </span>
                      ))
                    )}
                  </div>
                ))}
              </code>
            </pre>
          </div>

          {/* Checklist */}
          <div ref={ref} className="reveal stagger-2 flex flex-col gap-5 pt-4">
            {CHECKS.map((check) => (
              <div key={check} className="flex items-start gap-4">
                <span
                  style={{
                    background: "rgba(0,204,106,0.12)",
                    color: "var(--green)",
                    minWidth: "1.75rem",
                    height: "1.75rem",
                  }}
                  className="flex items-center justify-center rounded-full text-sm font-bold"
                >
                  ✓
                </span>
                <p style={{ color: "var(--text)" }} className="text-base leading-relaxed">
                  {check}
                </p>
              </div>
            ))}

            <div className="mt-4">
              <a
                href="https://synapsekit.github.io/synapsekit-docs/docs/getting-started/quickstart"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent)", borderBottom: "1px solid var(--accent)" }}
                className="text-sm font-medium"
              >
                Read the quickstart →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
