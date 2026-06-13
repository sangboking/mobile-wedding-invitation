"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { wedding } from "@/config/wedding";

const SWIPE_THRESHOLD = 50; // px

export default function Gallery() {
  const photos = wedding.gallery;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  // 양 끝에서는 더 이동하지 않음(순환 X)
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : Math.max(0, i - 1))),
    [],
  );
  const next = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? i : Math.min(photos.length - 1, i + 1),
      ),
    [photos.length],
  );

  // 키보드 조작 + 모달 열렸을 때 배경 스크롤 잠금
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);

    // 배경 스크롤 잠금 (position:fixed 방식 — iOS·데스크탑 모두 확실)
    const scrollY = window.scrollY;
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    // 모바일: 터치 스크롤(터치무브)도 차단 (passive:false 라야 preventDefault 동작)
    const preventTouch = (e: TouchEvent) => e.preventDefault();
    document.addEventListener("touchmove", preventTouch, { passive: false });

    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("touchmove", preventTouch);
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      // 잠그기 전 스크롤 위치 복원
      window.scrollTo(0, scrollY);
    };
  }, [isOpen, close, prev, next]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > SWIPE_THRESHOLD) prev();
    else if (dx < -SWIPE_THRESHOLD) next();
    touchStartX.current = null;
  };

  return (
    <section className="flex flex-col items-center gap-6 px-6 py-16">
      <p className="text-xs tracking-[0.35em] text-point">GALLERY</p>

      {/* 3 x 3 그리드 */}
      <div className="grid w-full grid-cols-3 gap-1.5">
        {photos.map((src, i) => (
          <button
            key={src}
            onClick={() => setOpenIndex(i)}
            className="relative aspect-square overflow-hidden rounded-md bg-white/50"
            aria-label={`사진 ${i + 1} 크게 보기`}
          >
            <Image
              src={src}
              alt={`갤러리 사진 ${i + 1}`}
              fill
              sizes="(max-width: 430px) 33vw, 140px"
              className="object-cover transition-transform duration-200 active:scale-95"
            />
          </button>
        ))}
      </div>

      {/* 라이트박스 모달 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90"
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* 닫기 */}
          <button
            onClick={close}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
            aria-label="닫기"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* 이미지 영역. 바깥(어두운 부분) 클릭 시 닫히고, 사진/버튼 클릭은 유지 */}
          <div className="relative flex h-full w-full items-center justify-center">
            {/* 사진 자체만 클릭 전파 차단 (사진 클릭으론 안 닫힘) */}
            <div
              className="relative h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[openIndex]}
                alt={`갤러리 사진 ${openIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* 좌/우 버튼 (첫 사진엔 좌측, 마지막 사진엔 우측 숨김) */}
            {openIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white"
                aria-label="이전 사진"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}
            {openIndex < photos.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white"
                aria-label="다음 사진"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            )}

            {/* 인덱스 표시 */}
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs text-white">
              {openIndex + 1} / {photos.length}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
