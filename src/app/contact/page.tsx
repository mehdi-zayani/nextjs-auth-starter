"use client";

import { useState } from "react";
import { FiMail, FiSend } from "react-icons/fi";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Placeholder for API call
    try {
      // const res = await fetch("/api/contact", { method: "POST", body: JSON.stringify({ name, email, message }) });
      // const data = await res.json();
      // if (data.success) setSuccess("Message sent successfully!");
      setSuccess("Message sent successfully! (Mock)");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setError("Something went wrong, please try again.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-2xl space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white text-center">
          Contact Us
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
          Have questions or feedback? Send us a message and we'll get back to you shortly.
        </p>

        {success && <p className="text-green-500 text-center">{success}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

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
            className="flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-200 shadow-md hover:shadow-lg w-full"
          >
            <FiSend />
            Send Message
          </button>
        </form>

        <div className="text-center text-gray-700 dark:text-gray-300 mt-6 flex flex-col items-center gap-2">
          <p className="flex items-center gap-2">
            <FiMail /> contact@mehdizayani.com
          </p>
        </div>
      </div>
    </main>
  );
}
