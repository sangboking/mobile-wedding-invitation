import type { Metadata, Viewport } from "next";
import { Noto_Serif_KR } from "next/font/google";
import { wedding } from "@/config/wedding";
import "./globals.css";

const notoSerif = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-serif",
  display: "swap",
});

const { groom, bride, meta } = wedding;
const title = `${groom.name} ♥ ${bride.name} 결혼합니다`;
const description = "저희 두 사람의 결혼식에 초대합니다.";

export const metadata: Metadata = {
  metadataBase: new URL(meta.siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: meta.ogImage,
        width: 1200,
        height: 630,
        alt: "청첩장 대표 이미지",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // 청첩장은 보통 확대 막아 레이아웃 고정
  themeColor: "#FBF8F3",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={`${notoSerif.variable} font-serif`}>
        <div className="invite-shell">{children}</div>
      </body>
    </html>
  );
}
