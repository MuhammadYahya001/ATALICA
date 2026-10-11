import type { Metadata } from "next";
import ConsultationForm from "@/components/ConsultationForm";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Contact ATALICA about a residential interior design or construction inquiry in Multan, Islamabad, or Rawalpindi.",
  alternates: { canonical: "/consultation" },
  openGraph: { title: "Start a Project with ATALICA", url: "/consultation" },
};

export default async function ConsultationPage({
  searchParams,
}: {
  searchParams?: Promise<{ service?: string; project?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const serviceValues: Record<string, string> = {
    "interior-design": "Interior Design",
    construction: "Construction",
    "decor-and-styling": "Décor & Styling",
  };
  const initialService = resolvedSearchParams?.service
    ? serviceValues[resolvedSearchParams.service] || ""
    : "";

  return (
    <div className="bg-[#F7F6F2] pt-28 sm:pt-36 pb-24 sm:pb-36 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 sm:px-10">
        {/* Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <p className="text-[#C98A5B] text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-montserrat font-medium mb-4">
            Consultation
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1A1A1A] leading-[1.1] tracking-tight mb-5">
            Let’s talk about your space.
          </h1>
          <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed">
            Every project begins with a conversation. Tell us a little about your plans and what you are considering.
          </p>
        </div>

        {/* Form */}
        <ConsultationForm initialService={initialService} />

        {/* Alternative contact method */}
        <div className="mt-12 text-center text-xs text-gray-400 font-light max-w-xl mx-auto space-y-2">
          <p>
            Prefer direct messaging?{" "}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0D2B4C] hover:text-[#C98A5B] underline"
            >
              Reach out directly on WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
