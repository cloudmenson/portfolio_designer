"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  children?: React.ReactNode;
  depth?: number; // max bend
  spread?: number; // wave width along edge
  edgeZone?: number; // activation distance from edge
  radius?: number; // base corner radius
};

/**
 * JellyCard (scoped mask)
 * - Card stays flat; only nearest edge is deformed.
 * - We render a mask to an offscreen canvas and set it as CSS mask-image on the content box.
 * - No absolutely-positioned canvases outside; effect is fully contained in the card bounds.
 */
export function JellyCard({
  className = "",
  children,
  depth = 48,
  spread = 160,
  edgeZone = 96,
  radius = 16,
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const offscreen = useRef<HTMLCanvasElement | null>(null);

  const state = useRef({
    d: 0,
    cx: 0,
    cy: 0,
    edge: "none" as "top" | "bottom" | "left" | "right" | "none",
  });
  const vel = useRef(0);

  // Draw mask onto offscreen canvas and apply as CSS mask-image
  const updateMask = () => {
    const box = boxRef.current!;
    const cvs = offscreen.current!;
    const ctx = cvs.getContext("2d")!;
    const w = cvs.width;
    const h = cvs.height;

    // White = visible, Black = hidden (for mask)
    ctx.clearRect(0, 0, w, h);

    // base rounded rect
    const r = Math.min(radius, Math.min(w, h) / 2);
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(w - r, 0);
    ctx.quadraticCurveTo(w, 0, w, r);
    ctx.lineTo(w, h - r);
    ctx.quadraticCurveTo(w, h, w - r, h);
    ctx.lineTo(r, h);
    ctx.quadraticCurveTo(0, h, 0, h - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();
    ctx.fill();

    // carve the wave on nearest edge (destination-out)
    if (state.current.edge !== "none" && state.current.d > 0.5) {
      const d = Math.min(depth, state.current.d);
      const half = spread / 2;
      const x = state.current.cx;
      const y = state.current.cy;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      if (state.current.edge === "top") {
        const x1 = Math.max(0, x - half);
        const x2 = Math.min(w, x + half);
        ctx.moveTo(x1, 0);
        ctx.bezierCurveTo(x1 + half * 0.35, 0, x - half * 0.35, d, x, d);
        ctx.bezierCurveTo(x + half * 0.35, d, x2 - half * 0.35, 0, x2, 0);
        ctx.lineTo(x2, -d);
        ctx.lineTo(x1, -d);
        ctx.closePath();
      } else if (state.current.edge === "bottom") {
        const x1 = Math.max(0, x - half);
        const x2 = Math.min(w, x + half);
        const yb = h - d;
        ctx.moveTo(x2, h);
        ctx.bezierCurveTo(x2 - half * 0.35, h, x + half * 0.35, yb, x, yb);
        ctx.bezierCurveTo(x - half * 0.35, yb, x1 + half * 0.35, h, x1, h);
        ctx.lineTo(x1, h + d);
        ctx.lineTo(x2, h + d);
        ctx.closePath();
      } else if (state.current.edge === "left") {
        const y1 = Math.max(0, y - half);
        const y2 = Math.min(h, y + half);
        ctx.moveTo(0, y2);
        ctx.bezierCurveTo(0, y2 - half * 0.35, d, y + half * 0.35, d, y);
        ctx.bezierCurveTo(d, y - half * 0.35, 0, y1 + half * 0.35, 0, y1);
        ctx.lineTo(-d, y1);
        ctx.lineTo(-d, y2);
        ctx.closePath();
      } else if (state.current.edge === "right") {
        const y1 = Math.max(0, y - half);
        const y2 = Math.min(h, y + half);
        const xr = w - d;
        ctx.moveTo(w, y1);
        ctx.bezierCurveTo(w, y1 + half * 0.35, xr, y - half * 0.35, xr, y);
        ctx.bezierCurveTo(xr, y + half * 0.35, w, y2 - half * 0.35, w, y2);
        ctx.lineTo(w + d, y2);
        ctx.lineTo(w + d, y1);
        ctx.closePath();
      }
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    }

    const url = cvs.toDataURL();
    box.style.webkitMaskImage = `url(${url})`;
    box.style.maskImage = `url(${url})`;
    box.style.webkitMaskRepeat = "no-repeat";
    box.style.maskRepeat = "no-repeat";
    box.style.webkitMaskSize = "100% 100%";
    box.style.maskSize = "100% 100%";
  };

  useEffect(() => {
    const root = rootRef.current!;
    const box = boxRef.current!;
    offscreen.current = document.createElement("canvas");

    const setSize = () => {
      const r = box.getBoundingClientRect();
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(r.width * scale));
      const h = Math.max(1, Math.floor(r.height * scale));
      if (offscreen.current!.width !== w || offscreen.current!.height !== h) {
        offscreen.current!.width = w;
        offscreen.current!.height = h;
      }
      updateMask();
    };

    const ro = new ResizeObserver(setSize);
    ro.observe(box);
    setSize();

    const onMove = (e: MouseEvent) => {
      const rect = box.getBoundingClientRect();
      const x =
        (e.clientX - rect.left) * Math.min(window.devicePixelRatio || 1, 2);
      const y =
        (e.clientY - rect.top) * Math.min(window.devicePixelRatio || 1, 2);

      const distTop = y;
      const distBottom =
        rect.height * Math.min(window.devicePixelRatio || 1, 2) - y;
      const distLeft = x;
      const distRight =
        rect.width * Math.min(window.devicePixelRatio || 1, 2) - x;
      const min = Math.min(distTop, distBottom, distLeft, distRight);

      let edge: typeof state.current.edge = "none";
      const zone = edgeZone * Math.min(window.devicePixelRatio || 1, 2);
      if (min <= zone) {
        if (min === distTop) edge = "top";
        else if (min === distBottom) edge = "bottom";
        else if (min === distLeft) edge = "left";
        else edge = "right";
      }

      state.current.edge = edge;
      state.current.cx = x;
      state.current.cy = y;

      // spring for depth
      const target =
        edge === "none" ? 0 : depth * (1 - Math.min(min / zone, 1));
      const stiffness = 0.22;
      const damping = 0.12;
      vel.current += (target - state.current.d) * stiffness;
      vel.current *= 1 - damping;
      state.current.d += vel.current;

      window.dispatchEvent(
        new CustomEvent(edge !== "none" ? "cursor-big" : "cursor-normal")
      );
      updateMask();
    };

    const onLeave = () => {
      window.dispatchEvent(new CustomEvent("cursor-normal"));
      const timer = setInterval(() => {
        const stiffness = 0.18;
        const damping = 0.16;
        vel.current += (0 - state.current.d) * stiffness;
        vel.current *= 1 - damping;
        state.current.d += vel.current;
        updateMask();
        if (Math.abs(state.current.d) < 0.2 && Math.abs(vel.current) < 0.2) {
          state.current.d = 0;
          clearInterval(timer);
          updateMask();
        }
      }, 16);
    };

    root.addEventListener("mousemove", onMove);
    root.addEventListener("mouseleave", onLeave);

    return () => {
      ro.disconnect();
      root.removeEventListener("mousemove", onMove);
      root.removeEventListener("mouseleave", onLeave);
    };
  }, [depth, spread, edgeZone, radius]);

  return (
    <div ref={rootRef} className={"relative " + className}>
      <div
        ref={boxRef}
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden"
      >
        {children}
      </div>
    </div>
  );
}
