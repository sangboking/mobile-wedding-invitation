import Hero from "@/components/Hero";
import DdayCounter from "@/components/DdayCounter";
import Invitation from "@/components/Invitation";
import Gallery from "@/components/Gallery";
import Calendar from "@/components/Calendar";
import Location from "@/components/Location";
import Account from "@/components/Account";
import Share from "@/components/Share";

export default function Home() {
  return (
    <main>
      <Hero />
      <DdayCounter />
      <Invitation />
      <Calendar />
      <Gallery />
      <Location />
      <Account />
      <Share />
    </main>
  );
}
