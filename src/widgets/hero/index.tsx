'use client';

import { useRef, useState, useEffect } from "react";

import SplitText from "@/shared/ui/split-text";
import CurvedLoop from "@/shared/ui/curved-loop";
import { Prism } from "@/shared/ui/prisma-background";

export const Hero = () => {
  const scope = useRef<HTMLDivElement | null>(null);

  const [stage, setStage] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    const firstTotal = 100 + 600;
    const secondTotal = 100 + 800;

    const t1 = setTimeout(() => setStage(2), firstTotal);
    const t2 = setTimeout(() => setStage(3), firstTotal + secondTotal);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section
      ref={scope}
      id="hero-section"
      className="relative grid min-h-[95svh] w-full place-items-center overflow-visible bg-black/90"
    >
      <Prism
        glow={1}
        noise={0}
        scale={3.6}
        height={3.5}
        hueShift={0}
        timeScale={0.5}
        baseWidth={5.5}
        colorFrequency={1}
        animationType="rotate"
      />

      <div className="relative z-10 mx-auto w-full text-center flex justify-center">
        <h1 className="select-none leading-[1.2] text-white max-w-6xl flex flex-col [text-wrap:balance] text-8xl">
          <SplitText
            delay={50}
            duration={0.1}
            threshold={0.2}
            ease="power3.out"
            splitType="chars"
            textAlign="center"
            rootMargin="-100px"
            text="Hello, I’m Marta"
            to={{ opacity: 1, y: 0 }}
            from={{ opacity: 0, y: 20 }}
            className="block font-semibold"
          />

          {stage >= 2 && (
            <SplitText
              delay={50}
              duration={0.1}
              threshold={0.2}
              ease="power3.out"
              splitType="chars"
              textAlign="center"
              rootMargin="-100px"
              text="A Designer who loves"
              to={{ opacity: 1, y: 0 }}
              from={{ opacity: 0, y: 24 }}
              className="mb-2 block font-semibold"
            />
          )}

          {stage >= 3 && (
            <SplitText
              delay={50}
              duration={0.1}
              threshold={0.2}
              ease="power3.out"
              splitType="chars"
              textAlign="center"
              rootMargin="-100px"
              text="animations & bold ideas!"
              to={{ opacity: 1, y: 0 }}
              from={{ opacity: 0, y: 28 }}
              className="mt-2 block font-semibold"
            />
          )}
        </h1>
      </div>

      <CurvedLoop
        speed={3}
        curveAmount={0}
        direction="left"
        interactive={true}
        containerClassName="curved-loop"
        marqueeText="Be ✦ Creative ✦ With ✦ React ✦ Bits ✦"
      />
    </section>
  );
};
