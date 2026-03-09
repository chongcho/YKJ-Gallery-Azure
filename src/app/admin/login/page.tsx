"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-gray p-6">
        <div className="max-w-sm w-full bg-white p-8 rounded shadow">
          <h1 className="font-serif text-2xl mb-4">Admin Login</h1>
          <p className="text-red-600 text-sm mb-4">
            Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and
            NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local
          </p>
          <Link href="/" className="text-gold hover:underline">
            ← Back to site
          </Link>
        </div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setError("");
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-gray p-6">
      <div className="max-w-sm w-full bg-white p-8 rounded shadow">
        <h1 className="font-serif text-2xl mb-2">Admin Login</h1>
        <p className="text-text-secondary text-sm mb-6">
          YKJ Gallery content management
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-medium-gray rounded focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-medium-gray rounded focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>
          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-gold text-white font-semibold tracking-wider uppercase text-sm hover:bg-gold/90 disabled:opacity-50 transition-colors"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center">
          <Link href="/" className="text-sm text-text-secondary hover:text-gold">
            ← Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}
