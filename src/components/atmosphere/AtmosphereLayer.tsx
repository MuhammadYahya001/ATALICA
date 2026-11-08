"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface AtmosphereLayerProps {
  ghost?: string;
  index?: string;
  blueprint?: boolean;
  grid?: boolean;
  marks?: boolean;
  wordmark?: boolean;
  timeline?: boolean;
  tone?: "light" | "dark";
}

export default function AtmosphereLayer({
  ghost,
  index,
  blueprint = false,
  grid = false,
  marks = false,
  wordmark = false,
  timeline = false,
  tone = "light",
}: AtmosphereLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reducedMotion = useReducedMotion() ?? false;
  const strokeVisible = reducedMotion || inView;

  return (
    <div ref={ref} className={`atmosphere-layer atmosphere-${tone}`} aria-hidden="true">
      <div className="atmosphere-grain" />
      {grid && (
        <svg className="atmosphere-grid" viewBox="0 0 1440 900" preserveAspectRatio="none" focusable="false">
          {[180, 420, 720, 1020, 1260].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="900" />)}
          {[180, 450, 720].map((y) => <line key={y} x1="0" y1={y} x2="1440" y2={y} />)}
        </svg>
      )}
      {blueprint && (
        <motion.svg className="atmosphere-blueprint" viewBox="0 0 1440 900" preserveAspectRatio="none" focusable="false">
          <motion.path d="M90 690V250H380V690H90ZM380 380H560V690H380M90 340H205V250M560 420A90 90 0 0 1 650 510M840 210H1260V660H840V210ZM840 320H1010V210M1050 660V480H1260M800 720H1300M820 708V732M870 712V728M920 708V732M970 712V728M1020 708V732M1070 712V728M1120 708V732M1170 712V728M1220 708V732" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1" initial={{ pathLength: 0, opacity: 0 }} animate={strokeVisible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 1.8, ease: "easeInOut" }} />
        </motion.svg>
      )}
      {ghost && <span className="atmosphere-ghost" data-text={ghost}>{ghost}</span>}
      {index && <span className="atmosphere-index">{index}</span>}
      {wordmark && <span className="atmosphere-wordmark">ATALICA</span>}
      <motion.span className="atmosphere-hairline" initial={{ scaleX: 0, opacity: 0 }} animate={strokeVisible ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 1.2, ease: "easeOut" }} />
      {timeline && <motion.span className="atmosphere-timeline" initial={{ scaleY: 0, opacity: 0 }} animate={strokeVisible ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 1.4, ease: "easeOut" }}><i /><i /><i /></motion.span>}
      {marks && <span className="atmosphere-crop-marks">+</span>}
    </div>
  );
}
