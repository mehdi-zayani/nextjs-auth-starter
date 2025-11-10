// src/app/api/contact/route.ts
import { sendMail } from "@/lib/sendMail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // Send the email using the sendMail function
    const info = await sendMail({
      to: process.env.CONTACT_EMAIL || "contact@mehdizayani.com",
      subject: `Contact form: ${name} <${email}>`,
      text: message,
      html: `<p>${message}</p>`,
    });

    // In dev, you can see the preview URL in the console
    if (process.env.NODE_ENV === "development") {
      console.log("Preview URL:", info && info.messageId ? info : null);
    }

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (error: any) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { success: false, message: "There was an error sending your message." },
      { status: 500 }
    );
  }
}
