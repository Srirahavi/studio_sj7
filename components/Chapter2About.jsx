"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

const STATS = [
  { value: "11", label: "Years Behind the Lens" },
  { value: "540+", label: "Weddings Documented" },
  { value: "23", label: "International Awards" },
];

export default function Chapter2About() {
  const root = useRef(null);
  const scene = useRef(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Seamless "zoom inside" — the scene scales up and the vignette
      // closes in while the narrative text rises through it.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: 1.2,
        },
      });

      tl.to(".about-scene-img", { scale: 2.4, ease: "none", duration: 1 })
        .to(".about-veil", { autoAlpha: 0.9, ease: "none" }, 0)
        .from(".about-eyebrow", { autoAlpha: 0, y: 30, ease: "none" }, 0.25)
        .from(
          ".about-line span",
          { yPercent: 120, stagger: 0.1, ease: "none" },
          0.35
        )
        .from(".about-body", { autoAlpha: 0, y: 40, ease: "none" }, 0.6)
        .from(
          ".about-stat",
          { autoAlpha: 0, y: 30, stagger: 0.12, ease: "none" },
          0.8
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-2"
      ref={root}
      className="relative h-screen w-full overflow-hidden bg-ink"
    >
      {/* The scene we zoom "inside" of */}
      <div ref={scene} className="absolute inset-0">
        <div
          className="about-scene-img absolute inset-0"
          style={{
            background:
              "url('https://images.unsplash.com/photo-1601933973783-43cf8a7d4c5f?auto=format&fit=crop&w=2400&q=80') center / cover no-repeat, linear-gradient(160deg, #1a1a1d 0%, #0a0a0b 70%, #121214 100%)",
            transform: "scale(1.05)",
          }}
        />
        <div className="about-veil absolute inset-0 bg-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink" />
      </div>

      {/* Narrative */}
      <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-24 max-w-6xl">
        <p className="about-eyebrow mb-6 text-[0.7rem] uppercase tracking-ultra text-goldsoft/80">
          Chapter Two — Our Studio
        </p>

        <h2 className="about-line font-display text-[clamp(2rem,6.5vw,6rem)] leading-[1.02] text-pearl">
          <span className="block overflow-hidden">
            <span className="block">We build a darkroom</span>
          </span>
          <span className="block overflow-hidden">
            <span className="block italic text-gold-gradient">for your light.</span>
          </span>
        </h2>

        <div className="about-body mt-10 max-w-xl">
          <p className="text-base md:text-lg leading-relaxed text-pearl/65">
            STUDIO SJ7 began in a single room with one camera and an obsession
            with honest light. A decade later we are a collective of
            cinematographers and stills artists who treat every wedding,
            portrait, and campaign as a body of work destined for a wall —
            not just an album.
          </p>
          <p className="mt-5 text-base md:text-lg leading-relaxed text-pearl/55">
            We photograph slowly, deliberately, and only the moments that
            matter. The result is an archive that ages like memory itself.
          </p>
        </div>

        <div className="about-body mt-14 flex flex-wrap gap-12">
          {STATS.map((s) => (
            <div key={s.label} className="about-stat">
              <div className="font-display text-4xl md:text-5xl text-gold">
                {s.value}
              </div>
              <div className="mt-2 text-[0.65rem] uppercase tracking-[0.25em] text-pearl/45">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
