import type { Metadata } from "next";
import ProjectGallery from "@/components/ProjectGallery";
import CTASection from "@/components/CTASection";
import { getAllProjects } from "@/lib/projects";
import SplitText from "@/components/motion/SplitText";
import ProjectsCounter from "@/components/ProjectsCounter";
import AtmosphereLayer from "@/components/atmosphere/AtmosphereLayer";
import AtmosphereSection from "@/components/atmosphere/AtmosphereSection";

export const metadata: Metadata = {
  title: "Design Inspiration",
  description:
    "A visual gallery of interior spaces and architectural details for design inspiration.",
  alternates: { canonical: "/projects" },
  openGraph: { title: "Design Inspiration | ATALICA", url: "/projects" },
};

export default function ProjectsPage() {
  const allProjects = getAllProjects();

  return (
    <div className="bg-[#F7F6F2] pt-28 sm:pt-36">
      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pb-14 sm:pb-20">
        <div className="max-w-3xl">
          <p className="text-[#0D2B4C] text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-montserrat font-medium mb-5">
            Design Inspiration
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#1A1A1A] leading-[1.08] tracking-tight mb-6">
            <SplitText text="Spaces shaped with intention." />
          </h1>
          <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed max-w-xl">
            A visual gallery of interiors and architectural details. Images are shared as design references; project provenance has not been confirmed.
          </p>
        </div>
      </section>

      <AtmosphereSection className="mx-6 mb-14 overflow-hidden py-8 sm:mx-10 sm:mb-20 lg:mx-auto lg:max-w-7xl lg:px-14" tone="light" ghost="50" blueprint>
        <ProjectsCounter variant="light" className="px-5 py-6 sm:px-8 sm:py-8" />
      </AtmosphereSection>

      {/* Main Gallery Section */}
      <section className="atmosphere-host relative isolate overflow-hidden max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pb-28 sm:pb-36">
        <AtmosphereLayer grid marks />
        <ProjectGallery projects={allProjects} initialCategory="all" />
      </section>

      {/* Quiet CTA */}
      <CTASection
        title="Planning a project?"
        description="Tell us about the space you have in mind."
      />
    </div>
  );
}
