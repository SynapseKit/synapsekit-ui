"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Neural mesh canvas ─────────────────────────────────────────────────── */
interface MeshNode {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
}

function initNodes(w: number, h: number, count = 55): MeshNode[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    size: Math.random() * 1.8 + 0.8,
  }));
}

function drawMesh(
  ctx: CanvasRenderingContext2D,
  nodes: MeshNode[],
  w: number,
  h: number,
  mx: number,
  my: number
) {
  /* trail fade */
  ctx.fillStyle = "rgba(242,246,250,0.22)";
  ctx.fillRect(0, 0, w, h);

  const DIST = 160;
  const MOUSE_RADIUS = 180;
  const MOUSE_FORCE  = 0.025;

  nodes.forEach(n => {
    /* subtle mouse repulsion */
    const dx = n.x - mx, dy = n.y - my;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < MOUSE_RADIUS && dist > 0) {
      n.vx += (dx / dist) * MOUSE_FORCE;
      n.vy += (dy / dist) * MOUSE_FORCE;
    }
    /* speed cap */
    const spd = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
    if (spd > 0.7) { n.vx *= 0.7 / spd; n.vy *= 0.7 / spd; }

    n.x += n.vx; n.y += n.vy;
    if (n.x < 0 || n.x > w) n.vx *= -1;
    if (n.y < 0 || n.y > h) n.vy *= -1;
  });

  /* connections */
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < DIST) {
        const alpha = (1 - d / DIST) * 0.35;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(0,168,140,${alpha * 0.7})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }

  /* nodes */
  nodes.forEach(n => {
    /* outer glow */
    ctx.shadowBlur = 6;
    ctx.shadowColor = "rgba(0,168,140,0.4)";
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.size + 1.5, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,168,140,0.12)";
    ctx.fill();
    /* core */
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,168,140,0.6)";
    ctx.fill();
  });
}

/* ─── Typewriter cycling ─────────────────────────────────────────────────── */
const PHRASES = [
  "Without the bloat.",
  "With 2 dependencies.",
  "In pure Python.",
  "Async by default.",
  "Across 33 providers.",
];

function useTypewriter(phrases: string[], speed = 55, pause = 2200, deleteSpeed = 28) {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = phrases[phraseIdx];
    let timer: ReturnType<typeof setTimeout>;

    if (typing) {
      if (text.length < target.length) {
        timer = setTimeout(() => setText(target.slice(0, text.length + 1)), speed);
      } else {
        timer = setTimeout(() => setTyping(false), pause);
      }
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(t => t.slice(0, -1)), deleteSpeed);
      } else {
        setPhraseIdx(i => (i + 1) % phrases.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timer);
  }, [text, typing, phraseIdx, phrases, speed, pause, deleteSpeed]);

  return text;
}

/* ─── Stats ─────────────────────────────────────────────────────────────── */
const STATS = [
  { label: "LLM Providers",  value: 33 },
  { label: "Loaders",        value: 53 },
  { label: "Vector Stores",  value: 22 },
  { label: "Tools",          value: 47, suffix: "+" },
  { label: "Dependencies",   value: 2 },
];

function animateCounter(el: HTMLElement, target: number, dur = 1600) {
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
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const wrapRef    = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number>(0);
  const nodesRef   = useRef<MeshNode[]>([]);
  const mouseRef   = useRef({ x: -9999, y: -9999 });
  const statsRef   = useRef<HTMLDivElement>(null);
  const counted    = useRef(false);

  const phrase = useTypewriter(PHRASES);

  /* ── Canvas setup + loop ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      const r = wrap!.getBoundingClientRect();
      canvas!.width  = r.width  * dpr;
      canvas!.height = r.height * dpr;
      canvas!.style.width  = r.width  + "px";
      canvas!.style.height = r.height + "px";
      ctx.scale(dpr, dpr);
      nodesRef.current = initNodes(r.width, r.height);
    }
    resize();
    window.addEventListener("resize", resize);

    function loop() {
      const r = wrap!.getBoundingClientRect();
      drawMesh(ctx, nodesRef.current, r.width, r.height, mouseRef.current.x, mouseRef.current.y);
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── Mouse tracking ── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const rect = wrapRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  /* ── Stat counters ── */
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !counted.current) {
        counted.current = true;
        statsRef.current?.querySelectorAll<HTMLElement>("[data-count]").forEach(el => {
          animateCounter(el, Number(el.dataset.count));
        });
      }
    }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={wrapRef}
      style={{ background: "#F2F6FA", minHeight: "100vh", position: "relative", overflow: "hidden" }}
      className="flex flex-col items-center justify-center px-6 pt-24 pb-16"
    >
      {/* Canvas neural mesh */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      />

      {/* Radial centre glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(0,168,140,0.06) 0%, transparent 70%)",
      }} />

      {/* Scan-line overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.015) 2px, rgba(0,0,0,0.015) 4px)",
        zIndex: 1,
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2 }} className="mx-auto max-w-5xl text-center">

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "rgba(0,168,140,0.08)",
          border: "1px solid rgba(0,168,140,0.25)",
          color: "var(--accent)",
          fontFamily: "var(--font-jetbrains-mono)",
          borderRadius: "99px", padding: "6px 16px",
          fontSize: "11px", fontWeight: 500, letterSpacing: "0.05em",
          marginBottom: "2.5rem",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", animation: "blink 1.4s step-end infinite" }} />
          v1.9.1 · ReasoningLLM · AgentFederation · EvalCI
        </div>

        {/* Headline with glitch */}
        <div style={{ position: "relative", marginBottom: "1.75rem" }}>
          <h1
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              lineHeight: 1.0,
              color: "var(--text)",
              letterSpacing: "-0.02em",
              position: "relative",
            }}
          >
            Build LLM Apps.
          </h1>

          {/* Glitch layer 1 (orange offset) */}
          <h1 aria-hidden style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(3rem, 8vw, 6.5rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            color: "rgba(255,107,53,0.5)",
            position: "absolute", inset: 0,
            animation: "glitch-clip1 7s infinite",
            userSelect: "none",
          }}>
            Build LLM Apps.
          </h1>

          {/* Glitch layer 2 (teal offset) */}
          <h1 aria-hidden style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(3rem, 8vw, 6.5rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            color: "rgba(0,212,176,0.5)",
            position: "absolute", inset: 0,
            animation: "glitch-clip2 7s infinite",
            animationDelay: "0.05s",
            userSelect: "none",
          }}>
            Build LLM Apps.
          </h1>

          {/* Shimmer accent line */}
          <div style={{ marginTop: "0.2rem" }}>
            <span
              className="accent-gradient"
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontWeight: 800,
                fontSize: "clamp(3rem, 8vw, 6.5rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                display: "inline-block",
              }}
            >
              {phrase}
              <span style={{
                display: "inline-block",
                width: "3px", height: "0.85em",
                background: "var(--accent)",
                verticalAlign: "text-bottom",
                marginLeft: "4px",
                animation: "typewriter-blink 0.8s step-end infinite",
              }} />
            </span>
          </div>
        </div>

        {/* Subline */}
        <p style={{
          color: "var(--text-muted)", fontSize: "clamp(1rem, 2vw, 1.2rem)",
          lineHeight: 1.7, maxWidth: "640px", margin: "0 auto 2.5rem",
        }}>
          Async-native RAG, Agents, and Graph Workflows.{" "}
          <strong style={{ color: "var(--text)" }}>2 hard dependencies</strong> · {" "}
          <strong style={{ color: "var(--text)" }}>33 providers</strong> · {" "}
          No SaaS. No lock-in. No magic.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="#install"
            style={{
              background: "var(--accent)",
              color: "#080C10",
              fontWeight: 700,
              padding: "14px 32px",
              borderRadius: "99px",
              fontSize: "0.95rem",
              textDecoration: "none",
              boxShadow: "0 0 32px rgba(0,168,140,0.35)",
              transition: "box-shadow 0.3s, transform 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 48px rgba(0,168,140,0.55)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(0,168,140,0.35)";
              (e.currentTarget as HTMLElement).style.transform = "none";
            }}
          >
            Get Started →
          </a>
          <a
            href="https://github.com/SynapseKit/SynapseKit"
            target="_blank" rel="noopener noreferrer"
            style={{
              border: "1px solid var(--border)",
              color: "var(--text-muted)",
              padding: "14px 32px",
              borderRadius: "99px",
              fontSize: "0.95rem",
              textDecoration: "none",
              transition: "border-color 0.3s, color 0.3s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
              (e.currentTarget as HTMLElement).style.color = "var(--accent)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
            }}
          >
            View on GitHub
          </a>
        </div>
      </div>

      {/* Stats bar */}
      <div ref={statsRef} style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "860px", marginTop: "5rem" }}>
        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          boxShadow: "0 0 0 1px rgba(0,168,140,0.08), var(--shadow-lg)",
        }}>
          {STATS.map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: "1.5rem 1rem",
                textAlign: "center",
                borderRight: i < STATS.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <div style={{
                fontFamily: "var(--font-syne), sans-serif",
                color: "var(--accent)",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 800,
              }}>
                <span data-count={s.value}>0</span>{s.suffix ?? ""}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 500, marginTop: "4px" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: "absolute", bottom: "2rem", left: "50%",
        transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
        zIndex: 2, animation: "hero-float 2.5s ease-in-out infinite",
      }}>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, var(--accent), transparent)" }} />
        <span style={{ color: "var(--text-muted)", fontSize: "10px", fontFamily: "var(--font-jetbrains-mono)", letterSpacing: "0.1em" }}>
          SCROLL
        </span>
      </div>
    </section>
  );
}
