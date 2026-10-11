import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Information collected through ATALICA’s consultation form and how the site handles inquiries.",
  alternates: { canonical: "/privacy" },
  openGraph: { title: "Privacy Policy | ATALICA", url: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#F7F6F2] pt-28 sm:pt-36 pb-24 sm:pb-36 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        <div className="bg-white p-8 sm:p-14 border border-[#E8E6E1] space-y-8">
          <div>
            <p className="text-[#C98A5B] text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-montserrat font-medium mb-3">
              Transparency
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal">
              Privacy Policy
            </h1>
          </div>

          <div className="space-y-6 text-gray-700 text-sm font-light leading-relaxed border-t border-[#E8E6E1] pt-6">
            <section className="space-y-2">
              <h2 className="font-serif text-xl text-[#1A1A1A] font-normal">
                1. What Information We Collect
              </h2>
              <p>
                When you submit a consultation request on ATALICA (atalica.com.pk), we collect:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
                <li>Your name</li>
                <li>Your phone / WhatsApp contact number</li>
                <li>Your email address (if provided)</li>
                <li>Your project city (Multan, Islamabad, or Rawalpindi)</li>
                <li>Your project type and any optional budget estimate or written notes you provide</li>
                <li>Your preferred contact method. A connection address may be used temporarily for abuse rate limiting and is not saved with the inquiry.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-xl text-[#1A1A1A] font-normal">
                2. Why We Collect This Information
              </h2>
              <p>We use the information to:</p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
                <li>Review and respond to your inquiry.</li>
                <li>Understand the service and location you asked about.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-xl text-[#1A1A1A] font-normal">
                3. Service Providers
              </h2>
              <p>
                Production inquiries are sent to Resend for email delivery when configured. Review Resend’s privacy information for its handling of submitted data.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-xl text-[#1A1A1A] font-normal">
                4. Data Storage & Security
              </h2>
              <p>
                During local development, inquiries may be saved to a local file that is excluded from source control. In production, inquiries are not written to the application’s local filesystem; they are accepted only when the configured email provider accepts the request. The site does not state a retention period here.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-xl text-[#1A1A1A] font-normal">
              5. Contact
              </h2>
              <p>
                For questions about an inquiry or this policy, contact ATALICA:
              </p>
              <div className="bg-[#FAF9F6] p-4 border border-[#E8E6E1] text-xs space-y-1">
                <div>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:official@atalica.com.pk" className="text-[#C98A5B] underline">
                    official@atalica.com.pk
                  </a>
                </div>
                <div>
                  <strong>Phone:</strong>{" "}
                  <a href="tel:03051755566" className="text-[#C98A5B] underline font-mono">
                    0305 1755566
                  </a>
                </div>
              </div>
            </section>
          </div>

          <div className="pt-6 border-t border-[#E8E6E1] flex items-center justify-between text-xs text-gray-500 font-montserrat">
            <Link href="/" className="text-[#1A1A1A] hover:text-[#C98A5B] uppercase tracking-wider">
              ← Return Home
            </Link>
            <Link href="/consultation" className="text-[#C98A5B] hover:underline uppercase tracking-wider">
              Start a Project →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
