"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaTimes } from "react-icons/fa";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { data: session } = useSession();
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end" onClick={onClose}>
      <div
        className="w-64 bg-gray-50 dark:bg-gray-900 p-6 flex flex-col gap-6 relative mt-16"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-900 dark:text-white text-2xl"
        >
          <FaTimes />
        </button>

        {/* Main navigation */}
        <nav className="flex flex-col gap-4">
          <Link
            href="/"
            onClick={onClose}
            className="text-gray-900 dark:text-white text-lg font-medium hover:underline"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={onClose}
            className="text-gray-900 dark:text-white text-lg font-medium hover:underline"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={onClose}
            className="text-gray-900 dark:text-white text-lg font-medium hover:underline"
          >
            Contact
          </Link>
        </nav>

        {/* User info & Logout immediately below links */}
        {session?.user?.email && (
          <div className="flex flex-col gap-2 pt-4 border-t border-gray-300 dark:border-gray-700">
            <button
              onClick={() => {
                router.push("/dashboard");
                onClose();
              }}
              className="text-gray-700 dark:text-gray-300 text-sm text-left hover:underline break-words"
            >
              {session.user.email}
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-all"
            >
              Logout
            </button>
          </div>
        )}

        {/* Login link if not connected */}
        {!session?.user?.email && (
          <Link
            href="/login"
            onClick={onClose}
            className="text-gray-900 dark:text-white text-lg font-medium hover:underline"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
