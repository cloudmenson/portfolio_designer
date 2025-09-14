"use client";

import { useRef, useMemo, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";
import { Card } from "@/shared/ui/cards/card";
import { IProjects } from "@/shared/data/projects";

export const PortfolioGrid = ({
  title,
  items,
  className,
}: {
  title: string;
  className?: string;
  items: IProjects[];
}) => {
  const root = useRef<HTMLDivElement | null>(null);

  const grouped = useMemo(() => items, [items]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLDivElement>("[data-card]");

      gsap.set(cards, {
        y: 40,
        opacity: 0,
        rotateX: -6,
        transformOrigin: "50% 100%",
      });

      ScrollTrigger.batch(cards, {
        start: "top 85%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch as gsap.DOMTarget[], {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
          }),
      });

      cards.forEach((card) => {
        const media = card.querySelector("[data-media]") as HTMLElement | null;
        const content = card.querySelector(
          "[data-content]"
        ) as HTMLElement | null;
        if (!media || !content) return;

        const qx = gsap.quickTo(media, "x", { duration: 0.4, ease: "power3" });
        const qy = gsap.quickTo(media, "y", { duration: 0.4, ease: "power3" });

        const tiltX = gsap.quickTo(card, "rotateX", {
          duration: 0.5,
          ease: "power2",
        });

        const tiltY = gsap.quickTo(card, "rotateY", {
          duration: 0.5,
          ease: "power2",
        });

        const onMove = (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const x = e.clientX - r.left;
          const y = e.clientY - r.top;
          const cx = (x / r.width - 0.5) * 2;
          const cy = (y / r.height - 0.5) * 2;
          qx(cx * r.width * 0.06);
          qy(cy * r.height * 0.06);
          tiltX(cy * -6);
          tiltY(cx * 6);
        };

        const onEnter = () => {
          gsap.to(media, { scale: 1.06, duration: 0.35, ease: "power2.out" });
          gsap.to(content, { y: -6, duration: 0.35, ease: "power2.out" });

          window.dispatchEvent(
            new CustomEvent("cursor-view", { detail: { label: "VIEW" } })
          );
        };

        const onLeave = () => {
          gsap.to(media, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
          });

          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: "power3.out",
          });

          gsap.to(content, { y: 0, duration: 0.35, ease: "power2.out" });

          window.dispatchEvent(new CustomEvent("cursor-normal"));
        };
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);

        ScrollTrigger.addEventListener("refreshInit", onLeave);
      });
    }, root);

    return () => ctx.revert();
  }, [grouped]);

  const mainClass = cn("relative mx-auto max-w-7xl px-5 sm:px-15", className);

  return (
    <section
      ref={root}
      id="projects-section"
      className={mainClass}
    >
      <h2 className="mb-8 md:mb-10 flex items-end text-3xl leading-none uppercase md:text-7xl max-w-xs font-extrabold tracking-tight text-white">
        {title}
      </h2>

      <div
        data-grid
        className="grid gap-6 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[220px] md:auto-rows-[260px]"
      >
        {grouped.map((it) => (
          <Card key={it.id} item={it} />
        ))}
      </div>
    </section>
  );
};
