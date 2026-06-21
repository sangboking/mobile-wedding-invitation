import { wedding } from "@/config/wedding";

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// wedding.date 기준으로 해당 월의 달력 격자를 만든다 (일요일 시작)
function buildMonth(year: number, month0: number): (number | null)[][] {
  const firstDay = new Date(year, month0, 1).getDay(); // 0=일
  const daysInMonth = new Date(year, month0 + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export default function Calendar() {
  const d = new Date(wedding.date);
  const year = d.getFullYear();
  const month0 = d.getMonth();
  const weddingDay = d.getDate();
  const monthName = d.toLocaleString("en-US", { month: "long" }).toUpperCase();
  const weeks = buildMonth(year, month0);

  return (
    <section className="flex flex-col items-center gap-6 px-8 py-16">
      <p className="text-xs tracking-[0.35em] text-point">CALENDAR</p>

      <h2 className="text-lg tracking-[0.2em] text-ink">{monthName}</h2>

      <div className="w-full max-w-[320px]">
        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 border-b border-point/20 pb-2">
          {WEEKDAYS.map((w, i) => (
            <div
              key={w}
              className={`text-center text-[11px] tracking-wider ${
                i === 0 ? "text-rose-400" : "text-ink/50"
              }`}
            >
              {w}
            </div>
          ))}
        </div>

        {/* 날짜 격자 */}
        <div className="mt-2 flex flex-col gap-1.5">
          {weeks.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7">
              {week.map((day, di) => {
                const isWedding = day === weddingDay;
                const isSunday = di === 0;
                return (
                  <div
                    key={di}
                    className="flex h-9 items-center justify-center text-sm"
                  >
                    {day &&
                      (isWedding ? (
                        <span className="relative flex h-8 w-8 items-center justify-center">
                          {/* 하트 배경 */}
                          <svg
                            viewBox="0 0 24 24"
                            className="absolute inset-0 h-full w-full -translate-y-[1.5px] scale-[1.45] text-point"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M12 21s-7.4-4.7-7.4-10.2C4.6 7.7 6.7 6 9.1 6c1.6 0 2.5 1 2.9 1.8C12.4 7 13.3 6 14.9 6c2.4 0 4.5 1.7 4.5 4.8C19.4 16.3 12 21 12 21z" />
                          </svg>
                          <span className="relative font-medium text-white">
                            {day}
                          </span>
                        </span>
                      ) : (
                        <span className={isSunday ? "text-rose-400" : "text-ink/80"}>
                          {day}
                        </span>
                      ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-sm leading-relaxed text-ink/80">
        <span className="font-medium text-point">{wedding.dateText}</span>
        <br />
        {wedding.timeText}
      </p>
    </section>
  );
}
