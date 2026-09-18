import Link from "next/link";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      style={{ background: "var(--bg)", minHeight: "100vh" }}
      className="flex flex-col items-center justify-center px-6 text-center"
    >
      <p
        style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--accent)" }}
        className="mb-4 text-sm font-medium"
      >
        404
      </p>
      <h1
        style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}
        className="mb-4 text-3xl font-extrabold md:text-5xl"
      >
        Page not found
      </h1>
      <p style={{ color: "var(--text-muted)" }} className="mb-10 max-w-md text-sm leading-relaxed md:text-base">
        Nothing lives at this URL. It may have moved, or the link is wrong.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          style={{
            background: "var(--text)",
            color: "var(--bg)",
            borderRadius: "var(--radius)",
          }}
          className="px-6 py-3 text-sm font-medium no-underline"
        >
          Back to homepage
        </Link>
        <a
          href="https://synapsekit.github.io/synapsekit-docs/"
          style={{
            border: "1px solid var(--border)",
            color: "var(--text)",
            borderRadius: "var(--radius)",
          }}
          className="px-6 py-3 text-sm font-medium no-underline"
        >
          Read the docs
        </a>
        <a
          href="https://github.com/SynapseKit/SynapseKit"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            border: "1px solid var(--border)",
            color: "var(--text)",
            borderRadius: "var(--radius)",
          }}
          className="px-6 py-3 text-sm font-medium no-underline"
        >
          View on GitHub
        </a>
      </div>
    </main>
  );
}
