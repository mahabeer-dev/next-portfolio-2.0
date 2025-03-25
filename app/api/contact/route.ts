import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { render } from "@react-email/render";

import ThankYouEmail from "@/lib/email-templates/Thankyou";
import AdminQueryNotification from "@/lib/email-templates/Contact";
import { transporter } from "@/lib/nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { email, name, subject, message } = await request.json();

    const emailHtml = await render(ThankYouEmail({ customerName: name }));

    const options = {
      from: process.env.FROM_EMAIL,
      to: [email],
      subject: "Thank you for contacting us!",
      html: emailHtml,
    };

    await transporter.sendMail(options);

    const emailTemaplte = await render(
      AdminQueryNotification({ name, email, subject, message })
    );

    const adminOptions = {
      from: process.env.FROM_EMAIL,
      to: [process.env.ADMIN_EMAIL ?? ""],
      subject: "New Query from portfolio",
      html: emailTemaplte,
    };
    transporter.sendMail(adminOptions);

    return NextResponse.json(
      {
        message: "Your query has been submitted successfully",
        status: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("errr", error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
