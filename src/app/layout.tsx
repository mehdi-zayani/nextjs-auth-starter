import SessionProviderWrapper from "@/providers/SessionProviderWrapper";
import type { ReactNode } from "react";
import "../styles/globals.css";

export const metadata = {
  title: "NextJS Auth Starter",
  description: "A modern authentication starter by Mehdi Zayani.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <SessionProviderWrapper>
          <main className="min-h-screen flex flex-col">{children}</main>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
