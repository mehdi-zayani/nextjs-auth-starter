import nodemailer from "nodemailer";

interface MailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

// Function to create a Nodemailer transporter depending on environment
async function createTransporter() {
  if (process.env.NODE_ENV === "development") {
    // Use a test account from Ethereal for development
    // No real credentials exposed
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  // In production, use real SMTP credentials from environment variables
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error("SMTP credentials not set in environment variables");
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587), // default SMTP port
    secure: false, // true if using port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// Main function to send an email
export async function sendMail({ to, subject, text, html }: MailOptions) {
  const transporter = await createTransporter();

  const info = await transporter.sendMail({
    from: `"Next Auth Starter" <${process.env.SMTP_USER}>`, // sender address
    to, // recipient
    subject,
    text,
    html,
  });

  // For dev with Ethereal, log the preview URL
  if (process.env.NODE_ENV === "development") {
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }

  return info;
}
