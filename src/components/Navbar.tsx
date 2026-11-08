"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import MagneticButton from "@/components/motion/MagneticButton";

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuRendered, setIsMenuRendered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const mobileNavigationRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    let previousY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 40);
      setHidden(!isOpen && currentY > 120 && currentY > previousY + 3);
      if (currentY < 40 || currentY < previousY - 3) setHidden(false);
      previousY = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = mobileNavigationRef.current;
    const firstControl = dialog?.querySelector<HTMLElement>("button, a[href]");
    firstControl?.focus();
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('a[href]:not([tabindex="-1"]), button:not([disabled])'));
      if (!focusable.length) return;
      if (event.shiftKey && document.activeElement === focusable[0]) {
        event.preventDefault();
        focusable[focusable.length - 1].focus();
      } else if (!event.shiftKey && document.activeElement === focusable[focusable.length - 1]) {
        event.preventDefault();
        focusable[0].focus();
      }
    };
    document.addEventListener("keydown", trapFocus);
    return () => document.removeEventListener("keydown", trapFocus);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsMenuRendered(true);
      return;
    }

    const timeout = window.setTimeout(() => setIsMenuRendered(false), 260);
    return () => window.clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const isHomePage = pathname === "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${hidden && !isOpen ? "-translate-y-full" : "translate-y-0"} ${
          scrolled || !isHomePage || isOpen
            ? "bg-[#081C33]/95 backdrop-blur-md border-b border-white/10 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Logo size="sm" variant="light" />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group text-[11px] tracking-[0.18em] uppercase font-montserrat font-medium transition-colors duration-200 relative py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C98A5B] ${
                      isActive ? "text-[#DBA075]" : "text-white/85 hover:text-[#DBA075]"
                    }`}
                  >
                    {link.label}
                    <span className={`absolute -bottom-0.5 left-0 right-0 h-px bg-[#C98A5B] origin-left transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"}`} />
                  </Link>
                );
              })}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-4">
              <MagneticButton
                href="/consultation"
                className="hidden sm:inline-flex items-center text-[11px] tracking-[0.18em] uppercase font-montserrat font-medium px-5 py-2.5 rounded-sm transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C98A5B] bg-[#C98A5B] hover:bg-[#DBA075] text-[#081C33]"
              >
                Start a Project
              </MagneticButton>

              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C98A5B] transition-colors"
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-navigation"
          ref={mobileNavigationRef}
          hidden={!isMenuRendered}
          aria-hidden={!isOpen}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={`mobile-navigation lg:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 overflow-y-auto bg-[#081C33] text-white ${isOpen ? "mobile-menu-enter" : "mobile-menu-exit"}`}
        >
          <nav className="mx-auto flex min-h-full max-w-xl flex-col px-8 py-12" aria-label="Mobile Navigation">
            <button type="button" onClick={() => setIsOpen(false)} className="mb-6 self-end text-[10px] uppercase tracking-[0.2em] text-white/65 hover:text-[#DBA075] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C98A5B]">
              Close menu
            </button>
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  tabIndex={isOpen ? 0 : -1}
                  style={{ animationDelay: `${NAV_LINKS.indexOf(link) * 70}ms` }}
                  className={`mobile-nav-link font-serif text-3xl sm:text-4xl py-3 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C98A5B] ${
                    isActive
                      ? "text-[#DBA075]"
                      : "text-white hover:text-[#DBA075]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-auto border-t border-white/15 pt-8">
              <Link
                href="/consultation"
                tabIndex={isOpen ? 0 : -1}
                className="block w-full border border-[#C98A5B] py-4 text-center text-[11px] uppercase tracking-[0.2em] font-montserrat font-medium text-[#DBA075] transition-colors hover:bg-[#C98A5B] hover:text-[#081C33]"
              >
                Start a Project
              </Link>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-[11px] text-white/65">
                <a href="tel:03051755566">0305 1755566</a>
                <a href="mailto:official@atalica.com.pk">official@atalica.com.pk</a>
                <a href="mailto:official.atalica@gmail.com">official.atalica@gmail.com</a>
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="text-[#DBA075]">WhatsApp</a>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
