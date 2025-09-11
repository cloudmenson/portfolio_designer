"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

interface ILenisProvider {
  children: React.ReactNode;
}

export const LenisProvider = ({ children }: ILenisProvider) => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.050,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    try {
      if (ScrollTrigger?.update) {
        lenis.on("scroll", ScrollTrigger.update);
      }
    } catch {}

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
