'use client';
import Background from "@/src/components/landingPart/BackgroundMain";
import BackgroundKV from "@/src/components/landingPart/BackgroundKV";
import {
  HeroPage,
  FeaturesPage,
  StatsPage,
  ContactPage,
  Footer,
} from "../../components/landingPart";
import { useEffect, useRef } from "react";
import ScrollToTop from "@/src/components/scroll-to-top-arrow";

function PSection({
  children,
  speed = 0.15,
  className = "",
  kvKey,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  kvKey: "hero" | "features" | "stats" | "contact";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const y = rect.top + window.scrollY;
      const viewportY = window.scrollY + window.innerHeight * 0.5;
      const delta = (viewportY - y) * speed;
      el.style.transform = `translateY(${delta.toFixed(1)}px)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return (
    <section
      ref={ref}
      data-kv={kvKey}
      className={`relative max-w-7xl mx-auto px-6 py-28 will-change-transform ${className}`}
    >
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <>

      <Background src="/images/bg.png" />

      <BackgroundKV src="/images/KV.png" />

      <PSection kvKey="hero" speed={0.2} className="md:-translate-x-12 px-4 sm:px-6 py-24 sm:py-28">
        <HeroPage />
      </PSection>

      <PSection kvKey="features" speed={0.2} className="md:translate-x-16 -mt-8">
        <FeaturesPage />
      </PSection>

      <PSection kvKey="stats" speed={0.2} className="md:-translate-x-20 -mt-6">
        <StatsPage />
      </PSection>

      <PSection kvKey="contact" speed={0.2} className="md:translate-x-12 -mt-6">
        <ContactPage />
      </PSection>
      <Footer />
      <ScrollToTop />
    </>
  );
}
