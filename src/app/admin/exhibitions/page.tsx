"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Exhibition {
  id: string;
  title: string;
  tagline: string | null;
  description: string | null;
  location: string | null;
  link: string | null;
  link_label: string | null;
  order: number;
  images?: { id: string; src: string; order: number }[];
}

export default function AdminExhibitionsPage() {
  const [items, setItems] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<Exhibition | null>(null);
  const supabase = createClient();

  async function fetchExhibitions() {
    if (!supabase) return;
    const { data: exData } = await supabase
      .from("exhibitions")
      .select("*")
      .order("order", { ascending: true });
    if (!exData?.length) {
      setItems([]);
      return;
    }
    const { data: imgData } = await supabase
      .from("exhibition_images")
      .select("*")
      .in("exhibition_id", exData.map((e) => e.id));
    const withImages = exData.map((e) => ({
      ...e,
      images: (imgData || [])
        .filter((i) => i.exhibition_id === e.id)
        .sort((a, b) => a.order - b.order),
    }));
    setItems(withImages);
  }

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    fetchExhibitions().finally(() => setLoading(false));
  }, [supabase]);

  async function handleDelete(id: string) {
    if (!supabase || !confirm("Remove this exhibition?")) return;
    await supabase.from("exhibition_images").delete().eq("exhibition_id", id);
    await supabase.from("exhibitions").delete().eq("id", id);
    fetchExhibitions();
  }

  if (!supabase) {
    return (
      <div>
        <h1 className="font-serif text-3xl mb-6">Exhibitions</h1>
        <p className="text-red-600">Supabase not configured.</p>
      </div>
    );
  }

  if (loading) return <p className="text-text-secondary">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl">Exhibitions</h1>
        <button
          onClick={() => setAdding(true)}
          className="px-4 py-2 bg-gold text-white text-sm font-semibold uppercase tracking-wider hover:bg-gold/90"
        >
          Add exhibition
        </button>
      </div>

      {(adding || editing) && (
        <ExhibitionForm
          exhibition={editing || undefined}
          onSave={async (ex) => {
            if (editing) {
              await supabase
                .from("exhibitions")
                .update({
                  title: ex.title,
                  tagline: ex.tagline || null,
                  description: ex.description || null,
                  location: ex.location || null,
                  link: ex.link || null,
                  link_label: ex.link_label || null,
                })
                .eq("id", editing.id);
              await supabase.from("exhibition_images").delete().eq("exhibition_id", editing.id);
              if (ex.images?.length) {
                await supabase.from("exhibition_images").insert(
                  ex.images.map((src, i) => ({
                    exhibition_id: editing.id,
                    src,
                    order: i,
                  }))
                );
              }
            } else {
              const { data } = await supabase
                .from("exhibitions")
                .insert({
                  title: ex.title,
                  tagline: ex.tagline || null,
                  description: ex.description || null,
                  location: ex.location || null,
                  link: ex.link || null,
                  link_label: ex.link_label || null,
                  order: items.length,
                })
                .select("id")
                .single();
              if (data?.id && ex.images?.length) {
                await supabase.from("exhibition_images").insert(
                  ex.images.map((src, i) => ({
                    exhibition_id: data.id,
                    src,
                    order: i,
                  }))
                );
              }
            }
            setAdding(false);
            setEditing(null);
            fetchExhibitions();
          }}
          onCancel={() => {
            setAdding(false);
            setEditing(null);
          }}
        />
      )}

      <div className="space-y-4">
        {items.map((ex) => (
          <div
            key={ex.id}
            className="bg-white rounded border border-medium-gray p-4 flex items-start justify-between gap-4"
          >
            <div>
              <h2 className="font-serif text-xl">{ex.title}</h2>
              {ex.tagline && (
                <p className="text-sm text-text-secondary">— {ex.tagline} —</p>
              )}
              <p className="text-sm text-text-secondary mt-1">
                {ex.images?.length || 0} image(s)
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditing(ex);
                  setAdding(false);
                }}
                className="px-3 py-1.5 text-sm border border-gold text-gold hover:bg-gold hover:text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(ex.id)}
                className="px-3 py-1.5 text-sm text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExhibitionForm({
  onSave,
  onCancel,
  exhibition,
}: {
  onSave: (ex: {
    title: string;
    tagline?: string;
    description?: string;
    location?: string;
    link?: string;
    link_label?: string;
    order?: number;
    images?: string[];
  }) => void;
  onCancel: () => void;
  exhibition?: Exhibition;
}) {
  const [title, setTitle] = useState(exhibition?.title || "");
  const [tagline, setTagline] = useState(exhibition?.tagline || "");
  const [description, setDescription] = useState(exhibition?.description || "");
  const [location, setLocation] = useState(exhibition?.location || "");
  const [link, setLink] = useState(exhibition?.link || "");
  const [linkLabel, setLinkLabel] = useState(exhibition?.link_label || "");
  const [images, setImages] = useState(
    exhibition?.images?.map((i) => i.src).join("\n") || ""
  );

  return (
    <div className="mb-8 p-6 bg-white rounded border border-medium-gray">
      <h2 className="font-serif text-xl mb-4">
        {exhibition ? "Edit exhibition" : "Add exhibition"}
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tagline (optional)</label>
          <input
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="e.g. Memories, Moments, Hopes"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location (optional)</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Link URL (optional)</label>
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://..."
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Link label (optional)</label>
          <input
            value={linkLabel}
            onChange={(e) => setLinkLabel(e.target.value)}
            placeholder="Learn More"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Image paths (one per line)
          </label>
          <textarea
            value={images}
            onChange={(e) => setImages(e.target.value)}
            rows={4}
            placeholder={"/images/exhibition/photo1.jpg\n/images/exhibition/photo2.jpg"}
            className="w-full px-3 py-2 border rounded font-mono text-sm"
          />
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <button
          onClick={() =>
            onSave({
              title,
              tagline: tagline || undefined,
              description: description || undefined,
              location: location || undefined,
              link: link || undefined,
              link_label: linkLabel || undefined,
              images: images
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean),
            })
          }
          className="px-4 py-2 bg-gold text-white font-semibold"
        >
          Save
        </button>
        <button onClick={onCancel} className="px-4 py-2 border">
          Cancel
        </button>
      </div>
    </div>
  );
}
