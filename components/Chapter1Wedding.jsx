"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

const SHOTS = [
  {
    src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1400&q=80",
    caption: "The First Look",
    depth: 1.4,
    cls: "top-[12%] left-[6%] w-[42vw] md:w-[26vw] h-[42vh] md:h-[58vh]",
  },
  {
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=80",
    caption: "Vows · Golden Hour",
    depth: 0.7,
    cls: "top-[40%] right-[8%] w-[38vw] md:w-[24vw] h-[40vh] md:h-[52vh]",
  },
  {
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1400&q=80",
    caption: "Reception Light",
    depth: 1.9,
    cls: "bottom-[8%] left-[26%] w-[44vw] md:w-[30vw] h-[36vh] md:h-[48vh]",
  },
];

export default function Chapter1Wedding() {
  const root = useRef(null);
  const stage = useRef(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Pin the stage and move the floating photographs at varying depths
      // to simulate the parallax of a live capture reel.
      const parallax = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1.2,
        },
      });

      parallax
        .to(".wed-shot", {
          yPercent: (i, el) => -40 * (parseFloat(el.dataset.depth) || 1),
          ease: "none",
          stagger: 0.04,
        })
        .to(
          ".wed-shot",
          { scale: 1.08, ease: "none" },
          0
        )
        .from(
          ".wed-headline span",
          { yPercent: 120, stagger: 0.12, ease: "none" },
          0
        )
        .to(
          ".wed-caption",
          { autoAlpha: 1, y: 0, stagger: 0.2, ease: "none" },
          0.3
        )
        .to(".wed-intro", { autoAlpha: 0, y: -30, ease: "none", duration: 0.25 }, 0);

      // Aperture/REC pulse
      gsap.to(".rec-dot", {
        opacity: 0.2,
        repeat: -1,
        yoyo: true,
        duration: 1.1,
        ease: "power1.inOut",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-1"
      ref={root}
      className="relative h-screen w-full overflow-hidden bg-ink"
    >
      <div ref={stage} className="relative h-full w-full">
        {/* Aesthetic backdrop: moody gold wash so the reel never reads as empty */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 42%, rgba(201,169,106,0.08), transparent 62%), linear-gradient(160deg, #121214 0%, #0a0a0b 70%)",
          }}
        />
        {/* REC overlay to sell the "live capture" feel */}
        <div className="absolute left-6 top-6 z-30 flex items-center gap-2 text-pearl/70 md:left-12 md:top-12">
          <span className="rec-dot h-2.5 w-2.5 rounded-full bg-red-500" />
          <span className="text-[0.6rem] uppercase tracking-[0.3em]">Rec · Ch.01</span>
        </div>
        <div className="absolute right-6 top-6 z-30 text-[0.6rem] uppercase tracking-[0.3em] text-pearl/50 md:right-12 md:top-12">
          Live Capture
        </div>

        {/* Intro line that fades as the reel plays */}
        <p className="wed-intro absolute left-1/2 top-[14%] z-20 -translate-x-1/2 text-center text-[0.65rem] uppercase tracking-ultra text-goldsoft/70">
          Chapter One — The Wedding Reel
        </p>

        {/* Floating photographs */}
        {SHOTS.map((s, i) => (
          <figure
            key={s.src}
            data-depth={s.depth}
            className={`wed-shot absolute ${s.cls} z-10`}
          >
            <div
              className="group relative h-full w-full overflow-hidden"
              style={{ background: "linear-gradient(145deg, #1a1a1d, #0a0a0b)" }}
            >
              <img
                src={s.src}
                alt={s.caption}
                onError={(e) => {
                  e.currentTarget.style.opacity = "0";
                }}
                className="h-full w-full object-cover grayscale-[0.15] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
              <figcaption className="wed-caption absolute bottom-0 left-0 right-0 translate-y-3 p-4 text-[0.7rem] uppercase tracking-[0.25em] text-pearl/90 opacity-0">
                {s.caption}
              </figcaption>
            </div>
          </figure>
        ))}

        {/* Headline */}
        <div className="absolute bottom-[6%] left-1/2 z-20 w-full -translate-x-1/2 px-6 text-center">
          <h2 className="wed-headline font-display text-[clamp(1.8rem,5vw,4.5rem)] leading-[1.05] text-pearl">
            <span className="block overflow-hidden">
              <span className="block">Every glance, a frame.</span>
            </span>
            <span className="block overflow-hidden">
              <span className="block italic text-gold-gradient">
                Every promise, preserved.
              </span>
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
}
