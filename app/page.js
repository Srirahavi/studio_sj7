"use client";

import GsapRegister from "@/components/gsap/Register";
import Navbar from "@/components/Navbar";
import ChapterProgress from "@/components/ChapterProgress";
import Hero from "@/components/Hero";
import Chapter1Wedding from "@/components/Chapter1Wedding";
import Chapter2About from "@/components/Chapter2About";
import Chapter3Services from "@/components/Chapter3Services";
import Chapter4Gallery from "@/components/Chapter4Gallery";
import Chapter5Contact from "@/components/Chapter5Contact";

export default function Home() {
  return (
    <GsapRegister>
      <Navbar />
      <ChapterProgress />

      <main className="relative w-full">
        <Hero />
        <Chapter1Wedding />
        <Chapter2About />
        <Chapter3Services />
        <Chapter4Gallery />
        <Chapter5Contact />
      </main>
    </GsapRegister>
  );
}
