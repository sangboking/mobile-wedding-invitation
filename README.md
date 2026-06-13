# 모바일 청첩장

Next.js (App Router) + TypeScript + Tailwind CSS 기반 모바일 청첩장 프로젝트.

## 스택

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 3.4**
- 배포: **Vercel**

## 로컬 실행

```bash
npm install      # 최초 1회 (의존성 설치)
npm run dev      # 개발 서버 → http://localhost:3000
```

빌드 확인:

```bash
npm run build
npm run start    # 프로덕션 모드 미리보기
```

## 폴더 구조

```
src/
  app/
    layout.tsx     # 공통 레이아웃 · 폰트 · 메타데이터(OG 태그)
    page.tsx       # 메인 페이지 (여기에 섹션 추가)
    globals.css    # 전역 스타일 · 청첩장 고정폭 카드
  components/       # 섹션별 컴포넌트 (Hero, Gallery, Map ...)
public/            # 이미지, og-image.jpg 등 정적 파일
tailwind.config.ts # 색상 토큰(cream/ink/point), 고정폭(max-w-invite)
next.config.mjs    # Next 설정
```

## 디자인 메모

- 모바일 청첩장은 보통 **고정폭(~430px) 세로 스크롤 단일 페이지**입니다.
  - `globals.css`의 `.invite-shell`이 카드 컨테이너 역할을 합니다.
  - Tailwind에서는 `max-w-invite` 유틸리티로도 사용 가능.
- 색상 토큰: `bg-cream`, `text-ink`, `text-point` (tailwind.config.ts에서 변경).
- 폰트: Noto Serif KR (next/font로 자동 최적화).

## 카카오톡 공유 미리보기 (중요)

- `src/app/layout.tsx`의 `metadata.openGraph`에 OG 태그가 설정돼 있습니다.
- **할 일:**
  1. `public/og-image.jpg` (1200×630 권장) 추가
  2. `layout.tsx`의 `SITE_URL`을 실제 배포 도메인으로 변경
  3. 카카오 공유 버튼은 Kakao SDK 연동 필요 (다음 단계에서 추가)

## 오시는 길 (지도 · 길찾기)

- **길찾기 버튼(티맵·카카오내비·네이버지도)**: 별도 키 없이 URL 스킴/링크로 작동합니다.
- **정밀 길안내**: `config/wedding.ts`의 `venue.lat`, `venue.lng`에 예식장 좌표를 넣으면
  장소명 검색 대신 정확한 경로 안내로 동작합니다.
  (네이버지도에서 장소 → 공유 → URL의 좌표 확인, 또는 우클릭 "이 위치의 좌표 확인")
- **지도 표시**:
  - 키 없이: `public/map.png`에 지도 캡처 이미지를 넣으면 그 이미지가 표시됩니다.
  - 실제 네이버 지도: NCP에서 Maps Client ID 발급 → `.env.local`에
    `NEXT_PUBLIC_NCP_KEY_ID=발급키` 추가 + `venue.lat/lng` 입력 시 인터랙티브 지도로 전환.
    - 발급: [NCP 콘솔](https://console.ncloud.com) → AI·NAVER API → Maps → Application 등록
    - **배포 도메인을 Application의 Web 서비스 URL에 등록**해야 지도가 뜹니다.

## 방명록 (Supabase)

1. [supabase.com](https://supabase.com) 에서 프로젝트 생성 (무료)
2. 대시보드 → **SQL Editor** → `supabase/guestbook.sql` 내용 붙여넣고 **RUN**
   - 테이블 + 공개 뷰 + 작성/삭제 RPC가 생성됩니다. 비밀번호는 bcrypt 해시로 저장됩니다.
3. 대시보드 → **Settings → API** 에서 값 복사 → `.env.local` 에 추가:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```
4. **Vercel 배포 시** 같은 두 변수를 Vercel → Settings → Environment Variables 에도 추가
5. env가 없으면 방명록은 "설정 필요" 안내로 표시됩니다(나머지 페이지는 정상).

> 보안: 클라이언트는 `guestbook_public` 뷰(=password 제외)만 조회하고,
> 작성/삭제는 RPC 함수로만 가능합니다. anon 키로도 password 컬럼은 읽을 수 없습니다.

## Vercel 배포

1. 이 폴더를 GitHub 저장소로 push
2. [vercel.com](https://vercel.com) 로그인 → **New Project** → 저장소 선택
3. 프레임워크 자동 감지(Next.js), 기본 설정 그대로 **Deploy**
4. 배포 후 발급된 도메인을 `layout.tsx`의 `SITE_URL`에 반영하고 재배포

> **참고:** Vercel Hobby(무료) 플랜은 **비상업적 용도**만 허용됩니다. 본인 청첩장은 괜찮지만, 의뢰받아 제작·판매하는 경우 약관 확인 필요.

> **정적 호스팅으로 옮길 경우** `next.config.mjs`의 `output: 'export'` / `images.unoptimized` 주석을 해제하세요. 단, 서버 API(RSVP 저장 등)는 사용할 수 없게 됩니다.

## 다음 단계 (예정)

- [ ] 메인(Hero) 섹션 · D-day 카운터
- [ ] 갤러리
- [ ] 오시는 길 (카카오맵 임베드)
- [ ] 마음 전하실 곳 (계좌 복사)
- [ ] 카카오톡 공유 버튼 (Kakao SDK)
- [ ] RSVP / 방명록 (Supabase 등)
- [ ] BGM
