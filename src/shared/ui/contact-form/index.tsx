"use client";

import Image from "next/image";
import { useState } from "react";
import illustation from "@/shared/assets/png/blog-girl.png"; // або твій шлях

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: { [k: string]: string } = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
      e.email = "Enter valid email";
    if (!message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      // TODO: заменить на реальный POST
      await new Promise((r) => setTimeout(r, 900));
      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
    } catch {
      // обработка ошибки
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact-form"
      aria-labelledby="contact-title"
      className="relative mx-auto w-full h-full"
    >
      <div className="flex flex-col w-full h-full items-start">
        <h2
          id="contact-title"
          className="mb-8 text-white uppercase tracking-widest font-extrabold text-2xl md:text-3xl"
        >
          Fill this form out
        </h2>

        <form
          onSubmit={onSubmit}
          className="space-y-6 w-full h-full"
          noValidate
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>

            <input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name*"
              className={`w-full rounded-lg border border-transparent bg-[#0f0f0f] px-5 py-4 text-sm text-gray-200 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white transition-all ${
                errors.name ? "ring-2 ring-red-500/30" : ""
              }`}
            />
            {errors.name && (
              <p className="mt-2 text-xs text-red-400">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email*"
              className={`w-full rounded-lg border border-transparent bg-[#0f0f0f] px-5 py-4 text-sm text-gray-200 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white transition-all ${
                errors.email ? "ring-2 ring-red-500/30" : ""
              }`}
            />
            {errors.email && (
              <p className="mt-2 text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message*"
              rows={6}
              className={`w-full resize-none rounded-lg border border-transparent bg-[#0f0f0f] px-5 py-4 text-sm text-gray-200 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white transition-all ${
                errors.message ? "ring-2 ring-red-500/30" : ""
              }`}
            />
            {errors.message && (
              <p className="mt-2 text-xs text-red-400">{errors.message}</p>
            )}
          </div>

          {/* Submit big white pill */}
          <div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-white px-6 py-4 text-center text-sm font-medium text-black shadow hover:shadow-md transition-shadow disabled:opacity-60"
              aria-busy={submitting}
            >
              {submitting ? "Submitting..." : sent ? "Sent ✓" : "Submit Now"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
