"use client";

import { useState } from "react";
import { wedding } from "@/config/wedding";

type AccountItem = {
  role: string;
  name: string;
  bank: string;
  number: string;
  kakaopay?: string;
};

function AccountRow({ item }: { item: AccountItem }) {
  const [copied, setCopied] = useState(false);
  const hasNumber = Boolean(item.bank && item.number);

  const copy = async () => {
    if (!hasNumber) return;
    try {
      await navigator.clipboard.writeText(`${item.bank} ${item.number}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* 무시 */
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 border-b border-ink/10 py-3 last:border-b-0">
      <div className="min-w-0">
        <p className="text-sm text-ink">
          <span className="text-point">{item.role}</span>{" "}
          <span className="font-medium">{item.name}</span>
        </p>
        <p className="truncate text-[13px] text-ink/70">
          {hasNumber ? `${item.bank} ${item.number}` : "계좌번호 준비 중"}
        </p>
      </div>
      <button
        onClick={copy}
        disabled={!hasNumber}
        className="shrink-0 rounded-md border border-point/40 px-2.5 py-1 text-xs text-point disabled:opacity-40"
      >
        {copied ? "복사됨" : "복사"}
      </button>
    </div>
  );
}

function AccountGroup({
  title,
  list,
}: {
  title: string;
  list: readonly AccountItem[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-ink/10 bg-white/60">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-ink"
      >
        {title}
        <span
          className={`text-point transition-transform ${open ? "rotate-180" : ""}`}
        >
          ⌄
        </span>
      </button>
      {open && (
        <div className="px-4 pb-2">
          {list.map((item) => (
            <AccountRow key={`${item.role}-${item.name}`} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Account() {
  const { groom, bride } = wedding.accounts;

  return (
    <section className="flex flex-col gap-6 px-6 py-16">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-xs tracking-[0.35em] text-point">ACCOUNT</p>
        <h2 className="text-lg font-medium text-ink">마음 전하실 곳</h2>
        <p className="text-sm leading-relaxed text-ink/70">
          참석이 어려우신 분들을 위해
          <br />
          계좌번호를 안내드립니다. 너른 마음으로 양해 부탁드립니다.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <AccountGroup title={groom.title} list={groom.list} />
        <AccountGroup title={bride.title} list={bride.list} />
      </div>
    </section>
  );
}
