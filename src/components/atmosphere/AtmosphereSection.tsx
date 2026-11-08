import type { ReactNode } from "react";
import AtmosphereLayer from "./AtmosphereLayer";

interface AtmosphereSectionProps {
  children: ReactNode;
  className?: string;
  ghost?: string;
  index?: string;
  blueprint?: boolean;
  grid?: boolean;
  marks?: boolean;
  wordmark?: boolean;
  timeline?: boolean;
  tone?: "light" | "dark";
}

export default function AtmosphereSection({ children, className = "", ...atmosphere }: AtmosphereSectionProps) {
  return (
    <section className={`atmosphere-host relative isolate ${className}`.trim()}>
      {children}
      <AtmosphereLayer {...atmosphere} />
    </section>
  );
}
