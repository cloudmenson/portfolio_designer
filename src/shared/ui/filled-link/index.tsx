"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

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
    const el = ref.current;
    if (!el) return;
    const fill = el.querySelector<HTMLElement>("[data-fill]");
    if (!fill) return;

    const setPos = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      fill.style.setProperty("--cx", `${x}px`);
      fill.style.setProperty("--cy", `${y}px`);
      return Math.hypot(r.width, r.height);
    };

    const onEnter = (e: PointerEvent) => {
      const R = setPos(e);
      fill.style.setProperty("--r", "0px");
      // kick off transition to full cover
      requestAnimationFrame(() => {
        fill.style.setProperty("--r", `${R}px`);
        el.style.color = "#000";
      });
    };

    const onLeave = (e: PointerEvent) => {
      setPos(e);
      fill.style.setProperty("--r", "0px");
      el.style.color = "#fff";
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointermove", (e) => setPos(e));

    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointermove", (e) => setPos(e));
    };
  }, []);

  const btnClass = cn(
    "relative overflow-hidden rounded-full uppercase border-white px-6 py-2 font-semibold text-white transition-all duration-350 active:scale-90",
    type === "standard" && "text-base border font-bold",
    type === "medium" && "text-4xl border-[2px] font-bold",
    type === "large" && "text-3xl border-[2px] font-bold",
    className
  );

  return (
    <Link
      ref={ref}
      href={href}
      className={btnClass}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <span className="relative z-10">{children}</span>

      <span
        data-fill
        className="pointer-events-none absolute inset-0 rounded-full bg-white"
        style={{
          transition: "clip-path 250ms ease",
          clipPath: "circle(var(--r, 0px) at var(--cx, 50%) var(--cy, 50%))",
        }}
      />
    </Link>
  );
};
