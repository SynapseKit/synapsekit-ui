"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { FAQ as FAQ_ITEMS } from "@/data/faq";

export default function FAQ() {
  const { ref } = useReveal();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" style={{ background: "var(--surface)" }} className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div ref={ref} className="reveal mb-12">
          <h2
            style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}
            className="text-3xl font-extrabold md:text-5xl"
          >
            Questions
          </h2>
          <p style={{ color: "var(--text-muted)" }} className="mt-4 text-sm leading-relaxed md:text-base">
            Answers to what people usually ask before adopting SynapseKit or switching
            from LangChain or LlamaIndex.
          </p>
        </div>

        <div style={{ borderTop: "1px solid var(--border)" }}>
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.question} style={{ borderBottom: "1px solid var(--border)" }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{ color: "var(--text)" }}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
                >
                  <span style={{ fontFamily: "var(--font-syne)" }} className="text-base font-bold md:text-lg">
                    {item.question}
                  </span>
                  <span
                    aria-hidden
                    style={{
                      color: "var(--accent)",
                      fontFamily: "var(--font-jetbrains-mono)",
                      flexShrink: 0,
                    }}
                    className="text-lg"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <p
                    style={{ color: "var(--text-muted)" }}
                    className="pb-5 text-sm leading-relaxed md:text-base"
                  >
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
