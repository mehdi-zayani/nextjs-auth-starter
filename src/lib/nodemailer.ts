import nodemailer from "nodemailer";

export async function sendTestMail(to: string, subject: string, text: string) {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Mehdi Zayani" <contact@mehdizayani.com>',
    to,
    subject,
    text,
    html: `<pre style="white-space:pre-wrap">${text}</pre>`,
  });

  const previewUrl = nodemailer.getTestMessageUrl(info) || null;

  return { info, previewUrl };
}
