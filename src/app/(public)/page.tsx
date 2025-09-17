"use client";

import { useEffect, useRef } from "react";
import {
  HeroPage,
  FeaturesPage,
  StatsPage,
  ContactPage,
  Footer,
} from "../../components/landingPart";
import ScrollToTopArrow from "../../components/scroll-to-top-arrow";
import Lenis from "lenis";
import Snap from "lenis/snap";

export default function Home() {
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
