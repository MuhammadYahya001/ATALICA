"use client";

import React, { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, Phone, MessageCircle } from "lucide-react";
import { LeadFormData } from "@/lib/validation";
import { getWhatsAppUrl } from "@/lib/whatsapp";

interface ConsultationFormProps {
  initialService?: string;
}

export default function ConsultationForm({ initialService = "" }: ConsultationFormProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    projectType: initialService || "",
    budgetRange: "",
    description: "",
    preferredContact: "phone",
    consent: false,
    hp_website: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState<{
    message: string;
    leadId: string;
    deliveryMode: "email" | "local";
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const submissionInProgress = useRef(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submissionInProgress.current) return;
    submissionInProgress.current = true;
    setIsSubmitting(true);
    setErrorMessage(null);
    setFieldErrors({});

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json().catch(() => ({}));

      if (
        res.ok &&
        result.success &&
        typeof result.leadId === "string" &&
        ["email", "local"].includes(result.deliveryMode)
      ) {
        setSuccessResponse({
          message: result.message,
          leadId: result.leadId,
          deliveryMode: result.deliveryMode,
        });

        if (result.deliveryMode === "email" && typeof window !== "undefined" && "gtag" in window) {
          const winWithGtag = window as unknown as {
            gtag: (command: string, action: string, params: Record<string, unknown>) => void;
          };
          winWithGtag.gtag("event", "generate_lead", {
            event_category: "Consultation",
            event_label: formData.projectType,
            value: 1,
          });
        }
      } else {
        setErrorMessage(
          result.error || "Unable to submit your request. Please check required fields."
        );
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
      }
    } catch {
      setErrorMessage(
        "Network connection error. Please try again or reach out directly via WhatsApp."
      );
    } finally {
      submissionInProgress.current = false;
      setIsSubmitting(false);
    }
  };

  if (successResponse) {
    return (
      <div role="status" aria-live="polite" className="bg-white border border-[#E8E6E1] p-8 sm:p-14 text-center max-w-2xl mx-auto space-y-6">
        <div className="w-12 h-12 bg-[#F7F6F2] text-[#C98A5B] rounded-full flex items-center justify-center mx-auto border border-[#E8E6E1]">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-3xl text-[#1A1A1A] font-normal">
          {successResponse.deliveryMode === "local" ? "Saved locally" : "Inquiry submitted"}
        </h3>
        <p className="text-gray-600 text-sm font-light leading-relaxed max-w-md mx-auto">
          {successResponse.message}
        </p>

        <div className="bg-[#FAF9F6] p-5 border border-[#E8E6E1] text-left text-xs font-light text-gray-700 space-y-1.5">
          <div><strong className="font-medium text-[#1A1A1A]">Reference:</strong> {successResponse.leadId}</div>
          <div><strong className="font-medium text-[#1A1A1A]">Name:</strong> {formData.fullName}</div>
          <div><strong className="font-medium text-[#1A1A1A]">City:</strong> {formData.city}</div>
          <div><strong className="font-medium text-[#1A1A1A]">Project:</strong> {formData.projectType}</div>
          <div><strong className="font-medium text-[#1A1A1A]">Contact Mode:</strong> {formData.preferredContact.toUpperCase()}</div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href={getWhatsAppUrl(
              `Hi ATALICA, I submitted inquiry #${successResponse.leadId} for ${formData.fullName}. I would like to follow up.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20BD59] text-white text-[11px] uppercase tracking-[0.2em] font-montserrat font-medium rounded-sm transition-colors"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Follow up on WhatsApp</span>
          </a>
          <button
            onClick={() => {
              setSuccessResponse(null);
              setFormData({
                fullName: "",
                phone: "",
                email: "",
              city: "",
              projectType: "",
              budgetRange: "",
                description: "",
                preferredContact: "phone",
                consent: false,
                hp_website: "",
              });
            }}
            className="w-full sm:w-auto text-xs text-gray-500 hover:text-[#1A1A1A] underline font-light py-2"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
      <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white border border-[#E8E6E1] p-8 sm:p-12 max-w-2xl mx-auto space-y-8"
    >
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="hp_website">Leave this field blank</label>
        <input
          type="text"
          id="hp_website"
          name="hp_website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.hp_website}
          onChange={handleChange}
        />
      </div>

      {errorMessage && (
        <div role="alert" aria-live="assertive" className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-3">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium">{errorMessage}</p>
            <p className="mt-1 text-red-700">
              Direct assistance:{" "}
              <a href="tel:03051755566" className="underline font-mono">
                0305 1755566
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Inputs */}
      <div className="space-y-6">
        {/* Full Name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-[10px] font-montserrat uppercase tracking-[0.2em] font-medium text-[#1A1A1A] mb-2"
            >
              Full Name <span className="text-[#C98A5B]">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your full name"
              aria-invalid={Boolean(fieldErrors.fullName)}
              aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
              className={`w-full px-4 py-3 text-sm bg-[#FAF9F6] border rounded-none focus:outline-none focus:border-[#1A1A1A] transition-colors ${
                fieldErrors.fullName ? "border-red-500" : "border-[#E8E6E1]"
              }`}
            />
            {fieldErrors.fullName && (
              <p id="fullName-error" className="text-red-600 text-[11px] mt-1">{fieldErrors.fullName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-[10px] font-montserrat uppercase tracking-[0.2em] font-medium text-[#1A1A1A] mb-2"
            >
              Phone / WhatsApp <span className="text-[#C98A5B]">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 0305 1755566"
              aria-invalid={Boolean(fieldErrors.phone)}
              aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
              className={`w-full px-4 py-3 text-sm bg-[#FAF9F6] border rounded-none focus:outline-none focus:border-[#1A1A1A] transition-colors ${
                fieldErrors.phone ? "border-red-500" : "border-[#E8E6E1]"
              }`}
            />
            {fieldErrors.phone && (
              <p id="phone-error" className="text-red-600 text-[11px] mt-1">{fieldErrors.phone}</p>
            )}
          </div>
        </div>

        {/* Email & City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="email"
              className="block text-[10px] font-montserrat uppercase tracking-[0.2em] font-medium text-[#1A1A1A] mb-2"
            >
              Email Address <span className="text-gray-400 font-normal lowercase">(optional)</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              className={`w-full px-4 py-3 text-sm bg-[#FAF9F6] border rounded-none focus:outline-none focus:border-[#1A1A1A] transition-colors ${
                fieldErrors.email ? "border-red-500" : "border-[#E8E6E1]"
              }`}
            />
            {fieldErrors.email && (
              <p id="email-error" className="text-red-600 text-[11px] mt-1">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-[10px] font-montserrat uppercase tracking-[0.2em] font-medium text-[#1A1A1A] mb-2"
            >
              Project City <span className="text-[#C98A5B]">*</span>
            </label>
            <select
              id="city"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              aria-invalid={Boolean(fieldErrors.city)}
              aria-describedby={fieldErrors.city ? "city-error" : undefined}
              className={`w-full px-4 py-3 text-sm bg-[#FAF9F6] border rounded-none focus:outline-none focus:border-[#1A1A1A] transition-colors ${fieldErrors.city ? "border-red-500" : "border-[#E8E6E1]"}`}
            >
              <option value="" disabled>Select a city</option>
              <option value="Multan">Multan</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Rawalpindi">Rawalpindi</option>
            </select>
            {fieldErrors.city && <p id="city-error" className="text-red-600 text-[11px] mt-1">{fieldErrors.city}</p>}
          </div>
        </div>

        {/* Project Type & Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="projectType"
              className="block text-[10px] font-montserrat uppercase tracking-[0.2em] font-medium text-[#1A1A1A] mb-2"
            >
              Project Scope <span className="text-[#C98A5B]">*</span>
            </label>
            <select
              id="projectType"
              name="projectType"
              required
              value={formData.projectType}
              onChange={handleChange}
              aria-invalid={Boolean(fieldErrors.projectType)}
              aria-describedby={fieldErrors.projectType ? "projectType-error" : undefined}
              className={`w-full px-4 py-3 text-sm bg-[#FAF9F6] border rounded-none focus:outline-none focus:border-[#1A1A1A] transition-colors ${fieldErrors.projectType ? "border-red-500" : "border-[#E8E6E1]"}`}
            >
              <option value="" disabled>Select a service</option>
            <option value="Interior Design">Interior Design</option>
              <option value="Construction">Construction</option>
              <option value="Décor & Styling">Décor & Styling</option>
              <option value="Other / Unsure">Other / Unsure</option>
            </select>
            {fieldErrors.projectType && <p id="projectType-error" className="text-red-600 text-[11px] mt-1">{fieldErrors.projectType}</p>}
          </div>

          <div>
            <label
              htmlFor="budgetRange"
              className="block text-[10px] font-montserrat uppercase tracking-[0.2em] font-medium text-[#1A1A1A] mb-2"
            >
              Approximate Budget
            </label>
            <input
              type="text"
              id="budgetRange"
              name="budgetRange"
              value={formData.budgetRange}
              onChange={handleChange}
              maxLength={80}
              placeholder="Optional; share an estimate if you wish"
              aria-invalid={Boolean(fieldErrors.budgetRange)}
              aria-describedby={fieldErrors.budgetRange ? "budgetRange-error" : undefined}
              className={`w-full px-4 py-3 text-sm bg-[#FAF9F6] border rounded-none focus:outline-none focus:border-[#1A1A1A] transition-colors ${fieldErrors.budgetRange ? "border-red-500" : "border-[#E8E6E1]"}`}
            />
            {fieldErrors.budgetRange && <p id="budgetRange-error" className="text-red-600 text-[11px] mt-1">{fieldErrors.budgetRange}</p>}
          </div>
        </div>

        {/* Project Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-[10px] font-montserrat uppercase tracking-[0.2em] font-medium text-[#1A1A1A] mb-2"
          >
            Brief Description <span className="text-gray-400 font-normal lowercase">(optional)</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell us about the property, rooms, or any specific ideas you have in mind."
              aria-invalid={Boolean(fieldErrors.description)}
              aria-describedby={fieldErrors.description ? "description-error" : undefined}
            className="w-full px-4 py-3 text-sm bg-[#FAF9F6] border border-[#E8E6E1] rounded-none focus:outline-none focus:border-[#1A1A1A] transition-colors resize-y font-light"
          />
          {fieldErrors.description && <p id="description-error" className="text-red-600 text-[11px] mt-1">{fieldErrors.description}</p>}
        </div>

        {/* Contact Method */}
        <div>
          <span className="block text-[10px] font-montserrat uppercase tracking-[0.2em] font-medium text-[#1A1A1A] mb-2">
            Preferred Method
          </span>
          <div className="flex items-center gap-6 text-xs text-gray-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="preferredContact"
                value="phone"
                checked={formData.preferredContact === "phone"}
                onChange={handleChange}
                className="text-[#0D2B4C] focus:ring-0"
              />
              <span className="flex items-center gap-1.5 font-light">
                <Phone className="w-3.5 h-3.5 text-[#C98A5B]" /> Phone Call
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="preferredContact"
                value="whatsapp"
                checked={formData.preferredContact === "whatsapp"}
                onChange={handleChange}
                className="text-[#0D2B4C] focus:ring-0"
              />
              <span className="flex items-center gap-1.5 font-light">
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" /> WhatsApp
              </span>
            </label>
          </div>
        </div>

        {/* Consent */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              aria-invalid={Boolean(fieldErrors.consent)}
              aria-describedby={fieldErrors.consent ? "consent-error" : undefined}
              className="mt-0.5 text-[#0D2B4C] focus:ring-0"
            />
            <span className="text-xs text-gray-500 font-light leading-relaxed">
              I agree to be contacted by ATALICA regarding this project inquiry.
            </span>
          </label>
          {fieldErrors.consent && (
            <p id="consent-error" className="text-red-600 text-[11px] mt-1">{fieldErrors.consent}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-[#E8E6E1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0D2B4C] hover:bg-[#C98A5B] text-white text-[11px] uppercase tracking-[0.2em] font-montserrat font-medium rounded-sm transition-colors duration-200 ${
              isSubmitting ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <span>Submitting...</span>
            ) : (
              <>
                <span>Submit Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
          <span className="text-[11px] text-gray-400 font-light">
            Consultation inquiry
          </span>
        </div>
      </div>
    </form>
  );
}
