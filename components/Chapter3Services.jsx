"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

const SERVICES = [
  {
    n: "01",
    name: "Weddings",
    tag: "Full-day documentary",
    img: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1600&q=80",
    desc: "From the first light of preparation to the last dance, we move like ghosts through your day — capturing it unposed, unrepeatable, and entirely yours.",
    points: ["Two photographers", "Cinematic highlight reel", "Archival fine-art album"],
  },
  {
    n: "02",
    name: "Portraits",
    tag: "Editorial & personal",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1600&q=80",
    desc: "Studio and on-location sessions shaped around you. We chase character over pretense — portraits that feel like the subject, not a costume of them.",
    points: ["Studio lighting", "Wardrobe consultation", "Retouched master files"],
  },
  {
    n: "03",
    name: "Commercial",
    tag: "Brand & product",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80",
    desc: "Campaign imagery for brands that refuse stock. We build mood, narrative, and a consistent visual language across every frame you ship.",
    points: ["Art direction", "On-set production", "Cross-format delivery"],
  },
];

export default function Chapter3Services() {
  const root = useRef(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: `+=${SERVICES.length * 90}%`,
          pin: true,
          scrub: 1,
        },
      });

      // Hide all stages up front so nothing flashes before the scrubbed
      // crossfade runs (the opacity-0 class is just a pre-hydration net;
      // gsap.set takes over once JS loads). Using to() with an explicit
      // autoAlpha:1 end guarantees the image actually reveals — from()
      // would capture the element's 0 opacity and animate 0→0 (invisible).
      gsap.set(".svc-img", { autoAlpha: 0, scale: 1.15 });
      gsap.set(".svc-text", { autoAlpha: 0, x: 60 });

      // Stage each service: crossfade image, slide text in from the right.
      SERVICES.forEach((s, i) => {
        const stage = `.svc-stage-${i}`;
        const isFirst = i === 0;

        tl.to(
          `${stage} .svc-img`,
          { autoAlpha: 1, scale: 1, ease: "none", duration: 0.5 },
          isFirst ? 0 : ">-0.1"
        )
          .to(
            `${stage} .svc-text`,
            { autoAlpha: 1, x: 0, ease: "none", duration: 0.5 },
            "<"
          )
          .to(`${stage} .svc-text`, { autoAlpha: 0, x: -40, ease: "none", duration: 0.3 })
          .to(`${stage} .svc-img`, { autoAlpha: 0, ease: "none", duration: 0.3 }, "<");
      });

      // Section heading
      tl.from(".svc-heading", { autoAlpha: 0, y: 30, ease: "none", duration: 0.4 }, 0);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-3"
      ref={root}
      className="relative h-screen w-full overflow-hidden bg-onyx"
    >
      <div className="absolute left-6 top-6 z-30 md:left-12 md:top-12">
        <p className="svc-heading text-[0.7rem] uppercase tracking-ultra text-goldsoft/80">
          Chapter Three — Services
        </p>
      </div>

      {/* Stacked stages, only one visible at a time via the timeline */}
      {SERVICES.map((s, i) => (
        <div
          key={s.name}
          className={`svc-stage-${i} absolute inset-0 flex items-center`}
        >
          <div className="svc-img absolute inset-0 opacity-0"
            style={{
              background: `url('${s.img}') center / cover no-repeat, linear-gradient(145deg, #1a1a1d, #0a0a0b 70%, #121214 100%)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/20" />

          <div className="svc-text relative z-10 w-full max-w-xl px-6 md:px-24">
            <div className="font-display text-7xl md:text-8xl text-ash/60 leading-none">
              {s.n}
            </div>
            <h3 className="mt-4 font-display text-[clamp(2.2rem,5vw,4rem)] leading-tight text-pearl">
              {s.name}
            </h3>
            <p className="mt-2 text-[0.7rem] uppercase tracking-[0.3em] text-gold">
              {s.tag}
            </p>
            <p className="mt-6 max-w-md text-pearl/60 leading-relaxed">{s.desc}</p>
            <ul className="mt-6 space-y-2">
              {s.points.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-3 text-sm text-pearl/70"
                >
                  <span className="h-1 w-6 bg-gold/70" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
}
