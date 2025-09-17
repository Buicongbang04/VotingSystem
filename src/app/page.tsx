"use client";

import { useEffect, useRef } from "react";
import {
  HeroPage,
  FeaturesPage,
  StatsPage,
  ContactPage,
  Footer,
} from "../components/landingPart";
import ScrollToTopArrow from "../components/scroll-to-top-arrow";
import Lenis from "lenis";
import Snap from "lenis/snap";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="snap-container">
      <HeroPage />
      <FeaturesPage />
      <StatsPage />
      <ContactPage />
      <Footer />
    </div>
  );
}
