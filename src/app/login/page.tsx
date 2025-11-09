"use client";

import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100 dark:bg-purple-900 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-center text-purple-900 dark:text-purple-100 mb-6">
          Welcome Back
        </h1>
        <p className="text-center text-purple-700 dark:text-purple-300 mb-8">
          Login to your account to access all features.
        </p>
        <AuthForm mode="login" />
      </div>
    </div>
  );
}
