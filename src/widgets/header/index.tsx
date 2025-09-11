"use client";

import Link from "next/link";
import { Circle } from "lucide-react";

import { FilledLink } from "@/shared/ui/filled-link";

interface IHeader {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ setOpenModal }: IHeader) => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/8 bg-transparent backdrop-blur-sm">
      <div className="relative flex items-center justify-between px-15 py-4">
        <Link
          href="/"
          className="text-base uppercase tracking-widest text-[#808080] transition-colors duration:200 hover:text-white"
        >
          Home/
        </Link>

        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center"
          onClick={() => setOpenModal(true)}
        >
          <div className="select-none cursor-pointer grid grid-cols-2 gap-2 duration-300 hover:rotate-45">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Circle key={idx} className="text-white fill-white" size={5} />
            ))}
          </div>
        </div>

        <FilledLink href="#">Contact now</FilledLink>
      </div>
    </header>
  );
};
