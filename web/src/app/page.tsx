import { Suspense } from "react";
import { HomeCta } from "@/components/home/home-cta";
import { HomeDiscover } from "@/components/home/home-discover";
import { HomeFaq } from "@/components/home/home-faq";
import { HomeHero } from "@/components/home/home-hero";
import { HomePremier } from "@/components/home/home-premier";
import { HomeStats } from "@/components/home/home-stats";
import { HomeStory } from "@/components/home/home-story";
import { HomeTestimonials } from "@/components/home/home-testimonials";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeStory />
      <HomeStats />
      <HomeDiscover />
      <Suspense
        fallback={
          <div className="px-6 py-20 text-center text-[var(--color-muted)]">
            Chargement des biens…
          </div>
        }
      >
        <HomePremier />
      </Suspense>
      <HomeFaq />
      <HomeTestimonials />
      <HomeCta />
    </>
  );
}
