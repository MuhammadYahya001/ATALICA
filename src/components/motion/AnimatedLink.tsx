import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface AnimatedLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
}

export default function AnimatedLink({ children, className = "", showArrow = true, ...props }: AnimatedLinkProps) {
  return (
    <Link {...props} className={`animated-link ${className}`}>
      <span>{children}</span>
      {showArrow && <ArrowRight className="animated-link-arrow" aria-hidden="true" />}
    </Link>
  );
}
