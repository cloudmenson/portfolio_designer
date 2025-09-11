"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SocialRow } from "@/shared/ui/social-row";
import { FilledLink } from "@/shared/ui/filled-link";
import illustation from "@/shared/assets/png/blog-girl.png";

gsap.registerPlugin(ScrollTrigger);

export const Cooperation = ({}) => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    gsap.fromTo(
      imageRef.current,
      { y: 100 },
      {
        y: -300,
        ease: "none",
        scrollTrigger: {
          scrub: true,
          end: "bottom top",
          start: "top bottom",
          trigger: imageRef.current,
        },
      }
    );
  }, []);

  return (
    <section aria-label="Cooperation" className="relative w-full isolate mb-[5vw] px-15">
      <div className="relative w-full h-full flex flex-col items-center justify-center text-white">
        <h2 className="pointer-events-none uppercase text-center font-bold tracking-tight text-balance text-5xl lg:mb-[3vw] max-w-3xl md:text-6xl lg:text-7xl">
          {`Let's work together`}
        </h2>

        <FilledLink className="lg:mb-[3vw]" href="#" type="large">
          Contact now
        </FilledLink>

        <Image
          alt="Error"
          ref={imageRef}
          src={illustation}
          className="pointer-events-none"
        />

        <p className="text-2xl font-semibold uppercase max-w-5xl text-center lg:mb-[0.5vw]">
          I help brands and creators tell their stories through thoughtful,
          expressive illustrations. My style blends bold palettes, rich
          textures, and clear concepts.
        </p>

        <SocialRow />
      </div>
    </section>
  );
};
