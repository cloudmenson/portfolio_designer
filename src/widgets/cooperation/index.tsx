"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";
import { FilledLink } from "@/shared/ui/filled-link";
import { SocialLinks } from "@/shared/ui/social-links";
import { socialLinks } from "@/shared/data/social-links";
import illustation from "@/shared/assets/png/blog-girl.png";
import { useIsMobile } from "@/shared/hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

interface ICooperation {
  className?: string;
}

export const Cooperation = ({ className }: ICooperation) => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  const isMobile = useIsMobile(1024);

  useEffect(() => {
    if (isMobile) {
      return;
    }

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
    <section
      aria-label="Cooperation"
      className={cn("relative w-full isolate px-5 sm:px-15", className)}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center text-white">
        <h2 className="pointer-events-none uppercase text-center font-bold tracking-tight max-w-3xl text-balance text-3xl md:text-6xl mb-5 sm:mb-8 md:text-7xl">
          {`Let's work together`}
        </h2>

        <FilledLink className="mb-5" href="#" type="large">
          Contact now
        </FilledLink>

        <Image
          alt="Error"
          ref={imageRef}
          src={illustation}
          className="pointer-events-none mb-5"
        />

        <p className="text-base font-semibold uppercase max-w-5xl text-center text-pretty mb-6 sm:text-2xl">
          I help brands and creators tell their stories through thoughtful,
          expressive illustrations. My style blends bold palettes, rich
          textures, and clear concepts.
        </p>

        <SocialLinks socialLinks={socialLinks} />
      </div>
    </section>
  );
};
