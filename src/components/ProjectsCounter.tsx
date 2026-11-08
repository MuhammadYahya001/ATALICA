"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

interface ProjectsCounterProps {
  variant?: "light" | "dark";
  className?: string;
}

export default function ProjectsCounter({ variant = "light", className = "" }: ProjectsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reducedMotion = useReducedMotion() ?? false;
  const [count, setCount] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setCount(50);
      setComplete(true);
      return;
    }
    if (!inView) return;

    const controls = animate(0, 50, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (value) => setCount(Math.round(value)),
      onComplete: () => setComplete(true),
    });
    return () => controls.stop();
  }, [inView, reducedMotion]);

  const dark = variant === "dark";

  return (
    <div
      ref={ref}
      className={`projects-counter relative isolate overflow-hidden ${dark ? "projects-counter-dark" : "projects-counter-light"} ${className}`.trim()}
      role="group"
      aria-label="More than 50 projects completed"
    >
      <span className="projects-counter-ghost" aria-hidden="true">50</span>
      <div className="relative z-10 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-8 sm:text-left">
        <div className="flex items-baseline font-serif leading-none" aria-hidden="true">
          <span className="projects-counter-number inline-block w-[2ch] shrink-0 text-right tabular-nums">{count}</span>
          <span className={`projects-counter-plus ${complete ? "is-visible" : ""}`} aria-hidden="true">+</span>
        </div>
        <span className="projects-counter-divider hidden h-16 w-px sm:block" aria-hidden="true" />
        <div className="max-w-md">
          <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.24em] sm:text-[11px]">Projects Completed</p>
          <p className="mt-2 text-xs leading-relaxed opacity-75 sm:text-sm">
            Interior and construction work delivered across Multan, Islamabad and Rawalpindi.
          </p>
        </div>
      </div>
    </div>
  );
}
