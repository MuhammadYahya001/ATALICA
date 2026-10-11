export interface LeadFormData {
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  projectType: string;
  budgetRange?: string;
  timeline?: string;
  description: string;
  preferredContact: "phone" | "whatsapp";
  consent: boolean;
  hp_website?: string; // Honeypot field for spam prevention
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateLeadData(data: Partial<LeadFormData>): ValidationResult {
  const errors: Record<string, string> = {};
  const fullName = typeof data.fullName === "string" ? data.fullName.trim() : "";
  const phone = typeof data.phone === "string" ? data.phone : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const city = typeof data.city === "string" ? data.city : "";
  const projectType = typeof data.projectType === "string" ? data.projectType.trim() : "";
  const description = typeof data.description === "string" ? data.description : "";

  // Full Name
  if (fullName.length < 2) {
    errors.fullName = "Please enter your full name (at least 2 characters).";
  } else if (fullName.length > 80) {
    errors.fullName = "Name is too long (maximum 80 characters).";
  }

  // Phone validation (Pakistani and international formats)
  // Supports formats like 03051755566, 0305-1755566, +923051755566, 923051755566
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
  const pakPhoneRegex = /^((\+92)|(0092)|(92)|0)?3[0-9]{9}$/;
  const intlPhoneRegex = /^\+?[1-9]\d{6,14}$/;

  if (cleanPhone.length > 16) {
    errors.phone = "Please enter a valid phone number (e.g., 0305 1755566).";
  } else if (!cleanPhone) {
    errors.phone = "Phone number is required for consultation coordination.";
  } else if (!pakPhoneRegex.test(cleanPhone) && !intlPhoneRegex.test(cleanPhone)) {
    errors.phone = "Please enter a valid phone number (e.g., 0305 1755566).";
  }

  // Email (optional if phone is supplied, but must be valid if given)
  if (data.email !== undefined && typeof data.email !== "string") {
    errors.email = "Please enter a valid email address.";
  } else if (email.length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    } else if (email.length > 120) {
      errors.email = "Email is too long (maximum 120 characters).";
    }
  }

  // City
  if (!["Multan", "Islamabad", "Rawalpindi"].includes(city)) {
    errors.city = "Please select your project city.";
  }

  // Project Type
  if (!projectType || projectType.length > 80) {
    errors.projectType = "Please select the type of project you are planning.";
  }

  // Description
  if (data.description !== undefined && typeof data.description !== "string") {
    errors.description = "Please enter a valid project description.";
  } else if (description.length > 1500) {
    errors.description = "Project description is too long (maximum 1500 characters).";
  }

  if (data.budgetRange !== undefined && (typeof data.budgetRange !== "string" || data.budgetRange.length > 80)) {
    errors.budgetRange = "Budget information must be 80 characters or fewer.";
  }

  if (data.preferredContact !== undefined && !["phone", "whatsapp"].includes(data.preferredContact)) {
    errors.preferredContact = "Please select a valid contact method.";
  }

  // Consent
  if (data.consent !== true) {
    errors.consent = "You must agree to be contacted regarding your inquiry.";
  }

  // Honeypot check
  if (data.hp_website && data.hp_website.length > 0) {
    errors.hp_website = "Automated submission detected.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
