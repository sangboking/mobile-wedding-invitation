import Image from "next/image";
import { wedding } from "@/config/wedding";

export default function Hero() {
  const { groom, bride, dateText, timeText, venue, mainPhoto } = wedding;

  return (
    <section className="relative flex min-h-[100dvh] flex-col">
      {/* 대표 사진 (가로 꽉 차게 풀블리드) */}
      <div className="relative w-full flex-1 overflow-hidden">
        <Image
          src={mainPhoto}
          alt={`${groom.name} ${bride.name} 메인 사진`}
          fill
          priority
          sizes="(max-width: 430px) 100vw, 430px"
          className="object-cover"
        />

        {/* 상단 그라데이션 (문구 가독성) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/35 to-transparent" />

        {/* 사진 위 오버레이 문구 */}
        <p className="absolute inset-x-0 top-9 text-center text-xs tracking-[0.35em] text-white/95 drop-shadow-sm">
          WE ARE GETTING MARRIED
        </p>
      </div>

      {/* 이름 · 일시 · 장소 */}
      <div className="flex flex-col items-center gap-3 py-10">
        <h1 className="text-2xl font-medium tracking-wide text-ink">
          {groom.name}
          <span className="mx-3 text-point">·</span>
          {bride.name}
        </h1>
        <div className="h-px w-10 bg-point/40" />
        <p className="text-center text-sm leading-relaxed text-ink/80">
          {dateText} {timeText}
          <br />
          {venue.name}
        </p>
      </div>
    </section>
  );
}
