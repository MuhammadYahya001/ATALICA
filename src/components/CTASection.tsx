import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

interface CTASectionProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function CTASection({
  title = "Start a conversation about your space.",
  description = "Tell us a little about your plans and the services you are considering.",
  className = "",
}: CTASectionProps) {
  return (
    <section className={`py-24 sm:py-32 bg-[#FAF9F6] border-t border-[#E8E6E1] ${className}`}>
      <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center">
        <p className="text-[#C98A5B] text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-montserrat font-medium mb-4">
          Consultation
        </p>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] leading-[1.15] tracking-tight max-w-2xl mx-auto mb-6">
          {title}
        </h2>

        <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto mb-10">
          {description}
        </p>

        {/* Action Buttons — Restrained */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            href="/consultation"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0D2B4C] hover:bg-[#C98A5B] text-white text-[11px] uppercase tracking-[0.2em] font-montserrat font-medium rounded-sm transition-colors duration-200 group"
          >
            <span>Request a Consultation</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center text-[11px] uppercase tracking-[0.2em] font-montserrat font-medium text-gray-600 hover:text-[#0D2B4C] py-3.5 transition-colors border-b border-gray-300 hover:border-[#0D2B4C]"
          >
            Or message on WhatsApp
          </a>
        </div>

        <p className="mt-8 text-[11px] text-gray-400 font-light">
            Serving Multan, Islamabad & Rawalpindi.
        </p>
      </div>
    </section>
  );
}
