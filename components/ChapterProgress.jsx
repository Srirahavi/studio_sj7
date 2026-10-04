"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CHAPTERS = [
  { id: "#hero", label: "Overture" },
  { id: "#chapter-1", label: "I · Weddings" },
  { id: "#chapter-2", label: "II · Studio" },
  { id: "#chapter-3", label: "III · Services" },
  { id: "#chapter-4", label: "IV · Museum" },
  { id: "#chapter-5", label: "V · Contact" },
];

export default function ChapterProgress() {
  const root = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggers = CHAPTERS.map((c, i) =>
      ScrollTrigger.create({
        trigger: c.id,
        start: "top 55%",
        end: "bottom 45%",
        onToggle: (self) => self.isActive && setActive(i),
        onEnter: () => setActive(i),
      })
    );

    return () => triggers.forEach((t) => t.kill());
  }, []);

  const go = (i) => {
    const node = document.querySelector(CHAPTERS[i].id);
    if (node) window.scrollTo({ top: node.offsetTop, behavior: "smooth" });
  };

  return (
    <div
      ref={root}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-4"
      aria-label="Chapter navigation"
    >
      {CHAPTERS.map((c, i) => (
        <button
          key={c.id}
          onClick={() => go(i)}
          className="group flex items-center gap-3"
          aria-label={`Go to ${c.label}`}
        >
          <span
            className={`text-[0.6rem] uppercase tracking-[0.2em] transition-all duration-500 ${
              active === i
                ? "text-gold opacity-100 translate-x-0"
                : "text-pearl/40 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
            }`}
          >
            {c.label}
          </span>
          <span
            className={`block h-px transition-all duration-500 ease-cinematic ${
              active === i ? "w-10 bg-gold" : "w-5 bg-pearl/30 group-hover:bg-pearl/60"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
