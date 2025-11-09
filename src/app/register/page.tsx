"use client";

import AuthForm from "@/components/auth/AuthForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100 dark:bg-purple-900 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-purple-900 dark:text-purple-100 text-center mb-6">
          Create Your Account
        </h1>
        <p className="text-center text-purple-700 dark:text-purple-300 mb-8">
          Start by registering to get full access to all features.
        </p>
        <AuthForm mode="register" />
      </div>
    </div>
  );
}
