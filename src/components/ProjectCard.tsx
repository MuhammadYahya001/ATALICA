import ResponsiveImage from "@/components/ResponsiveImage";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

const themes = [
  { panel: "bg-[#49372F] text-[#F7F4EE]", meta: "text-[#D6A17A]", line: "border-white/15", arrow: "border-white/35" },
  { panel: "bg-[#F7F5EF] text-[#1A1A1A]", meta: "text-[#A96D46]", line: "border-[#DAD6CE]", arrow: "border-[#B8B1A6]" },
  { panel: "bg-[#0D2B4C] text-[#F7F4EE]", meta: "text-[#D6A17A]", line: "border-white/15", arrow: "border-white/35" },
];

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const index = Number(project.id.split("-").at(-1)) || 1;
  const theme = themes[(index - 1) % themes.length];

  return (
    <article className={`portfolio-card-motion group overflow-hidden rounded-[22px] border border-black/[0.06] shadow-[0_12px_35px_rgba(32,27,22,0.07)] transition-shadow duration-500 hover:shadow-[0_20px_48px_rgba(32,27,22,0.12)] ${theme.panel}`}>
      <Link
        href={`/projects/${project.slug}`}
        className="flex min-h-[530px] flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C98A5B] sm:min-h-[550px]"
        aria-label={`View ${project.title}, ${project.categoryLabel} design reference`}
      >
        <div className="flex items-center justify-between border-b px-5 py-3.5 sm:px-6">
          <span className="font-montserrat text-[11px] font-semibold tracking-[0.18em]">ATALICA</span>
          <span className="font-montserrat text-[9px] uppercase tracking-[0.16em] opacity-65">{project.categoryLabel}</span>
        </div>

        <div className="px-5 pb-5 pt-6 sm:px-6 sm:pb-6 sm:pt-7">
          <div className="mb-3 flex items-center gap-2">
            <span className={`h-px w-5 ${theme.meta.replace("text-", "bg-")}`} aria-hidden="true" />
            <p className={`font-montserrat text-[9px] uppercase tracking-[0.22em] ${theme.meta}`}>Reference {String(index).padStart(2, "0")}</p>
          </div>
          <h2 className="max-w-[15ch] font-serif text-[27px] font-normal leading-[1.12] tracking-[-0.02em] sm:text-[30px]">{project.title}</h2>
          <p className="mt-3 max-w-[34ch] text-[12px] leading-[1.65] opacity-75 sm:text-[13px]">{project.description}</p>
        </div>

        <div className={`relative mx-3.5 mt-auto aspect-[1.38/1] overflow-hidden bg-[#E8E6E1] sm:mx-4 ${theme.line} border`}>
          <ResponsiveImage
            src={project.image}
            alt={`${project.categoryLabel} design reference: ${project.title}`}
            fill
            sizes="(max-width: 640px) calc(100vw - 52px), (max-width: 1024px) 44vw, 29vw"
            className={`${project.imageOrientation === "portrait" ? "object-contain" : "object-cover"} transition-transform duration-700 ease-out group-hover:scale-[1.035]`}
            priority={priority}
          />
          <span className="pointer-events-none absolute inset-0 bg-black/[0.025] transition-colors duration-300 group-hover:bg-transparent" />
        </div>

        <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-[18px]">
          <span className={`font-montserrat text-[9px] uppercase tracking-[0.16em] opacity-65 ${theme.meta}`}>Inspiration · {String(index).padStart(2, "0")} / 09</span>
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 group-hover:translate-x-1 group-hover:border-[#C98A5B] group-hover:bg-[#C98A5B] group-hover:text-white ${theme.arrow}`} aria-hidden="true">
            <ArrowUpRight size={15} strokeWidth={1.4} />
          </span>
        </div>
      </Link>
    </article>
  );
}
