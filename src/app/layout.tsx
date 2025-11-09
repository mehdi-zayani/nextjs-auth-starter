import { ReactNode } from "react";
import "../styles/globals.css";

export const metadata = {
  title: "NextJS Auth Starter",
  description: "A starter project with Next.js, TailwindCSS, Framer Motion, and dark mode.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col items-center justify-center px-4">
        {children}
      </body>
    </html>
  );
}
