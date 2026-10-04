"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Registers GSAP plugins exactly once and sets sensible global defaults
 * so every chapter shares the same easing vocabulary and ScrollTrigger
 * refresh behaviour. Render this component once near the top of the tree.
 */
export default function GsapRegister({ children }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.defaults({
      ease: "power3.out",
      duration: 1,
    });

    // Keep triggers accurate after fonts/images load and on resize.
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });
    ScrollTrigger.refresh();
  }, []);

  return <>{children}</>;
}
