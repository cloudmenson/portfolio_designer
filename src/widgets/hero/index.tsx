"use client";

import { useRef, useState, useEffect } from "react";

import SplitText from "@/shared/ui/split-text";
import CurvedLoop from "@/shared/ui/curved-loop";
import DarkVeil from "@/shared/ui/dark-veil-background";
import { cn } from "@/lib/utils";

export const Hero = ({ className }) => {
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

  const mainClass = cn(
    "relative grid min-h-[100svh] w-full place-items-center overflow-visible bg-black/90 px-5 sm:px-15",
    className
  );

  return (
    <section ref={scope} id="hero-section" className={mainClass}>
      <div className="absolute inset-0 w-full h-full">
        <DarkVeil />
      </div>

      <div className="relative z-10 mx-auto w-full text-center flex justify-center">
        <h1 className="select-none text-pretty text-white max-w-6xl flex flex-col [text-wrap:balance] leading-[1.4] text-3xl sm:leading-[1.2] sm:text-6xl xl:text-8xl">
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
              className="block font-semibold"
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
              className="block font-semibold"
            />
          )}
        </h1>
      </div>

      <CurvedLoop
        speed={3}
        direction="left"
        curveAmount={0.01}
        interactive={true}
        containerClassName="curved-loop"
        marqueeText="A ✦ Designer ✦ who ✦ loves ✦ creating ✦ immersive ✦ experiences"
      />
    </section>
  );
};
