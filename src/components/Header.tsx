"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSwAuth } from "@/hooks/useSwAuth";
import SwLogoutLink from "./SwLogoutLink";

const navLinks = [
  { href: "/", label: "Collections" },
  { href: "/artist", label: "Artist" },
  { href: "/exhibition", label: "Exhibition" },
  { href: "/video", label: "Video" },
  { href: "/contact", label: "Contact" },
];

function authLinkClass(active: boolean) {
  return `text-sm tracking-widest uppercase transition-colors duration-200 ${
    active
      ? "text-gold font-semibold"
      : "text-text-secondary hover:text-gold"
  }`;
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { loading, label, isAuthenticated } = useSwAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-medium-gray">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="font-serif text-2xl tracking-wide text-text-primary shrink-0">
          YKJ Gallery
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 flex-wrap justify-end">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={authLinkClass(active)}
              >
                {link.label}
              </Link>
            );
          })}

          <span className="h-4 w-px bg-medium-gray hidden lg:block" aria-hidden />

          {loading ? (
            <span className="text-xs text-text-secondary w-16 text-right">…</span>
          ) : isAuthenticated ? (
            <div className="flex items-center gap-3 lg:gap-4 max-w-[min(220px,28vw)]">
              <span
                className="text-xs text-text-secondary truncate"
                title={label ?? undefined}
              >
                {label}
              </span>
              <SwLogoutLink className="text-sm tracking-widest uppercase text-gold font-semibold hover:text-gold/80 shrink-0">
                Log out
              </SwLogoutLink>
            </div>
          ) : null}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 shrink-0"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span
            className={`block w-6 h-0.5 bg-text-primary transition-transform duration-200 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-text-primary transition-opacity duration-200 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-text-primary transition-transform duration-200 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-medium-gray bg-white">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-6 py-3 text-sm tracking-widest uppercase transition-colors ${
                  active
                    ? "text-gold font-semibold bg-warm-gray"
                    : "text-text-secondary hover:text-gold hover:bg-warm-gray/50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="px-6 py-3 border-t border-medium-gray space-y-2">
            {loading ? (
              <span className="text-sm text-text-secondary">Checking sign-in…</span>
            ) : isAuthenticated ? (
              <>
                <p className="text-xs text-text-secondary break-all">{label}</p>
                <SwLogoutLink
                  className="block text-sm tracking-widest uppercase text-gold font-semibold py-2"
                  onNavigate={() => setMobileOpen(false)}
                >
                  Log out
                </SwLogoutLink>
              </>
            ) : null}
          </div>
        </nav>
      )}
    </header>
  );
}
