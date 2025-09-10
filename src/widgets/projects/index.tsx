"use client";

import { useRef, useMemo, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Card } from "@/shared/ui/cards/card";
import { BentoCardProps } from "@/shared/ui/magic-bento";
import { projects, IProjects } from "@/shared/data/projects";

const cardData: BentoCardProps[] = [
  {
    color: "#060010",
    title: "Analytics",
    description: "Track user behavior",
    label: "Insights",
  },
  {
    color: "#060010",
    title: "Dashboard",
    description: "Centralized data view",
    label: "Overview",
  },
  {
    color: "#060010",
    title: "Collaboration",
    description: "Work together seamlessly",
    label: "Teamwork",
  },
  {
    color: "#060010",
    title: "Automation",
    description: "Streamline workflows",
    label: "Efficiency",
  },
  {
    color: "#060010",
    title: "Integration",
    description: "Connect favorite tools",
    label: "Connectivity",
  },
  {
    color: "#060010",
    title: "Security",
    description: "Enterprise-grade protection",
    label: "Protection",
  },
];

export const PortfolioGrid = ({
  items = projects,
}: {
  items?: IProjects[];
}) => {
  const root = useRef<HTMLDivElement | null>(null);

  const grouped = useMemo(() => items, [items]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLDivElement>("[data-card]");

      gsap.set(cards, {
        opacity: 0,
        y: 40,
        rotateX: -6,
        transformOrigin: "50% 100%",
      });

      ScrollTrigger.batch(cards, {
        start: "top 85%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch as gsap.DOMTarget[], {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
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

  return (
    <section
      ref={root}
      id="projects-section"
      className="relative mx-auto max-w-7xl lg:pt-60 lg:pb-28 px-15"
    >
      <h2 className="mb-8 md:mb-10 flex items-end text-3xl leading-none uppercase md:text-7xl max-w-xs font-extrabold tracking-tight text-white">
        Latest portfolio
      </h2>

      <div
        data-grid
        className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[220px] md:auto-rows-[260px]"
      >
        {grouped.map((it) => (
          <Card key={it.id} item={it} />
        ))}
      </div>
    </section>
  );
};
