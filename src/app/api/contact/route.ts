// src/app/api/contact/route.ts
import { sendMail } from "@/lib/sendMail";
import { NextRequest, NextResponse } from "next/server";

// Define the expected request body type for the contact form
interface ContactFormBody {
  name: string;
  email: string;
  message: string;
}

// POST handler for contact form submissions
export async function POST(req: NextRequest) {
  try {
    // Parse JSON body with strict typing
    const { name, email, message }: ContactFormBody = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 },
      );
    }

    // Send the email using the sendMail utility
    const info = await sendMail({
      to: process.env.CONTACT_EMAIL || "contact@mehdizayani.com",
      subject: `Contact form: ${name} <${email}>`,
      text: message,
      html: `<p>${message}</p>`,
    });

    // Log preview URL in development environment
    if (process.env.NODE_ENV === "development") {
      console.log("Preview URL:", info && info.messageId ? info : null);
    }

    // Respond with success message
    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error: unknown) {
    // Log the error and return generic 500 response
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { success: false, message: "There was an error sending your message." },
      { status: 500 },
    );
  }
}
