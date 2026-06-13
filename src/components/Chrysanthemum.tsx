// 추모(고인) 표시용 국화 아이콘
export default function Chrysanthemum({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label="고(故)"
      className={className}
      fill="none"
    >
      {/* 꽃잎: 12방향 */}
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse
          key={i}
          cx="12"
          cy="5.2"
          rx="1.7"
          ry="3.6"
          fill="currentColor"
          opacity="0.85"
          transform={`rotate(${i * 30} 12 12)`}
        />
      ))}
      {/* 안쪽 꽃잎 */}
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse
          key={`in-${i}`}
          cx="12"
          cy="7.4"
          rx="1.2"
          ry="2.4"
          fill="currentColor"
          transform={`rotate(${i * 30 + 15} 12 12)`}
        />
      ))}
      {/* 꽃 중심 */}
      <circle cx="12" cy="12" r="2.4" fill="currentColor" />
    </svg>
  );
}
