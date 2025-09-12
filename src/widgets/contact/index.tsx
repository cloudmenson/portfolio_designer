"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import illustation from "@/shared/assets/png/blog-girl.png";
import { ContactForm } from "@/shared/ui/contact-form";

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    gsap.fromTo(
      imageRef.current,
      { yPercent: 30 },
      {
        yPercent: -50,
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

  return (
    <section id="contact-section" className="relative w-full h-full lg:pb-40">
      <div className="flex flex-row items-start">
        <div className="flex flex-col gap-2 basis-3/5">
          <h2 className="mb-8 md:mb-10 flex items-end text-3xl leading-none uppercase md:text-6xl font-extrabold tracking-tight text-white">
            Ring a bell!
          </h2>

          <ContactForm />
        </div>

        <div className="basis-3/5">
          <Image
            alt="Error"
            ref={imageRef}
            src={illustation}
            className="pointer-events-none w-auto h-auto"
          />
        </div>
      </div>
    </section>
  );
};
