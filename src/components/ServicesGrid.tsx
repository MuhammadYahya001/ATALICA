import ResponsiveImage from "@/components/ResponsiveImage";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Service } from "@/lib/services";

interface ServicesGridProps {
  services: Service[];
  showDetails?: boolean;
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
      {services.map((service, idx) => (
        <article
          key={service.id}
          className="group flex flex-col justify-between border-t border-[#E8E6E1] pt-8"
        >
          <div>
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-[10px] text-[#C98A5B] font-montserrat tracking-[0.25em] font-medium">
                0{idx + 1}
              </span>
              <span className="text-[10px] text-gray-400 font-montserrat tracking-[0.2em] uppercase">
                Service
              </span>
            </div>

            {/* Image — clean editorial ratio */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E8E6E1] mb-6">
              <ResponsiveImage
                src={service.image}
                alt={`${service.title} project photograph by ATALICA`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>

            <h3 className="font-serif text-2xl text-[#1A1A1A] font-normal leading-snug mb-3 group-hover:text-[#0D2B4C] transition-colors">
              {service.title}
            </h3>

            <p className="text-gray-600 text-sm font-light leading-relaxed mb-6">
              {service.shortDesc}
            </p>
          </div>

          <div className="pt-2">
            <Link
              href={`/consultation?service=${service.slug}`}
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] font-montserrat font-medium text-[#1A1A1A] group-hover:text-[#C98A5B] transition-colors"
            >
              <span>Enquire</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
