"use client";

import { useState } from "react";
import { FiMail, FiSend } from "react-icons/fi";

// Contact page component
export default function ContactPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setPreviewUrl(null);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data: { success: boolean; message?: string; previewUrl?: string } =
        await res.json();

      if (res.ok && data.success) {
        setSuccess("Message sent successfully! (dev)");
        if (data.previewUrl) setPreviewUrl(data.previewUrl);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setError(data.message ?? "Something went wrong.");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-2xl space-y-6">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white text-center">
          Contact Us
        </h1>

        <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
          Have questions or feedback? Send us a message and we&apos;ll get back
          to you shortly.
        </p>

        {/* Success and error messages */}
        {success && <p className="text-green-500 text-center">{success}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Contact form */}
        <form
          onSubmit={handleSubmit}
          className="bg-background-card-light dark:bg-background-card-dark p-6 rounded-2xl shadow-soft space-y-4 transition-colors duration-300"
        >
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-md border border-border-light dark:border-border-dark bg-white dark:bg-background-card-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-brand"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md border border-border-light dark:border-border-dark bg-white dark:bg-background-card-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-brand"
            required
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 rounded-md border border-border-light dark:border-border-dark bg-white dark:bg-background-card-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-brand resize-none h-32"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-200 shadow-md hover:shadow-lg w-full disabled:opacity-60"
          >
            <FiSend />
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Preview link in dev */}
        {previewUrl && (
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Preview (dev):{" "}
              <a
                href={previewUrl}
                target="_blank"
                rel="noreferrer"
                className="underline text-brand"
              >
                Open email preview
              </a>
            </p>
          </div>
        )}

        {/* Contact email */}
        <div className="text-center text-gray-700 dark:text-gray-300 mt-6 flex flex-col items-center gap-2">
          <p className="flex items-center gap-2">
            <FiMail /> contact@yourdomain.com
          </p>
        </div>
      </div>
    </main>
  );
}
