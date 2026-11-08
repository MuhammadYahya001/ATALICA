import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type MagneticButtonProps = LinkProps & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "target" | "rel" | "aria-label"> & {
  children: ReactNode;
};

export default function MagneticButton({ children, className = "", ...props }: MagneticButtonProps) {
  return (
    <Link {...props} data-magnetic className={`magnetic-button ${className}`}>
      {children}
    </Link>
  );
}
