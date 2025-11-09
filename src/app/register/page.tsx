"use client";

import AuthForm from "@/components/auth/AuthForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-300">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-4">
          Create Your Account
        </h1>
        <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
          Start by registering to get full access to all features.
        </p>
        <AuthForm mode="register" />
      </div>
    </div>
  );
}
