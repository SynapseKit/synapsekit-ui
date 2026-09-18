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
  code: string;
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
      <rect x={-9} y={-9} width={18} height={13} rx={2}/>
      <path d="M -3,4 L -3,10 L 4,4"/>
      <line x1={-5} y1={-5} x2={5} y2={-5} strokeWidth={1.2}/>
      <line x1={-5} y1={-1} x2={5} y2={-1} strokeWidth={1.2}/>
      <line x1={-5} y1={3} x2={1} y2={3} strokeWidth={1.2}/>
    </g>
  ),
  // Stacked documents
  loader: (
    <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeLinecap="round">
      <rect x={-5} y={-12} width={13} height={15} rx={1} strokeWidth={1.3} opacity={0.4} strokeDasharray="2.5 2"/>
      <rect x={-9} y={-8} width={13} height={17} rx={1} strokeWidth={1.6}/>
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
      <rect x={-10} y={-10} width={20} height={19} rx={2}/>
      <line x1={-10} y1={-5} x2={10} y2={-5}/>
      <circle cx={-6.5} cy={-7.5} r={1.3} fill="currentColor" stroke="none"/>
      <circle cx={-2.5} cy={-7.5} r={1.3} fill="currentColor" stroke="none"/>
      <rect x={-6} y={-2} width={12} height={2.5} rx={0.5} strokeWidth={1} opacity={0.4}/>
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
      <text x={0} y={7} textAnchor="middle" fontSize={6} fill="currentColor" stroke="none" fontFamily="var(--font-jetbrains-mono), monospace" fontWeight={700} opacity={0.7}>SQL</text>
    </g>
  ),
  // Terminal prompt
  shell: (
    <g fill="none" stroke="currentColor" strokeLinecap="round">
      <rect x={-10} y={-10} width={20} height={20} rx={2} strokeWidth={1.6}/>
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
      <rect x={-9} y={-9} width={18} height={19} rx={1}/>
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
  // 3x3 vector grid
  embed: (
    <g fill="currentColor">
      <rect x={-9} y={-9} width={5} height={5} rx={0.5}/>
      <rect x={-2} y={-9} width={5} height={5} rx={0.5}/>
      <rect x={5}  y={-9} width={5} height={5} rx={0.5} opacity={0.45}/>
      <rect x={-9} y={-2} width={5} height={5} rx={0.5}/>
      <rect x={-2} y={-2} width={5} height={5} rx={0.5}/>
      <rect x={5}  y={-2} width={5} height={5} rx={0.5} opacity={0.45}/>
      <rect x={-9} y={5}  width={5} height={5} rx={0.5} opacity={0.45}/>
      <rect x={-2} y={5}  width={5} height={5} rx={0.5} opacity={0.45}/>
      <rect x={5}  y={5}  width={5} height={5} rx={0.5} opacity={0.25}/>
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
      { id: "loader", label: "Loader",        sub: "83 sources",       cx: 278, cy: 120 },
      { id: "vs",     label: "Vector Store",  sub: "32 backends",      cx: 468, cy: 120 },
      { id: "llm",    label: "LLM",           sub: "46 providers",     cx: 652, cy: 120 },
      { id: "answer", label: "Answer",        sub: "streaming",        cx: 830, cy: 120 },
    ],
    edges: [
      makeEdge("e1", 138, 120, 230, 120, undefined, undefined, undefined, 400),
      makeEdge("e2", 326, 120, 420, 120, undefined, undefined, undefined, 1100),
      makeEdge("e3", 516, 120, 604, 120, undefined, undefined, undefined, 1800),
      makeEdge("e4", 700, 120, 782, 120, undefined, undefined, undefined, 2500),
    ],
    steps: [
      { nodeId: "query",  at: 0,    line: 'await rag.ask("What changed in Q1 2025?")' },
      { nodeId: "loader", at: 600,  line: "loading 12 documents (PDF, Notion, S3)" },
      { nodeId: "vs",     at: 1300, line: "searching pgvector, retrieved 8 chunks (score > 0.78)" },
      { nodeId: "llm",    at: 2000, line: "generating with gpt-4o-mini" },
      { nodeId: "answer", at: 2700, line: 'return "Revenue grew 34% YoY driven by..."' },
    ],
    totalDuration: 5000,
    code: `from synapsekit import RAG

rag = RAG(model="gpt-4o-mini", api_key="sk-...")
await rag.add("Q1 2025 earnings report...", metadata={"source": "10-Q"})

async for token in rag.stream("What changed in Q1 2025?"):
    print(token, end="", flush=True)`,
  },

  Agents: {
    viewBox: "0 0 920 300",
    nodes: [
      { id: "query",    label: "User Query",  sub: "task prompt",    cx: 80,  cy: 150 },
      { id: "agent",    label: "ReAct Agent", sub: "think, act",    cx: 260, cy: 150 },
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
      { nodeId: "query",    at: 0,    line: 'await agent.run("Find top customers by revenue")' },
      { nodeId: "agent",    at: 600,  line: "ReAct step 1, planning tool calls" },
      { nodeId: "browser",  at: 1300, line: "tool: browser.navigate(dashboard_url)" },
      { nodeId: "sql",      at: 1350, line: "tool: sql.query(SELECT * FROM customers ...)" },
      { nodeId: "shell",    at: 1400, line: "tool: shell.run('python analyze.py')" },
      { nodeId: "llm",      at: 2100, line: "synthesizing results from 3 tool calls" },
      { nodeId: "response", at: 2900, line: "return top 10 customers, cost $0.0018" },
    ],
    totalDuration: 5200,
    code: `from synapsekit import agent, tool

@tool
def sql_query(query: str) -> str:
    """Run a read-only SQL query against the warehouse."""
    return run(query)

my_agent = agent(model="gpt-4o-mini", api_key="sk-...", tools=[sql_query])
result = await my_agent.run("Find top customers by revenue")`,
  },

  Graph: {
    viewBox: "0 0 920 300",
    nodes: [
      { id: "input",    label: "Input",    sub: "document batch",    cx: 75,  cy: 150 },
      { id: "split",    label: "Split",    sub: "route by type",     cx: 255, cy: 150 },
      { id: "classify", label: "Classify", sub: "label chunks",      cx: 455, cy: 60  },
      { id: "embed",    label: "Embed",    sub: "vector encode",     cx: 455, cy: 150 },
      { id: "extract",  label: "Extract",  sub: "entities, dates",  cx: 455, cy: 240 },
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
      { nodeId: "input",    at: 0,    line: 'await graph.run({"docs": batch_of_120})' },
      { nodeId: "split",    at: 600,  line: "node[split]: routing 120 docs to 3 parallel paths" },
      { nodeId: "classify", at: 1300, line: "node[classify]: labeling 40 chunks" },
      { nodeId: "embed",    at: 1350, line: "node[embed]: encoding 40 chunks to vectors" },
      { nodeId: "extract",  at: 1400, line: "node[extract]: pulling entities and dates" },
      { nodeId: "merge",    at: 2100, line: "node[merge]: aggregating parallel results" },
      { nodeId: "output",   at: 2900, line: "pipeline complete, 847ms, $0.0031 total" },
    ],
    totalDuration: 5200,
    code: `from synapsekit.graph import StateGraph

async def classify(state):
    state["label"] = await classify_chunk(state["text"])
    return state

graph = StateGraph()
graph.add_node("split", split_docs).add_node("classify", classify)
graph.add_edge("split", "classify")
graph.set_entry_point("split").set_finish_point("classify")

compiled = graph.compile()
result = await compiled.run({"docs": batch_of_120})`,
  },
};

const TABS: ScenarioKey[] = ["RAG", "Agents", "Graph"];

// ── Node component ───────────────────────────────────────────────────────────

function FlowNode({ node, active, done }: { node: NodeDef; active: boolean; done: boolean }) {
  const state = done ? "done" : active ? "active" : "idle";

  const cardStroke =
    state === "done"   ? "var(--accent)" :
    state === "active" ? "var(--ember)" :
    "var(--border)";

  const cardFill =
    state === "done"   ? "var(--accent-dim)" :
    state === "active" ? "var(--ember-dim)"  :
    "var(--surface)";

  const iconBg =
    state === "idle" ? "var(--surface2)" : "transparent";

  const iconColor =
    state === "done"   ? "var(--accent)" :
    state === "active" ? "var(--ember)" :
    "var(--text-muted)";

  const labelColor =
    state === "idle" ? "var(--text-muted)" : "var(--text)";

  const subColor = "var(--text-muted)";

  return (
    <g>
      {/* Card */}
      <rect
        x={node.cx - NW} y={node.cy - NH}
        width={NW * 2} height={NH * 2}
        rx={3}
        fill={cardFill}
        stroke={cardStroke}
        strokeWidth={state !== "idle" ? 1.5 : 1}
        style={{ transition: "all 0.3s ease" }}
      />

      {/* Icon circle background */}
      <circle
        cx={node.cx}
        cy={node.cy + ICO_DY}
        r={ICO_R}
        fill={iconBg}
        style={{ transition: "fill 0.3s ease" }}
      />

      {/* Icon */}
      <g
        transform={`translate(${node.cx}, ${node.cy + ICO_DY})`}
        style={{ color: iconColor, transition: "color 0.3s ease" }}
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
        style={{ transition: "fill 0.3s ease" }}
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
        stroke={active ? "var(--ember)" : "var(--border)"}
        strokeWidth={1.5}
        fill="none"
        strokeDasharray="5 4"
        style={{ transition: "stroke 0.3s ease" }}
      />
      {active && (
        <circle r={3.5} fill="var(--ember)">
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
  const [running, setRunning] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const runScenario = (key: ScenarioKey) => {
    setActiveSet(new Set());
    setDoneSet(new Set());
    setActiveEdges(new Set());
    setOutputLines([]);
    setRunning(true);

    const sc = SCENARIOS[key];
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
      setRunning(false);
    }, sc.steps[sc.steps.length - 1].at + 500));

    sc.edges.forEach(edge => {
      timers.push(setTimeout(() => {
        setActiveEdges(prev => new Set([...prev, edge.id]));
      }, edge.particleAt));
    });

    return () => timers.forEach(clearTimeout);
  };

  useEffect(() => {
    let cancel: (() => void) | undefined;
    queueMicrotask(() => {
      cancel = runScenario(scenario);
    });
    return () => cancel?.();
     
  }, [scenario]);

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [outputLines]);

  const sc = SCENARIOS[scenario];

  return (
    <section style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }} className="px-6 py-24">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <h2 style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}
            className="text-3xl font-extrabold md:text-5xl">
            Watch a request move through the graph.
          </h2>
          <p style={{ color: "var(--text-muted)" }} className="mx-auto mt-3 max-w-xl text-base">
            Every step below is a plain Python node. Run it once per tab, then read the
            code that produced it.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex justify-center gap-2" style={{ borderBottom: "1px solid var(--border)" }}>
          {TABS.map(tab => (
            <button
              key={tab}
              className={`tab-btn ${scenario === tab ? "active" : ""}`}
              onClick={() => setScenario(tab)}
              aria-pressed={scenario === tab}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Card */}
        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          overflow: "hidden",
        }}>
          {/* Title bar */}
          <div style={{ borderBottom: "1px solid var(--border)", background: "var(--bg)", padding: "10px 18px" }}
            className="flex items-center gap-2">
            <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-jetbrains-mono)" }}
              className="text-xs">
              {scenario.toLowerCase()}_pipeline.py
            </span>
            <div className="ml-auto flex items-center gap-1.5">
              <span
                style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: running ? "var(--ember)" : "var(--accent)",
                }}
              />
              <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-jetbrains-mono)" }}
                className="text-xs">{running ? "running" : "done"}</span>
            </div>
          </div>

          {/* Flow diagram */}
          <div className="p-4 md:p-8">
            <svg
              viewBox={sc.viewBox}
              className="w-full"
              style={{ maxHeight: "300px" }}
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label={`Diagram of the ${scenario} pipeline running`}
            >
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
              <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-jetbrains-mono)" }}
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
                  color: line.startsWith("return") ? "var(--accent)"
                    : line.startsWith("await") ? "var(--text)"
                    : "var(--text-muted)",
                  animation: "fadeSlideIn 0.3s ease forwards",
                }}>
                  {line}
                </div>
              ))}
              {running && outputLines.length > 0 && (
                <span className="cursor-blink" style={{
                  color: "var(--accent)",
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "0.8rem",
                }}>▋</span>
              )}
            </div>
          </div>

          {/* Source */}
          <div style={{ borderTop: "1px solid var(--border)" }}>
            <div style={{ borderBottom: "1px solid var(--border)", padding: "8px 18px", background: "var(--bg)" }}
              className="flex items-center gap-2">
              <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-jetbrains-mono)" }}
                className="text-xs">source</span>
            </div>
            <pre className="code-block overflow-x-auto p-4 md:px-8 md:py-5" style={{ margin: 0 }}>
              <code style={{ color: "var(--text)" }}>{sc.code}</code>
            </pre>
          </div>
        </div>

        <p style={{ color: "var(--text-muted)" }} className="mt-5 text-center text-sm">
          Each node is a plain async function. Swap, extend, or step through any of them in a debugger.
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
