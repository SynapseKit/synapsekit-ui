import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SynapseKit — LLM Framework for Python",
  description:
    "Async-native RAG, Agents, and Graph Workflows. 2 dependencies. 33 providers. No hidden chains. No SaaS. No lock-in.",
  metadataBase: new URL("https://synapse-kit.com"),
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "SynapseKit — Build LLM Apps Without the Bloat",
    description:
      "Async-native RAG, Agents, and Graph Workflows. 2 dependencies. 33 providers.",
    url: "https://synapse-kit.com",
    siteName: "SynapseKit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SynapseKit — LLM Framework for Python",
    description: "Async-native RAG, Agents, and Graph Workflows. 2 dependencies. 33 providers.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
