import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import FounderSection from "@/components/FounderSection";
import CTASection from "@/components/CTASection";
import { getFeaturedProjects } from "@/lib/projects";
import { getAllServices } from "@/lib/services";
import Marquee from "@/components/motion/Marquee";
import ScrollReveal, { CardGrid, CardReveal } from "@/components/motion/Reveal";
import ProjectsCounter from "@/components/ProjectsCounter";
import Counter from "@/components/motion/Counter";
import AtmosphereLayer from "@/components/atmosphere/AtmosphereLayer";
import AtmosphereSection from "@/components/atmosphere/AtmosphereSection";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects().slice(0, 4);
  const services = getAllServices().slice(0, 3);

  return (
    <div className="bg-[#F7F6F2]">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Editorial Philosophy Statement */}
      <section className="py-24 sm:py-36 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <ScrollReveal className="max-w-3xl">
            <p className="text-[#0D2B4C] text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-montserrat font-medium mb-6">
              Our Approach
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#1A1A1A] leading-[1.12] tracking-tight mb-8">
              <span className="scroll-text-fill">Architecture, craftsmanship, and the quiet dignity of a well-made home.</span>
            </h2>
            <div className="space-y-5 text-gray-600 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
              <p>
                ATALICA offers interior design, construction, and décor services across Multan, Islamabad, and Rawalpindi.
              </p>
              <p>
                Founded by Raheel Raza, who brings over 15 years of hands-on experience, ATALICA offers a considered approach to interior design, construction, and décor.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Marquee />

      <AtmosphereSection className="overflow-hidden bg-[#081C33] py-10 text-white sm:py-14" tone="dark" ghost="50" blueprint grid wordmark>
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 divide-y divide-[#DBA075]/30 px-6 sm:px-10 lg:grid-cols-2 lg:divide-x lg:divide-y-0 lg:px-14">
          <ProjectsCounter variant="dark" className="flex min-h-52 items-center justify-center px-2 py-8 sm:px-8" />
          <div className="flex min-h-52 flex-col items-center justify-center px-2 py-8 text-center sm:px-8" role="img" aria-label="More than 15 years of hands-on experience">
            <p className="font-serif text-6xl leading-none text-[#DBA075] sm:text-7xl" aria-hidden="true">
              <Counter value={15} suffix="+" />
            </p>
            <p className="mt-4 font-montserrat text-[10px] font-medium uppercase tracking-[0.24em] sm:text-[11px]">Years of Experience</p>
            <p className="mt-2 max-w-sm text-xs leading-relaxed text-white/75 sm:text-sm">Raheel Raza brings over 15 years of hands-on experience.</p>
          </div>
        </div>
        <div className="relative z-10 mt-5"><Marquee variant="outlined" /></div>
      </AtmosphereSection>

      {/* 3. Selected project gallery */}
      <section className="atmosphere-host relative isolate overflow-hidden py-24 sm:py-32 bg-[#F7F6F2]">
        <AtmosphereLayer ghost="Projects" grid marks />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 sm:mb-20 gap-6">
            <div>
              <p className="text-[#0D2B4C] text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-montserrat font-medium mb-3">
                Selected Work
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] tracking-tight">
                A selection of our work
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-montserrat font-medium text-[#1A1A1A] hover:text-[#C98A5B] transition-colors group"
            >
              <span>View all projects</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <p className="-mt-9 mb-10 max-w-2xl text-xs sm:text-sm text-gray-500 font-light leading-relaxed">
            Residential interiors, considered materials, and crafted details.
          </p>

          {/* Asymmetric 2-column layout */}
          <CardGrid className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 lg:gap-16">
            {featuredProjects.map((project, idx) => (
              <CardReveal key={project.id} index={idx}>
                <div className={idx % 2 === 1 ? "md:translate-y-12" : ""}>
                <ProjectCard
                  project={project}
                  priority={idx < 2}
                />
                </div>
              </CardReveal>
            ))}
          </CardGrid>
        </div>
      </section>

      {/* 4. Services Overview — Minimal numbered list */}
      <section className="atmosphere-host relative isolate overflow-hidden py-24 sm:py-32 bg-[#FAF9F6] border-t border-[#E8E6E1]">
        <AtmosphereLayer blueprint grid index="01" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-[#0D2B4C] text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-montserrat font-medium mb-3">
                Capabilities
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] tracking-tight">
                Considered design. Thoughtful execution.
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-montserrat font-medium text-[#1A1A1A] hover:text-[#C98A5B] transition-colors group"
            >
              <span>All services</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <CardGrid className="services-grid divide-y divide-[#E8E6E1]">
            {services.map((service, idx) => (
              <CardReveal key={service.id} index={idx}>
                <article className="service-card service-light-target py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline group">
                  <span className="card-index lg:col-span-1 text-[11px] text-[#0D2B4C] font-montserrat tracking-[0.25em]">
                    0{idx + 1}
                  </span>
                  <h3 className="service-card-title lg:col-span-4 font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-normal group-hover:text-[#0D2B4C] transition-colors">
                    {service.title}
                  </h3>
                  <p className="service-card-description lg:col-span-5 text-gray-600 text-sm font-light leading-relaxed">
                    {service.shortDesc}
                  </p>
                  <div className="lg:col-span-2 text-left lg:text-right">
                    <Link
                      href={`/services#${service.slug}`}
                      className="service-card-link inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-montserrat font-medium text-gray-400 group-hover:text-[#C98A5B] transition-colors"
                    >
                      <span>Details</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </article>
              </CardReveal>
            ))}
          </CardGrid>
        </div>
      </section>

      {/* 6. Founder Section */}
      <FounderSection />

      {/* 7. Quiet Luxury CTA */}
      <CTASection statement="Architecture, craftsmanship, and the quiet dignity of a well-made home." />
    </div>
  );
}
