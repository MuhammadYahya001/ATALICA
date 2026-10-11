import { NextRequest, NextResponse } from "next/server";
import { validateLeadData, type LeadFormData } from "@/lib/validation";
import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_BODY_BYTES = 20_000;
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (rateLimitMap.get(key) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) return true;

  recent.push(now);
  rateLimitMap.set(key, recent);

  if (rateLimitMap.size > 10_000) {
    rateLimitMap.forEach((timestamps, ip) => {
      if (!timestamps.some((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS)) {
        rateLimitMap.delete(ip);
      }
    });
  }

  return false;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

async function saveLocalLead(record: Record<string, string>): Promise<void> {
  const dataDirectory = path.join(process.cwd(), "data");
  const leadsPath = path.join(dataDirectory, "leads.json");
  await fs.mkdir(dataDirectory, { recursive: true });

  let leads: Record<string, string>[] = [];
  try {
    const existing = await fs.readFile(leadsPath, "utf8");
    leads = JSON.parse(existing || "[]") as Record<string, string>[];
    if (!Array.isArray(leads)) throw new Error("Lead store is not an array");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }

  leads.unshift(record);
  await fs.writeFile(leadsPath, JSON.stringify(leads, null, 2), { mode: 0o600 });
  await fs.chmod(leadsPath, 0o600);
}

export async function POST(request: NextRequest) {
  try {
    if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
      return NextResponse.json({ success: false, error: "Send the inquiry as JSON." }, { status: 415 });
    }

    const bodyText = await request.text();
    if (Buffer.byteLength(bodyText, "utf8") > MAX_BODY_BYTES) {
      return NextResponse.json({ success: false, error: "The inquiry is too large." }, { status: 413 });
    }

    let parsedBody: unknown;
    try {
      parsedBody = JSON.parse(bodyText);
    } catch {
      return NextResponse.json({ success: false, error: "The inquiry could not be read." }, { status: 400 });
    }

    if (!parsedBody || typeof parsedBody !== "object" || Array.isArray(parsedBody)) {
      return NextResponse.json({ success: false, error: "Enter your inquiry details and try again." }, { status: 400 });
    }

    const body = parsedBody as Partial<LeadFormData>;
    if (typeof body.hp_website === "string" && body.hp_website.trim()) {
      return NextResponse.json({ success: true, message: "Your inquiry has been received.", deliveryMode: "discarded" });
    }

    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientKey = forwardedFor?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(clientKey)) {
      return NextResponse.json(
        { success: false, error: "Too many inquiries from this connection. Please wait or contact ATALICA directly." },
        { status: 429 },
      );
    }

    const validation = validateLeadData(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, error: "Please correct the highlighted fields.", fieldErrors: validation.errors },
        { status: 400 },
      );
    }

    const leadId = `LEAD-${Date.now()}-${randomUUID().slice(0, 8)}`;
    const timestamp = new Date().toISOString();
    const leadRecord: Record<string, string> = {
      id: leadId,
      timestamp,
      fullName: body.fullName!.trim(),
      phone: body.phone!.trim(),
      email: body.email?.trim() || "Not provided",
      city: body.city!.trim(),
      projectType: body.projectType!.trim(),
      budgetRange: body.budgetRange?.trim() || "Not provided",
      description: body.description?.trim() || "None provided",
      preferredContact: body.preferredContact || "phone",
    };

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      if (process.env.NODE_ENV !== "development") {
        return NextResponse.json(
          { success: false, error: "Online inquiry delivery is not configured. Please call 0305 1755566 or contact ATALICA on WhatsApp." },
          { status: 503 },
        );
      }

      await saveLocalLead(leadRecord);
      return NextResponse.json({
        success: true,
        message: "Saved on this development machine only. No email was sent.",
        leadId,
        deliveryMode: "local",
      });
    }

    const recipient = process.env.LEADS_TO_EMAIL;
    const sender = process.env.LEADS_FROM_EMAIL;
    if (!recipient || !sender) {
      return NextResponse.json(
        { success: false, error: "Email delivery is not fully configured. Please contact ATALICA directly." },
        { status: 503 },
      );
    }

    const safeName = escapeHtml(leadRecord.fullName);
    const safePhone = escapeHtml(leadRecord.phone);
    const safeEmail = escapeHtml(leadRecord.email);
    const safeCity = escapeHtml(leadRecord.city);
    const safeProjectType = escapeHtml(leadRecord.projectType);
    const safeBudget = escapeHtml(leadRecord.budgetRange);
    const safeDescription = escapeHtml(leadRecord.description);
    const safeContactMethod = escapeHtml(leadRecord.preferredContact.toUpperCase());
    const safeLeadId = escapeHtml(leadId);
    const subjectName = leadRecord.fullName.replace(/[\r\n]+/g, " ").slice(0, 80);

    let emailResponse: Response;
    try {
      emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        signal: AbortSignal.timeout(12_000),
        body: JSON.stringify({
          from: `ATALICA Inquiries <${sender}>`,
          to: [recipient],
          subject: `New ATALICA inquiry: ${subjectName}`,
          html: `<h2>New ATALICA Consultation Inquiry</h2>
            <p><strong>Reference:</strong> ${safeLeadId}</p>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Phone:</strong> <a href="tel:${safePhone}">${safePhone}</a></p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>City:</strong> ${safeCity}</p>
            <p><strong>Project type:</strong> ${safeProjectType}</p>
            <p><strong>Approximate budget:</strong> ${safeBudget}</p>
            <p><strong>Preferred contact:</strong> ${safeContactMethod}</p>
            <p><strong>Project notes:</strong></p>
            <blockquote>${safeDescription}</blockquote>
            <p><em>Received ${escapeHtml(timestamp)}</em></p>`,
        }),
      });
    } catch {
      console.error("Resend request failed before accepting the inquiry.");
      return NextResponse.json(
        { success: false, error: "Email delivery is temporarily unavailable. Please try again or contact ATALICA directly." },
        { status: 502 },
      );
    }

    if (!emailResponse.ok) {
      console.error(`Resend rejected an inquiry with HTTP ${emailResponse.status}.`);
      return NextResponse.json(
        { success: false, error: "Email delivery could not accept your inquiry. Please try again or contact ATALICA directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your inquiry was accepted for email delivery. We will follow up using the contact details you provided.",
      leadId,
      deliveryMode: "email",
    });
  } catch {
    console.error("The consultation endpoint could not process a request.");
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again or contact ATALICA directly." },
      { status: 500 },
    );
  }
}
