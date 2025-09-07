"use client";

import { useState, useEffect } from "react";

import { cn } from "@/shared/lib/utils/cn";

export const Cursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [pressed, setPressed] = useState(false);
  const [isView, setIsView] = useState(false);
  const [label, setLabel] = useState("VIEW");

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    const toView = (e: Event) => {
      const detail = (e as CustomEvent<{ label?: string }>).detail;
      if (detail?.label) setLabel(detail.label);
      setIsView(true);
    };
    const toNormal = () => setIsView(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("cursor-view", toView as EventListener);
    window.addEventListener("cursor-normal", toNormal);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("cursor-view", toView as EventListener);
      window.removeEventListener("cursor-normal", toNormal);
    };
  }, []);

  const style = {
    top: pos.y,
    left: pos.x,
    transform: "translate(-50%, -50%)",
  } as const;

  return (
    <div
      className="pointer-events-none fixed z-[9999] mix-blend-difference will-change-transform"
      style={style}
    >
      {/* DOT */}
      <div
        className={cn(
          "absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full bg-white",
          "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          pressed ? "w-4 h-4" : "w-5 h-5",
          isView ? "opacity-0 scale-0" : "opacity-100 scale-100"
        )}
      />

      {/* VIEW PILL */}
      <div
        className={cn(
          "absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2",
          "select-none rounded-full border border-white bg-white text-black shadow-xl shadow-black/30",
          "px-5 py-2 text-[12px] md:text-xl font-bold",
          // growth animation
          "transition-transform duration-420 ease-[cubic-bezier(0.22,1,0.36,1)]",
          // fade label a bit later
          isView ? "scale-100" : "scale-0"
        )}
        style={{ willChange: "transform" }}
      >
        <span
          className={cn(
            "inline-block transition-opacity duration-150",
            isView ? "opacity-100 delay-75" : "opacity-0 delay-0"
          )}
        >
          {label}
        </span>
      </div>
    </div>
  );
};
