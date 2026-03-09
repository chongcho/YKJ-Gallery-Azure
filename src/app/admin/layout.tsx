"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        const c = createClient();
        if (c) await c.auth.signOut();
        router.replace("/admin/login");
        router.refresh();
      }}
      className="text-sm text-text-secondary hover:text-gold"
    >
      Log out
    </button>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (!supabase) return;
    if (pathname === "/admin/login") return;

    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/admin/login");
      }
    };
    check();
  }, [supabase, pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-warm-gray">
      <header className="bg-white border-b border-medium-gray px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="font-serif text-xl text-text-primary">
            YKJ Admin
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link
              href="/admin"
              className={pathname === "/admin" ? "text-gold font-semibold" : "text-text-secondary hover:text-gold"}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/paintings"
              className={pathname?.startsWith("/admin/paintings") ? "text-gold font-semibold" : "text-text-secondary hover:text-gold"}
            >
              Paintings
            </Link>
            <Link
              href="/admin/exhibitions"
              className={pathname?.startsWith("/admin/exhibitions") ? "text-gold font-semibold" : "text-text-secondary hover:text-gold"}
            >
              Exhibitions
            </Link>
            <Link
              href="/admin/videos"
              className={pathname?.startsWith("/admin/videos") ? "text-gold font-semibold" : "text-text-secondary hover:text-gold"}
            >
              Videos
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" target="_blank" className="text-sm text-text-secondary hover:text-gold">
            View site
          </Link>
          <LogoutButton />
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
