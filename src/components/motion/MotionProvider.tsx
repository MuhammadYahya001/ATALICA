"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { ReactLenis } from "lenis/react";

export default function MotionProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {reducedMotion ? children : (
        <ReactLenis root options={{ lerp: 0.09, smoothWheel: true, syncTouch: false }}>
          {children}
        </ReactLenis>
      )}
    </MotionConfig>
  );
}
