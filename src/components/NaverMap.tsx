"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { wedding } from "@/config/wedding";

// NCP(네이버 클라우드 플랫폼) Maps Client ID.
// .env.local 에 NEXT_PUBLIC_NCP_KEY_ID=발급키 를 넣으면 실제 지도가 뜹니다.
const NCP_KEY = process.env.NEXT_PUBLIC_NCP_KEY_ID;

declare global {
  interface Window {
    naver?: any;
  }
}

export default function NaverMap() {
  const ref = useRef<HTMLDivElement>(null);
  const { name } = wedding.venue;
  // as const 리터럴 타입을 number로 넓혀 비교 오류(ts2367) 방지
  const lat: number = wedding.venue.lat;
  const lng: number = wedding.venue.lng;
  const hasCoord = lat !== 0 && lng !== 0;

  useEffect(() => {
    if (!NCP_KEY || !hasCoord || !ref.current) return;

    const init = () => {
      const naver = window.naver;
      if (!naver?.maps) return;
      const center = new naver.maps.LatLng(lat, lng);
      const map = new naver.maps.Map(ref.current, {
        center,
        zoom: 16,
        draggable: true,
        pinchZoom: true, // 모바일 두 손가락 줌
        scrollWheel: false, // 휠 줌은 페이지 스크롤과 충돌하므로 끔
        disableDoubleTapZoom: false, // 더블탭 줌 허용
        zoomControl: false, // +/- 줌 버튼 숨김
      });
      new naver.maps.Marker({ position: center, map, title: name });
    };

    // 스크립트 1회만 로드
    const SCRIPT_ID = "naver-maps-sdk";
    if (document.getElementById(SCRIPT_ID)) {
      init();
      return;
    }
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NCP_KEY}`;
    script.async = true;
    script.onload = init;
    document.head.appendChild(script);
  }, [lat, lng, name, hasCoord]);

  // 키 + 좌표가 있으면 실제 지도, 없으면 이미지(public/map.png) 자리표시자
  if (NCP_KEY && hasCoord) {
    return (
      <div
        ref={ref}
        className="h-56 w-full overflow-hidden rounded-xl bg-white/50"
      />
    );
  }

  return (
    <div className="relative h-56 w-full overflow-hidden rounded-xl bg-white/50">
      <Image
        src="/map.png"
        alt={`${name} 위치 지도`}
        fill
        sizes="430px"
        className="object-cover"
      />
    </div>
  );
}
