import ResponsiveImage from "@/components/ResponsiveImage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function FounderSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF9F6] border-t border-[#E8E6E1]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Portrait — Clean, quiet architectural presentation */}
          <ScrollReveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] max-w-md mx-auto overflow-hidden bg-[#E8E6E1]">
              <ResponsiveImage
                src="/images/optimized/founder/raheel.webp"
                alt="Raheel Raza, Founder & Principal of ATALICA"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top"
              />
            </div>
            <div className="mt-4 text-center lg:text-left">
              <span className="font-serif text-lg text-[#1A1A1A] block">Raheel Raza</span>
              <span className="text-[11px] text-[#C98A5B] uppercase tracking-[0.2em] font-montserrat font-medium">
                Founder & Principal
              </span>
            </div>
          </ScrollReveal>

          {/* Narrative — Restrained, personal, articulate */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-[#C98A5B] text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-montserrat font-medium">
              Leadership & Craftsmanship
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] leading-[1.15] tracking-tight">
              A studio shaped by hands-on experience.
            </h2>

            <div className="space-y-4 text-gray-600 text-sm sm:text-base font-light leading-relaxed max-w-xl">
              <p>
                With 15+ years of hands-on experience, Raheel Raza brings practical knowledge of interior design and construction to ATALICA.
              </p>
              <p>
                ATALICA’s approach brings design, construction, and finishing together with attention to the needs of each space.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-montserrat font-medium text-[#1A1A1A] hover:text-[#C98A5B] transition-colors group"
              >
                <span>Read Raheel’s full story</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
