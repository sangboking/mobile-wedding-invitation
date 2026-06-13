import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // 모바일 청첩장은 고정폭(보통 ~430px) 디자인이 많아 별도 컨테이너 폭을 둡니다.
      maxWidth: {
        invite: "430px",
      },
      colors: {
        // 청첩장 톤. 자유롭게 바꿔 쓰세요.
        cream: "#FBF8F3",
        ink: "#3A3A3A",
        point: "#B79E84",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
