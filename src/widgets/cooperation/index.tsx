"use client";

import Image from "next/image";

import { FilledLink } from "@/shared/ui/filled-link";
import illustation from "@/shared/assets/png/blog-girl.png";

export const Cooperation = ({}) => {
  return (
    <section aria-label="Cooperation" className="relative w-full isolate">
      <div className="relative w-full h-full flex flex-col gap-[3vw] items-center justify-center text-white">
        <h2 className="pointer-events-none uppercase text-center font-bold tracking-tight text-balance text-5xl max-w-3xl md:text-6xl lg:text-7xl">
          {`Let's work together`}
        </h2>

        <FilledLink href="#" type="large">
          Contact now
        </FilledLink>

        <Image src={illustation} alt="Error" className="pointer-events-none" />

        <p className="text-2xl font-semibold uppercase max-w-5xl text-center">
          I help brands and creators tell their stories through thoughtful,
          expressive illustrations. My style blends bold palettes, rich
          textures, and clear concepts.
        </p>
      </div>
    </section>
  );
};
