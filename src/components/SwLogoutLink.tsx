"use client";

import { useEffect, useState } from "react";

/**
 * Azure SWA logout accepts post_logout_redirect_uri (must match app configuration in portal).
 */
export default function SwLogoutLink({
  className,
  children,
  onNavigate,
}: {
  className?: string;
  children: React.ReactNode;
  onNavigate?: () => void;
}) {
  const [href, setHref] = useState("/.auth/logout");

  useEffect(() => {
    const uri = `${window.location.origin}/`;
    setHref(
      `/.auth/logout?post_logout_redirect_uri=${encodeURIComponent(uri)}`
    );
  }, []);

  return (
    <a href={href} className={className} onClick={onNavigate}>
      {children}
    </a>
  );
}
