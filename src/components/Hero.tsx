import ResponsiveImage from "@/components/ResponsiveImage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import fs from "fs";
import path from "path";

export default function Hero() {
  const heroAiPath = path.join(process.cwd(), "public", "images", "optimized", "atalica-hero-ai.webp");
  const hasHeroAi = fs.existsSync(heroAiPath);
  const HERO_IMAGE = hasHeroAi ? "/images/optimized/atalica-hero-ai.webp" : "/images/optimized/projects/livingroom1.webp";
  const HERO_IMAGE_ALT = hasHeroAi
    ? "AI-generated interior design inspiration for ATALICA"
    : "ATALICA residential interior project";

  return (
    <section className="relative h-screen min-h-[640px] max-h-[1080px] flex items-end overflow-hidden bg-[#081C33]">
      {/* Background photograph */}
      <div className="absolute inset-0">
        <ResponsiveImage
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center animate-hero-image"
          quality={92}
        />
        {/* Subtle, restrained vignette gradient — text legibility without opaque dark boxes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#081C33]/85 via-[#081C33]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081C33]/50 via-[#081C33]/15 to-transparent" />
      </div>

      {/* Content — anchored to bottom left */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-2xl">
          <p className="hero-copy text-white/50 text-[9px] uppercase tracking-[0.25em] font-montserrat mb-5" style={{ animationDelay: "0ms" }}>
            01 <span className="mx-2 text-[#C98A5B]">/</span> ATALICA STUDIO
          </p>
          {/* Restrained Descriptor */}
          <p className="hero-copy text-[#C98A5B] text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-montserrat font-medium mb-4 sm:mb-5" style={{ animationDelay: "45ms" }}>
            INTERIORS · CONSTRUCTION · DÉCOR
          </p>

          {/* Headline */}
          <h1 className="hero-copy font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white leading-[1.08] tracking-tight mb-5 sm:mb-6" style={{ animationDelay: "90ms" }}>
            Spaces that<br />
            <span className="italic">Inspire.</span>
          </h1>

          {/* Supporting copy */}
          <p className="hero-copy text-white/80 text-sm sm:text-base font-montserrat font-light leading-relaxed max-w-lg mb-8 sm:mb-10" style={{ animationDelay: "140ms" }}>
            Thoughtful interiors, considered materials, and craftsmanship tailored to the way you live.
          </p>

          {/* CTAs */}
          <div className="hero-copy flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6" style={{ animationDelay: "190ms" }}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-white hover:bg-[#F7F6F2] text-[#0D2B4C] text-[11px] uppercase tracking-[0.2em] font-montserrat font-semibold rounded-sm transition-colors duration-200 group shadow-sm"
            >
              <span>Explore Our Work</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/consultation"
              className="inline-flex items-center text-white/85 hover:text-white text-[11px] uppercase tracking-[0.2em] font-montserrat font-medium py-3 transition-colors duration-200 border-b border-white/30 hover:border-white"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </div>

      {/* Understated scroll hint */}
      <div className="absolute bottom-8 right-10 hidden lg:flex flex-col items-center gap-2 text-white/50 pointer-events-none">
        <span className="text-[9px] uppercase tracking-[0.25em] font-montserrat rotate-90 origin-center mb-6">
          Scroll to explore
        </span>
        <div className="hero-scroll-line w-px h-10 bg-[#C98A5B]/80 origin-top" />
      </div>
    </section>
  );
}
