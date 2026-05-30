"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer
      style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}
    >
      {/* Bottom links */}
      <div style={{ borderTop: "1px solid var(--border)" }} className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="col-span-2 md:col-span-1">
              <div className="mb-2 flex items-center gap-2">
                <Image src="/logo.svg" alt="SynapseKit" width={22} height={22} />
                <p
                  style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}
                  className="text-xl font-bold"
                >
                  Synapse<span style={{ color: "var(--accent)" }}>Kit</span>
                </p>
              </div>
              <p style={{ color: "var(--text-muted)" }} className="text-sm leading-relaxed">
                The LLM framework built for people who value simplicity.
                <br />
                Apache 2.0 · Built in Python
              </p>
              {/* Social icons */}
              <div style={{ display: "flex", gap: "12px", marginTop: "1rem" }}>
                <a
                  href="https://github.com/SynapseKit/SynapseKit"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--text-muted)" }}
                  className="transition-colors hover:text-[var(--accent)]"
                  aria-label="GitHub"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href="https://discord.gg/PSuAXHRywJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--text-muted)" }}
                  className="transition-colors hover:text-[var(--accent)]"
                  aria-label="Discord"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/synapsekitai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--text-muted)" }}
                  className="transition-colors hover:text-[var(--accent)]"
                  aria-label="LinkedIn"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {[
              {
                heading: "Project",
                links: [
                  { label: "GitHub", href: "https://github.com/SynapseKit/SynapseKit" },
                  { label: "PyPI", href: "https://pypi.org/project/synapsekit/" },
                  { label: "Changelog", href: "https://github.com/SynapseKit/SynapseKit/blob/main/CHANGELOG.md" },
                  { label: "Security", href: "https://github.com/SynapseKit/SynapseKit/blob/main/SECURITY.md" },
                ],
              },
              {
                heading: "Documentation",
                links: [
                  { label: "Quickstart", href: "https://synapsekit.github.io/synapsekit-docs/docs/getting-started/quickstart" },
                  { label: "RAG Guide", href: "https://synapsekit.github.io/synapsekit-docs/docs/rag/pipeline" },
                  { label: "Agents", href: "https://synapsekit.github.io/synapsekit-docs/docs/agents/overview" },
                  { label: "API Reference", href: "https://synapsekit.github.io/synapsekit-docs/docs/api/llm" },
                ],
              },
              {
                heading: "Community",
                links: [
                  { label: "Discord", href: "https://discord.gg/PSuAXHRywJ" },
                  { label: "Discussions", href: "https://github.com/SynapseKit/SynapseKit/discussions" },
                  { label: "Contributing", href: "https://github.com/SynapseKit/SynapseKit/blob/main/CONTRIBUTING.md" },
                  { label: "Open Issues", href: "https://github.com/SynapseKit/SynapseKit/issues" },
                  { label: "Meet the team", href: "/team" },
                ],
              },
            ].map((col) => (
              <div key={col.heading}>
                <p
                  style={{ color: "var(--text)", fontFamily: "var(--font-syne)" }}
                  className="mb-3 text-sm font-bold uppercase tracking-wider"
                >
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-2">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "var(--text-muted)" }}
                        className="text-sm transition-colors hover:text-[var(--accent)]"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            style={{ borderTop: "1px solid var(--border)", color: "var(--text-muted)" }}
            className="mt-10 pt-6 text-center text-xs"
          >
            © {new Date().getFullYear()} SynapseKit Contributors · Apache 2.0 License
          </div>
        </div>
      </div>
    </footer>
  );
}
