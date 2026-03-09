"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { paintings as staticPaintings } from "@/data/paintings";
import type { Painting } from "@/data/paintings";

export function usePaintings() {
  const [paintings, setPaintings] = useState<Painting[]>(staticPaintings);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const { data } = await supabase
          .from("paintings")
          .select("*")
          .order("order", { ascending: true });
        if (data && data.length > 0) {
          setPaintings(data as Painting[]);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [supabase]);

  return { paintings, loading };
}
