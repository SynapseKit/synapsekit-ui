# SynapseKit — Marketing Website

[![Website](https://img.shields.io/badge/website-synapse--kit.com-00A88C?logo=googlechrome&logoColor=white)](https://synapse-kit.com)
[![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-181717?logo=github&logoColor=white)](https://pages.github.com/)
[![License](https://img.shields.io/badge/license-Apache%202.0-22c55e)](LICENSE)

The public-facing website for [SynapseKit](https://github.com/SynapseKit/SynapseKit), a lightweight Python framework for building LLM applications.

Live at **[synapse-kit.com](https://synapse-kit.com)**

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, static export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Motion (motion.dev)
- **Fonts**: Syne (display) · JetBrains Mono (code)
- **Package manager**: pnpm

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm build   # outputs static site to /out
```

## Project Structure

```
src/
  app/
    page.tsx          # home page — composes all sections
    globals.css       # design tokens, base styles
    team/             # /team route
  components/
    Nav.tsx
    Footer.tsx
    sections/
      Hero.tsx
      AnimatedDemo.tsx
      Architecture.tsx
      Problem.tsx
      Solution.tsx
      Features.tsx
      Comparison.tsx
      Capabilities.tsx
      EvalCI.tsx
      Ecosystem.tsx
      Install.tsx
      Docs.tsx
  hooks/
    useReveal.ts      # IntersectionObserver scroll reveal
```

## Design Tokens

Defined in `globals.css`:

| Token | Value |
|---|---|
| `--bg` | `#F2F6FA` |
| `--surface` | `#FFFFFF` |
| `--accent` | `#00A88C` |
| `--text` | `#0D1117` |
| `--text-muted` | `#6B7280` |
| `--border` | `#E5E7EB` |

## Contributing

Open an issue or PR on this repo. For the Python library itself see [SynapseKit/SynapseKit](https://github.com/SynapseKit/SynapseKit).

## License

Apache 2.0
