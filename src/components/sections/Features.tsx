"use client";

import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

/* ─── Shared card shell: flat, hairline, no shadow (see .feature-card in globals.css) ── */
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
      className={`feature-card reveal ${delay} ${className}`}
      style={{ padding: "1.75rem", ...style }}
    >
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: "var(--font-jetbrains-mono)",
      fontSize: "11px",
      fontWeight: 500,
      color: "var(--accent)",
      marginBottom: "0.6rem",
    }}>
      {children}
    </p>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{
      fontFamily: "var(--font-syne)",
      fontSize: "1.15rem",
      fontWeight: 700,
      color: "var(--text)",
      marginBottom: "0.5rem",
      lineHeight: 1.25,
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

/* ─── Card: Async-native ────────────────────────────────────────────────── */
function AsyncCard({ revealRef }: { revealRef: (el: HTMLElement | null) => void }) {
  return (
    <Card revealRef={revealRef} delay="stagger-1" style={{ gridColumn: "span 2" }}>
      <Label>Core architecture</Label>
      <Title>Async by default, not bolted on.</Title>
      <Body>
        Every public IO method is a coroutine. Blocking calls run through an executor.
        A CI gate checks this on every commit, so the async contract cannot regress silently.
      </Body>

      <div className="code-block" style={{
        marginTop: "1.25rem",
        background: "var(--bg)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "1rem 1.2rem",
      }}>
        <div><span className="tok-comment"># streaming is the default, not an add-on</span></div>
        <div>
          <span className="tok-keyword">async for</span> token <span className="tok-keyword">in</span> llm.<span className="tok-fn">stream</span>(prompt):
        </div>
        <div style={{ paddingLeft: "1.2rem" }}>
          <span className="tok-fn">print</span>(token, end=<span className="tok-string">&quot;&quot;</span>)
        </div>
      </div>
    </Card>
  );
}

/* ─── Card: Two dependencies ────────────────────────────────────────────── */
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
      <Title>Two hard dependencies.</Title>
      <Body>numpy and rank-bm25. Every provider, loader, and store is an optional extra you install by name.</Body>

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
            fontSize: "5.5rem",
            fontWeight: 800,
            lineHeight: 1,
            color: "var(--accent)",
          }}
        >
          0
        </span>
        <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.75rem", color: "var(--text-muted)" }}>
          hard dependencies
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {[
          { label: "SynapseKit", val: 2, max: 50 },
          { label: "LangChain", val: 50, max: 50 },
          { label: "LlamaIndex", val: 20, max: 50 },
        ].map(b => (
          <div key={b.label}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{b.label}</span>
              <span style={{ fontSize: "11px", fontWeight: 600, color: b.label === "SynapseKit" ? "var(--accent)" : "var(--text-muted)" }}>
                {b.val}{b.val === 50 ? "+" : ""}
              </span>
            </div>
            <div style={{ height: "5px", background: "var(--surface2)", borderRadius: "var(--radius)", overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${(b.val / b.max) * 100}%`,
                background: b.label === "SynapseKit" ? "var(--accent)" : "var(--border)",
              }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px", marginTop: "1.2rem", flexWrap: "wrap" }}>
        {["numpy", "rank-bm25"].map(dep => (
          <span key={dep} style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "11px",
            padding: "4px 9px",
            borderRadius: "var(--radius)",
            background: "var(--accent-dim)",
            color: "var(--accent)",
            border: "1px solid var(--border)",
          }}>
            {dep}
          </span>
        ))}
      </div>
    </Card>
  );
}

const STREAM_WORDS = "Revenue grew 34% YoY driven by enterprise adoption and new markets.".split(" ");

/* ─── Card: Streaming ────────────────────────────────────────────────────── */
function StreamCard({ revealRef }: { revealRef: (el: HTMLElement | null) => void }) {
  const [tokens, setTokens] = useState<string[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const idxRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !played.current) {
        played.current = true;
        intervalRef.current = setInterval(() => {
          if (idxRef.current < STREAM_WORDS.length) {
            setTokens(prev => [...prev, STREAM_WORDS[idxRef.current]]);
            idxRef.current++;
          } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
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
      <Title>Streaming is the default.</Title>
      <Body>Token-level streaming across all 46 providers, not an opt-in mode.</Body>

      <div ref={containerRef} className="code-block" style={{
        marginTop: "1.1rem",
        background: "var(--bg)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "0.85rem 1rem",
        minHeight: "60px",
        color: "var(--text)",
      }}>
        {tokens.join(" ")}
        {tokens.length < STREAM_WORDS.length && (
          <span style={{
            display: "inline-block", width: "2px", height: "1em",
            background: "var(--accent)", verticalAlign: "text-bottom",
            marginLeft: "2px",
          }} className="cursor-blink" />
        )}
      </div>
    </Card>
  );
}

/* ─── Card: 46 providers ────────────────────────────────────────────────── */
const PROVIDERS = [
  "OpenAI", "Anthropic", "Gemini", "Ollama", "Bedrock",
  "Mistral", "Groq", "Together", "DeepSeek", "Cohere",
  "Fireworks", "Replicate", "HuggingFace", "xAI", "vLLM",
  "LM Studio", "Writer", "Novita", "Azure", "Vertex",
];

function ProvidersCard({ revealRef }: { revealRef: (el: HTMLElement | null) => void }) {
  return (
    <Card revealRef={revealRef} delay="stagger-4" style={{ gridColumn: "span 2" }}>
      <Label>Ecosystem</Label>
      <Title>46 providers behind one interface.</Title>
      <Body style={{ maxWidth: "420px" }}>
        OpenAI, Anthropic, Gemini, Ollama, Bedrock and 41 more, all implementing
        <code style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.8em" }}> BaseLLM</code>.
        Swap providers by changing a model string, not your call sites.
      </Body>

      <div style={{
        marginTop: "1.2rem",
        display: "flex",
        flexWrap: "wrap",
        gap: "6px",
      }}>
        {PROVIDERS.map(p => (
          <span key={p} style={{
            fontSize: "11px",
            padding: "5px 10px",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
          }}>
            {p}
          </span>
        ))}
        <span style={{
          fontSize: "11px",
          padding: "5px 10px",
          borderRadius: "var(--radius)",
          border: "1px solid var(--border)",
          color: "var(--accent)",
        }}>
          +26 more
        </span>
      </div>
    </Card>
  );
}

/* ─── Card: Guardrails ──────────────────────────────────────────────────── */
function GuardrailsCard({ revealRef }: { revealRef: (el: HTMLElement | null) => void }) {
  return (
    <Card revealRef={revealRef} delay="stagger-5">
      <Label>Policy enforcement</Label>
      <Title>Guardrails at the LLM boundary.</Title>
      <Body>
        Wrap any BaseLLM in a policy: block, redact, flag, or require human approval.
        Prompt-injection and jailbreak guards, PII redaction, HIPAA/GDPR/PCI rulepacks,
        and a signed audit trail.
      </Body>

      <div style={{ marginTop: "1.1rem", display: "flex", flexDirection: "column", gap: "6px" }}>
        {[
          { step: "block", note: "reject and log" },
          { step: "redact", note: "strip PII, continue" },
          { step: "flag", note: "pass through, mark for review" },
          { step: "require_human", note: "hold for approval", accent: true },
        ].map(({ step, note, accent }) => (
          <div key={step} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              padding: "4px 10px",
              borderRadius: "var(--radius)",
              background: accent ? "var(--accent-dim)" : "var(--bg)",
              border: `1px solid var(--border)`,
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "11px",
              color: accent ? "var(--accent)" : "var(--text)",
              minWidth: "110px",
            }}>
              {step}
            </div>
            <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
              {note}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ─── Card: Cost tracking ────────────────────────────────────────────────── */
function CostCard({ revealRef }: { revealRef: (el: HTMLElement | null) => void }) {
  return (
    <Card revealRef={revealRef} delay="stagger-6">
      <Label>Observability</Label>
      <Title>Cost and latency, tracked automatically.</Title>
      <Body>Per-call cost, tokens, and latency on every request. SynapseKit Live streams it to a local dashboard, no SaaS required.</Body>

      <div style={{
        marginTop: "1.1rem",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "8px",
      }}>
        {[
          { label: "Cost / query", value: "$0.0012" },
          { label: "Avg latency", value: "1.34s" },
          { label: "Tokens used", value: "2.4M" },
          { label: "Total spend", value: "$2.87" },
        ].map(item => (
          <div key={item.label} style={{
            background: "var(--bg)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "9px 11px",
          }}>
            <p style={{ fontSize: "10px", color: "var(--text-muted)", marginBottom: "3px" }}>
              {item.label}
            </p>
            <p style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "1.05rem",
              fontWeight: 600,
              color: "var(--text)",
              lineHeight: 1,
            }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ─── Card: Agents (ReAct + function calling) ────────────────────────────── */
function AgentsCard({ revealRef }: { revealRef: (el: HTMLElement | null) => void }) {
  return (
    <Card revealRef={revealRef} delay="stagger-1">
      <Label>Agents</Label>
      <Title>ReAct or native function calling, 56 tools.</Title>
      <Body>
        A ReAct loop that works with any LLM, or native function calling for OpenAI,
        Anthropic, Gemini, and Mistral. 56 built-in tools; write your own in five lines
        with <code style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.85em" }}>@tool</code>.
      </Body>
    </Card>
  );
}

/* ─── Card: Graph workflows ──────────────────────────────────────────────── */
function GraphCard({ revealRef }: { revealRef: (el: HTMLElement | null) => void }) {
  return (
    <Card revealRef={revealRef} delay="stagger-2">
      <Label>Orchestration</Label>
      <Title>Graph workflows with typed state.</Title>
      <Body>
        DAG-based async pipelines. Independent nodes run concurrently in waves. Conditional
        routing, fan-out/fan-in, human-in-the-loop, checkpointing, and Mermaid export.
      </Body>
    </Card>
  );
}

/* ─── Card: Retrieval / embeddings ───────────────────────────────────────── */
function RetrievalCard({ revealRef }: { revealRef: (el: HTMLElement | null) => void }) {
  return (
    <Card revealRef={revealRef} delay="stagger-3" style={{ gridColumn: "span 2" }}>
      <Label>Retrieval</Label>
      <Title>32 vector stores, 9 embeddings providers, one interface.</Title>
      <Body style={{ maxWidth: "480px" }}>
        From a zero-dependency in-memory store to managed cloud services, all behind
        <code style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.85em" }}> VectorStore</code>.
        BM25 reranking, property-graph RAG that fuses vector search with graph traversal,
        and federated retrieval that fans out to local and remote sources with score fusion.
      </Body>
      <div style={{ marginTop: "1.1rem", display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {["Chroma", "Pinecone", "Qdrant", "Weaviate", "pgvector", "Turbopuffer", "DeepLake", "+25 more"].map(s => (
          <span key={s} style={{
            fontSize: "11px",
            padding: "5px 10px",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
            color: s === "+25 more" ? "var(--accent)" : "var(--text-muted)",
          }}>
            {s}
          </span>
        ))}
      </div>
    </Card>
  );
}

/* ─── Card: Verifiable audit trail ───────────────────────────────────────── */
function AuditCard({ revealRef }: { revealRef: (el: HTMLElement | null) => void }) {
  return (
    <Card revealRef={revealRef} delay="stagger-5">
      <Label>Trust</Label>
      <Title>Signed, hash-chained audit trails.</Title>
      <Body>
        Every agent run can produce a replayable, Ed25519-signed log. A standalone
        verifier returns MATCH, DRIFT, or UNVERIFIABLE against pinned trusted keys.
      </Body>
    </Card>
  );
}

/* ─── Card: EvalCI ────────────────────────────────────────────────────────── */
function EvalCard({ revealRef }: { revealRef: (el: HTMLElement | null) => void }) {
  return (
    <Card revealRef={revealRef} delay="stagger-6">
      <Label>Evaluation</Label>
      <Title>EvalCI blocks regressions in CI.</Title>
      <Body>
        A GitHub Action that runs your <code style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.85em" }}>@eval_case</code> suite
        on every pull request and fails the build on quality regression.
      </Body>
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
        <div ref={ref} className="reveal mb-14 max-w-2xl">
          <h2
            style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}
            className="text-3xl font-bold md:text-5xl"
          >
            What is actually in the box.
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.7, marginTop: "1rem" }}>
            46 LLM providers, 83 loaders, 32 vector stores, 56 tools, a guardrails layer,
            and a real-time dashboard. Every piece is plain Python you can read end to end.
          </p>
        </div>

        {/* Bento grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "auto",
          gap: "12px",
        }}>
          <AsyncCard       revealRef={ref} />
          <DepsCard        revealRef={ref} />
          <StreamCard      revealRef={ref} />
          <AgentsCard      revealRef={ref} />
          <GraphCard       revealRef={ref} />
          <RetrievalCard   revealRef={ref} />
          <ProvidersCard   revealRef={ref} />
          <GuardrailsCard  revealRef={ref} />
          <CostCard        revealRef={ref} />
          <AuditCard       revealRef={ref} />
          <EvalCard        revealRef={ref} />
        </div>
      </div>
    </section>
  );
}
