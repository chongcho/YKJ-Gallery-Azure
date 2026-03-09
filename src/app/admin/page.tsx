"use client";

import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl mb-6">Admin Dashboard</h1>
      <p className="text-text-secondary mb-8">
        Manage your gallery content. Add or remove paintings, exhibitions, and videos.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/admin/paintings"
          className="block p-6 bg-white rounded border border-medium-gray hover:border-gold transition-colors"
        >
          <h2 className="font-serif text-xl mb-2">Paintings</h2>
          <p className="text-sm text-text-secondary">
            Add, edit, or remove paintings from the collection.
          </p>
        </Link>
        <Link
          href="/admin/exhibitions"
          className="block p-6 bg-white rounded border border-medium-gray hover:border-gold transition-colors"
        >
          <h2 className="font-serif text-xl mb-2">Exhibitions</h2>
          <p className="text-sm text-text-secondary">
            Manage exhibition entries and images.
          </p>
        </Link>
        <Link
          href="/admin/videos"
          className="block p-6 bg-white rounded border border-medium-gray hover:border-gold transition-colors"
        >
          <h2 className="font-serif text-xl mb-2">Videos</h2>
          <p className="text-sm text-text-secondary">
            Add or remove video entries.
          </p>
        </Link>
      </div>
    </div>
  );
}
