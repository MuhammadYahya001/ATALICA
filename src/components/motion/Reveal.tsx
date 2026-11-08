"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

interface CardGridContextValue {
  mobile: boolean;
  finePointer: boolean;
  reducedMotion: boolean;
}

const CardGridContext = createContext<CardGridContextValue>({ mobile: false, finePointer: false, reducedMotion: false });

interface CardGridProps {
  children: ReactNode;
  className: string;
  layout?: boolean;
}

export function CardGrid({ children, className, layout = false }: CardGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reducedMotion = useReducedMotion() ?? false;
  const [mobile, setMobile] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const mobileMedia = window.matchMedia("(max-width: 767px)");
    const pointerMedia = window.matchMedia("(pointer: fine)");
    const update = () => {
      setMobile(mobileMedia.matches);
      setFinePointer(pointerMedia.matches);
    };
    update();
    mobileMedia.addEventListener("change", update);
    pointerMedia.addEventListener("change", update);
    setHydrated(true);
    return () => {
      mobileMedia.removeEventListener("change", update);
      pointerMedia.removeEventListener("change", update);
    };
  }, []);

  const variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reducedMotion || mobile ? 0 : 0.09 } },
  };

  return (
    <CardGridContext.Provider value={{ mobile, finePointer, reducedMotion }}>
      <motion.div
        ref={ref}
        className={`card-grid ${className}`}
        variants={variants}
        initial={false}
        animate={!hydrated || mobile ? "visible" : inView ? "visible" : "hidden"}
        layout={layout}
        style={reducedMotion ? undefined : { perspective: 1000 }}
      >
        {children}
      </motion.div>
    </CardGridContext.Provider>
  );
}

interface CardRevealProps {
  children: ReactNode;
  className?: string;
  index?: number;
  layout?: boolean;
  outline?: boolean;
}

export function CardReveal({ children, className = "", index = 0, layout = false, outline = false }: CardRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const cardInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reducedMotion = useReducedMotion() ?? false;
  const { mobile, finePointer } = useContext(CardGridContext);
  const [hydrated, setHydrated] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => setHydrated(true), []);

  const cardVariants = {
    hidden: reducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: mobile ? 24 : 40, scale: 0.97, rotateX: 2 },
    visible: reducedMotion
      ? { opacity: 1, transition: { duration: 0.2 } }
      : {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          transition: { duration: mobile ? 0.58 : 0.8, ease: [0.16, 1, 0.3, 1] },
        },
  } satisfies Variants;

  return (
    <motion.div
      ref={ref}
      className={`card-reveal ${revealing ? "is-revealing" : ""} ${settled ? "has-revealed" : ""} ${reducedMotion ? "is-reduced-motion" : ""} ${className}`.trim()}
      custom={index}
      variants={cardVariants}
      initial={hydrated ? "hidden" : false}
      animate={mobile ? (hydrated ? (cardInView ? "visible" : "hidden") : "visible") : undefined}
      whileHover={reducedMotion || !finePointer ? undefined : { y: -2, scale: 1.006 }}
      transition={reducedMotion ? { duration: 0.2 } : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onAnimationStart={(definition) => {
        if (definition === "visible") setRevealing(true);
      }}
      onAnimationComplete={(definition) => {
        if (definition === "visible") {
          setRevealing(false);
          setSettled(true);
        }
        if (definition === "hidden") {
          setRevealing(false);
          setSettled(false);
        }
      }}
      layout={layout}
      exit={layout ? { opacity: 0, scale: 0.98, transition: { duration: 0.2 } } : undefined}
    >
      {children}
      {outline && <span className="card-outline" aria-hidden="true" />}
    </motion.div>
  );
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: [0.2, 0.65, 0.3, 1], delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}
