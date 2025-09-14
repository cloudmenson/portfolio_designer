"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image, { StaticImageData } from "next/image";

import { FilledLink } from "@/shared/ui/filled-link";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/shared/hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

export type AboutProps = {
  content?: string;
  imageAlt?: string;
  className?: string;
  durationVH?: number;
  imageSrc: StaticImageData;
};

export const About = ({
  imageSrc,
  className,
  durationVH = 1,
  imageAlt = "Marta Kozerema",
}: AboutProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const imgWrapRef = useRef<HTMLDivElement | null>(null);
  const imgLayerRef = useRef<HTMLDivElement | null>(null);
  const imgMoveRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const isMobile = useIsMobile(1024);

  useEffect(() => {
    if (isMobile) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(imgLayerRef.current, { zIndex: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current!,
          start: "top top",
          end: `+=${Math.round(durationVH * 100)}%`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
        defaults: { ease: "none" },
      });

      tl.to(titleRef.current, { scale: 1, yPercent: 50, opacity: 1 }, 0.5);
      tl.to(titleRef.current, { scale: 0.6, yPercent: 350, opacity: 1 }, 1);

      tl.to(
        imgMoveRef.current,
        {
          scale: 1.04,
        },
        0.5
      ).to(
        imgMoveRef.current,
        {
          scale: 1,
        },
        1
      );

      tl.set(imgLayerRef.current, { zIndex: 50 }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, [durationVH]);

  const mainClass = cn("relative w-full px-5 sm:px-15", className);

  return (
    <section
      ref={sectionRef}
      className={mainClass}
      aria-label="More about Marta Kozerema isolate"
    >
      <div
        ref={stageRef}
        className="relative h-full mb-10 lg:mb-0 lg:min-h-screen"
      >
        <div
          className={cn(
            "flex items-center justify-center",
            !isMobile &&
              "absolute inset-0 z-10 -translate-y-50 sm:-translate-y-100 lg:-translate-y-80"
          )}
        >
          <h2
            ref={titleRef}
            className="pointer-events-none uppercase will-change-transform text-center font-bold tracking-tight text-balance max-w-4xl text-3xl mb-10 sm:text-5xl sm:mb-20 md:text-7xl"
          >
            More about Marta Kozerema
          </h2>
        </div>

        <div
          ref={imgLayerRef}
          className={cn(
            "flex items-center justify-center pointer-events-none",
            !isMobile && "absolute inset-0 z-0"
          )}
        >
          <div
            ref={imgWrapRef}
            style={{ clipPath: "inset(0 round 24px)" }}
            className="relative w-[540px] rounded-3xl overflow-hidden shadow-2xl bg-neutral-900/5 transform-gpu"
          >
            <div
              ref={imgMoveRef}
              className="relative h-full w-full will-change-transform"
            >
              <Image
                ref={imgRef}
                src={imageSrc}
                alt={imageAlt}
                loading="lazy"
                decoding="async"
                className="block h-full w-full object-fit"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col justify-center items-center">
        <h3 className="text-center text-base mb-5 tracking-wide font-bold uppercase opacity-90 max-w-4xl md:text-xl">
          I draw stories for a living—some loud, some quiet, all crafted with
          care.
        </h3>

        <div className="text-base text-[#808080] text-center leading-relaxed font-semibold opacity-80 space-y-4 mb-5 max-w-3xl">
          <p>
            Я — Марта Козерема, дизайнер, що поєднує естетику і
            функціональність. Нижче — мій підхід до роботи, улюблені інструменти
            та принципи, які допомагають створювати зрозумілий і живий досвід
            користувачів.
          </p>

          <p>
            Тут може бути довільний текст: коротка історія, перелік сервісів,
            посилання на проєкти або навіть FAQ. Блок статичний і не залежить
            від скрол-анімації.
          </p>
        </div>

        <FilledLink href="#" type="large">
          Download resume
        </FilledLink>
      </div>
    </section>
  );
};
