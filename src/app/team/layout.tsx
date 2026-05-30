import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team — SynapseKit",
  description: "The people building SynapseKit — an open-source LLM framework for engineers who ship.",
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
