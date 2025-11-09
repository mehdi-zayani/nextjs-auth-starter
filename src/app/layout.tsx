import { ReactNode } from "react";
import "../styles/globals.css";

export const metadata = {
  title: "NextJS Auth Starter",
  description: "A starter project with Next.js, TailwindCSS, dark mode, and authentication.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
