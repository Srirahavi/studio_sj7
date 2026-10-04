"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

const ARTWORKS = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
    title: "The First Light",
    year: "2024",
    medium: "Wedding · 35mm",
    h: "h-[62vh]",
  },
  {
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=85",
    title: "Silhouette No. 7",
    year: "2023",
    medium: "Editorial Portrait",
    h: "h-[52vh]",
  },
  {
    src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=85",
    title: "Aisle of Gold",
    year: "2024",
    medium: "Wedding · Ceremony",
    h: "h-[66vh]",
  },
  {
    src: "https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&w=1200&q=85",
    title: "The Maker",
    year: "2023",
    medium: "Commercial · Brand",
    h: "h-[48vh]",
  },
  {
    src: "https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?auto=format&fit=crop&w=1200&q=85",
    title: "Reverie",
    year: "2024",
    medium: "Studio Portrait",
    h: "h-[58vh]",
  },
  {
    src: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=1200&q=85",
    title: "The Last Toast",
    year: "2025",
    medium: "Wedding · Reception",
    h: "h-[56vh]",
  },
];

export default function Chapter4Gallery() {
  const root = useRef(null);
  const track = useRef(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".art-panel");
      const distance = track.current.scrollWidth - window.innerWidth;

      // The corridor: pin the section and translate the track horizontally.
      const horizontalTween = gsap.to(track.current, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance + window.innerHeight}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Subtle vertical drift on each frame as it travels the corridor,
      // driven by the horizontal tween. containerAnimation must be the
      // tween itself (the animation that repositions the container), NOT
      // tween.scrollTrigger — passing the ScrollTrigger instance throws
      // "containerAnimation.time.bind is not a function".
      panels.forEach((panel) => {
        const img = panel.querySelector(".art-img");
        gsap.fromTo(
          img,
          { yPercent: 8 },
          {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontalTween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-4"
      ref={root}
      className="relative h-screen w-full overflow-hidden bg-[#0f0f11]"
    >
      {/* Aesthetic corridor backdrop: warm vignette + central spotlight glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(201,169,106,0.07), transparent 60%), linear-gradient(180deg, #0f0f11 0%, #0a0a0b 100%)",
        }}
      />
      {/* Corridor ceiling/wall light */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent z-30" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent z-30" />

      <div className="absolute left-6 top-8 z-40 md:left-12 md:top-10">
        <p className="text-[0.7rem] uppercase tracking-ultra text-goldsoft/80">
          Chapter Four — Virtual Museum
        </p>
        <h3 className="mt-2 font-display text-2xl md:text-3xl text-pearl/90">
          The Permanent Collection
        </h3>
      </div>
      <p className="absolute right-6 bottom-8 z-40 text-[0.6rem] uppercase tracking-[0.3em] text-pearl/40 md:right-12 md:bottom-10">
        Scroll to walk the corridor →
      </p>

      {/* Horizontal track */}
      <div ref={track} className="flex h-full items-center gap-16 pl-[12vw] pr-[12vw]">
        {ARTWORKS.map((a, i) => (
          <article
            key={a.src}
            className="art-panel relative flex shrink-0 flex-col items-center"
          >
            <div
              className={`museum-frame relative ${a.h} w-[44vw] max-w-[420px] overflow-hidden md:w-[26vw]`}
              style={{
                background:
                  "linear-gradient(145deg, #1a1a1d 0%, #0a0a0b 55%, #121214 100%)",
              }}
            >
              <img
                src={a.src}
                alt={a.title}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.opacity = "0";
                }}
                className="art-img h-full w-full object-cover transition-opacity duration-700"
              />
            </div>
            {/* Museum plaque */}
            <div className="mt-6 text-center">
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-gold/70">
                Plate {String(i + 1).padStart(2, "0")}
              </p>
              <h4 className="mt-1.5 font-display text-lg text-pearl">{a.title}</h4>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-pearl/40">
                {a.medium} · {a.year}
              </p>
            </div>
          </article>
        ))}

        {/* End wall */}
        <div className="shrink-0 w-[40vw] md:w-[20vw] flex flex-col items-center justify-center text-center px-6">
          <span className="font-display text-3xl text-gold/60">—</span>
          <p className="mt-4 text-sm text-pearl/50 leading-relaxed">
            The collection continues to grow with every season we shoot.
          </p>
        </div>
      </div>
    </section>
  );
}
