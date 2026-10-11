import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ResponsiveImage from "@/components/ResponsiveImage";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import ScrollReveal from "@/components/ScrollReveal";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProjects().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found | ATALICA" };

  return {
    title: project.title,
    description: `${project.categoryLabel} design reference from the ATALICA inspiration gallery.`,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} | ATALICA Design Inspiration`,
      description: `A ${project.categoryLabel.toLowerCase()} design reference from the ATALICA inspiration gallery.`,
      url: `/projects/${project.slug}`,
      images: [{ url: project.image, alt: `${project.categoryLabel} design reference` }],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const projects = getAllProjects();
  const index = projects.findIndex((item) => item.id === project.id);
  const previous = projects[index - 1];
  const next = projects[index + 1];

  return (
    <div className="bg-[#F7F6F2] pt-28 sm:pt-36">
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pb-10 sm:pb-14">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-montserrat font-medium text-gray-500 hover:text-[#1A1A1A] transition-colors mb-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C98A5B]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Projects</span>
        </Link>
        <div className="max-w-4xl space-y-4">
          <p className="text-[#C98A5B] text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-montserrat font-medium">
            Design inspiration <span className="px-2 text-[#C98A5B]/50">/</span> {String(index + 1).padStart(2, "0")} ? 09
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#1A1A1A] leading-[1.1] tracking-tight">
            {project.title}
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pb-20 sm:pb-28">
        <ScrollReveal className={`relative w-full overflow-hidden rounded-[24px] bg-[#E8E6E1] sm:rounded-[34px] ${project.imageOrientation === "portrait" ? "mx-auto max-w-4xl aspect-[3/4]" : "aspect-[4/3] sm:aspect-[16/9]"}`}>
          <ResponsiveImage
            src={project.image}
            alt={`${project.categoryLabel} design reference: ${project.title}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 90vw"
            className="object-cover"
          />
        </ScrollReveal>
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E6E1] pb-6">
          <p className="text-xs text-gray-500 font-light">{project.categoryLabel}</p>
          <p className="text-[10px] text-gray-400 font-montserrat uppercase tracking-[0.18em]">ATALICA ? Design Inspiration</p>
        </div>

        <nav aria-label="Project navigation" className="mt-8 grid grid-cols-2 gap-6">
          {previous ? (
            <Link href={`/projects/${previous.slug}`} className="group justify-self-start max-w-full">
              <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-gray-400 font-montserrat mb-2">
                <ArrowLeft className="h-3 w-3" /> Previous
              </span>
              <span className="font-serif text-base sm:text-xl text-[#1A1A1A] group-hover:text-[#C98A5B] transition-colors">{previous.title}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/projects/${next.slug}`} className="group justify-self-end text-right max-w-full">
              <span className="flex items-center justify-end gap-2 text-[9px] uppercase tracking-[0.2em] text-gray-400 font-montserrat mb-2">
                Next <ArrowRight className="h-3 w-3" />
              </span>
              <span className="font-serif text-base sm:text-xl text-[#1A1A1A] group-hover:text-[#C98A5B] transition-colors">{next.title}</span>
            </Link>
          ) : <span />}
        </nav>
      </section>
    </div>
  );
}
