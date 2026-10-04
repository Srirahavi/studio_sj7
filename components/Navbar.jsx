"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LINKS = [
  { label: "Weddings", target: "#chapter-1" },
  { label: "Studio", target: "#chapter-2" },
  { label: "Services", target: "#chapter-3" },
  { label: "Gallery", target: "#chapter-4" },
  { label: "Contact", target: "#chapter-5" },
];

export default function Navbar() {
  const root = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;

    // Reveal the navbar once the hero is scrolled past.
    const show = gsap.fromTo(
      el,
      { y: -40, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        ease: "power2.out",
        duration: 0.8,
        scrollTrigger: {
          start: "top top",
          end: "+=120",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      show.scrollTrigger?.kill();
      show.kill();
    };
  }, []);

  const go = (target) => {
    setOpen(false);
    const node = document.querySelector(target);
    if (node) {
      window.scrollTo({
        top: node.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      ref={root}
      className="fixed top-0 left-0 z-50 w-full pointer-events-none"
      style={{ visibility: "hidden" }}
    >
      <div className="flex items-center justify-between px-6 py-5 md:px-12 pointer-events-auto">
        <button
          onClick={() => go("#hero")}
          className="font-display text-xl tracking-[0.25em] text-pearl"
          aria-label="STUDIO SJ7 home"
        >
          STUDIO <span className="text-gold">SJ7</span>
        </button>

        <nav className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <button
              key={l.target}
              onClick={() => go(l.target)}
              className="link-underline text-[0.7rem] uppercase tracking-[0.25em] text-pearl/80 hover:text-pearl transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-pearl/80 hover:text-pearl"
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-px bg-current mb-1.5" />
          <span className="block w-6 h-px bg-current mb-1.5" />
          <span className="block w-4 h-px bg-current ml-auto" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden pointer-events-auto bg-ink/95 backdrop-blur-sm px-6 pb-8 pt-2">
          {LINKS.map((l) => (
            <button
              key={l.target}
              onClick={() => go(l.target)}
              className="block w-full text-left py-3 text-sm uppercase tracking-[0.2em] text-pearl/80 border-b border-white/5"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
