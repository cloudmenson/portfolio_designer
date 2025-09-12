"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import { Circle } from "lucide-react";

import { SocialRow } from "../../social-row";
import { FilledLink } from "../../filled-link";
import CircularText from "../../circular-text";
import DarkVeil from "../../dark-veil-background";

export type ModalItem = { label: string; href: string };

interface MainModalProps {
  open: boolean;
  items: ModalItem[];
  onClose: () => void;
}

export const MainModal = ({ open, onClose, items }: MainModalProps) => {
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sheet = sheetRef.current;
    const backdrop = backdropRef.current;
    const content = contentRef.current;

    if (!sheet || !backdrop || !content) return;

    if (open) {
      const tl = gsap.timeline();

      gsap.set(sheet, { y: "100%", opacity: 0 });

      tl.set(backdrop, { opacity: 0, pointerEvents: "auto" }).set(content, {
        opacity: 0,
      });

      tl.to(backdrop, { opacity: 0.4, duration: 0.4, ease: "power2.out" }, 0)
        .to(
          sheet,
          { y: "0%", opacity: 1, duration: 0.4, ease: "power3.out" },
          0
        )
        .to(content, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0.4);

      const onEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };

      window.addEventListener("keydown", onEsc);

      return () => {
        window.removeEventListener("keydown", onEsc);
      };
    } else {
      const tl = gsap.timeline();

      tl.to(content, { opacity: 0, duration: 0.15, ease: "power1.in" }, 0)
        .to(
          sheet,
          { y: "100%", opacity: 0, duration: 0.5, ease: "power3.in" },
          0
        )
        .to(
          backdrop,
          {
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
              if (backdropRef.current)
                backdropRef.current.style.pointerEvents = "none";
            },
          },
          0
        );
    }
  }, [open]);

  return (
    <>
      <div
        ref={backdropRef}
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-black/75 opacity-0 pointer-events-none"
      />

      <div
        ref={sheetRef}
        aria-label="Navigation"
        className="fixed inset-0 h-screen w-full z-[61] bg-black/90 backdrop-blur-xl"
      >
        <div
          ref={contentRef}
          className="flex flex-col justify-between items-center w-full h-full pt-4 pb-10 px-15"
        >
          <div className="absolute inset-0 w-full h-full">
            <DarkVeil />
          </div>

          <div className="relative flex items-center justify-between w-full">
            <Link
              href="/"
              onClick={onClose}
              className="text-base uppercase tracking-widest text-[#808080] transition-colors duration:200 hover:text-white"
            >
              Home/
            </Link>

            <div
              onClick={onClose}
              className="cursor-pointer absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-2 gap-2 duration-300 hover:rotate-45"
            >
              {Array.from({ length: 4 }).map((_, idx) => (
                <Circle key={idx} className="text-white fill-white" size={5} />
              ))}
            </div>

            <FilledLink href="#">Contact now</FilledLink>
          </div>

          <nav className="space-y-3 text-center relative">
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                onClick={onClose}
                className="block hover:-text/[0.06] text-white transition-colors hover:text-white/70"
              >
                <span className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-9xl uppercase">
                  {it.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="relative w-full items-center justify-end flex flex-wrap gap-6 text-white text-sm">
            <CircularText
              onHover="speedUp"
              spinDuration={20}
              text="*Marta*Kozerema"
              className="circular-text mx-auto"
            />

            <SocialRow />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainModal;
