import { Hero } from "@/components/hero/Hero";
import { Marquee } from "@/components/marquee/Marquee";
import { FeaturedCarousel } from "@/components/work/FeaturedCarousel";
import { CraftStrip } from "@/components/work/CraftStrip";
import { WorkGrid } from "@/components/work/WorkGrid";
import { PickACard } from "@/components/about/PickACard";
import { Timeline } from "@/components/about/Timeline";
import { AIWorkshopTeaser } from "@/components/contact/AIWorkshopTeaser";
import { Footer } from "@/components/layout/Footer";
import { FEATURED, SUPPORTING } from "@/lib/work";

const MARQUEE_ITEMS = [
  "BlueStacks",
  "now.gg",
  "6labs.ai",
  "Amway India",
  "Design Systems Officer",
  "AI / ML",
  "Design Systems",
  "B2B Platforms",
  "Cross-platform",
  "AR / VR",
];

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={MARQUEE_ITEMS} />
      <section id="work">
        <FeaturedCarousel items={FEATURED} />
      </section>
      <CraftStrip />
      <WorkGrid items={SUPPORTING} />
      <PickACard />
      <Timeline />
      <AIWorkshopTeaser />
      <Footer />
    </>
  );
}
