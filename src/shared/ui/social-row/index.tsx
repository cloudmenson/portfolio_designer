"use client";

import { ArrowUpRight } from "lucide-react";

import { socialLinks } from "@/shared/data/social-links";

export const SocialRow = () => {
  return (
    <div className="flex gap-10 text-2xl font-bold uppercase">
      {socialLinks.map((s) => (
        <a
          key={s.id}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-[1.1] active:scale-[0.95] transition duration:300 uppercase flex items-center gap-1 lg:text-3xl"
        >
          {s.name} <ArrowUpRight className="w-[20px] h-[20px]" />
        </a>
      ))}
    </div>
  );
};
