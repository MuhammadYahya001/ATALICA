import type { ReactNode } from "react";

export default function ParallaxImage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`hero-image-depth ${className}`}>{children}</div>;
}
