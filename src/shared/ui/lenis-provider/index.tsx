'use client';

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

interface ILenisProvider {
  children: React.ReactNode;
}

export const LenisProvider = ({ children }: ILenisProvider) => {
  useEffect(() => {
    const lenis = new Lenis({
      // Чем меньше lerp — тем длиннее инерция (более «накатанная»)
      lerp: 0.085,
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

    // Если в проекте используется GSAP ScrollTrigger — синхронизируем
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
