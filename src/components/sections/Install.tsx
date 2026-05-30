"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const TABS = ["pip", "uv", "poetry"] as const;
type Tab = (typeof TABS)[number];

const COMMANDS: Record<Tab, { label: string; code: string }[]> = {
  pip: [
    { label: "OpenAI", code: "pip install synapsekit[openai]" },
    { label: "Anthropic", code: "pip install synapsekit[anthropic]" },
    { label: "Ollama (local)", code: "pip install synapsekit[ollama]" },
    { label: "Observability", code: "pip install synapsekit[observe]" },
    { label: "Everything", code: "pip install synapsekit[all]" },
  ],
  uv: [
    { label: "OpenAI", code: "uv add synapsekit[openai]" },
    { label: "Anthropic", code: "uv add synapsekit[anthropic]" },
    { label: "Ollama (local)", code: "uv add synapsekit[ollama]" },
    { label: "Observability", code: "uv add synapsekit[observe]" },
    { label: "Everything", code: "uv add synapsekit[all]" },
  ],
  poetry: [
    { label: "OpenAI", code: "poetry add synapsekit[openai]" },
    { label: "Anthropic", code: "poetry add synapsekit[anthropic]" },
    { label: "Ollama (local)", code: "poetry add synapsekit[ollama]" },
    { label: "Observability", code: "poetry add synapsekit[observe]" },
    { label: "Everything", code: 'poetry add "synapsekit[all]"' },
  ],
};

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      onClick={copy}
      style={{
        background: copied ? "var(--green)" : "rgba(255,255,255,0.1)",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        padding: "4px 10px",
        fontSize: "0.75rem",
        cursor: "pointer",
        fontFamily: "var(--font-dm-sans)",
        transition: "background 0.2s",
        minWidth: "52px",
      }}
    >
      {copied ? "✓" : "copy"}
    </button>
  );
}

export default function Install() {
  const [active, setActive] = useState<Tab>("pip");
  const { ref } = useReveal();

  return (
    <section
      id="install"
      style={{ background: "var(--bg)" }}
      className="px-6 py-24"
    >
      <div className="mx-auto max-w-4xl">
        <div ref={ref} className="reveal mb-12 text-center">
          <p
            style={{ color: "var(--accent)", fontFamily: "var(--font-jetbrains-mono)" }}
            className="mb-3 text-xs font-medium tracking-widest uppercase"
          >
            Install
          </p>
          <h2
            style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}
            className="text-3xl font-extrabold md:text-5xl"
          >
            Start in seconds.
          </h2>
          <p style={{ color: "var(--text-muted)" }} className="mt-4 text-lg">
            Install only what you need. Extras are truly optional.
          </p>
        </div>

        {/* Package manager tabs */}
        <div className="mb-6 flex justify-center gap-3">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${active === tab ? "active" : ""}`}
              onClick={() => setActive(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Commands */}
        <div
          style={{
            background: "#0e1420",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
          }}
        >
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
              terminal
            </span>
          </div>

          <div className="flex flex-col gap-2 p-6">
            {COMMANDS[active].map(({ label, code }) => (
              <div
                key={code}
                className="flex items-center justify-between gap-4 rounded-lg px-3 py-2"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <div className="flex items-center gap-3 overflow-x-auto">
                  <span
                    style={{ color: "var(--green)", fontFamily: "var(--font-jetbrains-mono)", minWidth: "6rem" }}
                    className="text-xs opacity-60"
                  >
                    # {label}
                  </span>
                  <code
                    style={{ color: "rgba(255,255,255,0.88)", fontFamily: "var(--font-jetbrains-mono)" }}
                    className="text-sm whitespace-nowrap"
                  >
                    {code}
                  </code>
                </div>
                <CopyButton code={code} />
              </div>
            ))}
          </div>
        </div>

        <p style={{ color: "var(--text-muted)" }} className="mt-4 text-center text-sm">
          Full options →{" "}
          <a
            href="https://synapsekit.github.io/synapsekit-docs/docs/getting-started/installation"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent)" }}
          >
            installation docs
          </a>
        </p>
      </div>
    </section>
  );
}
