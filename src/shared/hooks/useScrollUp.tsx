"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";

interface IUseScrollToTop {
  children: ReactNode;
}

export const UseScrollToTop = ({ children }): IUseScrollToTop => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return { children };
};
