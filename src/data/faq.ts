export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ: FaqItem[] = [
  {
    question: "What is SynapseKit?",
    answer:
      "SynapseKit is an async-native, open-source Python framework for building LLM-powered applications. It provides RAG pipelines, ReAct agents, graph workflows, and AgentFederation with only 2 hard dependencies (numpy and rank-bm25). It supports 46 LLM providers, 83 document loaders, and 32 vector stores out of the box.",
  },
  {
    question: "Is SynapseKit a LangChain alternative?",
    answer:
      "Yes. SynapseKit is designed as a lightweight, async-native alternative to LangChain. It achieves the same capabilities (RAG, agents, tool use, graph workflows) with only 2 hard dependencies instead of LangChain's large dependency tree. It avoids hidden abstractions and gives developers full control over their LLM pipelines.",
  },
  {
    question: "Is SynapseKit an alternative to LlamaIndex?",
    answer:
      "Yes. SynapseKit covers the same retrieval-augmented generation ground as LlamaIndex, including hybrid BM25 and vector search, reranking, and knowledge-graph retrieval, plus a broader scope: agents, graph workflows, guardrails, and verifiable audit trails, all with 2 hard dependencies instead of LlamaIndex's larger install footprint.",
  },
  {
    question: "Does SynapseKit have guardrails or audit trails for agents?",
    answer:
      "Yes. SynapseKit ships a guardrails module that wraps any LLM with policy middleware (block, redact, flag, or require human review), including prompt-injection and jailbreak detection, PII redaction, and HIPAA/GDPR/PCI-DSS rulepacks. Separately, VerifiableAgent produces signed, hash-chained audit trails that an independent verifier can check for MATCH, DRIFT, or UNVERIFIABLE.",
  },
  {
    question: "Does SynapseKit support async Python?",
    answer:
      "Yes, SynapseKit is async-native throughout. Every LLM call, loader, retriever, and agent supports async/await. This makes it suitable for production web applications, APIs, and high-throughput pipelines where blocking I/O would be a bottleneck.",
  },
  {
    question: "How do I install SynapseKit?",
    answer:
      "Install SynapseKit with pip: pip install synapsekit. For optional extras like specific vector stores or loaders, use extras such as pip install synapsekit[chroma]. Full installation docs are at synapsekit.github.io/synapsekit-docs/getting-started/installation.",
  },
  {
    question: "Which LLM providers does SynapseKit support?",
    answer:
      "SynapseKit supports 46 LLM providers including OpenAI, Anthropic Claude, Google Gemini, Mistral, Cohere, Ollama, LM Studio, xAI Grok, Groq, AWS Bedrock, Azure OpenAI, Together AI, Replicate, HuggingFace, and many more. Provider switching requires changing one line of code.",
  },
  {
    question: "What is RAG and how does SynapseKit support it?",
    answer:
      "RAG (Retrieval-Augmented Generation) lets LLMs answer questions using your documents. SynapseKit provides a complete RAG pipeline with 83 document loaders (PDF, web, S3, databases, APIs), 32 vector stores (Chroma, Pinecone, Weaviate, Qdrant, pgvector, etc.), hybrid BM25+vector search, and reranking, all composable with a few lines of Python.",
  },
  {
    question: "What are ReAct agents in SynapseKit?",
    answer:
      "ReAct agents in SynapseKit follow the Reason+Act pattern: the LLM reasons about a task, selects a tool, observes the result, and iterates. SynapseKit ships 56 built-in tools (web search, code execution, file I/O, APIs) and makes it easy to write custom tools as plain Python functions.",
  },
  {
    question: "What are Graph Workflows?",
    answer:
      "Graph Workflows let you define LLM pipelines as directed graphs with nodes (processing steps) and edges (transitions). Unlike linear chains, graphs support branching, loops, conditional routing, and parallel execution. SynapseKit's graph runtime also supports recursive subgraphs for complex multi-agent coordination.",
  },
  {
    question: "Does SynapseKit have evaluation support?",
    answer:
      "Yes. SynapseKit includes EvalDataset, EvalRecord, and a PromptOptimizer for scoring prompt variants. There is also EvalCI: a free GitHub Action (github.com/SynapseKit/evalci) that runs your eval suite on every pull request, so regressions are caught before merging.",
  },
  {
    question: "What license is SynapseKit released under?",
    answer:
      "SynapseKit is released under the Apache License 2.0. It is free to use, modify, and distribute for personal, academic, and commercial projects. There is no SaaS version, no paid tier, and no telemetry.",
  },
  {
    question: "What vector stores does SynapseKit support?",
    answer:
      "32 vector stores behind one VectorStore interface, from a zero-dependency InMemoryVectorStore to managed cloud services: Chroma, Pinecone, Weaviate, Qdrant, Milvus, LanceDB, pgvector, Redis, MongoDB Atlas, SQLiteVec, FAISS, Elasticsearch, OpenSearch, Turbopuffer, Azure AI Search, Vertex AI Vector Search, DeepLake, and more. Every store implements add(), search(), search_mmr(), save(), and load().",
  },
  {
    question: "Can I write my own tools and integrations?",
    answer:
      "Yes. Tools are plain Python functions decorated with @tool, sync or async, with no boilerplate. LLM providers, vector stores, and loaders each implement a small abstract base class, so adding a new one follows the same pattern as the 46, 32, and 83 already shipped.",
  },
  {
    question: "What is SynapseKit Live?",
    answer:
      "SynapseKit Live is a zero-dependency, real-time dashboard built into the framework. Every LLM call, tool call, retrieval, database write, knowledge-graph update, cost, and human approval streams to your browser. Enable it with one environment variable or one line of code; it is a no-op with zero overhead when off.",
  },
  {
    question: "Does SynapseKit provide Docker images?",
    answer:
      "Yes. Official images are published on GitHub Container Registry on every release: a core image (CLI and library, multi-arch amd64/arm64) and an all-extras image with every optional dependency baked in. Pull with docker pull ghcr.io/synapsekit/synapsekit:latest.",
  },
  {
    question: "What is AgentSwarm and how does market-based agent routing work?",
    answer:
      "AgentSwarm routes tasks across a registry of agents using market mechanics: agents bid with estimated cost, quality, and confidence, and a MarketPolicy resolves the winner via sealed-bid, Vickrey, English, or coalition auctions. A Reputation tracker learns per-agent, per-task-category outcomes over time. AgentFederation offers a simpler alternative for teams that just need round-robin or cost-aware routing without an auction model.",
  },
  {
    question: "Does SynapseKit support self-improving or evolving agents?",
    answer:
      "Yes, via SelfImprovingAgent. It observes production feedback, proposes signed configuration patches, validates them against an eval suite, and rolls them out through a canary process. Every patch is eval-gated by default and reversible, with a full audit trail of what changed and why.",
  },
  {
    question: "Can SynapseKit verify LLM outputs with formal logic?",
    answer:
      "Yes, via NeuroSymbolicAgent. The LLM proposes formal constraints from a natural-language problem, and a symbolic solver (Z3, SymPy, MiniZinc, or Prolog) checks them before the answer is returned, so the result is provably correct rather than merely plausible.",
  },
  {
    question: "Does SynapseKit work with local or offline LLMs?",
    answer:
      "Yes. SynapseKit supports Ollama, LM Studio, llama.cpp, vLLM, GPT4All, and MLX for fully local inference, alongside EdgeRuntime for local-first inference with policy-gated cloud fallback and on-device PII redaction before any data leaves the device.",
  },
  {
    question: "What memory backends does SynapseKit support for agents?",
    answer:
      "10 built-in AgentMemory backends: SQLite, Redis, PostgreSQL, DynamoDB, MongoDB, Firestore, Cosmos DB, Cassandra, Memcached, and an in-memory backend for tests. Living Memory adds signed, diffable patches so agents propose changes to their memory files instead of silently overwriting them.",
  },
  {
    question: "Does SynapseKit have observability and cost tracking?",
    answer:
      "Yes. PrometheusMetrics records cost, token counts, and latency per model and provider, with a ready-made Helm chart for a Prometheus and Grafana stack. Token tracing and RAGEvaluator add per-call cost and quality scoring, and SynapseKit Live streams the same data in real time during development.",
  },
  {
    question: "Is SynapseKit production-ready?",
    answer:
      "Yes. It ships with over 5,400 passing tests, an Apache 2.0 license, official Docker images published on every release, a repo-wide hardening pass with a regression test per fix, and an OSV dependency audit that resolves to zero known vulnerabilities.",
  },
  {
    question: "How is SynapseKit different from calling the OpenAI or Anthropic SDK directly?",
    answer:
      "SynapseKit gives you one interface across 46 providers so switching models is a one-line change, plus the pieces a provider SDK does not include: RAG pipelines, agents with tool use, graph workflows, evaluation, guardrails, and observability, all async-native and composable as plain Python you can read end to end.",
  },
];
