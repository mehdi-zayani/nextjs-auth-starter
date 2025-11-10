"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaUserPlus } from "react-icons/fa";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="min-h-[90vh] flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-6 sm:px-10 lg:px-20 py-16">
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 text-center md:text-left space-y-6"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
          The Easiest Way to Start Your Next.js Project
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl">
          Build secure and modern authentication in minutes — powered by NextAuth, MongoDB, and
          Tailwind CSS.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
          <button
            onClick={() => router.push("/register")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-brand hover:bg-brand-dark text-white rounded-lg font-semibold text-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <FaUserPlus />
            Get Started
          </button>

          <button
            onClick={() => router.push("/login")}
            className="w-full sm:w-auto px-8 py-3 bg-gray-100 dark:bg-gray-600  text-gray-800 dark:text-gray-100 rounded-lg font-semibold text-lg transition-colors duration-200 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-200 dark:hover:text-gray-900"
          >
            Already a Member
          </button>
        </div>
      </motion.div>

      {/* Right Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex-1 flex justify-center md:justify-end"
      >
        <Image
          src="/auth-hero-2.svg"
          alt="Authentication illustration"
          width={450}
          height={450}
          className="w-[260px] sm:w-[340px] md:w-[420px] lg:w-[450px] h-auto"
        />
      </motion.div>
    </section>
  );
}
