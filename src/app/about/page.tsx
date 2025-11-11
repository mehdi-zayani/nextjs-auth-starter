"use client";

import Image from "next/image";
import Link from "next/link";
import { FiGithub, FiGlobe, FiLinkedin } from "react-icons/fi";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-12">
        {/* Illustration */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/about-app.svg"
            alt="Woman reading book illustration"
            width={400}
            height={400}
            className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
          />
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            About This Project
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            <strong>Next Auth Starter</strong> is a lightweight and modern
            authentication boilerplate built with Next.js, TypeScript, and
            MongoDB. It provides a clean starting point for developers who want
            to integrate secure login, registration, OAuth, and password
            recovery effortlessly.
          </p>

          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            This starter focuses on simplicity, scalability, and developer
            experience — helping you quickly set up a secure and modern
            authentication system for your Next.js applications. It’s also
            perfect when you want to prototype or test new features without
            building a full auth system from scratch.
          </p>

          {/* Buttons */}
          <div className="flex flex-col items-center  gap-6 mt-6">
            {/* View Repository as outline text, centered */}
            <Link
              href="https://github.com/mehdi-zayani/nextjs-auth-starter"
              target="_blank"
              className="flex items-center gap-2 px-5   py-3 border-2 border-gray-800 text-gray-800 dark:border-gray-300 dark:text-gray-300   rounded-lg font-medium transition-all duration-200 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-300 dark:hover:text-gray-900"
            >
              <FiGithub size={20} />
              View Repository
            </Link>

            {/* Inline buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="https://github.com/mehdi-zayani"
                target="_blank"
                className="flex items-center gap-2 bg-gray-800 text-white px-3 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:bg-gray-200 hover:text-gray-800"
              >
                <FiGithub size={16} />
                GitHub Profile
              </Link>

              <Link
                href="https://www.linkedin.com/in/zayanimehdi"
                target="_blank"
                className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:bg-gray-200 hover:text-gray-800"
              >
                <FiLinkedin size={16} />
                LinkedIn
              </Link>

              <Link
                href="https://www.mehdizayani.com"
                target="_blank"
                className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:bg-gray-200 hover:text-gray-800"
              >
                <FiGlobe size={16} />
                Portfolio Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
