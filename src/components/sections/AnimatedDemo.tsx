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

const NW = 48; // card half-width
const NH = 46; // card half-height
const ICO_DY = -12; // icon circle offset above center
const ICO_R = 18;   // icon circle radius

function makeEdge(
  id: string,
  x1: number, y1: number,
  x2: number, y2: number,
  cy1?: number, cx2?: number, cy2?: number,
  particleAt = 0
): EdgeDef {
  let path: string;
  if (cy1 !== undefined && cx2 !== undefined && cy2 !== undefined) {
    path = `M ${x1} ${y1} C ${x1 + 55} ${cy1} ${cx2} ${cy2} ${x2} ${y2}`;
  } else {
    path = `M ${x1} ${y1} L ${x2} ${y2}`;
  }
  return { id, from: { x: x1, y: y1 }, to: { x: x2, y: y2 }, path, particleAt };
}

// ── Icons (rendered at their node center, scaled to ~±11px) ─────────────────

type IconId =
  | "query" | "loader" | "vs" | "llm" | "answer"
  | "agent" | "browser" | "sql" | "shell" | "response"
  | "input" | "split" | "classify" | "embed" | "extract" | "merge" | "output";

const ICONS: Record<IconId, React.ReactNode> = {
  // Chat bubble
  query: (
    <g fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinejoin="round" strokeLinecap="round">
      <rect x={-9} y={-9} width={18} height={13} rx={3.5}/>
      <path d="M -3,4 L -3,10 L 4,4"/>
      <line x1={-5} y1={-5} x2={5} y2={-5} strokeWidth={1.2}/>
      <line x1={-5} y1={-1} x2={5} y2={-1} strokeWidth={1.2}/>
      <line x1={-5} y1={3} x2={1} y2={3} strokeWidth={1.2}/>
    </g>
  ),
  // Stacked documents
  loader: (
    <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeLinecap="round">
      <rect x={-5} y={-12} width={13} height={15} rx={2} strokeWidth={1.3} opacity={0.4} strokeDasharray="2.5 2"/>
      <rect x={-9} y={-8} width={13} height={17} rx={2} strokeWidth={1.6}/>
      <path d="M 0,-8 L 0,-3 L 4,-3" strokeWidth={1.4}/>
      <line x1={-6} y1={1} x2={1} y2={1} strokeWidth={1.2}/>
      <line x1={-6} y1={4} x2={1} y2={4} strokeWidth={1.2}/>
      <line x1={-6} y1={7} x2={-2} y2={7} strokeWidth={1.2}/>
    </g>
  ),
  // Database cylinder
  vs: (
    <g fill="none" stroke="currentColor" strokeWidth={1.6}>
      <ellipse cx={0} cy={-7} rx={9} ry={3.5}/>
      <path d="M -9,-7 L -9,5 Q -9,9 0,9 Q 9,9 9,5 L 9,-7" strokeLinejoin="round"/>
      <path d="M -9,-1.5 Q -9,2 0,2 Q 9,2 9,-1.5" strokeDasharray="3 2" opacity={0.55}/>
      <path d="M -9,2.5 Q -9,6 0,6 Q 9,6 9,2.5" strokeDasharray="3 2" opacity={0.3}/>
    </g>
  ),
  // Neural network
  llm: (
    <g>
      <circle cx={-8} cy={-6} r={2.5} fill="currentColor"/>
      <circle cx={-8} cy={0} r={2.5} fill="currentColor"/>
      <circle cx={-8} cy={6} r={2.5} fill="currentColor"/>
      <circle cx={0} cy={-4} r={2.5} fill="currentColor"/>
      <circle cx={0} cy={4} r={2.5} fill="currentColor"/>
      <circle cx={8} cy={0} r={3} fill="currentColor"/>
      <g stroke="currentColor" strokeWidth={0.75} opacity={0.3} fill="none">
        <line x1={-5.5} y1={-6} x2={-2.5} y2={-4}/>
        <line x1={-5.5} y1={-6} x2={-2.5} y2={4}/>
        <line x1={-5.5} y1={0}  x2={-2.5} y2={-4}/>
        <line x1={-5.5} y1={0}  x2={-2.5} y2={4}/>
        <line x1={-5.5} y1={6}  x2={-2.5} y2={-4}/>
        <line x1={-5.5} y1={6}  x2={-2.5} y2={4}/>
        <line x1={2.5}  y1={-4} x2={5}    y2={0}/>
        <line x1={2.5}  y1={4}  x2={5}    y2={0}/>
      </g>
    </g>
  ),
  // Bold checkmark
  answer: (
    <g fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="-8,0 -2,7 8,-8"/>
    </g>
  ),
  // Gear / cog
  agent: (
    <g fill="none" stroke="currentColor">
      <circle cx={0} cy={0} r={4.5} strokeWidth={1.8}/>
      <circle cx={0} cy={0} r={9} strokeWidth={4.5} strokeDasharray="5.5 3.5" strokeDashoffset="1"/>
    </g>
  ),
  // Browser window
  browser: (
    <g fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round">
      <rect x={-10} y={-10} width={20} height={19} rx={3}/>
      <line x1={-10} y1={-5} x2={10} y2={-5}/>
      <circle cx={-6.5} cy={-7.5} r={1.3} fill="currentColor" stroke="none"/>
      <circle cx={-2.5} cy={-7.5} r={1.3} fill="currentColor" stroke="none"/>
      <rect x={-6} y={-2} width={12} height={2.5} rx={1} strokeWidth={1} opacity={0.4}/>
      <line x1={-6} y1={3} x2={6} y2={3} strokeWidth={1} opacity={0.35}/>
      <line x1={-6} y1={5.5} x2={2} y2={5.5} strokeWidth={1} opacity={0.25}/>
    </g>
  ),
  // SQL database (slimmer)
  sql: (
    <g fill="none" stroke="currentColor" strokeWidth={1.6}>
      <ellipse cx={0} cy={-7} rx={8} ry={3}/>
      <path d="M -8,-7 L -8,5 Q -8,9 0,9 Q 8,9 8,5 L 8,-7" strokeLinejoin="round"/>
      <path d="M -8,-2.5 Q -8,1 0,1 Q 8,1 8,-2.5" strokeDasharray="2.5 2" opacity={0.55}/>
      <text x={0} y={7} textAnchor="middle" fontSize={6} fill="currentColor" stroke="none" fontFamily="monospace" fontWeight={700} opacity={0.7}>SQL</text>
    </g>
  ),
  // Terminal prompt
  shell: (
    <g fill="none" stroke="currentColor" strokeLinecap="round">
      <rect x={-10} y={-10} width={20} height={20} rx={3} strokeWidth={1.6}/>
      <polyline points="-6,-3 -1,0 -6,3" strokeWidth={1.9}/>
      <line x1={0} y1={5} x2={7} y2={5} strokeWidth={1.6}/>
    </g>
  ),
  // Streaming lines + arrow
  response: (
    <g fill="none" stroke="currentColor" strokeLinecap="round">
      <line x1={-9} y1={-5} x2={3} y2={-5} strokeWidth={1.6}/>
      <line x1={-9} y1={0}  x2={9} y2={0}  strokeWidth={1.6}/>
      <line x1={-9} y1={5}  x2={2} y2={5}  strokeWidth={1.6}/>
      <polyline points="4,-8 9,-1 4,6" strokeWidth={1.9}/>
    </g>
  ),
  // Input / inbox
  input: (
    <g fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round">
      <rect x={-9} y={-9} width={18} height={19} rx={2}/>
      <line x1={-5} y1={-4} x2={5} y2={-4} strokeWidth={1.2}/>
      <line x1={-5} y1={0}  x2={5} y2={0}  strokeWidth={1.2}/>
      <line x1={-5} y1={4}  x2={1} y2={4}  strokeWidth={1.2}/>
    </g>
  ),
  // Fork / split
  split: (
    <g fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
      <line x1={-9} y1={0} x2={-2} y2={0}/>
      <line x1={-2} y1={0} x2={8} y2={-7}/>
      <line x1={-2} y1={0} x2={8} y2={0}/>
      <line x1={-2} y1={0} x2={8} y2={7}/>
      <polyline points="5,-10 8,-7 5,-4"/>
      <polyline points="5,-3 8,0 5,3"/>
      <polyline points="5,4 8,7 5,10"/>
    </g>
  ),
  // Price tag / classify
  classify: (
    <g fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round">
      <path d="M -10,-10 L 1,-10 L 10,0 L 1,10 L -10,10 Z"/>
      <circle cx={-5} cy={0} r={2.5} fill="currentColor" stroke="none"/>
    </g>
  ),
  // 3×3 vector grid
  embed: (
    <g fill="currentColor">
      <rect x={-9} y={-9} width={5} height={5} rx={1}/>
      <rect x={-2} y={-9} width={5} height={5} rx={1}/>
      <rect x={5}  y={-9} width={5} height={5} rx={1} opacity={0.45}/>
      <rect x={-9} y={-2} width={5} height={5} rx={1}/>
      <rect x={-2} y={-2} width={5} height={5} rx={1}/>
      <rect x={5}  y={-2} width={5} height={5} rx={1} opacity={0.45}/>
      <rect x={-9} y={5}  width={5} height={5} rx={1} opacity={0.45}/>
      <rect x={-2} y={5}  width={5} height={5} rx={1} opacity={0.45}/>
      <rect x={5}  y={5}  width={5} height={5} rx={1} opacity={0.25}/>
    </g>
  ),
  // Funnel
  extract: (
    <g fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round">
      <path d="M -10,-9 L 10,-9 L 4,-2 L 4,6 L -4,10 L -4,-2 Z"/>
    </g>
  ),
  // Merge / converge
  merge: (
    <g fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
      <line x1={-9} y1={-6} x2={0} y2={0}/>
      <line x1={-9} y1={0}  x2={0} y2={0}/>
      <line x1={-9} y1={6}  x2={0} y2={0}/>
      <line x1={0}  y1={0}  x2={9} y2={0}/>
      <polyline points="5,-4 9,0 5,4"/>
    </g>
  ),
  // Output / export
  output: (
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <circle cx={0} cy={0} r={9} strokeWidth={1.5}/>
      <line x1={-4} y1={0} x2={5} y2={0} strokeWidth={2}/>
      <polyline points="2,-4 6,0 2,4" strokeWidth={2}/>
    </g>
  ),
};

function getIcon(id: string): React.ReactNode {
  return ICONS[id as IconId] ?? null;
}

const SCENARIOS: Record<ScenarioKey, ScenarioDef> = {
  RAG: {
    viewBox: "0 0 920 240",
    nodes: [
      { id: "query",  label: "User Query",   sub: "natural language", cx: 90,  cy: 120 },
      { id: "loader", label: "Loader",        sub: "53 sources",       cx: 278, cy: 120 },
      { id: "vs",     label: "Vector Store",  sub: "11 backends",      cx: 468, cy: 120 },
      { id: "llm",    label: "LLM",           sub: "33 providers",     cx: 652, cy: 120 },
      { id: "answer", label: "Answer",        sub: "streaming",        cx: 830, cy: 120 },
    ],
    edges: [
      makeEdge("e1", 138, 120, 230, 120, undefined, undefined, undefined, 400),
      makeEdge("e2", 326, 120, 420, 120, undefined, undefined, undefined, 1100),
      makeEdge("e3", 516, 120, 604, 120, undefined, undefined, undefined, 1800),
      makeEdge("e4", 700, 120, 782, 120, undefined, undefined, undefined, 2500),
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
    viewBox: "0 0 920 300",
    nodes: [
      { id: "query",    label: "User Query",  sub: "task prompt",    cx: 80,  cy: 150 },
      { id: "agent",    label: "ReAct Agent", sub: "think → act",    cx: 260, cy: 150 },
      { id: "browser",  label: "Browser",     sub: "Playwright",     cx: 460, cy: 60  },
      { id: "sql",      label: "SQL",         sub: "query executor", cx: 460, cy: 150 },
      { id: "shell",    label: "Shell",        sub: "bash executor",  cx: 460, cy: 240 },
      { id: "llm",      label: "LLM",          sub: "synthesize",     cx: 650, cy: 150 },
      { id: "response", label: "Response",    sub: "streaming",      cx: 840, cy: 150 },
    ],
    edges: [
      makeEdge("e1", 128, 150, 212, 150, undefined, undefined, undefined, 400),
      makeEdge("e2", 308, 140, 412, 68,  80,  388, 65,  1100),
      makeEdge("e3", 308, 150, 412, 150, undefined, undefined, undefined, 1150),
      makeEdge("e4", 308, 160, 412, 232, 220, 388, 235, 1200),
      makeEdge("e5", 508, 68,  602, 140, 72,  580, 120, 1900),
      makeEdge("e6", 508, 150, 602, 150, undefined, undefined, undefined, 1950),
      makeEdge("e7", 508, 232, 602, 160, 228, 580, 180, 2000),
      makeEdge("e8", 698, 150, 792, 150, undefined, undefined, undefined, 2700),
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
    viewBox: "0 0 920 300",
    nodes: [
      { id: "input",    label: "Input",    sub: "document batch",    cx: 75,  cy: 150 },
      { id: "split",    label: "Split",    sub: "route by type",     cx: 255, cy: 150 },
      { id: "classify", label: "Classify", sub: "label chunks",      cx: 455, cy: 60  },
      { id: "embed",    label: "Embed",    sub: "vector encode",     cx: 455, cy: 150 },
      { id: "extract",  label: "Extract",  sub: "entities + dates",  cx: 455, cy: 240 },
      { id: "merge",    label: "Merge",    sub: "aggregate results", cx: 645, cy: 150 },
      { id: "output",   label: "Output",   sub: "result payload",    cx: 840, cy: 150 },
    ],
    edges: [
      makeEdge("e1", 123, 150, 207, 150, undefined, undefined, undefined, 400),
      makeEdge("e2", 303, 140, 407, 68,  80,  385, 65,  1100),
      makeEdge("e3", 303, 150, 407, 150, undefined, undefined, undefined, 1150),
      makeEdge("e4", 303, 160, 407, 232, 220, 385, 235, 1200),
      makeEdge("e5", 503, 68,  597, 140, 72,  575, 120, 1900),
      makeEdge("e6", 503, 150, 597, 150, undefined, undefined, undefined, 1950),
      makeEdge("e7", 503, 232, 597, 160, 228, 575, 180, 2000),
      makeEdge("e8", 693, 150, 792, 150, undefined, undefined, undefined, 2700),
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

// ── Node component ───────────────────────────────────────────────────────────

function FlowNode({ node, active, done }: { node: NodeDef; active: boolean; done: boolean }) {
  const state = done ? "done" : active ? "active" : "idle";

  const cardStroke =
    state === "done"   ? "#00A88C" :
    state === "active" ? "#0047FF" :
    "rgba(0,0,0,0.1)";

  const cardFill =
    state === "done"   ? "rgba(0,168,140,0.06)" :
    state === "active" ? "rgba(0,71,255,0.06)"  :
    "#ffffff";

  const iconBg =
    state === "done"   ? "rgba(0,168,140,0.14)" :
    state === "active" ? "rgba(0,71,255,0.12)"  :
    "rgba(0,0,0,0.04)";

  const iconColor =
    state === "done"   ? "#00875A" :
    state === "active" ? "#0047FF" :
    "rgba(0,0,0,0.3)";

  const labelColor =
    state === "done"   ? "#00875A" :
    state === "active" ? "#0047FF" :
    "rgba(0,0,0,0.75)";

  const subColor =
    state === "done"   ? "rgba(0,135,90,0.7)" :
    state === "active" ? "rgba(0,71,255,0.7)" :
    "rgba(0,0,0,0.32)";

  const glow =
    state === "done"   ? "drop-shadow(0 0 10px rgba(0,168,140,0.25))" :
    state === "active" ? "drop-shadow(0 0 12px rgba(0,71,255,0.22))"  :
    "none";

  return (
    <g style={{ filter: glow, transition: "filter 0.4s ease" }}>
      {/* Card */}
      <rect
        x={node.cx - NW} y={node.cy - NH}
        width={NW * 2} height={NH * 2}
        rx={12}
        fill={cardFill}
        stroke={cardStroke}
        strokeWidth={state !== "idle" ? 1.5 : 1}
        style={{ transition: "all 0.4s ease" }}
      />

      {/* Icon circle background */}
      <circle
        cx={node.cx}
        cy={node.cy + ICO_DY}
        r={ICO_R}
        fill={iconBg}
        style={{ transition: "fill 0.4s ease" }}
      />

      {/* Icon */}
      <g
        transform={`translate(${node.cx}, ${node.cy + ICO_DY})`}
        style={{ color: iconColor, transition: "color 0.4s ease" }}
      >
        {getIcon(node.id)}
      </g>

      {/* Label */}
      <text
        x={node.cx} y={node.cy + 24}
        textAnchor="middle"
        fill={labelColor}
        fontSize={10.5}
        fontWeight={700}
        fontFamily="var(--font-syne), sans-serif"
        style={{ transition: "fill 0.4s ease" }}
      >
        {node.label}
      </text>

      {/* Sub-label */}
      <text
        x={node.cx} y={node.cy + 38}
        textAnchor="middle"
        fill={subColor}
        fontSize={8.5}
        fontFamily="var(--font-jetbrains-mono), monospace"
        style={{ transition: "fill 0.4s ease" }}
      >
        {node.sub}
      </text>
    </g>
  );
}

// ── Edge component ───────────────────────────────────────────────────────────

function FlowEdge({ edge, active }: { edge: EdgeDef; active: boolean }) {
  return (
    <g>
      <path
        d={edge.path}
        stroke={active ? "rgba(0,71,255,0.35)" : "rgba(0,0,0,0.08)"}
        strokeWidth={1.5}
        fill="none"
        strokeDasharray="5 4"
        style={{ transition: "stroke 0.4s ease" }}
      />
      {active && (
        <circle r={4.5} fill="#0047FF" opacity={0.85}>
          <animateMotion dur="0.65s" repeatCount="indefinite" path={edge.path} />
        </circle>
      )}
    </g>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

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

        {/* Card */}
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
            <span className="h-3 w-3 rounded-full bg-red-400/70"/>
            <span className="h-3 w-3 rounded-full bg-yellow-400/70"/>
            <span className="h-3 w-3 rounded-full bg-green-400/70"/>
            <span style={{ color: "rgba(0,0,0,0.35)", fontFamily: "var(--font-jetbrains-mono)" }}
              className="ml-3 text-xs">
              synapsekit · {scenario.toLowerCase()}_pipeline.py
            </span>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500"/>
              <span style={{ color: "rgba(0,0,0,0.35)", fontFamily: "var(--font-jetbrains-mono)" }}
                className="text-xs">live</span>
            </div>
          </div>

          {/* Flow diagram */}
          <div className="p-4 md:p-8">
            <svg
              viewBox={sc.viewBox}
              className="w-full"
              style={{ maxHeight: "300px" }}
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="rgba(0,0,0,0.045)"/>
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)"/>
              {sc.edges.map(edge => (
                <FlowEdge key={edge.id} edge={edge} active={activeEdges.has(edge.id)}/>
              ))}
              {sc.nodes.map(node => (
                <FlowNode
                  key={node.id}
                  node={node}
                  active={activeSet.has(node.id)}
                  done={doneSet.has(node.id)}
                />
              ))}
            </svg>
          </div>

          {/* Terminal */}
          <div style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
            <div style={{ borderBottom: "1px solid var(--border)", padding: "8px 18px" }}
              className="flex items-center gap-2">
              <span style={{ color: "rgba(0,0,0,0.3)", fontFamily: "var(--font-jetbrains-mono)" }}
                className="text-xs">output</span>
            </div>
            <div ref={terminalRef}
              className="overflow-y-auto p-4 md:px-8 md:py-5"
              style={{ minHeight: "120px", maxHeight: "160px" }}>
              {outputLines.map((line, i) => (
                <div key={i} style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "0.8rem",
                  lineHeight: "1.8",
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
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "0.8rem",
                }}>▋</span>
              )}
            </div>
          </div>
        </div>

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
