import Navbar from "@/components/header/Navbar";
import SessionProviderWrapper from "@/providers/SessionProviderWrapper";
import type { ReactNode } from "react";
import "../styles/globals.css";

export const metadata = {
  title: "NextJS Auth Starter",
  description: "A modern authentication starter by Mehdi Zayani.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Ensure light mode by default */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window  !== 'undefined') {
                document.documentElement.classList.remove('dark');
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen   bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <SessionProviderWrapper>
          <Navbar />

          {/* Main container centered with max-width and horizontal padding */}
          <main className="flex-1 w-full max-w-6xl mx-auto flex flex-col justify-center px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
