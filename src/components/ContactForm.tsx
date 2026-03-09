"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xplaceholder", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-warm-gray p-8 text-center">
        <h3 className="font-serif text-2xl mb-2">Thank You!</h3>
        <p className="text-text-secondary">
          Your message has been sent. We&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-gold underline hover:no-underline text-sm"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-2.5 border border-medium-gray bg-white focus:border-gold focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2.5 border border-medium-gray bg-white focus:border-gold focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-semibold mb-1">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          className="w-full px-4 py-2.5 border border-medium-gray bg-white focus:border-gold focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full px-4 py-2.5 border border-medium-gray bg-white focus:border-gold focus:outline-none transition-colors resize-vertical"
        />
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="px-8 py-3 bg-gold text-white font-semibold tracking-wider uppercase text-sm hover:bg-gold-dark disabled:opacity-50 transition-colors duration-300"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
