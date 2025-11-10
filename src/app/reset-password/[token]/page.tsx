"use client";

import Card from "@/components/ui/Card";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = useParams() as { token: string };
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) setTimeout(() => router.push("/login"), 1000);
    } catch (err: any) {
      setMessage(err.message || "Error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-300">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-4">
          Reset Password
        </h1>
        <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
          Enter your new password below.
        </p>

        <Card className="p-6 space-y-6 bg-background-card-light dark:bg-background-card-dark shadow-soft">
          {message && <p className="text-center text-green-500">{message}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg bg-white dark:bg-background-card-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-brand"
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg bg-white dark:bg-background-card-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-brand"
            />
            <button
              type="submit"
              className="w-full py-3 bg-brand text-white rounded-lg font-semibold hover:bg-brand-dark transition"
            >
              Reset Password
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}
