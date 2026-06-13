"use client";

import { useState } from "react";
import { wedding } from "@/config/wedding";
import NaverMap from "@/components/NaverMap";

const { venue } = wedding;
// as const 리터럴 타입을 number로 넓혀 비교 오류(ts2367) 방지
const venueLat: number = venue.lat;
const venueLng: number = venue.lng;
const hasCoord = venueLat !== 0 && venueLng !== 0;
const q = encodeURIComponent(venue.name);

// 길찾기 딥링크. 좌표가 있으면 정밀 경로, 없으면 장소명 검색으로 대체.
const navLinks = {
  // 티맵
  tmap: hasCoord
    ? `tmap://route?goalname=${q}&goalx=${venue.lng}&goaly=${venue.lat}`
    : `tmap://search?name=${q}`,
  // 카카오맵 길찾기 (카카오내비 SDK는 JS키 필요 → 키 없이 동작하는 카카오맵 링크 사용)
  kakao: hasCoord
    ? `https://map.kakao.com/link/to/${q},${venue.lat},${venue.lng}`
    : `https://map.kakao.com/link/search/${q}`,
  // 네이버지도
  naver: hasCoord
    ? `nmap://route/car?dlat=${venue.lat}&dlng=${venue.lng}&dname=${q}&appname=wedding.invitation`
    : `nmap://search?query=${q}&appname=wedding.invitation`,
};

const NAV_BUTTONS = [
  { key: "tmap", label: "티맵", href: navLinks.tmap, color: "#0064FF" },
  { key: "kakao", label: "카카오내비", href: navLinks.kakao, color: "#FEE500" },
  { key: "naver", label: "네이버지도", href: navLinks.naver, color: "#03C75A" },
] as const;

export default function Location() {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(venue.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* 클립보드 미지원 환경 무시 */
    }
  };

  return (
    <section className="flex flex-col gap-6 px-6 py-16">
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs tracking-[0.35em] text-point">LOCATION</p>
        <h2 className="text-lg font-medium text-ink">{venue.name}</h2>
        {venue.hall && <p className="text-sm text-ink/70">{venue.hall}</p>}
      </div>

      {/* 지도 */}
      <NaverMap />

      {/* 주소 + 복사 */}
      <div className="flex items-center justify-center gap-2 text-sm text-ink/80">
        <span>{venue.address}</span>
        <button
          onClick={copyAddress}
          className="rounded-full border border-point/40 px-2.5 py-0.5 text-xs text-point"
        >
          {copied ? "복사됨" : "복사"}
        </button>
      </div>

      {/* 길찾기 버튼 3개 */}
      <div className="grid grid-cols-3 gap-2">
        {NAV_BUTTONS.map((b) => (
          <a
            key={b.key}
            href={b.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-lg border border-ink/10 bg-white/70 py-3 text-sm text-ink shadow-sm active:scale-95"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: b.color }}
            />
            {b.label}
          </a>
        ))}
      </div>

      {/* 이동 수단 안내 */}
      {venue.transport?.length > 0 && (
        <div className="mt-2 flex flex-col gap-3">
          {venue.transport.map((t) => (
            <div key={t.label} className="flex gap-3">
              <span className="mt-0.5 inline-flex h-fit w-16 shrink-0 justify-center rounded-md bg-ink px-2 py-1 text-xs text-white">
                {t.label}
              </span>
              <p className="text-[13px] leading-relaxed text-ink/80">
                {t.desc.split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
