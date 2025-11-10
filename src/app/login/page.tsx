"use client";

import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-300">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 text-center">
          Welcome Back
        </h1>
        <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
          Login to your account to access all features.
        </p>
        <AuthForm mode="login" />
      </div>
    </div>
  );
}
