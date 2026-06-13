"use client";

import { useState } from "react";
import { wedding } from "@/config/wedding";

export default function Share() {
  const [copied, setCopied] = useState(false);
  const { groom, bride } = wedding;
  const shareTitle = `${groom.name} ♥ ${bride.name} 결혼합니다`;

  // 현재 페이지 URL (배포 도메인 자동 반영)
  const getUrl = () =>
    typeof window !== "undefined" ? window.location.href : wedding.meta.siteUrl;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* 무시 */
    }
  };

  // 모바일: OS 공유 시트(카톡·문자 등) / 미지원 시 링크 복사로 폴백
  const share = async () => {
    const url = getUrl();
    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: shareTitle, url });
      } catch {
        /* 사용자가 취소한 경우 무시 */
      }
    } else {
      copyLink();
    }
  };

  return (
    <section className="flex flex-col items-center gap-5 px-6 py-16">
      <p className="text-xs tracking-[0.35em] text-point">SHARE</p>
      <p className="text-center text-sm leading-relaxed text-ink/70">
        소중한 분들께 청첩장을 전해주세요.
      </p>

      <div className="flex items-center gap-4">
        {/* 공유하기 (OS 공유 시트) */}
        <button
          onClick={share}
          className="flex flex-col items-center gap-1.5"
          aria-label="공유하기"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/70 text-ink shadow-sm active:scale-95">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
            </svg>
          </span>
          <span className="text-xs text-ink/70">공유하기</span>
        </button>

        {/* 링크 복사 */}
        <button
          onClick={copyLink}
          className="flex flex-col items-center gap-1.5"
          aria-label="링크 복사"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/70 text-ink shadow-sm active:scale-95">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </span>
          <span className="text-xs text-ink/70">
            {copied ? "복사됨" : "링크 복사"}
          </span>
        </button>
      </div>
    </section>
  );
}
