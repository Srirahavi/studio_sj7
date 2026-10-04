"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

/**
 * A small reusable component that splits its children into lines/words
 * and reveals them with a clip-path + y translate as it scrolls into view.
 * Used by the narrative chapters for consistent, tasteful text reveals.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  y = 24,
  stagger = 0.08,
  start = "top 85%",
  once = true,
}) {
  const ref = useRef(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    const targets = el.hasChildNodes()
      ? gsap.utils.toArray(el.children).length
        ? gsap.utils.toArray(el.children)
        : [el]
      : [el];

    gsap.set(targets, { y, autoAlpha: 0 });

    const tween = gsap.to(targets, {
      y: 0,
      autoAlpha: 1,
      stagger,
      ease: "power3.out",
      duration: 1.1,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: once
          ? "play none none none"
          : "play reverse play reverse",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [y, stagger, start, once]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
