"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/config/wedding";

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
};

function getRemaining(target: number): Remaining {
  const diff = target - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  const sec = Math.floor(diff / 1000);
  return {
    days: Math.floor(sec / 86400),
    hours: Math.floor((sec % 86400) / 3600),
    minutes: Math.floor((sec % 3600) / 60),
    seconds: sec % 60,
    isPast: false,
  };
}

const PAD = (n: number) => String(n).padStart(2, "0");

export default function DdayCounter() {
  const target = new Date(wedding.date).getTime();

  // 서버/클라이언트 hydration 불일치를 피하기 위해 mount 후 계산
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    setRemaining(getRemaining(target));
    const id = setInterval(() => setRemaining(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  // D-day 숫자 (예: D-84)
  const dday =
    remaining && !remaining.isPast
      ? remaining.days + (remaining.hours || remaining.minutes || remaining.seconds ? 1 : 0)
      : 0;

  const cells: { label: string; value: number }[] = remaining
    ? [
        { label: "DAYS", value: remaining.days },
        { label: "HOUR", value: remaining.hours },
        { label: "MIN", value: remaining.minutes },
        { label: "SEC", value: remaining.seconds },
      ]
    : [
        { label: "DAYS", value: 0 },
        { label: "HOUR", value: 0 },
        { label: "MIN", value: 0 },
        { label: "SEC", value: 0 },
      ];

  return (
    <section className="flex flex-col items-center gap-5 px-6 py-10">
      <div className="flex gap-3">
        {cells.map((c) => (
          <div
            key={c.label}
            className="flex w-16 flex-col items-center gap-1 rounded-xl bg-white/60 py-3 shadow-sm"
          >
            <span className="text-2xl font-medium tabular-nums text-ink">
              {PAD(c.value)}
            </span>
            <span className="text-[10px] tracking-widest text-point">
              {c.label}
            </span>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-ink/70">
        {remaining?.isPast ? (
          <>
            {wedding.groom.name} ♥ {wedding.bride.name}의 결혼식이
            <br />
            진행되었습니다. 축하해 주셔서 감사합니다.
          </>
        ) : (
          <>
            {wedding.groom.name}, {wedding.bride.name}의 결혼식이
            <br />
            <span className="font-medium text-point">{dday}일</span> 남았습니다.
          </>
        )}
      </p>
    </section>
  );
}
