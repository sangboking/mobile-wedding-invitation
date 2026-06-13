import { wedding } from "@/config/wedding";
import Chrysanthemum from "@/components/Chrysanthemum";

// "줄바꿈(\n)" 포함 문자열을 <br />로 렌더링
function MultiLine({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <span key={i} className="block">
          {line}
        </span>
      ))}
    </>
  );
}

// 혼주 한 줄: "[아이콘칸] 아버지 · 어머니 의 {관계} {이름}"
// 맨 앞 고정폭 칸 덕분에 신랑/신부 줄의 아버지 성함 시작 위치가 정렬됩니다.
function ParentLine({
  person,
}: {
  person: typeof wedding.groom | typeof wedding.bride;
}) {
  const hasParents = person.father || person.mother;
  return (
    <p className="flex items-center text-sm text-ink">
      {/* 고정폭 국화 칸 (없으면 빈 칸으로 정렬 유지) */}
      <span className="flex w-4 shrink-0 justify-center">
        {person.fatherDeceased && (
          <Chrysanthemum className="h-3.5 w-3.5 text-ink/60" />
        )}
      </span>

      {hasParents && (
        <span className="inline-flex items-center text-ink/70">
          {person.father}
          {person.father && person.mother && <span className="mx-1">·</span>}
          {person.motherDeceased && (
            <Chrysanthemum className="mr-0.5 h-3.5 w-3.5 text-ink/60" />
          )}
          {person.mother}
          <span className="mx-1 text-point">의 {person.order}</span>
        </span>
      )}
      <span className="font-medium"> {person.name}</span>
    </p>
  );
}

export default function Invitation() {
  const { greeting, groom, bride } = wedding;

  return (
    <section className="flex flex-col items-center gap-8 px-8 py-16 text-center">
      <p className="text-xs tracking-[0.35em] text-point">INVITATION</p>

      {greeting.poem && (
        <p className="break-keep text-[15px] leading-loose text-ink/80">
          <MultiLine text={greeting.poem} />
        </p>
      )}

      <div className="h-px w-8 bg-point/40" />

      <p className="break-keep text-[15px] leading-loose text-ink/90">
        <MultiLine text={greeting.message} />
      </p>

      <div className="mx-auto mt-2 flex w-fit flex-col items-start gap-1.5">
        <ParentLine person={groom} />
        <ParentLine person={bride} />
      </div>
    </section>
  );
}
