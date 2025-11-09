"use client";

import Card from "@/components/ui/Card";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaGithub, FaGoogle, FaSignInAlt, FaUserPlus } from "react-icons/fa";

interface AuthFormProps {
  mode: "login" | "register";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (mode === "login") {
      const result = await signIn("credentials", { redirect: false, email, password });
      if (result?.error) setError(result.error);
      else window.location.href = "/dashboard";
    } else {
      if (!acceptTerms) {
        setError("You must accept the terms to register.");
        return;
      }
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (data.success) {
          setSuccess("Registration successful. Redirecting to dashboard...");
          setTimeout(() => {
            window.location.href = "/dashboard"; // <-- redirect after registration
          }, 1000);
        } else setError(data.message || "Something went wrong");
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    await signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <Card className="w-full max-w-md space-y-6 p-6 bg-white dark:bg-purple-800">
      <h1 className="text-3xl font-extrabold text-center text-purple-900 dark:text-purple-100">
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
            className="w-full p-3 border border-purple-300 rounded-lg dark:bg-purple-700 dark:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-purple-300 rounded-lg dark:bg-purple-700 dark:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-purple-300 rounded-lg dark:bg-purple-700 dark:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        {mode === "register" && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="terms" className="text-sm text-purple-700 dark:text-purple-300">
              I accept the <span className="underline">terms & conditions</span>
            </label>
          </div>
        )}

        <button
          type="submit"
          className="w-full flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold text-lg transition transform hover:scale-105"
        >
          {mode === "login" ? <FaSignInAlt className="mr-2" /> : <FaUserPlus className="mr-2" />}
          {mode === "login" ? "Login" : "Register"}
        </button>

        {mode === "login" && (
          <p className="text-right text-sm text-purple-700 dark:text-purple-300 cursor-pointer hover:underline">
            Forgot Password?
          </p>
        )}
      </form>

      <div className="flex items-center justify-center space-x-4 mt-4">
        <button
          onClick={() => handleOAuth("google")}
          className="flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition transform hover:scale-105"
        >
          <FaGoogle className="mr-2" /> Google
        </button>
        <button
          onClick={() => handleOAuth("github")}
          className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition transform hover:scale-105"
        >
          <FaGithub className="mr-2" /> GitHub
        </button>
      </div>

      {mode === "register" && (
        <p className="text-center text-sm text-purple-700 dark:text-purple-300 mt-4">
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
        <p className="text-center text-sm text-purple-700 dark:text-purple-300 mt-4">
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
