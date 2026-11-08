import type { Metadata } from "next";
import Link from "next/link";
import ResponsiveImage from "@/components/ResponsiveImage";
import { ArrowUpRight } from "lucide-react";
import { getAllServices } from "@/lib/services";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import ImageReveal from "@/components/motion/ImageReveal";
import AtmosphereLayer from "@/components/atmosphere/AtmosphereLayer";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore ATALICA's interior design, construction, and décor services in Multan, Islamabad, and Rawalpindi.",
  alternates: { canonical: "/services" },
  openGraph: { title: "Services | ATALICA", url: "/services" },
};

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <div className="bg-[#F7F6F2]">
      <section className="relative flex h-[82svh] min-h-[620px] max-h-[980px] w-full items-end overflow-hidden bg-[#0D2B4C] sm:min-h-[680px]">
        <div className="absolute inset-0">
          <ResponsiveImage
            src="/images/optimized/projects/livingroom5.webp"
            alt="ATALICA living room interior with detailed wall moulding and tailored seating"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[58%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#081C33]/60 via-[#081C33]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081C33]/75 via-[#081C33]/15 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl px-6 pb-14 pt-28 sm:px-10 sm:pb-20 lg:px-14 lg:pb-24">
          <div className="max-w-3xl">
            <h1 className="font-serif text-[clamp(2.75rem,7vw,6.25rem)] font-normal leading-[1.04] tracking-tight text-white">
              <SplitText text="Considered design." /><br />
              <span className="italic"><SplitText text="Thoughtful execution." /></span>
            </h1>
            <p className="mt-6 max-w-xl font-montserrat text-sm font-light leading-relaxed text-white/85 sm:mt-7 sm:text-base">
              From interior design to construction and finishing details, we bring a considered approach to residential spaces.
            </p>
            <p className="mt-5 font-montserrat text-[9px] font-medium uppercase tracking-[0.2em] text-[#E5B38D] sm:text-[10px] sm:tracking-[0.24em]">
              Multan <span className="px-1.5 text-[#C98A5B]">·</span> Islamabad <span className="px-1.5 text-[#C98A5B]">·</span> Rawalpindi
            </p>
          </div>
        </div>
      </section>

      <section className="atmosphere-host relative isolate overflow-hidden border-t border-[#E8E6E1] bg-[#FAF9F6] py-20 sm:py-28">
        <AtmosphereLayer blueprint grid index="01" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="divide-y divide-[#E8E6E1]">
            {services.map((service, idx) => (
              <ScrollReveal key={service.id} delay={idx * 75}>
                <article
                  id={service.slug}
                  className={`atmosphere-host relative isolate group grid scroll-mt-24 grid-cols-1 items-center gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-14 ${idx % 2 === 0 ? "bg-[#F7F6F2]" : "bg-[#E8E6E1]"}`}
                >
                  <AtmosphereLayer blueprint index={`0${idx + 1}`} />
                  <div className="space-y-4 lg:col-span-5">
                    <span className="block font-montserrat text-[11px] tracking-[0.25em] text-[#0D2B4C]">
                      0{idx + 1}
                    </span>
                    <h2 className="font-serif text-3xl font-normal leading-tight text-[#1A1A1A] transition-colors group-hover:text-[#0D2B4C] sm:text-4xl">
                      {service.title}
                    </h2>
                    <p className="pt-2 text-sm font-light leading-relaxed text-gray-600 sm:text-base">
                      {service.shortDesc}
                    </p>
                    <p className="text-xs font-light leading-relaxed text-gray-500">
                      {service.fullDesc}
                    </p>
                    <div className="pt-4">
                      <Link
                        href={`/consultation?service=${service.slug}`}
                        className="inline-flex items-center gap-2 border-b border-[#1A1A1A]/30 pb-1 font-montserrat text-[11px] font-medium uppercase tracking-[0.2em] text-[#1A1A1A] transition-colors hover:text-[#C98A5B]"
                      >
                        <span>Discuss {service.title}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                  <div className="relative aspect-[16/10] overflow-hidden bg-[#E8E6E1] lg:col-span-7">
                    <ImageReveal className="absolute inset-0">
                      <ResponsiveImage
                        src={service.image}
                        alt={`${service.title} design inspiration image`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      />
                    </ImageReveal>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Tell us about your upcoming project."
        description="Tell us about the space or project you have in mind."
      />
    </div>
  );
}
