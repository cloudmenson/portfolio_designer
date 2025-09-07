"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import { Circle } from "lucide-react";

import { FilledLink } from "../../filled-link";

export type ModalItem = { label: string; href: string };

interface MainModalProps {
  open: boolean;
  onClose: () => void;
  items: ModalItem[];
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
      const prevOverflow = document.body.style.overflow;

      const tl = gsap.timeline();
      tl.set(sheet, { yPercent: 100 })
        .set(backdrop, { opacity: 0.4, pointerEvents: "auto" })
        .set(content, { opacity: 0 });

      // slide sheet up over ~0.5s, backdrop fades in in parallel
      tl.to(sheet, { yPercent: 0, duration: 0.4, ease: "power3.out" }, 0)
        .to(backdrop, { opacity: 0.4, duration: 0.4, ease: "power2.out" }, 0)
        // content appears ~0.2s after start
        .to(content, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0.4);

      const onEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onEsc);

      return () => {
        window.removeEventListener("keydown", onEsc);
        document.body.style.overflow = prevOverflow;
      };
    } else {
      const sheet = sheetRef.current;
      const backdrop = backdropRef.current;
      const content = contentRef.current;
      if (!sheet || !backdrop || !content) return;

      const tl = gsap.timeline();

      tl.to(content, { opacity: 0, duration: 0.15, ease: "power1.in" }, 0)
        .to(sheet, { yPercent: 100, duration: 0.5, ease: "power3.in" }, 0)
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
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-black/75 opacity-0 pointer-events-none"
      />

      {/* Bottom sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        style={{
          backgroundSize: "25% 25%",
          backgroundRepeat: "repeat",
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
        }}
        aria-modal="true"
        aria-label="Navigation"
        className="fixed inset-0 h-screen w-full z-[61] bg-black/90 backdrop-blur-xl"
      >
        <div
          ref={contentRef}
          className="flex flex-col justify-between items-center w-full h-full"
        >
          <div className="relative flex items-center justify-between w-full px-6 py-4">
            <Link
              href="#"
              className="text-sm uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black px-2 py-1"
            >
              Home/
            </Link>

            <div
              onClick={onClose}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-2 gap-2 duration-300 hover:rotate-45"
            >
              {Array.from({ length: 4 }).map((_, idx) => (
                <Circle key={idx} className="text-white fill-white" size={5} />
              ))}
            </div>

            <FilledLink href="#">Contact now</FilledLink>
          </div>

          <nav className="space-y-3 text-center">
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

          <div className="flex flex-wrap gap-6 text-white/70 text-sm">
            <span>©2025 ALL RIGHTS RESERVED</span>
            <div className="ml-auto flex gap-6">
              <Link href="#" className="hover:text-white">
                INSTAGRAM↗
              </Link>
              <Link href="#" className="hover:text-white">
                DRIBBBLE↗
              </Link>
              <Link href="#" className="hover:text-white">
                BEHANCE↗
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainModal;
