import { useEffect, useState } from "react";

const getIsMobile = (breakpoint: number) => window.innerWidth <= breakpoint;

const useIsMobile = (breakpoint = 768): boolean => {
  const [isMobile, setIsMobile] = useState(() => getIsMobile(breakpoint));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(getIsMobile(breakpoint));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isMobile;
};

export { useIsMobile };
