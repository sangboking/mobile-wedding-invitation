import Hero from "@/components/Hero";
import DdayCounter from "@/components/DdayCounter";
import Invitation from "@/components/Invitation";
import Calendar from "@/components/Calendar";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Account from "@/components/Account";
import Share from "@/components/Share";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <main>
      {/* Hero는 첫 화면이라 애니메이션 없이 바로 노출 */}
      <Hero />

      <Reveal>
        <DdayCounter />
      </Reveal>
      <Reveal>
        <Invitation />
      </Reveal>
      <Reveal>
        <Calendar />
      </Reveal>
      <Reveal>
        <Gallery />
      </Reveal>
      <Reveal>
        <Location />
      </Reveal>
      <Reveal>
        <Account />
      </Reveal>
      <Reveal>
        <Share />
      </Reveal>
    </main>
  );
}
