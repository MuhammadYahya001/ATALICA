"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

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
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHomePage || isOpen
            ? "bg-white/97 backdrop-blur-md border-b border-[#E8E6E1]/80 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Logo size="sm" variant={scrolled || !isHomePage || isOpen ? "default" : "light"} />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                const isLight = !scrolled && isHomePage;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group text-[11px] tracking-[0.18em] uppercase font-montserrat font-medium transition-colors duration-200 relative py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C98A5B] ${
                      isActive
                        ? isLight ? "text-[#C98A5B]" : "text-[#C98A5B]"
                        : isLight
                          ? "text-white/90 hover:text-white"
                          : "text-[#1A1A1A] hover:text-[#C98A5B]"
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
              <Link
                href="/consultation"
                className={`hidden sm:inline-flex items-center text-[11px] tracking-[0.18em] uppercase font-montserrat font-medium px-5 py-2.5 rounded-sm transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C98A5B] ${
                  scrolled || !isHomePage
                    ? "bg-[#0D2B4C] hover:bg-[#C98A5B] text-white"
                    : "bg-white/15 hover:bg-white/25 text-white border border-white/25 backdrop-blur-sm"
                }`}
              >
                Start a Project
              </Link>

              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden p-2 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C98A5B] transition-colors ${
                  scrolled || !isHomePage || isOpen ? "text-[#0D2B4C]" : "text-white"
                }`}
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
          hidden={!isMenuRendered}
          aria-hidden={!isOpen}
          className={`lg:hidden absolute top-full left-0 right-0 bg-white border-b border-[#E8E6E1] overflow-hidden ${isOpen ? "mobile-menu-enter" : "mobile-menu-exit"}`}
        >
          <nav className="px-5 py-6 flex flex-col gap-1" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  tabIndex={isOpen ? 0 : -1}
                  className={`text-sm tracking-[0.16em] uppercase font-montserrat font-medium px-3 py-3 rounded-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C98A5B] ${
                    isActive
                      ? "text-[#C98A5B]"
                      : "text-[#1A1A1A] hover:text-[#C98A5B]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-4 pt-4 border-t border-[#E8E6E1]">
              <Link
                href="/consultation"
                tabIndex={isOpen ? 0 : -1}
                className="block w-full text-center py-3 bg-[#0D2B4C] hover:bg-[#C98A5B] text-white text-[11px] uppercase tracking-[0.2em] font-montserrat font-medium rounded-sm transition-colors"
              >
                Start a Project
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
