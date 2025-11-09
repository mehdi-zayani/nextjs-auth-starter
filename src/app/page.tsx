"use client";

import { useRouter } from "next/navigation";
import { FaUserPlus } from "react-icons/fa"; // Icon for Sign Up

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100 dark:bg-purple-900 px-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-extrabold text-purple-900 dark:text-purple-100 tracking-tight">
          Build Your SaaS Fast
        </h1>
        <p className="text-xl text-purple-700 dark:text-purple-300 max-w-md mx-auto">
          Start by creating your account to get full access to all features.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => router.push("/register")}
            className="flex items-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold text-lg transition transform hover:scale-105"
          >
            <FaUserPlus className="mr-2" />
            Sign Up
          </button>
          <button
            onClick={() => router.push("/login")}
            className="px-8 py-4 border border-purple-400 text-purple-900 dark:text-purple-300 rounded-lg font-semibold text-lg transition transform hover:scale-105"
          >
            Already a Member
          </button>
        </div>
      </div>
    </div>
  );
}
