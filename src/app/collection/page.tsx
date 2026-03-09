"use client";

import { useEffect } from "react";

export default function CollectionPage() {
  useEffect(() => {
    window.location.href = "/#collection";
  }, []);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <p className="text-text-secondary">Redirecting to collection...</p>
    </div>
  );
}
