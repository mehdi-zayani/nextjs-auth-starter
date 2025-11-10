"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <p className="text-gray-700 dark:text-gray-300 text-lg animate-pulse">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-300">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-8 md:p-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Welcome, {session?.user?.name || "User"}!
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl mb-6">
          You are now logged in. This dashboard is fully protected and responsive.
        </p>

        {/* Logout Button */}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition transform hover:scale-105"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
