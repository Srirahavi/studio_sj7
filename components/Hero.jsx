"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

/**
 * Chapter 0 — The Overture.
 * A dark, full-bleed landing with a cinematic title reveal and a
 * "Capture the Moment" button that performs a zoom transition into
 * Chapter 1. As the user scrolls, the hero parallaxes and dissolves
 * into the wedding chapter for a continuous cinematic feel.
 */
export default function Hero() {
  const root = useRef(null);
  const bg = useRef(null);
  const title = useRef(null);
  const eyebrow = useRef(null);
  const cta = useRef(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Title reveal: clip up from a mask + rise
      tl.from(title.current.querySelectorAll(".line"), {
        yPercent: 110,
        duration: 1.4,
        ease: "power4.out",
        stagger: 0.18,
      })
        .from(
          eyebrow.current,
          { y: 20, autoAlpha: 0, duration: 1 },
          "-=1.1"
        )
        .from(
          cta.current,
          { y: 24, autoAlpha: 0, duration: 1 },
          "-=0.8"
        )
        .from(
          ".hero-meta",
          { autoAlpha: 0, y: 12, stagger: 0.15, duration: 0.8 },
          "-=0.6"
        );

      // Parallax + dissolve on scroll into Chapter 1
      gsap.to(bg.current, {
        yPercent: 22,
        scale: 1.18,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to([eyebrow.current, title.current, cta.current], {
        yPercent: -40,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "60% top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  // The "Capture the Moment" zoom transition into Chapter 1.
  const enterExperience = () => {
    const chapter1 = document.querySelector("#chapter-1");
    if (!chapter1) return;

    // Zoom the hero in and fade it out, then glide to Chapter 1 so the
    // two motions overlap into one continuous cinematic move.
    gsap.to(root.current, {
      scale: 1.6,
      autoAlpha: 0,
      duration: 1.2,
      ease: "power3.inOut",
    });

    gsap.delayedCall(0.4, () => {
      window.scrollTo({ top: chapter1.offsetTop, behavior: "smooth" });
    });
  };

  return (
    <section
      id="hero"
      ref={root}
      className="relative h-screen w-full overflow-hidden bg-ink"
    >
      {/* Background */}
      <div
        ref={bg}
        className="absolute inset-0 scale-110"
        style={{
          background:
            "url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2400&q=80') center / cover no-repeat, linear-gradient(160deg, #1a1a1d 0%, #0a0a0b 60%, #121214 100%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink" />
      <div className="vignette" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p
          ref={eyebrow}
          className="hero-meta mb-8 text-[0.7rem] uppercase tracking-ultra text-goldsoft/80"
        >
          Cinematic Photography · Est. 2014
        </p>

        <h1
          ref={title}
          className="font-display text-[clamp(3rem,13vw,11rem)] leading-[0.92] text-pearl"
        >
          <span className="block overflow-hidden">
            <span className="line block">STUDIO</span>
          </span>
          <span className="block overflow-hidden">
            <span className="line block italic font-normal text-gold-gradient">
              SJ7
            </span>
          </span>
        </h1>

        <p className="hero-meta mt-8 max-w-md text-sm md:text-base text-pearl/55 leading-relaxed text-balance">
          We don&apos;t take photographs. We preserve the light of moments
          that refuse to be forgotten.
        </p>

        <button
          ref={cta}
          onClick={enterExperience}
          className="group relative mt-12 overflow-hidden rounded-full border border-gold/60 px-9 py-4 text-[0.7rem] uppercase tracking-[0.3em] text-pearl transition-colors duration-500 hover:text-ink"
        >
          <span className="relative z-10">Capture the Moment</span>
          <span className="absolute inset-0 -z-0 translate-y-full bg-gold transition-transform duration-500 ease-cinematic group-hover:translate-y-0" />
        </button>
      </div>

      {/* Scroll cue */}
      <div className="hero-meta absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-pearl/40">
        <span className="text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-12 w-px bg-gradient-to-b from-gold/70 to-transparent" />
      </div>
    </section>
  );
}
