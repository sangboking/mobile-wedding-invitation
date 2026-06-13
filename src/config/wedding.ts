// ────────────────────────────────────────────────
// 청첩장 전체에서 공유하는 단일 정보 소스(Single Source of Truth)
// 값만 바꾸면 모든 섹션 · 메타데이터에 반영됩니다.
// ────────────────────────────────────────────────

export const wedding = {
  groom: {
    name: "박상훈",
    birth: "1997.05.19",
    // 관계 정보 (오시는 길/계좌 섹션 등에서 사용)
    father: "박흥규",
    mother: "이혜자",
    order: "차남",
    phone: "",
    account: "", // 예: "○○은행 123-456-789"
    fatherDeceased: false,
    motherDeceased: false,
  },
  bride: {
    name: "김민재",
    birth: "1994.04.19",
    father: "김준우",
    mother: "박현아",
    order: "장녀",
    phone: "",
    account: "",
    // 고인이 되신 혼주는 true → 성함 앞에 국화(추모) 표시
    fatherDeceased: true,
    motherDeceased: false,
  },

  // 예식 일시 (ISO 형식 — D-day 계산에 사용)
  date: "2026-09-05T17:20:00+09:00",
  dateText: "2026년 9월 5일 토요일",
  timeText: "오후 5시 20분",

  venue: {
    name: "더 링크 서울, 트리뷰트 포트폴리오 호텔",
    hall: "3층 베일리홀",
    address: "서울 구로구 경인로 610",
    tel: "",
    // 카카오맵/네이버맵 좌표 (구글지도 기준 + 미세조정)
    lat: 37.5054308,
    lng: 126.8838044,
    // 이동 수단 안내 (오시는 길 섹션에서 사용)
    transport: [
      {
        label: "대중교통",
        desc: "1·2호선 신도림역 1번 출구(무료 셔틀버스 운행) / 1호선 구로역 3번 출구(도보 10분)",
      },
      {
        label: "무료셔틀",
        desc: "신도림역 1번 출구 맞은편 ↔ 더링크호텔 간 왕복 (약 5-10분 간격 수시 운행)",
      },
      {
        label: "자가용",
        desc: "호텔 지하 주차장(B1-B6) 및 외부 주차장 이용 (당일 주차요원 안내에 따라 주차)\n1시간 30분 무료 주차 / 초과 시 15분당 1,000원 (카드 가능) 주차권, 도장, 사전결산 필요 없음",
      },
    ],
  },

  // 인사말 섹션
  greeting: {
    // 상단 짧은 시/인용구 (원치 않으면 빈 문자열)
    poem: "서로가 마주보며 다져온 사랑을\n이제 함께 한곳을 바라보며\n걸어갈 수 있는 큰 사랑으로 키우고자 합니다.",
    // 본문 인사말
    message:
      "저희 두 사람이 사랑과 믿음으로\n한 가정을 이루게 되었습니다.\n그 시작의 자리에 귀한 걸음으로\n축복해 주시면 더없는 기쁨으로\n간직하겠습니다.",
  },

  // 메인(Hero) 대표 사진
  mainPhoto: "/main.jpg",

  // 갤러리 (public/ 에 둔 사진 경로)
  gallery: [
    "/img_1.jpg",
    "/img_2.jpg",
    "/img_3.jpg",
    "/img_4.jpg",
    "/img_5.jpg",
    "/img_6.jpg",
    "/img_7.jpg",
    "/img_8.jpg",
    "/img_9.jpg",
  ],

  // 마음 전하실 곳 (계좌)
  // 계좌번호는 추후 number / bank 채우면 됩니다. 비어 있으면 복사 버튼이 비활성화됩니다.
  accounts: {
    groom: {
      title: "신랑측 계좌번호",
      list: [
        { role: "신랑", name: "박상훈", bank: "", number: "", kakaopay: "" },
        { role: "아버지", name: "박흥규", bank: "", number: "", kakaopay: "" },
        { role: "어머니", name: "이혜자", bank: "", number: "", kakaopay: "" },
      ],
    },
    bride: {
      title: "신부측 계좌번호",
      list: [
        { role: "신부", name: "김민재", bank: "", number: "", kakaopay: "" },
        { role: "어머니", name: "박현아", bank: "", number: "", kakaopay: "" },
      ],
    },
  },

  // 메타데이터 / 카카오 공유용
  meta: {
    siteUrl: "https://sanghoon-minjae.vercel.app", // 배포 도메인
    ogImage: "/og-image.jpg", // public/og-image.jpg (1200x630 권장)
  },
} as const;

export type Wedding = typeof wedding;
