"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiUser, FiX } from "react-icons/fi";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

  // State for dark mode toggle
  const [isDark, setIsDark] = useState(false);

  // State for mobile menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Sync initial dark mode state on mount (avoiding direct setState in effect)
  useEffect(() => {
    const html = document.documentElement;
    setTimeout(() => {
      setIsDark(html.classList.contains("dark"));
    }, 0);
  }, []);

  // Toggle dark mode on click
  const toggleDarkMode = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    setIsDark(html.classList.contains("dark"));
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-gray-50 dark:bg-gray-900 shadow-sm dark:shadow-md px-6 py-4 flex items-center justify-between transition-colors duration-300 z-50">
        {/* Logo: clickable to go home */}
        <div
          className="text-xl font-bold text-gray-900 dark:text-white cursor-pointer"
          onClick={() => router.push("/")}
        >
          Next Auth
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-6 font-medium">
          <Link
            href="/"
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {/* User info if logged in */}
          {session ? (
            <div
              className="hidden md:flex items-center gap-2 cursor-pointer"
              onClick={() => router.push("/dashboard")}
            >
              <span className="text-gray-700 dark:text-gray-300 text-sm font-medium truncate max-w-[150px]">
                {session.user?.email}
              </span>
              <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200">
                <FiUser />
              </div>
            </div>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="hidden md:block p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <FiUser />
            </button>
          )}

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            {isDark ? <FiSun /> : <FiMoon />}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Component */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
