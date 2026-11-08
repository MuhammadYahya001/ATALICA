"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const range = document.documentElement.scrollHeight - window.innerHeight;
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${range > 0 ? window.scrollY / range : 0})`;
        }
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <div ref={progressRef} className="scroll-progress" aria-hidden="true" />;
}

export function Preloader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try { seen = Boolean(sessionStorage.getItem("atalica-intro-seen")); } catch { /* Storage can be unavailable in private contexts. */ }
    if (reduceMotion || seen) return;
    setVisible(true);
    const hide = window.setTimeout(() => {
      setVisible(false);
      try { sessionStorage.setItem("atalica-intro-seen", "1"); } catch { /* The preloader is still dismissible without storage. */ }
    }, 760);
    return () => window.clearTimeout(hide);
  }, []);

  if (!visible) return null;
  return (
    <div className="studio-preloader" aria-hidden="true">
      <span>ATALICA</span>
      <i />
    </div>
  );
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (event: PointerEvent) => {
      cursor.style.setProperty("--cursor-x", `${event.clientX}px`);
      cursor.style.setProperty("--cursor-y", `${event.clientY}px`);
    };
    const onOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a, button, [data-cursor-label]") : null;
      cursor.classList.toggle("is-active", Boolean(target));
      cursor.dataset.label = target?.getAttribute("data-cursor-label") ?? "";
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
    };
  }, []);

  return <div ref={cursorRef} className="studio-cursor" aria-hidden="true" />;
}

export function MagneticEffect() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const move = (event: PointerEvent) => {
      const item = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-magnetic]") : null;
      if (!item) return;
      const rect = item.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.08;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.08;
      item.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const reset = (event: PointerEvent) => {
      const item = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-magnetic]") : null;
      if (item && (!event.relatedTarget || !item.contains(event.relatedTarget as Node))) item.style.transform = "";
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", reset, { passive: true });
    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", reset);
    };
  }, []);
  return null;
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      key={pathname}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.2, 0.65, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
