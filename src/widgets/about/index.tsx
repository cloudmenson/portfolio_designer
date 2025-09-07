"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image, { StaticImageData } from "next/image";

import { FilledLink } from "@/shared/ui/filled-link";

gsap.registerPlugin(ScrollTrigger);

export type AboutProps = {
  content?: string;
  imageAlt?: string;
  durationVH?: number;
  imageSrc: StaticImageData;
};

export const About = ({
  imageSrc,
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

  useEffect(() => {
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

      tl.to(titleRef.current, { scale: 1, yPercent: 250, opacity: 1 }, 0.5)
        .to(titleRef.current, { scale: 0.9, yPercent: 300, opacity: 0.6 }, 0.8)
        .to(titleRef.current, { scale: 0.6, yPercent: 400, opacity: 0.3 }, 0.9)
        .to(titleRef.current, { scale: 0.3, yPercent: 500, opacity: 0 }, 1);

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

  return (
    <section
      ref={sectionRef}
      className="relative w-full mb-[10vw]"
      aria-label="More about Marta Kozerema isolate"
    >
      <div ref={stageRef} className="relative min-h-screen">
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 mb-[30vh]">
          <h2
            ref={titleRef}
            className="pointer-events-none uppercase will-change-transform text-center font-bold tracking-tight text-balance text-5xl max-w-4xl -translate-y-[18vh] md:text-6xl lg:text-7xl"
          >
            More about Marta Kozerema
          </h2>
        </div>

        <div
          ref={imgLayerRef}
          className="absolute top-[10vw] inset-0 z-0 flex items-center justify-center pointer-events-none"
        >
          <div
            ref={imgWrapRef}
            style={{ clipPath: "inset(0 round 24px)" }}
            className="relative w-[min(30vw,540px)] rounded-3xl overflow-hidden shadow-2xl bg-neutral-900/5 transform-gpu"
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
        <h3 className="text-center text-base mb-[1.5vw] tracking-wide font-bold uppercase opacity-90 max-w-4xl md:text-xl">
          I draw stories for a living—some loud, some quiet, all crafted with
          care.
        </h3>

        <div className="text-base text-[#808080] text-center leading-relaxed font-semibold opacity-80 space-y-4 mb-[1.5vw] max-w-3xl">
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
