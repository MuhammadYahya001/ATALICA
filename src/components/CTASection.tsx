import { ArrowRight } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import MagneticButton from "@/components/motion/MagneticButton";
import AtmosphereLayer from "@/components/atmosphere/AtmosphereLayer";

interface CTASectionProps {
  title?: string;
  description?: string;
  className?: string;
  statement?: string;
}

export default function CTASection({
  title = "Start a conversation about your space.",
  description = "Tell us a little about your plans and the services you are considering.",
  className = "",
  statement,
}: CTASectionProps) {
  return (
    <section className={`atmosphere-host relative isolate overflow-hidden py-24 sm:py-32 bg-[#081C33] text-white ${className}`}>
      <AtmosphereLayer tone="dark" blueprint grid />
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 text-center">
        {statement && <p className="mx-auto mb-16 max-w-4xl font-serif text-2xl leading-relaxed text-white/85 sm:text-4xl">{statement}</p>}
        <p className="text-[#DBA075] text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-montserrat font-medium mb-4">
          Consultation
        </p>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-[1.15] tracking-tight max-w-2xl mx-auto mb-6">
          {title}
        </h2>

        <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto mb-10">
          {description}
        </p>

        {/* Action Buttons — Restrained */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <MagneticButton
            href="/consultation"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C98A5B] hover:bg-[#DBA075] text-[#081C33] text-[11px] uppercase tracking-[0.2em] font-montserrat font-semibold rounded-sm transition-colors duration-200 group"
          >
            <span>Request a Consultation</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </MagneticButton>

          <WhatsAppButton variant="button" label="WhatsApp" className="bg-[#25D366] hover:bg-[#20BD59]" />
        </div>

        <p className="mt-8 text-[11px] text-white/45 font-light">Serving Multan, Islamabad & Rawalpindi.</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 border-t border-white/10 pt-7 text-xs text-white/70 sm:flex-row sm:gap-8">
          <a className="transition-colors hover:text-[#DBA075]" href="tel:03051755566">0305 1755566</a>
          <a className="transition-colors hover:text-[#DBA075]" href="mailto:official@atalica.com.pk">official@atalica.com.pk</a>
          <a className="transition-colors hover:text-[#DBA075]" href="mailto:official.atalica@gmail.com">official.atalica@gmail.com</a>
        </div>
      </div>
    </section>
  );
}
