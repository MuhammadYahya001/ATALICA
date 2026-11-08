import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import SplitText from "@/components/motion/SplitText";
import AtmosphereLayer from "@/components/atmosphere/AtmosphereLayer";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact ATALICA about interior design, construction, and décor in Multan, Islamabad, or Rawalpindi.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact ATALICA", url: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="atmosphere-host relative isolate overflow-hidden bg-[#081C33] pt-28 text-white sm:pt-36">
      <AtmosphereLayer tone="dark" ghost="Contact" blueprint grid />
      {/* Editorial Header */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pb-20 sm:pb-28">
        <div className="max-w-3xl">
          <p className="text-[#DBA075] text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-montserrat font-medium mb-5">
            Get in Touch
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white leading-[1.08] tracking-tight mb-6">
            <SplitText text="Contact the Studio." />
          </h1>
          <p className="text-white/75 text-sm sm:text-base font-light leading-relaxed max-w-xl">
            Contact us about interior design, construction, and décor across Multan, Islamabad, and Rawalpindi.
          </p>
        </div>
      </section>

      {/* Direct Contact Grid — Minimal, clean, quiet luxury */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pb-28 sm:pb-36 border-t border-white/15 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
          {/* Phone */}
          <div className="space-y-3">
            <span className="text-[10px] text-[#DBA075] uppercase tracking-[0.25em] font-montserrat font-medium block">
              Telephone
            </span>
            <a
              href="tel:03051755566"
              className="font-serif text-2xl sm:text-3xl text-white hover:text-[#DBA075] transition-colors block"
            >
              0305 1755566
            </a>
          </div>

          {/* Email */}
          <div className="space-y-3">
            <span className="text-[10px] text-[#DBA075] uppercase tracking-[0.25em] font-montserrat font-medium block">
              Official Email
            </span>
            <a
              href="mailto:official@atalica.com.pk"
              className="font-serif text-xl sm:text-2xl text-white hover:text-[#DBA075] transition-colors block break-all"
            >
              official@atalica.com.pk
            </a>
            <a
              href="mailto:official.atalica@gmail.com"
              className="font-serif text-xl sm:text-2xl text-white hover:text-[#DBA075] transition-colors block break-all"
            >
              official.atalica@gmail.com
            </a>
            <p className="text-xs text-white/65 font-light leading-relaxed">
              Send floor plans, drawings, or project scopes directly.
            </p>
          </div>

          {/* WhatsApp */}
          <div className="space-y-3">
            <span className="text-[10px] text-[#DBA075] uppercase tracking-[0.25em] font-montserrat font-medium block">
              WhatsApp
            </span>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-serif text-2xl sm:text-3xl text-[#25D366] hover:underline"
            >
              <span>+92 305 1755566</span>
              <ArrowUpRight className="w-5 h-5 text-white/50" />
            </a>
          </div>
        </div>

        {/* Coverage Statement & Project Consultation link */}
        <div className="mt-20 pt-16 border-t border-white/15 grid grid-cols-1 lg:grid-cols-12 gap-10 items-baseline">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-[10px] text-[#DBA075] uppercase tracking-[0.25em] font-montserrat font-medium block">
              Service Areas
            </span>
            <h3 className="font-serif text-2xl text-white">
              Multan · Islamabad · Rawalpindi
            </h3>
          </div>
          <div className="lg:col-span-6 text-left lg:text-right space-y-2">
            <span className="text-[10px] text-[#DBA075] uppercase tracking-[0.25em] font-montserrat font-medium block">
              Consultation Form
            </span>
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 text-sm font-serif text-white hover:text-[#DBA075] transition-colors border-b border-white/40 pb-1"
            >
              <span>Submit a detailed project enquiry online</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
