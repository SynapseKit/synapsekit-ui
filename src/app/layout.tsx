import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { FAQ } from "@/data/faq";

const GA_ID = "G-NYPGFHGHKN";

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
  metadataBase: new URL("https://synapse-kit.com"),
  title: {
    template: "%s | SynapseKit",
    default: "SynapseKit: Python LLM Framework, LangChain Alternative",
  },
  description:
    "Async-native Python framework for RAG, agents, and graph workflows. A lightweight, open source LangChain and LlamaIndex alternative with 2 hard dependencies, 46 LLM providers, and no hidden abstractions.",
  keywords: [
    "python llm framework",
    "langchain alternative",
    "llamaindex alternative",
    "rag pipeline python",
    "llm agents python",
    "open source llm",
    "async llm python",
    "react agent python",
    "graph workflow llm",
    "llm orchestration",
    "retrieval augmented generation",
    "vector store python",
    "llm tools python",
    "agent federation",
    "synapsekit",
    "llm eval python",
    "open source ai framework",
    "python rag framework",
    "llm guardrails python",
  ],
  authors: [
    {
      name: "SynapseKit Contributors",
      url: "https://github.com/SynapseKit/SynapseKit",
    },
  ],
  creator: "SynapseKit",
  publisher: "SynapseKit",
  category: "technology",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "SynapseKit: Python LLM Framework, LangChain Alternative",
    description:
      "Async-native Python LLM framework for RAG pipelines, ReAct agents, and graph workflows. 2 dependencies, 46 providers, 83 loaders. No lock-in.",
    url: "https://synapse-kit.com",
    siteName: "SynapseKit",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SynapseKit: Python LLM Framework, LangChain Alternative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SynapseKit: Python LLM Framework, LangChain Alternative",
    description:
      "Async-native Python LLM framework for RAG pipelines, ReAct agents, and graph workflows. 2 dependencies, 46 providers, 83 loaders. No lock-in.",
    site: "@synapsekitai",
    creator: "@synapsekitai",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://synapse-kit.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "jYlwHggDmkMps3PV5-CTfQktfZoKlKS-vAJjKfb1PCM",
  },
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SynapseKit",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Linux, macOS, Windows",
  programmingLanguage: "Python",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  license: "https://opensource.org/licenses/Apache-2.0",
  url: "https://synapse-kit.com",
  downloadUrl: "https://pypi.org/project/synapsekit/",
  softwareVersion: "2.0.1",
  description:
    "Async-native Python framework for RAG pipelines, ReAct agents, and graph workflows. 2 dependencies. 46 LLM providers. No lock-in.",
  featureList: [
    "RAG Pipelines",
    "ReAct Agents",
    "Graph Workflows",
    "AgentFederation",
    "83 Document Loaders",
    "46 LLM Providers",
    "32 Vector Stores",
    "56 Built-in Tools",
    "Guardrails Middleware",
    "Verifiable Audit Trails",
    "Async-native",
    "EvalCI GitHub Action",
  ],
  releaseNotes:
    "https://github.com/SynapseKit/SynapseKit/blob/main/CHANGELOG.md",
  author: {
    "@type": "Organization",
    name: "SynapseKit Contributors",
    url: "https://github.com/SynapseKit",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SynapseKit",
  url: "https://synapse-kit.com",
  logo: "https://synapse-kit.com/logo.svg",
  sameAs: [
    "https://github.com/SynapseKit/SynapseKit",
    "https://pypi.org/project/synapsekit/",
    "https://discord.gg/PSuAXHRywJ",
    "https://www.linkedin.com/company/synapsekitai/",
  ],
  foundingDate: "2024",
  description:
    "Open-source Python LLM framework for building RAG pipelines, agents, and graph workflows.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SynapseKit",
  url: "https://synapse-kit.com",
  potentialAction: {
    "@type": "SearchAction",
    target:
      "https://synapsekit.github.io/synapsekit-docs/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
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
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { page_path: window.location.pathname });
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareApplicationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
