import type { Metadata } from "next";
import ResponsiveImage from "@/components/ResponsiveImage";
import CTASection from "@/components/CTASection";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About Raheel Raza",
  description:
    "Meet Raheel Raza, Founder of ATALICA. He brings over 15 years of hands-on experience. ATALICA serves Multan, Islamabad, and Rawalpindi.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About Raheel Raza | ATALICA", url: "/about" },
};

export default function AboutPage() {
  return (
    <div className="bg-[#F7F6F2] pt-28 sm:pt-36">
      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pb-16 sm:pb-24">
        <div className="max-w-3xl">
          <p className="text-[#C98A5B] text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-montserrat font-medium mb-5">
            About ATALICA
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#1A1A1A] leading-[1.08] tracking-tight mb-6">
            A quiet approach to residential craft.
          </h1>
          <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed max-w-xl">
            Founded by Raheel Raza, ATALICA brings together interior design, construction, and décor. Raheel has over 15 years of hands-on experience.
          </p>
        </div>
      </section>

      {/* Main Editorial Composition: Portrait & Philosophy */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pb-24 sm:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Portrait Column */}
          <ScrollReveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#E8E6E1]">
              <ResponsiveImage
                src="/images/optimized/founder/raheel.webp"
                alt="Raheel Raza, Founder & Principal of ATALICA"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top"
              />
            </div>
            <div className="mt-5 space-y-1">
              <span className="font-serif text-xl text-[#1A1A1A] block">Raheel Raza</span>
              <span className="text-[11px] text-[#C98A5B] uppercase tracking-[0.2em] font-montserrat font-medium block">
                Founder & Principal
              </span>
              <p className="text-xs text-gray-500 font-light pt-1">
                15+ years of hands-on experience.
              </p>
            </div>
          </ScrollReveal>

          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-8 border-t border-[#E8E6E1] pt-8 lg:border-t-0 lg:pt-0">
            <div className="space-y-5 text-gray-700 text-sm sm:text-base font-light leading-relaxed">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-normal">
                Hands-on experience in design and construction.
              </h2>
              <p>
                With 15+ years of hands-on experience in interior design and residential construction, Raheel brings practical knowledge and attention to detail to ATALICA.
              </p>
              <p>
                ATALICA works across interior design, construction, and décor.
              </p>
              <p className="font-serif italic text-lg sm:text-xl text-[#0D2B4C] border-l border-[#C98A5B] pl-5 py-2 my-6">
                Thoughtful design can make a space feel like home and function naturally.
              </p>
              <p>
                ATALICA’s work brings interior design, construction, and décor together for residential spaces.
              </p>
            </div>

            {/* Principles — Clean text list */}
            <div className="pt-6 border-t border-[#E8E6E1] space-y-5">
              <p className="text-[#C98A5B] text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-montserrat font-medium">
                Our Core Principles
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-lg text-[#1A1A1A] mb-1">Thoughtful Design</h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                    Consider the ways people use a space each day.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#1A1A1A] mb-1">Practical Planning</h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                    Plan around the needs and scope of each project.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#1A1A1A] mb-1">Skilled Craftsmanship</h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                    Give care to materials, workmanship, and finishing.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#1A1A1A] mb-1">Clear Communication</h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                    Keep communication clear throughout the design process.
                  </p>
                </div>
              </div>
            </div>

            {/* Service Locations */}
            <div className="pt-6 border-t border-[#E8E6E1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-light text-gray-600">
              <div>
                <span className="font-medium text-[#1A1A1A] block">Current Service Areas:</span>
                <span>Multan · Islamabad · Rawalpindi</span>
              </div>
              <a
                href={getWhatsAppUrl("Hi Raheel, I would like to discuss a project.")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C98A5B] hover:underline font-montserrat uppercase tracking-[0.18em] text-[11px] font-medium"
              >
                Message Raheel on WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </div>
  );
}
