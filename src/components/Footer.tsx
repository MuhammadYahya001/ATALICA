import Link from "next/link";
import Logo from "./Logo";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#081C33] text-white border-t border-[#0D2B4C]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14">
          {/* Brand & Statement */}
          <div className="lg:col-span-5 space-y-5">
            <Logo variant="light" size="md" />
            <p className="text-white/60 text-sm font-light leading-relaxed max-w-sm pt-2">
              Interior design, construction, and décor across Multan, Islamabad, and Rawalpindi.
            </p>
            <p className="text-[11px] text-[#C98A5B] uppercase tracking-[0.2em] font-montserrat font-medium">
              Multan · Islamabad · Rawalpindi
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-[10px] uppercase tracking-[0.25em] font-montserrat font-semibold text-white/40">
              Studio
            </p>
            <ul className="space-y-2.5 text-xs font-montserrat uppercase tracking-[0.16em] text-white/70">
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Raheel Raza
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="hover:text-white transition-colors">
                  Start a Project
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-[10px] uppercase tracking-[0.25em] font-montserrat font-semibold text-white/40">
              Direct Contact
            </p>
            <div className="space-y-3 text-xs font-light text-white/75">
              <div>
                <span className="block text-white/40 text-[10px] uppercase tracking-[0.2em] font-montserrat mb-0.5">
                  Phone
                </span>
                <a href="tel:03051755566" className="text-white hover:text-[#C98A5B] transition-colors font-mono">
                  0305 1755566
                </a>
              </div>
              <div>
                <span className="block text-white/40 text-[10px] uppercase tracking-[0.2em] font-montserrat mb-0.5">
                  Email
                </span>
                <a href="mailto:official@atalica.com.pk" className="text-white hover:text-[#C98A5B] transition-colors">
                  official@atalica.com.pk
                </a>
              </div>
              <div>
                <span className="block text-white/40 text-[10px] uppercase tracking-[0.2em] font-montserrat mb-0.5">
                  WhatsApp
                </span>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:underline"
                >
                  Direct message link
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-white/40 font-light">
          <p>© {currentYear} ATALICA. Interiors · Construction · Décor.</p>
          <p className="text-[#C98A5B]/70">Raheel Raza · Founder · 15+ years of hands-on experience</p>
        </div>
      </div>
    </footer>
  );
}
