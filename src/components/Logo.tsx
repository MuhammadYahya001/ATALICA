import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  variant?: "light" | "dark" | "default";
  showDescriptor?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({
  variant = "default",
  showDescriptor = true,
  size = "md",
  className = "",
}: LogoProps) {
  const iconDimensions = {
    sm: { width: 36, height: 36 },
    md: { width: 44, height: 44 },
    lg: { width: 56, height: 56 },
  }[size];

  const titleSize = {
    sm: "text-lg tracking-[0.2em]",
    md: "text-xl tracking-[0.22em]",
    lg: "text-2xl tracking-[0.25em]",
  }[size];

  const descriptorSize = {
    sm: "text-[9px] tracking-[0.2em]",
    md: "text-[10px] tracking-[0.24em]",
    lg: "text-xs tracking-[0.28em]",
  }[size];

  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper transition-opacity ${className}`}
      aria-label="ATALICA - Interiors, Construction, Décor Homepage"
    >
      <div className="relative rounded-full overflow-hidden shadow-sm flex-shrink-0 bg-brand-navy border border-brand-copper/30">
        <picture className="contents">
          <source srcSet="/images/optimized/brand/Logo.webp" type="image/webp" />
          <Image
            src="/images/brand/Logo.png"
            alt="ATALICA Brand Emblem"
            width={iconDimensions.width}
            height={iconDimensions.height}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
            unoptimized
          />
        </picture>
      </div>

      <div className="flex flex-col justify-center">
        <span
          className={`font-montserrat font-bold uppercase transition-colors ${
            isLight ? "text-white" : "text-brand-navy"
          } ${titleSize}`}
        >
          ATALICA
        </span>
        {showDescriptor && (
          <span
            className={`font-montserrat font-medium uppercase transition-colors ${
              isLight ? "text-brand-copper-light" : "text-brand-copper"
            } ${descriptorSize}`}
          >
            INTERIORS <span className="text-brand-copper/60">|</span> CONSTRUCTION <span className="text-brand-copper/60">|</span> DÉCOR
          </span>
        )}
      </div>
    </Link>
  );
}
