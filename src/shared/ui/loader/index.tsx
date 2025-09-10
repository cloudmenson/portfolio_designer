"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const COLORS = ["#fff", "#fff", "#fff", "#fff"];

const Circle = ({
  size = 5,
  color = "#fff",
}: {
  size?: number;
  color?: string;
}) => (
  <div
    style={{
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      borderRadius: "50%",
      display: "block",
    }}
  />
);

export const Loader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState([false, false, false, false]);

  useEffect(() => {
    // Поява кружечків по одному
    show.forEach((_, idx) => {
      setTimeout(() => {
        setShow((prev) => {
          const copy = [...prev];
          copy[idx] = true;
          return copy;
        });
      }, idx * 200); // за 1 секунду всі з'являться
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const circles = containerRef.current.querySelectorAll("div");

    const tl = gsap.timeline({ delay: 0.8 }); // чекаємо поки всі кружечки з'являться

    // Анімація контейнера: обертання і масштабування
    tl.to(containerRef.current, {
      rotation: 360,
      scale: 2,
      duration: 0.8,
      ease: "power2.out",
    }).to(containerRef.current, {
      scale: 1,
      width: 10,
      height: 10,
      duration: 0.8,
      ease: "power2.inOut",
    });

    // Підняття кружечків до верхньої частини екрану з плавним обертанням
    tl.to(
      circles,
      {
        y: -500, // підйом вгору
        width: 10,
        height: 10,
        duration: 1.2,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.8"
    )
      // Анімація збільшення відстані між кружечками (gap)
      .to(
        containerRef.current,
        {
          gridGap: "0.5rem",
          duration: 1,
          ease: "power2.out",
          onUpdate: function () {
            if (containerRef.current) {
              containerRef.current.style.gap = this.targets()[0].style.gridGap;
            }
          },
        },
        "-=1"
      );
  }, [show]);

  return (
    <div
      className="relative flex items-center justify-center h-screen bg-black"
      style={{
        backgroundSize: "25% 25%",
        backgroundRepeat: "repeat",
        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
      }}
    >
      <div
        ref={containerRef}
        style={{
          top: "50%",
          gap: "4px",
          left: "50%",
          width: "18px",
          height: "18px",
          display: "grid",
          position: "absolute",
          transform: "translate(-50%, -50%)",
          gridTemplateRows: "repeat(2, 1fr)",
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        {Array.from({ length: 4 }).map((_, idx) =>
          show[idx] ? (
            <Circle key={idx} color={COLORS[idx]} />
          ) : (
            <div key={idx} />
          )
        )}
      </div>
    </div>
  );
};
