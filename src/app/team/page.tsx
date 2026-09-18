"use client";

import Image from "next/image";
import Link from "next/link";

import { useReveal } from "@/hooks/useReveal";

const TEAM = [
  {
    login: "AmitoVrito",
    name: "Nautiverse",
    avatar: "https://avatars.githubusercontent.com/u/34062684?v=4",
    bio: "NLP/LLM engineer and founder. Created SynapseKit: open-source LLM orchestration for engineers who ship.",
    location: null,
    role: "Founder",
    contributions: 421,
    highlights: ["Architecture", "Core API", "RAG pipeline", "Releases"],
    github: "https://github.com/AmitoVrito",
  },
  {
    login: "DhruvGarg111",
    name: "Dhruv Garg",
    avatar: "https://avatars.githubusercontent.com/u/136477030?v=4",
    bio: "Builds distributed systems and AI infrastructure.",
    location: null,
    role: "Contributor",
    contributions: 150,
    highlights: ["SmartContextManager", "PrometheusMetrics", "AgentFederation", "StructuredOutput", "Benchmarks"],
    github: "https://github.com/DhruvGarg111",
  },
  {
    login: "Abhay-Mmmm",
    name: "Abhay Krishna",
    avatar: "https://avatars.githubusercontent.com/u/192120538?v=4",
    bio: "Works on reasoning systems and LLM optimization.",
    location: null,
    role: "Contributor",
    contributions: 55,
    highlights: ["ReasoningLLM", "CostQualityRouter", "PromptOptimizer", "ContinuousTrainer"],
    github: "https://github.com/Abhay-Mmmm",
  },
  {
    login: "Chaturvediharsh123",
    name: "Harsh Chaturvedi",
    avatar: "https://avatars.githubusercontent.com/u/146837343?v=4",
    bio: "BTech student focused on AI/ML and intelligent systems.",
    location: null,
    role: "Contributor",
    contributions: 20,
    highlights: ["Documentation", "Guides"],
    github: "https://github.com/Chaturvediharsh123",
  },
  {
    login: "adaumsilva",
    name: "Adam Silva",
    avatar: "https://avatars.githubusercontent.com/u/178027480?v=4",
    bio: "AI engineer. LLM applications, RAG, AI agents, Python, AWS Bedrock.",
    location: "Silver Spring, MD",
    role: "Contributor",
    contributions: 2,
    highlights: ["LMStudioLLM", "Bug fixes"],
    github: "https://github.com/adaumsilva",
  },
  {
    login: "mikemolinet",
    name: "Mike Molinet",
    avatar: "https://avatars.githubusercontent.com/u/237856306?v=4",
    bio: "Builds at the intersection of AI and software.",
    location: null,
    role: "Contributor",
    contributions: 2,
    highlights: ["Bug fixes", "Code quality"],
    github: "https://github.com/mikemolinet",
  },
  {
    login: "Adraca",
    name: "Adraca AI",
    avatar: "https://avatars.githubusercontent.com/u/256321285?v=4",
    bio: "AI-first company building on open-source foundations.",
    location: null,
    role: "Contributor",
    contributions: 1,
    highlights: ["Integrations"],
    github: "https://github.com/Adraca",
  },
  {
    login: "acorello",
    name: "Alessandro Mecca",
    avatar: "https://avatars.githubusercontent.com/u/48736988?v=4",
    bio: "Software engineer based in London.",
    location: "London, UK",
    role: "Contributor",
    contributions: 1,
    highlights: ["Code", "Bug fixes"],
    github: "https://github.com/acorello",
  },
  {
    login: "mzl2233",
    name: "Yixuan Xu",
    avatar: "https://avatars.githubusercontent.com/u/109468061?v=4",
    bio: "Open source contributor.",
    location: null,
    role: "Contributor",
    contributions: 1,
    highlights: ["Code"],
    github: "https://github.com/mzl2233",
  },
  // From .all-contributorsrc: contributed via PRs/reviews
  {
    login: "gordienkoas",
    name: "Gordienko Andrey",
    avatar: "https://avatars.githubusercontent.com/u/127838071?v=4",
    bio: "Open source contributor.",
    location: null,
    role: "Contributor",
    contributions: null,
    highlights: ["Code"],
    github: "https://github.com/gordienkoas",
  },
  {
    login: "Deepak8858",
    name: "Deepak Singh",
    avatar: "https://avatars.githubusercontent.com/u/88921480?v=4",
    bio: "Software engineer.",
    location: null,
    role: "Contributor",
    contributions: null,
    highlights: ["Code"],
    github: "https://github.com/Deepak8858",
  },
  {
    login: "by22Jy",
    name: "by22Jy",
    avatar: "https://avatars.githubusercontent.com/u/122969909?v=4",
    bio: "Open source contributor.",
    location: null,
    role: "Contributor",
    contributions: null,
    highlights: ["Code"],
    github: "https://github.com/by22Jy",
  },
  {
    login: "Arjunkundapur",
    name: "Arjun Kundapur",
    avatar: "https://avatars.githubusercontent.com/u/64265396?v=4",
    bio: "Software engineer and open source enthusiast.",
    location: null,
    role: "Contributor",
    contributions: null,
    highlights: ["Code"],
    github: "https://github.com/Arjunkundapur",
  },
  {
    login: "ayushbhatt1224",
    name: "Ayush Bhatt",
    avatar: "https://avatars.githubusercontent.com/u/129763284?v=4",
    bio: "Software engineer.",
    location: null,
    role: "Contributor",
    contributions: null,
    highlights: ["Code"],
    github: "https://github.com/ayushbhatt1224",
  },
  {
    login: "icysun",
    name: "IcySun",
    avatar: "https://avatars.githubusercontent.com/u/17241351?v=4",
    bio: "Open source contributor.",
    location: null,
    role: "Contributor",
    contributions: null,
    highlights: ["Code"],
    github: "https://github.com/icysun",
  },
  {
    login: "passionworkeer",
    name: "Jianjun Wang",
    avatar: "https://avatars.githubusercontent.com/u/188482362?v=4",
    bio: "Data science at SZTU. Builds AI products, LLM infra, and behavioral data systems.",
    location: null,
    role: "Contributor",
    contributions: null,
    highlights: ["Feedback", "Issues"],
    github: "https://github.com/passionworkeer",
  },
  {
    login: "zeel2104",
    name: "Zeel Desai",
    avatar: "https://avatars.githubusercontent.com/u/72783325?v=4",
    bio: "AI and full stack engineer. Open source contributor building real-world systems.",
    location: null,
    role: "Contributor",
    contributions: null,
    highlights: ["Feedback", "Issues"],
    github: "https://github.com/zeel2104",
  },
  {
    login: "wu-xiaochen",
    name: "wu-xiaochen",
    avatar: "https://avatars.githubusercontent.com/u/110008012?v=4",
    bio: "Open source contributor.",
    location: null,
    role: "Contributor",
    contributions: null,
    highlights: ["Feedback"],
    github: "https://github.com/wu-xiaochen",
  },
  {
    login: "Ashusf90",
    name: "Harshit Gupta",
    avatar: "https://avatars.githubusercontent.com/u/153393197?v=4",
    bio: "Open source contributor.",
    location: null,
    role: "Contributor",
    contributions: null,
    highlights: ["Documentation"],
    github: "https://github.com/Ashusf90",
  },
  {
    login: "qorexdev",
    name: "qorex",
    avatar: "https://avatars.githubusercontent.com/u/248982649?v=4",
    bio: "Open source contributor.",
    location: null,
    role: "Contributor",
    contributions: null,
    highlights: ["Code"],
    github: "https://github.com/qorexdev",
  },
  {
    login: "Premvkmishra",
    name: "Prem Mishra",
    avatar: "https://avatars.githubusercontent.com/u/138608347?v=4",
    bio: "Open source contributor.",
    location: null,
    role: "Contributor",
    contributions: null,
    highlights: ["CAG/RAG router", "Orchestration eval", "Memory MCP server"],
    github: "https://github.com/Premvkmishra",
  },
  {
    login: "MohamedIdhries",
    name: "MohamedIdhries",
    avatar: "https://avatars.githubusercontent.com/u/186328670?v=4",
    bio: "Open source contributor.",
    location: null,
    role: "Contributor",
    contributions: null,
    highlights: ["Code"],
    github: "https://github.com/MohamedIdhries",
  },
];

const FOUNDER = TEAM.filter(m => m.role === "Founder");
const CONTRIBUTORS = TEAM.filter(m => m.role === "Contributor");

export default function TeamPage() {
  const { ref } = useReveal();

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Back nav */}
      <div style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }} className="px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center gap-4">
          <Link
            href="/"
            style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-muted)", textDecoration: "none" }}
          >
            <Image src="/logo.svg" alt="SynapseKit" width={22} height={22} />
            <span style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "1rem", color: "var(--text)" }}>
              Synapse<span style={{ color: "var(--accent)" }}>Kit</span>
            </span>
          </Link>
          <span style={{ color: "var(--border)", fontSize: "1.2rem" }}>/</span>
          <span style={{ fontFamily: "var(--font-syne)", fontWeight: 600, fontSize: "0.9rem", color: "var(--text-muted)" }}>Team</span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-20">

        {/* Header */}
        <div ref={ref} className="reveal" style={{ maxWidth: "640px", marginBottom: "4rem" }}>
          <p style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--accent)",
            marginBottom: "1rem",
          }}>
            Open source, Apache 2.0
          </p>
          <h1 style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
            fontWeight: 800,
            color: "var(--text)",
            lineHeight: 1.1,
            marginBottom: "1.25rem",
          }}>
            Built by engineers,<br />
            <span style={{ color: "var(--accent)" }}>for engineers.</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", lineHeight: 1.7 }}>
            SynapseKit is community-driven. Every feature, every fix, and every line of
            documentation was written by people who wanted a better LLM framework and
            built it themselves.
          </p>
        </div>

        {/* Founder */}
        <div ref={ref} className="reveal" style={{ marginBottom: "4rem" }}>
          <h2 style={{
            fontFamily: "var(--font-syne)",
            fontSize: "1.1rem",
            fontWeight: 800,
            color: "var(--text)",
            marginBottom: "1.5rem",
            letterSpacing: "-0.01em",
          }}>
            Founder
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1px",
            background: "var(--border)",
            border: "1px solid var(--border)",
          }}>
            {FOUNDER.map(member => (
              <a
                key={member.login}
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  gap: "1.25rem",
                  padding: "1.75rem",
                  border: "none",
                  background: "var(--surface)",
                  textDecoration: "none",
                  transition: "background 0.15s",
                  alignItems: "flex-start",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "var(--subtle)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "var(--surface)";
                }}
              >
                {/* Avatar */}
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={64}
                  height={64}
                  style={{ borderRadius: "var(--radius)", display: "block", flexShrink: 0, border: "1px solid var(--border)" }}
                  unoptimized
                />

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px", flexWrap: "wrap" }}>
                    <p style={{
                      fontFamily: "var(--font-syne)",
                      fontWeight: 800,
                      fontSize: "1rem",
                      color: "var(--text)",
                    }}>
                      {member.name}
                    </p>
                    {member.contributions && (
                      <span style={{
                        fontFamily: "var(--font-jetbrains-mono)",
                        fontSize: "10px",
                        fontWeight: 600,
                        color: "var(--accent)",
                        border: "1px solid var(--border)",
                        padding: "1px 6px",
                        borderRadius: "var(--radius)",
                      }}>
                        {member.contributions} commits
                      </span>
                    )}
                  </div>
                  <p style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "10.5px",
                    fontWeight: 600,
                    color: "var(--text-muted)",
                    marginBottom: "0.6rem",
                  }}>
                    {member.role}
                  </p>
                  <p style={{
                    fontSize: "0.825rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.6,
                    marginBottom: "0.8rem",
                  }}>
                    {member.bio}
                  </p>
                  {/* Highlights */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                    {member.highlights.map(h => (
                      <span key={h} style={{
                        fontSize: "11px",
                        padding: "2px 7px",
                        borderRadius: "var(--radius)",
                        background: "var(--bg)",
                        border: "1px solid var(--border)",
                        color: "var(--text-muted)",
                        fontFamily: "var(--font-dm-sans)",
                        fontWeight: 500,
                      }}>
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Contributors */}
        <div ref={ref} className="reveal" style={{ marginBottom: "4rem" }}>
          <h2 style={{
            fontFamily: "var(--font-syne)",
            fontSize: "1.1rem",
            fontWeight: 800,
            color: "var(--text)",
            marginBottom: "1.5rem",
            letterSpacing: "-0.01em",
          }}>
            Contributors
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1px",
            background: "var(--border)",
            border: "1px solid var(--border)",
          }}>
            {CONTRIBUTORS.map(member => (
              <a
                key={member.login}
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "1.5rem 1rem",
                  border: "none",
                  background: "var(--surface)",
                  textDecoration: "none",
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "var(--subtle)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "var(--surface)";
                }}
              >
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={56}
                  height={56}
                  style={{ borderRadius: "var(--radius)", display: "block", marginBottom: "0.75rem", border: "1px solid var(--border)" }}
                  unoptimized
                />
                <p style={{
                  fontFamily: "var(--font-syne)",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  color: "var(--text)",
                  marginBottom: "3px",
                }}>
                  {member.name}
                </p>
                <p style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "10px",
                  color: "var(--text-muted)",
                  marginBottom: "6px",
                }}>
                  Contributor
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", justifyContent: "center" }}>
                  {member.highlights.map(h => (
                    <span key={h} style={{
                      fontSize: "10px",
                      padding: "2px 7px",
                      borderRadius: "var(--radius)",
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-dm-sans)",
                    }}>
                      {h}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div ref={ref} className="reveal" style={{
          borderRadius: "var(--radius)",
          border: "1px solid var(--border)",
          background: "var(--surface)",
          padding: "3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",
          flexWrap: "wrap",
        }}>
          <div>
            <h3 style={{
              fontFamily: "var(--font-syne)",
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "var(--text)",
              marginBottom: "0.5rem",
            }}>
              Want to be on this page?
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
              Pick a good first issue and ship a PR. Reviews are fast.
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a
              href="https://github.com/SynapseKit/SynapseKit/issues"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.75rem 1.5rem",
                borderRadius: "var(--radius)",
                background: "var(--text)",
                color: "var(--bg)",
                fontFamily: "var(--font-syne)",
                fontWeight: 700,
                fontSize: "0.9rem",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              Open issues
            </a>
            <a
              href="https://github.com/SynapseKit/SynapseKit/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.75rem 1.5rem",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                fontFamily: "var(--font-syne)",
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--accent)";
                el.style.color = "var(--accent)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
                el.style.color = "var(--text-muted)";
              }}
            >
              Contributing guide
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
