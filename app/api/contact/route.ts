import { NextResponse } from "next/server";

import { getSiteContent } from "@/lib/content";
import { resend } from "@/lib/resend";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const site = getSiteContent();
    const payload = (await request.json()) as ContactPayload;

    const name = payload.name?.trim() ?? "";
    const email = payload.email?.trim() ?? "";
    const message = payload.message?.trim() ?? "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, message: site.ui.labels.contact_required_fields_error },
        { status: 400 },
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { ok: false, message: site.ui.labels.contact_invalid_email_error },
        { status: 400 },
      );
    }

    if (!resend) {
      return NextResponse.json(
        {
          ok: false,
          message: site.ui.labels.contact_service_unavailable_error,
        },
        { status: 500 },
      );
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || site.email;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
    const submissionHeading = `${site.ui.section_titles.contact} submission`;

    const textBody = [
      `New ${submissionHeading}`,
      "",
      `${site.ui.labels.name_label}: ${name}`,
      `${site.ui.labels.email_label}: ${email}`,
      "",
      `${site.ui.labels.message_label}:`,
      message,
    ].join("\n");

    const safeMessage = message
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const htmlBody = `
      <div style="font-family: Inter, Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2 style="margin: 0 0 12px;">New ${submissionHeading}</h2>
        <p style="margin: 0 0 6px;"><strong>${site.ui.labels.name_label}:</strong> ${name}</p>
        <p style="margin: 0 0 16px;"><strong>${site.ui.labels.email_label}:</strong> ${email}</p>
        <p style="margin: 0 0 6px;"><strong>${site.ui.labels.message_label}:</strong></p>
        <p style="white-space: pre-wrap; margin: 0;">${safeMessage}</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      text: textBody,
      html: htmlBody,
    });

    if (error) {
      return NextResponse.json(
        { ok: false, message: site.ui.labels.contact_email_send_error },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: site.ui.labels.contact_submit_success,
    });
  } catch {
    const site = getSiteContent();
    return NextResponse.json(
      { ok: false, message: site.ui.labels.contact_invalid_payload_error },
      { status: 400 },
    );
  }
}
