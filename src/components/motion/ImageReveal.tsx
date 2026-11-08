import type { ReactNode } from "react";

export default function ImageReveal({
  children,
  className = "",
  card = false,
}: {
  children: ReactNode;
  className?: string;
  card?: boolean;
}) {
  return <div className={`image-reveal ${card ? "card-image-reveal" : ""} ${className}`}>{children}</div>;
}
