"use client";

import { useState, useEffect, useRef } from "react";

type ScenarioKey = "RAG" | "Agents" | "Graph";

interface NodeDef {
  id: string;
  label: string;
  sub: string;
  cx: number;
  cy: number;
}

interface EdgeDef {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  path: string;
  particleAt: number;
}

interface StepDef {
  nodeId: string;
  at: number;
  line?: string;
}

interface ScenarioDef {
  viewBox: string;
  nodes: NodeDef[];
  edges: EdgeDef[];
  steps: StepDef[];
  totalDuration: number;
}

const BW = 54;
const BH = 26;

function makeEdge(
  id: string,
  x1: number, y1: number,
  x2: number, y2: number,
  cy1?: number, cx2?: number, cy2?: number,
  particleAt = 0
): EdgeDef {
  let path: string;
  if (cy1 !== undefined && cx2 !== undefined && cy2 !== undefined) {
    path = `M ${x1} ${y1} C ${x1 + 60} ${cy1} ${cx2} ${cy2} ${x2} ${y2}`;
  } else {
    path = `M ${x1} ${y1} L ${x2} ${y2}`;
  }
  return { id, from: { x: x1, y: y1 }, to: { x: x2, y: y2 }, path, particleAt };
}

const SCENARIOS: Record<ScenarioKey, ScenarioDef> = {
  RAG: {
    viewBox: "0 0 860 200",
    nodes: [
      { id: "query",  label: "User Query",   sub: "natural language", cx: 80,  cy: 100 },
      { id: "loader", label: "Loader",       sub: "53 sources",       cx: 240, cy: 100 },
      { id: "vs",     label: "Vector Store", sub: "22 backends",      cx: 420, cy: 100 },
      { id: "llm",    label: "LLM",          sub: "33 providers",     cx: 600, cy: 100 },
      { id: "answer", label: "Answer",       sub: "streaming",        cx: 780, cy: 100 },
    ],
    edges: [
      makeEdge("e1", 134, 100, 186, 100, undefined, undefined, undefined, 400),
      makeEdge("e2", 294, 100, 366, 100, undefined, undefined, undefined, 1100),
      makeEdge("e3", 474, 100, 546, 100, undefined, undefined, undefined, 1800),
      makeEdge("e4", 654, 100, 726, 100, undefined, undefined, undefined, 2500),
    ],
    steps: [
      { nodeId: "query",  at: 0,    line: '>>> await rag.ask("What changed in Q1 2025?")' },
      { nodeId: "loader", at: 600,  line: "→ Loading from 12 documents (PDF, Notion, S3)..." },
      { nodeId: "vs",     at: 1300, line: "→ Searching pgvector — retrieved 8 chunks (score > 0.78)" },
      { nodeId: "llm",    at: 2000, line: "→ Generating with gpt-4o-mini..." },
      { nodeId: "answer", at: 2700, line: '✓ "Revenue grew 34% YoY driven by..."' },
    ],
    totalDuration: 5000,
  },

  Agents: {
    viewBox: "0 0 860 280",
    nodes: [
      { id: "query",    label: "User Query",  sub: "task prompt",    cx: 80,  cy: 140 },
      { id: "agent",    label: "ReAct Agent", sub: "think → act",    cx: 250, cy: 140 },
      { id: "browser",  label: "Browser",     sub: "Playwright",     cx: 450, cy: 60  },
      { id: "sql",      label: "SQL",         sub: "query executor", cx: 450, cy: 140 },
      { id: "shell",    label: "Shell",       sub: "bash executor",  cx: 450, cy: 220 },
      { id: "llm",      label: "LLM",         sub: "synthesize",     cx: 640, cy: 140 },
      { id: "response", label: "Response",    sub: "streaming",      cx: 800, cy: 140 },
    ],
    edges: [
      makeEdge("e1", 134, 140, 196, 140, undefined, undefined, undefined, 400),
      makeEdge("e2", 304, 132, 390, 68,  100, 360, 80,  1100),
      makeEdge("e3", 304, 140, 396, 140, undefined, undefined, undefined, 1150),
      makeEdge("e4", 304, 148, 390, 212, 200, 360, 200, 1200),
      makeEdge("e5", 504, 68,  580, 132, 60,  610, 120, 1900),
      makeEdge("e6", 504, 140, 586, 140, undefined, undefined, undefined, 1950),
      makeEdge("e7", 504, 212, 580, 148, 220, 610, 160, 2000),
      makeEdge("e8", 694, 140, 746, 140, undefined, undefined, undefined, 2700),
    ],
    steps: [
      { nodeId: "query",    at: 0,    line: '>>> await agent.run("Find top customers by revenue")' },
      { nodeId: "agent",    at: 600,  line: "→ ReAct step 1: planning tool calls..." },
      { nodeId: "browser",  at: 1300, line: "→ Tool: browser.navigate(dashboard_url)" },
      { nodeId: "sql",      at: 1350, line: "→ Tool: sql.query(SELECT * FROM customers...)" },
      { nodeId: "shell",    at: 1400, line: "→ Tool: shell.run('python analyze.py')" },
      { nodeId: "llm",      at: 2100, line: "→ Synthesizing results from 3 tool calls..." },
      { nodeId: "response", at: 2900, line: "✓ Top 10 customers identified · $0.0018 cost" },
    ],
    totalDuration: 5200,
  },

  Graph: {
    viewBox: "0 0 860 280",
    nodes: [
      { id: "input",    label: "Input",    sub: "document batch",   cx: 70,  cy: 140 },
      { id: "split",    label: "Split",    sub: "route by type",    cx: 230, cy: 140 },
      { id: "classify", label: "Classify", sub: "label chunks",     cx: 430, cy: 60  },
      { id: "embed",    label: "Embed",    sub: "vector encode",    cx: 430, cy: 140 },
      { id: "extract",  label: "Extract",  sub: "entities + dates", cx: 430, cy: 220 },
      { id: "merge",    label: "Merge",    sub: "aggregate results",cx: 630, cy: 140 },
      { id: "output",   label: "Output",   sub: "result payload",   cx: 800, cy: 140 },
    ],
    edges: [
      makeEdge("e1", 124, 140, 176, 140, undefined, undefined, undefined, 400),
      makeEdge("e2", 284, 132, 370, 68,  100, 345, 78,  1100),
      makeEdge("e3", 284, 140, 376, 140, undefined, undefined, undefined, 1150),
      makeEdge("e4", 284, 148, 370, 212, 200, 345, 202, 1200),
      makeEdge("e5", 484, 68,  568, 132, 60,  555, 120, 1900),
      makeEdge("e6", 484, 140, 576, 140, undefined, undefined, undefined, 1950),
      makeEdge("e7", 484, 212, 568, 148, 220, 555, 160, 2000),
      makeEdge("e8", 684, 140, 746, 140, undefined, undefined, undefined, 2700),
    ],
    steps: [
      { nodeId: "input",    at: 0,    line: '>>> await graph.run({"docs": batch_of_120})' },
      { nodeId: "split",    at: 600,  line: "→ Node[split]: routing 120 docs to 3 parallel paths" },
      { nodeId: "classify", at: 1300, line: "→ Node[classify]: labeling 40 chunks..." },
      { nodeId: "embed",    at: 1350, line: "→ Node[embed]: encoding 40 chunks → vectors..." },
      { nodeId: "extract",  at: 1400, line: "→ Node[extract]: pulling entities + dates..." },
      { nodeId: "merge",    at: 2100, line: "→ Node[merge]: aggregating parallel results..." },
      { nodeId: "output",   at: 2900, line: "✓ Pipeline complete · 847ms · $0.0031 total" },
    ],
    totalDuration: 5200,
  },
};

const TABS: ScenarioKey[] = ["RAG", "Agents", "Graph"];

function FlowNode({ node, active, done }: { node: NodeDef; active: boolean; done: boolean }) {
  const stroke = done ? "#00A88C" : active ? "#0047FF" : "rgba(0,0,0,0.15)";
  const fill = active || done
    ? (done ? "rgba(0,168,140,0.08)" : "rgba(0,71,255,0.08)")
    : "#ffffff";
  const labelColor = active ? "#0047FF" : done ? "#00875A" : "rgba(0,0,0,0.75)";
  const subColor = done ? "#00875A" : active ? "#0047FF" : "rgba(0,0,0,0.35)";

  return (
    <g>
      <rect
        x={node.cx - BW} y={node.cy - BH}
        width={BW * 2} height={BH * 2}
        rx={10}
        fill={fill}
        stroke={stroke}
        strokeWidth={active || done ? 1.5 : 1}
        style={{ transition: "all 0.4s ease", filter: active || done ? "drop-shadow(0 2px 8px rgba(0,71,255,0.12))" : "none" }}
      />
      <text
        x={node.cx} y={node.cy - 5}
        textAnchor="middle" fill={labelColor}
        fontSize={11} fontWeight={600}
        fontFamily="var(--font-syne), sans-serif"
        style={{ transition: "fill 0.4s ease" }}
      >
        {node.label}
      </text>
      <text
        x={node.cx} y={node.cy + 11}
        textAnchor="middle" fill={subColor}
        fontSize={9}
        fontFamily="var(--font-jetbrains-mono), monospace"
        style={{ transition: "fill 0.4s ease" }}
      >
        {node.sub}
      </text>
    </g>
  );
}

function FlowEdge({ edge, active }: { edge: EdgeDef; active: boolean }) {
  return (
    <g>
      <path
        d={edge.path}
        stroke={active ? "rgba(0,71,255,0.4)" : "rgba(0,0,0,0.1)"}
        strokeWidth={1.5}
        fill="none"
        strokeDasharray="4 4"
        style={{ transition: "stroke 0.4s ease" }}
      />
      {active && (
        <circle r={4} fill="#0047FF">
          <animateMotion dur="0.6s" repeatCount="indefinite" path={edge.path} />
        </circle>
      )}
    </g>
  );
}

export default function AnimatedDemo() {
  const [scenario, setScenario] = useState<ScenarioKey>("RAG");
  const [activeSet, setActiveSet] = useState<Set<string>>(new Set());
  const [doneSet, setDoneSet] = useState<Set<string>>(new Set());
  const [activeEdges, setActiveEdges] = useState<Set<string>>(new Set());
  const [outputLines, setOutputLines] = useState<string[]>([]);
  const [cycleKey, setCycleKey] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveSet(new Set());
    setDoneSet(new Set());
    setActiveEdges(new Set());
    setOutputLines([]);

    const sc = SCENARIOS[scenario];
    const timers: ReturnType<typeof setTimeout>[] = [];

    sc.steps.forEach((step, i) => {
      timers.push(setTimeout(() => {
        setActiveSet(prev => new Set([...prev, step.nodeId]));
        if (step.line) setOutputLines(prev => [...prev, step.line!]);
        if (i > 0) {
          const prevId = sc.steps[i - 1].nodeId;
          setDoneSet(prev => new Set([...prev, prevId]));
          setActiveSet(prev => { const n = new Set(prev); n.delete(prevId); return n; });
        }
      }, step.at));
    });

    timers.push(setTimeout(() => {
      const lastId = sc.steps[sc.steps.length - 1].nodeId;
      setDoneSet(prev => new Set([...prev, lastId]));
      setActiveSet(prev => { const n = new Set(prev); n.delete(lastId); return n; });
    }, sc.steps[sc.steps.length - 1].at + 500));

    sc.edges.forEach(edge => {
      timers.push(setTimeout(() => {
        setActiveEdges(prev => new Set([...prev, edge.id]));
      }, edge.particleAt));
    });

    const replay = setTimeout(() => setCycleKey(k => k + 1), sc.totalDuration + 1500);
    return () => { timers.forEach(clearTimeout); clearTimeout(replay); };
  }, [scenario, cycleKey]);

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [outputLines]);

  const sc = SCENARIOS[scenario];

  return (
    <section style={{ background: "var(--surface)" }} className="px-6 py-24">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <p style={{ color: "var(--accent)", fontFamily: "var(--font-jetbrains-mono)" }}
            className="mb-3 text-xs font-medium tracking-widest uppercase">
            Live Pipeline
          </p>
          <h2 style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}
            className="text-3xl font-extrabold md:text-5xl">
            Watch it run.
          </h2>
          <p style={{ color: "var(--text-muted)" }} className="mt-3 text-base">
            Every request flows through composable Python nodes — no magic, no black boxes.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex justify-center gap-3">
          {TABS.map(tab => (
            <button
              key={tab}
              className={`tab-btn ${scenario === tab ? "active" : ""}`}
              onClick={() => { setScenario(tab); setCycleKey(0); }}
              aria-pressed={scenario === tab}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main card */}
        <div style={{
          background: "#ffffff",
          border: "1px solid var(--border)",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 4px 32px rgba(0,0,0,0.06)",
        }}>
          {/* Title bar */}
          <div style={{ borderBottom: "1px solid var(--border)", background: "var(--bg)", padding: "12px 18px" }}
            className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400/70" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
            <span className="h-3 w-3 rounded-full bg-green-400/70" />
            <span style={{ color: "rgba(0,0,0,0.35)", fontFamily: "var(--font-jetbrains-mono)" }}
              className="ml-3 text-xs">
              synapsekit · {scenario.toLowerCase()}_pipeline.py
            </span>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
              <span style={{ color: "rgba(0,0,0,0.35)", fontFamily: "var(--font-jetbrains-mono)" }}
                className="text-xs">
                live
              </span>
            </div>
          </div>

          {/* Flow diagram */}
          <div className="p-4 md:p-8">
            <svg viewBox={sc.viewBox} className="w-full" style={{ maxHeight: "280px" }}
              preserveAspectRatio="xMidYMid meet">
              <defs>
                <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="rgba(0,0,0,0.06)" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
              {sc.edges.map(edge => (
                <FlowEdge key={edge.id} edge={edge} active={activeEdges.has(edge.id)} />
              ))}
              {sc.nodes.map(node => (
                <FlowNode key={node.id} node={node}
                  active={activeSet.has(node.id)} done={doneSet.has(node.id)} />
              ))}
            </svg>
          </div>

          {/* Terminal */}
          <div style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
            <div style={{ borderBottom: "1px solid var(--border)", padding: "8px 18px" }}
              className="flex items-center gap-2">
              <span style={{ color: "rgba(0,0,0,0.3)", fontFamily: "var(--font-jetbrains-mono)" }}
                className="text-xs">
                output
              </span>
            </div>
            <div ref={terminalRef} className="overflow-y-auto p-4 md:px-8 md:py-5"
              style={{ minHeight: "120px", maxHeight: "160px" }}>
              {outputLines.map((line, i) => (
                <div key={i} style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "0.8rem", lineHeight: "1.8",
                  color: line.startsWith("✓") ? "#00875A"
                    : line.startsWith(">>>") ? "rgba(0,0,0,0.8)"
                    : "rgba(0,0,0,0.45)",
                  animation: "fadeSlideIn 0.3s ease forwards",
                }}>
                  {line}
                </div>
              ))}
              {outputLines.length > 0 && (
                <span className="cursor-blink" style={{
                  color: "var(--accent)",
                  fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.8rem",
                }}>▋</span>
              )}
            </div>
          </div>
        </div>

        {/* Caption */}
        <p style={{ color: "var(--text-muted)" }} className="mt-5 text-center text-sm">
          Each node is plain Python. Swap, extend, or debug any step — no black boxes.
        </p>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
