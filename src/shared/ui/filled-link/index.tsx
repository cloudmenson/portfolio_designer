"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { cn } from "@/shared/lib/utils/cn";

type ButtonType = "standard" | "medium" | "large";

interface IFilledLink {
  href: string;
  type?: ButtonType;
  className?: string;
  children: React.ReactNode;
}

export const FilledLink = ({
  href,
  children,
  className,
  type = "standard",
}: IFilledLink) => {
  const ref = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      const el = ref.current;

      const handleEnter = () => {
        const tl = gsap.timeline();
        tl.to(el, {
          y: -5,
          boxShadow: "8px 8px 0px #4c0dc6",
          duration: 0.3,
          ease: "power3.out",
        });
      };

      const handleLeave = () => {
        const tl = gsap.timeline();
        tl.to(el, {
          y: 0,
          boxShadow: "0px 0px 0px rgba(111,111,111,1)",
          duration: 0.3,
          ease: "power3.inOut",
        }).to(
          el.querySelector("svg, span"),
          { color: "#000000", duration: 0.3 },
          "<"
        );
      };

      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
      return () => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      };
    }
  }, []);

  const btnClass = cn(
    "relative inline-flex items-center gap-2 overflow-hidden rounded-md border border-black bg-white px-2 py-3 font-bold uppercase text-black md:px-4",
    type === "standard" && "text-sm sm:text-base",
    type === "medium" && "text-lg sm:text-2xl",
    type === "large" && "text-xl sm:text-3xl",
    className
  );

  return (
    <Link ref={ref} href={href} className={btnClass}>
      <span>{children}</span>
    </Link>
  );
};
