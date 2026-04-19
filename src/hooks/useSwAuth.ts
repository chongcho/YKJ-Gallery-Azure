"use client";

import { useEffect, useState } from "react";

type AuthMeJson = {
  clientPrincipal?: {
    userDetails?: string;
    userId?: string;
    userRoles?: string[];
  } | null;
};

/**
 * Azure Static Web Apps exposes GET /.auth/me with { clientPrincipal } when signed in
 * (e.g. Microsoft Entra ID). Locally or without SWA auth, this returns 404 or null principal.
 */
export function useSwAuth() {
  const [loading, setLoading] = useState(true);
  const [label, setLabel] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/.auth/me", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: AuthMeJson | null) => {
        if (cancelled || !data?.clientPrincipal) return;
        const p = data.clientPrincipal;
        setIsAuthenticated(true);
        setLabel(p.userDetails?.trim() || "Signed in");
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { loading, label, isAuthenticated };
}
