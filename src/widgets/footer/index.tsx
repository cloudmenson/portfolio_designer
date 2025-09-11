"use client";

import ScrollFloat from "@/shared/ui/scroll-float";
import Link from "next/link";

export const Footer = () => {
  return (
    <div
      aria-label="Footer"
      className="relative w-full isolate flex flex-col gap-[0.5vw] text-white text-center px-15"
    >
      <ScrollFloat
        stagger={0.03}
        ease="back.inOut(2)"
        animationDuration={1}
        scrollEnd="bottom bottom-=40%"
        scrollStart="center bottom+=60%"
        textClassName="uppercase font-semibold text-[12vw]"
      >
        Marta
      </ScrollFloat>

      <Link
        href="#"
        className="cursor-pointer font-semibold transition duration:300 hover:underline uppercase lg:text-3xl"
      >
        Back to TOP
      </Link>
    </div>
  );
};
