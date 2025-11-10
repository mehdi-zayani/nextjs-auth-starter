"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message || "Check console for reset link (dev mode).");
    } catch (err: any) {
      setMessage(err.message || "Error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 bg-background-card-light dark:bg-background-card-dark shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-text-light dark:text-text-dark">
          Forgot Password
        </h1>
        {message && <p className="text-center mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg bg-white dark:bg-background-card-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-brand"
          />
          <button
            type="submit"
            className="w-full py-3 bg-brand text-white rounded-lg font-semibold hover:bg-brand-dark transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
