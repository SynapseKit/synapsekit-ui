"use client";

import Image from "next/image";
import Link from "next/link";

const TEAM = [
  {
    login: "AmitoVrito",
    name: "Nautiverse",
    avatar: "https://avatars.githubusercontent.com/u/34062684?v=4",
    bio: "NLP/LLM Engineer & Founder. Creator of SynapseKit: open-source LLM orchestration for engineers who ship.",
    location: null,
    role: "Founder & Maintainer",
    contributions: 421,
    highlights: ["Architecture", "Core API", "RAG pipeline", "Releases"],
    github: "https://github.com/AmitoVrito",
  },
  {
    login: "DhruvGarg111",
    name: "Dhruv Garg",
    avatar: "https://avatars.githubusercontent.com/u/136477030?v=4",
    bio: "Building distributed systems and AI infrastructure.",
    location: null,
    role: "Core Contributor",
    contributions: 150,
    highlights: ["SmartContextManager", "PrometheusMetrics", "AgentFederation", "StructuredOutput", "Benchmarks"],
    github: "https://github.com/DhruvGarg111",
  },
  {
    login: "Abhay-Mmmm",
    name: "Abhay Krishna",
    avatar: "https://avatars.githubusercontent.com/u/192120538?v=4",
    bio: "Working on reasoning systems and LLM optimization.",
    location: null,
    role: "Core Contributor",
    contributions: 55,
    highlights: ["ReasoningLLM", "CostQualityRouter", "PromptOptimizer", "ContinuousTrainer"],
    github: "https://github.com/Abhay-Mmmm",
  },
  {
    login: "Chaturvediharsh123",
    name: "Harsh Chaturvedi",
    avatar: "https://avatars.githubusercontent.com/u/146837343?v=4",
    bio: "BTech student passionate about AI/ML and intelligent systems.",
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
    bio: "AI Engineer — LLM Applications, RAG, AI Agents, Python, AWS Bedrock.",
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
    bio: "Building at the intersection of AI and software.",
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
  // From .all-contributorsrc — contributed via PRs/reviews
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
    bio: "Data Science @ SZTU · Building AI products · LLM infra & behavioral data systems.",
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
    bio: "AI + Full Stack Engineer. Open source contributor. Building scalable, real-world systems.",
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
];

const CORE = TEAM.filter(m => ["Founder & Maintainer", "Core Contributor"].includes(m.role));
const CONTRIBUTORS = TEAM.filter(m => m.role === "Contributor");

export default function TeamPage() {
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
        <div style={{ maxWidth: "640px", marginBottom: "4rem" }}>
          <p style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "1rem",
          }}>
            Open Source · Apache 2.0
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
            SynapseKit is fully community-driven. Every feature, every fix, every line of documentation was written by real people who wanted a better LLM framework and built it themselves.
          </p>
        </div>

        {/* Core team */}
        <div style={{ marginBottom: "4rem" }}>
          <h2 style={{
            fontFamily: "var(--font-syne)",
            fontSize: "1.1rem",
            fontWeight: 800,
            color: "var(--text)",
            marginBottom: "1.5rem",
            letterSpacing: "-0.01em",
          }}>
            Core Team
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "16px",
          }}>
            {CORE.map(member => (
              <a
                key={member.login}
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  gap: "1.25rem",
                  padding: "1.75rem",
                  borderRadius: "20px",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  textDecoration: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
                  alignItems: "flex-start",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(0,168,140,0.4)";
                  el.style.boxShadow = "0 8px 40px rgba(0,168,140,0.10)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = "";
                  el.style.boxShadow = "";
                  el.style.transform = "";
                }}
              >
                {/* Avatar */}
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div style={{
                    position: "absolute",
                    inset: "-3px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--accent), transparent 65%)",
                    opacity: 0.5,
                  }} />
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={72}
                    height={72}
                    style={{ borderRadius: "50%", display: "block", position: "relative" }}
                    unoptimized
                  />
                </div>

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
                        background: "var(--accent-dim)",
                        padding: "2px 7px",
                        borderRadius: "5px",
                      }}>
                        {member.contributions} commits
                      </span>
                    )}
                  </div>
                  <p style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
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
                        padding: "2px 8px",
                        borderRadius: "5px",
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
        <div style={{ marginBottom: "4rem" }}>
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
            gap: "12px",
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
                  borderRadius: "16px",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  textDecoration: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(0,168,140,0.35)";
                  el.style.boxShadow = "0 6px 24px rgba(0,168,140,0.08)";
                  el.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = "";
                  el.style.boxShadow = "";
                  el.style.transform = "";
                }}
              >
                <div style={{ position: "relative", marginBottom: "0.75rem" }}>
                  <div style={{
                    position: "absolute",
                    inset: "-3px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--accent), transparent 65%)",
                    opacity: 0.3,
                  }} />
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={64}
                    height={64}
                    style={{ borderRadius: "50%", display: "block", position: "relative" }}
                    unoptimized
                  />
                </div>
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
                      borderRadius: "5px",
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
        <div style={{
          borderRadius: "24px",
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
              Pick a good first issue and ship a PR. We review fast.
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
                gap: "8px",
                padding: "0.75rem 1.5rem",
                borderRadius: "50px",
                background: "var(--accent)",
                color: "white",
                fontFamily: "var(--font-syne)",
                fontWeight: 700,
                fontSize: "0.9rem",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              Open issues →
            </a>
            <a
              href="https://github.com/SynapseKit/SynapseKit/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "0.75rem 1.5rem",
                borderRadius: "50px",
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
                el.style.borderColor = "rgba(0,168,140,0.4)";
                el.style.color = "var(--accent)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "";
                el.style.color = "";
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
