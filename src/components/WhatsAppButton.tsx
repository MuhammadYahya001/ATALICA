"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/whatsapp";

interface WhatsAppButtonProps {
  variant?: "floating" | "button" | "inline";
  customMessage?: string;
  className?: string;
  label?: string;
}

export default function WhatsAppButton({
  variant = "floating",
  customMessage = DEFAULT_WHATSAPP_MESSAGE,
  className = "",
  label = "Chat on WhatsApp",
}: WhatsAppButtonProps) {
  const [visible, setVisible] = useState(false);
  const waUrl = getWhatsAppUrl(customMessage);

  useEffect(() => {
    if (variant !== "floating") return;
    const update = () => setVisible(window.scrollY > 240);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [variant]);

  if (variant === "button") {
    return (
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-montserrat font-medium text-xs tracking-wider uppercase rounded-sm transition-colors ${className}`}
        aria-label="Direct message ATALICA on WhatsApp"
      >
        <MessageCircle className="w-4 h-4 fill-current" />
        <span>{label}</span>
      </a>
    );
  }

  if (variant === "inline") {
    return (
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 text-[#25D366] hover:text-[#1EA851] font-montserrat font-medium text-xs tracking-wider uppercase transition-colors ${className}`}
        aria-label="Direct message ATALICA on WhatsApp"
      >
        <MessageCircle className="w-4 h-4 fill-current" />
        <span>{label}</span>
      </a>
    );
  }

  // Floating button: discreet, clean, bottom-right with sufficient bottom spacing to avoid covering forms/footers
  return (
    <aside aria-label="Quick WhatsApp contact" aria-hidden={!visible} className={`whatsapp-float fixed bottom-5 right-5 z-40 ${visible ? "is-visible" : ""}`}>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-11 h-11 bg-[#25D366] hover:bg-[#20BD59] text-white rounded-full shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60"
        aria-label="Contact Raheel Raza directly on WhatsApp at 0305 1755566"
        tabIndex={visible ? 0 : -1}
      >
        <MessageCircle className="w-6 h-6 fill-white text-white" />
      </a>
    </aside>
  );
}
