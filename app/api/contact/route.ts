import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { render } from "@react-email/render";

import ThankYouEmail from "@/lib/email-templates/Thankyou";
import AdminQueryNotification from "@/lib/email-templates/Contact";
import { transporter } from "@/lib/nodemailer";

// Nodemailer opens a real SMTP socket — it cannot run on the edge runtime.
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { email, name, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "Name, email, subject and message are all required.", status: false },
        { status: 400 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      // Previously this fell back to "" and the send failed silently, so the
      // visitor saw a success message while the enquiry went nowhere.
      console.error("[contact] ADMIN_EMAIL is not configured — cannot deliver enquiry");
      return NextResponse.json(
        { message: "Contact form is misconfigured. Please email me directly.", status: false },
        { status: 500 }
      );
    }

    // The enquiry goes FIRST and is awaited. It is the only email that must not
    // be lost: if anything below fails, the message has already been delivered.
    const adminHtml = await render(
      AdminQueryNotification({ name, email, subject, message })
    );

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: [adminEmail],
      // Hitting Reply in the inbox should answer the visitor, not myself.
      replyTo: `${name} <${email}>`,
      subject: `Portfolio enquiry: ${subject}`,
      html: adminHtml,
      text: `New enquiry from the portfolio contact form.

Name:    ${name}
Email:   ${email}
Subject: ${subject}

Message:
${message}`,
    });

    // The visitor's confirmation is best-effort. A failure here must not report
    // an error to someone whose message has already reached the inbox.
    try {
      const thankYouHtml = await render(ThankYouEmail({ customerName: name }));
      await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: [email],
        subject: "Thank you for contacting us!",
        html: thankYouHtml,
      });
    } catch (thankYouError) {
      console.error("[contact] enquiry delivered, thank-you email failed:", thankYouError);
    }

    return NextResponse.json(
      { message: "Your query has been submitted successfully", status: true },
      { status: 200 }
    );
  } catch (error) {
    // An Error object serializes to {} through NextResponse.json, so the client
    // used to receive an empty body with no idea what went wrong.
    console.error("[contact] failed to deliver enquiry:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to send your message.",
        status: false,
      },
      { status: 500 }
    );
  }
}
