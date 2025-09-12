"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const Loader = ({ isVisible, setIsVisible }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const dropsRef = useRef<HTMLDivElement[]>([]);

  const NUM_DROPS = 5;

  const fixedPositions = [
    { x: window.innerWidth * 0, y: window.innerHeight * 0.1, size: 50 },
    { x: window.innerWidth * 0.3, y: window.innerHeight * 0.6, size: 100 },
    { x: window.innerWidth * 0.5, y: window.innerHeight * 0.3, size: 150 },
    { x: window.innerWidth * 0.7, y: window.innerHeight * 1, size: 50 },
    { x: window.innerWidth * 0.85, y: window.innerHeight * 0.2, size: 40 },
    { x: window.innerWidth * 0.6, y: window.innerHeight * 0.7, size: 70 },
  ];

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const drops = dropsRef.current;

    drops.forEach((drop, index) => {
      const posX = fixedPositions[index]?.x || 0;
      const posY = fixedPositions[index]?.y || 0;
      const size = fixedPositions[index]?.size || 200;

      gsap.set(drop, {
        scale: 0,
        top: posY,
        left: posX,
        opacity: 1,
        width: size,
        height: size,
        xPercent: -50,
        yPercent: -50,
        borderRadius: "50%",
        position: "absolute",
        backgroundColor: "rgb(24,4,64)",
      });

      gsap.to(drop, {
        scale: 1,
        delay: 500,
        duration: 1,
        ease: "power1.out",
      });
    });

    const timer = setTimeout(() => {
      if (loaderRef.current) {
        drops.forEach((drop) => {
          gsap.to(drop, {
            scale: 50,
            opacity: 1,
            duration: 1.2,
            ease: "power2.inOut",
          });
        });

        gsap.to(loaderRef.current, {
          opacity: 0,
          delay: 0.5,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => setIsVisible(false),
        });
      }
    }, 200);

    return () => {
      clearTimeout(timer);

      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[99999999] flex items-center justify-center bg-black overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(
          to right,
          rgba(255, 255, 255, 0.08) 1px,
          transparent 1px
        ),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
        backgroundSize: "25% 25%",
        backgroundRepeat: "repeat",
      }}
    >
      {[...Array(NUM_DROPS)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          ref={(el) => {
            if (el) dropsRef.current[i] = el;
          }}
        />
      ))}
    </div>
  );
};
