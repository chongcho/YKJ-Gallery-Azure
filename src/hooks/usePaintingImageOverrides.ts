"use client";

import { useCallback, useEffect, useState } from "react";

export type PaintingImageOverrides = Record<string, string>;

export function usePaintingImageOverrides() {
  const [overrides, setOverrides] = useState<PaintingImageOverrides>({});
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setLoading(true);
    fetch("/api/painting-images", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : {}))
      .then((data) => {
        if (data && typeof data === "object" && !Array.isArray(data)) {
          setOverrides(data as PaintingImageOverrides);
        } else {
          setOverrides({});
        }
      })
      .catch(() => setOverrides({}))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { overrides, loading, refresh };
}
