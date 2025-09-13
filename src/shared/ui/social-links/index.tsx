"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type socialItem = {
  id: number;
  href: string;
  name: string;
};

interface ISocialLinks {
  email?: string;
  isLabel?: boolean;
  className?: string;
  socialLinks: socialItem[];
}

export const SocialLinks = ({
  email,
  isLabel,
  className,
  socialLinks,
}: ISocialLinks) => {
  const mainClass = cn(
    "flex flex-col gap-10 text-2xl font-bold uppercase",
    className
  );

  return (
    <div className={mainClass}>
      <div className="flex flex-col gap-5">
        <p className="text-base text-[#808080]">{isLabel && "Follow me"}</p>

        <div className="flex flex-row gap-10">
          {socialLinks.map((s) => (
            <Link
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-[1.08] active:scale-[0.95] transition duration:300 uppercase flex items-center gap-1 lg:text-3xl"
            >
              {s.name} <ArrowUpRight className="w-[20px] h-[20px]" />
            </Link>
          ))}
        </div>
      </div>

      {email && (
        <div className="flex flex-col gap-5">
          <p className="text-base text-grey text-[#808080]">
            {isLabel && "Mail me"}
          </p>

          <Link
            target="_blank"
            href={`mailto:${email}`}
            rel="noopener noreferrer"
            className="hover:scale-[1.08] active:scale-[0.95] transition duration:300 uppercase flex items-center gap-1 lg:text-3xl"
          >
            {email}
          </Link>
        </div>
      )}
    </div>
  );
};
