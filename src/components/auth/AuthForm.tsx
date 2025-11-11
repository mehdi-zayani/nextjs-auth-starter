"use client";

import Card from "@/components/ui/Card";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaGithub, FaGoogle, FaSignInAlt, FaUserPlus } from "react-icons/fa";

// Props for AuthForm component: determines login or register mode
interface AuthFormProps {
  mode: "login" | "register";
}

// Component for authentication form (login/register)
export default function AuthForm({ mode }: AuthFormProps) {
  const [name, setName] = useState(""); // User's name (register only)
  const [email, setEmail] = useState(""); // User's email
  const [password, setPassword] = useState(""); // User's password
  const [acceptTerms, setAcceptTerms] = useState(false); // Terms acceptance (register)
  const [error, setError] = useState(""); // Error message
  const [success, setSuccess] = useState(""); // Success message

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (mode === "login") {
      // Sign in using NextAuth credentials provider
      const result = await signIn<{
        error?: string;
        status?: number;
        ok?: boolean;
        url?: string;
      }>("credentials", { redirect: false, email, password });

      if (result?.error) setError(result.error);
      else window.location.href = "/dashboard"; // Redirect on success
    } else {
      // Registration flow
      if (!acceptTerms) {
        setError("You must accept the terms to register.");
        return;
      }

      try {
        const res: Response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data: { success?: boolean; message?: string } = await res.json();

        if (data.success) {
          setSuccess("Registration successful. Redirecting to dashboard...");
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1000);
        } else setError(data.message || "Something went wrong");
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Error occurred";
        setError(errorMessage);
      }
    }
  };

  // OAuth handler for Google/GitHub
  const handleOAuth = async (provider: "google" | "github") => {
    await signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <Card className="w-full max-w-md p-6 space-y-6 bg-background-card-light dark:bg-background-card-dark shadow-soft">
      <h1 className="text-3xl font-extrabold text-center text-text-light dark:text-text-dark">
        {mode === "login" ? "Login" : "Register"}
      </h1>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg bg-white dark:bg-background-card-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-brand"
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg bg-white dark:bg-background-card-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-brand"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg bg-white dark:bg-background-card-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-brand"
          required
        />

        {mode === "register" && (
          <label className="inline-flex items-center gap-2 text-sm text-text-light dark:text-text-dark">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="form-checkbox h-4 w-4 text-brand"
            />
            I accept the <span className="underline">terms & conditions</span>
          </label>
        )}

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white py-3 rounded-lg font-semibold text-lg transition transform hover:scale-105 shadow-md"
        >
          {mode === "login" ? <FaSignInAlt /> : <FaUserPlus />}
          {mode === "login" ? "Login" : "Register"}
        </button>

        {mode === "login" && (
          <p
            className="text-right text-sm text-text-light dark:text-text-dark cursor-pointer hover:underline"
            onClick={() => (window.location.href = "/forgot-password")}
          >
            Forgot Password?
          </p>
        )}
      </form>

      {/* Separator */}
      <div className="flex items-center justify-center gap-2 mt-2 mb-2">
        <hr className="flex-1 border-border-light dark:border-border-dark" />
        <span className="text-sm text-text-light dark:text-text-dark">or</span>
        <hr className="flex-1 border-border-light dark:border-border-dark" />
      </div>

      {/* OAuth buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={() => handleOAuth("google")}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition transform hover:scale-105"
        >
          <FaGoogle /> Google
        </button>
        <button
          onClick={() => handleOAuth("github")}
          className="w-full sm:w-auto flex items-center justify-center gap-2
             bg-gray-800 dark:bg-white dark:text-gray-900
             hover:bg-gray-900 dark:hover:bg-background-card-dark
             text-white py-2 px-4 rounded-lg transition transform hover:scale-105"
        >
          <FaGithub /> GitHub
        </button>
      </div>

      {mode === "register" && (
        <p className="text-center text-sm text-text-light dark:text-text-dark mt-2">
          Already a member?{" "}
          <span
            className="cursor-pointer font-semibold hover:underline"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </span>
        </p>
      )}

      {mode === "login" && (
        <p className="text-center text-sm text-text-light dark:text-text-dark mt-2">
          Not a member?{" "}
          <span
            className="cursor-pointer font-semibold hover:underline"
            onClick={() => (window.location.href = "/register")}
          >
            Sign Up
          </span>
        </p>
      )}
    </Card>
  );
}
