import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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
    default: "SynapseKit — Python LLM Framework",
  },
  description:
    "Async-native Python LLM framework for RAG pipelines, ReAct agents, and graph workflows. A lightweight LangChain alternative with 2 dependencies, 35 LLM providers, 66 document loaders, and 22 vector stores. Open source, Apache 2.0.",
  keywords: [
    "python llm framework",
    "langchain alternative",
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
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "SynapseKit — Python LLM Framework",
    description:
      "Async-native Python LLM framework for RAG pipelines, ReAct agents, and graph workflows. 2 dependencies, 35 providers, 66 loaders. No lock-in.",
    url: "https://synapse-kit.com",
    siteName: "SynapseKit",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SynapseKit — Python LLM Framework",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SynapseKit — Python LLM Framework",
    description:
      "Async-native Python LLM framework for RAG pipelines, ReAct agents, and graph workflows. 2 dependencies, 35 providers, 66 loaders. No lock-in.",
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
  softwareVersion: "1.9.1",
  description:
    "Async-native Python framework for RAG pipelines, ReAct agents, and graph workflows. 2 dependencies. 35 LLM providers. No lock-in.",
  featureList: [
    "RAG Pipelines",
    "ReAct Agents",
    "Graph Workflows",
    "AgentFederation",
    "66 Document Loaders",
    "35 LLM Providers",
    "22 Vector Stores",
    "47+ Built-in Tools",
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
  mainEntity: [
    {
      "@type": "Question",
      name: "What is SynapseKit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SynapseKit is an async-native, open-source Python framework for building LLM-powered applications. It provides RAG pipelines, ReAct agents, graph workflows, and AgentFederation with only 2 hard dependencies (numpy and rank-bm25). It supports 35 LLM providers, 66 document loaders, and 22 vector stores out of the box.",
      },
    },
    {
      "@type": "Question",
      name: "Is SynapseKit a LangChain alternative?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SynapseKit is designed as a lightweight, async-native alternative to LangChain. It achieves the same capabilities — RAG, agents, tool use, graph workflows — with only 2 hard dependencies instead of LangChain's large dependency tree. It avoids hidden abstractions and gives developers full control over their LLM pipelines.",
      },
    },
    {
      "@type": "Question",
      name: "Does SynapseKit support async Python?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, SynapseKit is async-native throughout. Every LLM call, loader, retriever, and agent supports async/await. This makes it suitable for production web applications, APIs, and high-throughput pipelines where blocking I/O would be a bottleneck.",
      },
    },
    {
      "@type": "Question",
      name: "How do I install SynapseKit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Install SynapseKit with pip: `pip install synapsekit`. For optional extras like specific vector stores or loaders, use extras such as `pip install synapsekit[chroma]`. Full installation docs are at https://synapsekit.github.io/synapsekit-docs/getting-started/installation.",
      },
    },
    {
      "@type": "Question",
      name: "Which LLM providers does SynapseKit support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SynapseKit supports 35 LLM providers including OpenAI, Anthropic Claude, Google Gemini, Mistral, Cohere, Ollama, LM Studio, xAI Grok, Groq, AWS Bedrock, Azure OpenAI, Together AI, Replicate, HuggingFace, and many more. Provider switching requires changing one line of code.",
      },
    },
    {
      "@type": "Question",
      name: "What is RAG and how does SynapseKit support it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RAG (Retrieval-Augmented Generation) lets LLMs answer questions using your documents. SynapseKit provides a complete RAG pipeline with 66 document loaders (PDF, web, S3, databases, APIs), 22 vector stores (Chroma, Pinecone, Weaviate, Qdrant, pgvector, etc.), hybrid BM25+vector search, and reranking — all composable with a few lines of Python.",
      },
    },
    {
      "@type": "Question",
      name: "What are ReAct agents in SynapseKit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ReAct agents in SynapseKit follow the Reason+Act pattern: the LLM reasons about a task, selects a tool, observes the result, and iterates. SynapseKit ships 47+ built-in tools (web search, code execution, file I/O, APIs) and makes it easy to write custom tools as plain Python functions.",
      },
    },
    {
      "@type": "Question",
      name: "What are Graph Workflows?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Graph Workflows let you define LLM pipelines as directed graphs with nodes (processing steps) and edges (transitions). Unlike linear chains, graphs support branching, loops, conditional routing, and parallel execution. SynapseKit's graph runtime also supports recursive subgraphs for complex multi-agent coordination.",
      },
    },
    {
      "@type": "Question",
      name: "Does SynapseKit have evaluation support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SynapseKit includes EvalDataset, EvalRecord, and a PromptOptimizer for scoring prompt variants. There is also EvalCI — a free GitHub Action (github.com/SynapseKit/evalci) that runs your eval suite on every pull request, so regressions are caught before merging.",
      },
    },
    {
      "@type": "Question",
      name: "What license is SynapseKit released under?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SynapseKit is released under the Apache License 2.0. It is free to use, modify, and distribute for personal, academic, and commercial projects. There is no SaaS version, no paid tier, and no telemetry.",
      },
    },
  ],
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
