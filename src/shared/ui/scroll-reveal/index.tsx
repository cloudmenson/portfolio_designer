import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  enableBlur?: boolean;
  baseOpacity?: number;
  rotationEnd?: string;
  baseRotation?: number;
  blurStrength?: number;
  textClassName?: string;
  wordAnimationEnd?: string;
  containerClassName?: string;
  scrollContainerRef?: RefObject<HTMLElement>;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  baseRotation = 3,
  blurStrength = 4,
  enableBlur = true,
  baseOpacity = 0.1,
  scrollContainerRef,
  textClassName = "",
  containerClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    gsap.fromTo(
      el,
      { transformOrigin: "0% 50%", rotate: baseRotation },
      {
        rotate: 0,
        ease: "none",
        scrollTrigger: {
          scroller,
          trigger: el,
          scrub: true,
          end: rotationEnd,
          start: "top bottom",
        },
      }
    );

    const wordElements = el.querySelectorAll<HTMLElement>(".word");

    gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: "opacity" },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.05,
        scrollTrigger: {
          scroller,
          trigger: el,
          scrub: true,
          end: wordAnimationEnd,
          start: "top bottom-=20%",
        },
      }
    );

    if (enableBlur) {
      gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: "none",
          stagger: 0.05,
          filter: "blur(0px)",
          scrollTrigger: {
            scroller,
            trigger: el,
            scrub: true,
            end: wordAnimationEnd,
            start: "top bottom-=20%",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [
    enableBlur,
    baseOpacity,
    rotationEnd,
    baseRotation,
    blurStrength,
    wordAnimationEnd,
    scrollContainerRef,
  ]);

  return (
    <h2 ref={containerRef} className={`my-5 ${containerClassName}`}>
      <p className={`leading-[1.5] font-semibold ${textClassName}`}>
        {splitText}
      </p>
    </h2>
  );
};

export default ScrollReveal;
