"use client";

import React, { useEffect, useState } from "react";

export const ClientOnly: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <>{children}</>;
};
