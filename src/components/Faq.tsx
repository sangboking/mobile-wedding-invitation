"use client";

import { useState } from "react";
import { wedding } from "@/config/wedding";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-ink/10 bg-white/60">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
      >
        <span className="text-sm text-ink">
          <span className="mr-1.5 text-point">Q.</span>
          {q}
        </span>
        <span
          className={`shrink-0 text-point transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ⌄
        </span>
      </button>
      {open && (
        <p className="break-keep px-4 pb-4 text-[13px] leading-relaxed text-ink/75">
          <span className="mr-1.5 text-point">A.</span>
          {a}
        </p>
      )}
    </div>
  );
}

export default function Faq() {
  return (
    <section className="flex flex-col gap-6 px-6 py-16">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-xs tracking-[0.35em] text-point">FAQ</p>
        <h2 className="text-lg font-medium text-ink">자주 묻는 질문</h2>
      </div>

      <div className="flex flex-col gap-3">
        {wedding.faq.map((item) => (
          <FaqItem key={item.q} q={item.q} a={item.a} />
        ))}
      </div>
    </section>
  );
}
