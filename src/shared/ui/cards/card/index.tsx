"use client";

import { useRef } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

import { cn } from "@/shared/lib/utils/cn";

type Item = {
  id: number;
  tag: string;
  title: string;
  cover: StaticImageData;
  span?: "v2" | "h2" | "big" | undefined;
};

export const Card = ({ item }: { item: Item }) => {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const spans = cn(
    item.span === "big" && "sm:col-span-2 lg:col-span-2 lg:row-span-2",
    item.span === "v2" && "row-span-2",
    item.span === "h2" && "sm:col-span-2"
  );

  return (
    <Link
      data-card
      ref={ref}
      data-tag={item.tag}
      href={`projects/${item.id}`}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10",
        "backdrop-blur-sm shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]",
        "cursor-pointer select-none will-change-transform",
        spans
      )}
    >
      <div data-media className="absolute inset-0">
        <Image
          fill
          src={item.cover}
          alt={item.title}
          priority={false}
          className="object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      </div>

      <div
        data-content
        className="relative z-10 p-5 md:p-6 flex h-full flex-col justify-end"
      >
        <div className="flex items-center gap-2 text-xs font-medium text-white/70">
          <span className="rounded-full bg-white/10 px-2 py-1 backdrop-blur-sm border border-white/15">
            {item.tag}
          </span>
        </div>

        <h3 className="mt-2 text-xl md:text-2xl font-semibold text-white drop-shadow">
          {item.title}
        </h3>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-emerald-400/0 group-hover:ring-2 group-hover:ring-emerald-400/40 transition-all" />
    </Link>
  );
};
