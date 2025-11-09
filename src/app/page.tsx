"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaUserPlus } from "react-icons/fa";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4 transition-colors duration-300">
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        {/* Hero image above the title */}
        <div className="flex justify-center">
          <Image
            src="/auth-hero-2.svg"
            alt="Illustration"
            width={500}
            height={500}
            className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[500px] md:h-[500px] max-w-full"
          />
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Build Your Web App Fast
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          Create your account now to unlock all features and manage your app with ease.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
          <button
            onClick={() => router.push("/register")}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-brand hover:bg-brand-dark text-white rounded-lg font-semibold text-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <FaUserPlus />
            Register
          </button>

          <button
            onClick={() => router.push("/login")}
            className="px-8 py-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg font-semibold text-lg transition-colors duration-200 hover:bg-brand hover:text-white"
          >
            Already a Member
          </button>
        </div>
      </div>
    </div>
  );
}
