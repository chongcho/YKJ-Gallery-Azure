import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
  description: "YKJ Gallery — site access",
};

export default function LoginPage() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center px-6 py-16">
      <div className="max-w-md w-full text-center">
        <h1 className="font-serif text-3xl mb-4 text-text-primary">Login</h1>
        <p className="text-text-secondary text-sm leading-relaxed mb-8">
          This site is published as static content. There is no online sign-in for
          editing pages. Updates are made in the project source and redeployed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
          <Link
            href="/contact"
            className="inline-block px-6 py-2.5 bg-gold text-white font-semibold tracking-wider uppercase hover:bg-gold/90 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/"
            className="inline-block px-6 py-2.5 border-2 border-medium-gray text-text-secondary hover:border-gold hover:text-gold transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
