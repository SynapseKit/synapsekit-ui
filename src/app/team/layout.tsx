import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the contributors building SynapseKit — the open-source Python LLM framework.",
  openGraph: {
    title: "SynapseKit Team",
    url: "https://synapse-kit.com/team",
  },
  alternates: {
    canonical: "https://synapse-kit.com/team",
  },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
