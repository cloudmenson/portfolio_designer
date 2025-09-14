"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";
import { ContactForm } from "@/shared/ui/contact-form";
import illustation from "@/shared/assets/png/blog-girl.png";

gsap.registerPlugin(ScrollTrigger);

interface IContact {
  className?: string;
}

export const Contact = ({ className }: IContact) => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    gsap.fromTo(
      imageRef.current,
      { yPercent: 60 },
      {
        yPercent: -35,
        ease: "none",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      }
    );
  }, []);

  const mainClass = cn("relative w-full h-full mx-auto max-w-7xl px-5 sm:px-15", className);

  return (
    <section id="contact-section" className={mainClass}>
      <div className="flex flex-col 2xl:flex-row items-start gap-20">
        <div className="flex flex-col w-full 2xl:gap-2 2xl:basis-3/5">
          <h2 className="mb-8 md:mb-10 flex items-end text-3xl leading-none uppercase md:text-7xl font-extrabold tracking-tight text-white">
            Ring a bell!
          </h2>

          <ContactForm />
        </div>

        <div className="hidden 2xl:block basis-3/5">
          <Image
            alt="Error"
            ref={imageRef}
            src={illustation}
            className="pointer-events-none w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};
