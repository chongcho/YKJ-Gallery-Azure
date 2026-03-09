"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Painting } from "@/data/paintings";

const CATEGORIES = [
  { id: "adobe", label: "Adobe" },
  { id: "cactus", label: "Cactus" },
  { id: "flowers", label: "Flowers" },
  { id: "imaginary", label: "Imaginary" },
  { id: "other", label: "Other" },
];

export default function AdminPaintingsPage() {
  const [items, setItems] = useState<Painting[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Painting | null>(null);
  const [adding, setAdding] = useState(false);
  const supabase = createClient();

  async function fetchPaintings() {
    if (!supabase) return;
    const { data } = await supabase
      .from("paintings")
      .select("*")
      .order("order", { ascending: true });
    setItems((data as Painting[]) || []);
  }

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    fetchPaintings().finally(() => setLoading(false));
  }, [supabase]);

  async function handleDelete(id: string) {
    if (!supabase || !confirm("Remove this painting?")) return;
    await supabase.from("paintings").delete().eq("id", id);
    fetchPaintings();
  }

  if (!supabase) {
    return (
      <div>
        <h1 className="font-serif text-3xl mb-6">Paintings</h1>
        <p className="text-red-600">Supabase not configured.</p>
      </div>
    );
  }

  if (loading) return <p className="text-text-secondary">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl">Paintings</h1>
        <button
          onClick={() => {
            setAdding(true);
            setEditing(null);
          }}
          className="px-4 py-2 bg-gold text-white text-sm font-semibold uppercase tracking-wider hover:bg-gold/90"
        >
          Add painting
        </button>
      </div>

      {(adding || editing) && (
        <PaintingForm
          painting={editing || undefined}
          onSave={async (p) => {
            const id = p.id || p.title.toLowerCase().replace(/\s+/g, "-");
            const row = {
              title: p.title,
              category: p.category,
              year: p.year,
              medium: p.medium,
              size: p.size,
              image: p.image,
            };
            if (editing) {
              await supabase.from("paintings").update(row).eq("id", editing.id);
            } else {
              await supabase.from("paintings").insert({ ...row, id });
            }
            setAdding(false);
            setEditing(null);
            fetchPaintings();
          }}
          onCancel={() => {
            setAdding(false);
            setEditing(null);
          }}
        />
      )}

      <div className="bg-white rounded border border-medium-gray overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-warm-gray">
            <tr>
              <th className="px-4 py-3 font-semibold">Image</th>
              <th className="px-4 py-3 font-semibold">Title</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Year</th>
              <th className="px-4 py-3 font-semibold">Size</th>
              <th className="px-4 py-3 font-semibold w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id} className="border-t border-medium-gray">
                <td className="px-4 py-3">
                  <img
                    src={p.image}
                    alt=""
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.src = "/images/placeholder.svg";
                    }}
                  />
                </td>
                <td className="px-4 py-3">{p.title}</td>
                <td className="px-4 py-3">{p.category}</td>
                <td className="px-4 py-3">{p.year}</td>
                <td className="px-4 py-3">{p.size}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => {
                      setEditing(p);
                      setAdding(false);
                    }}
                    className="text-gold hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PaintingForm({
  painting,
  onSave,
  onCancel,
}: {
  painting?: Painting;
  onSave: (p: Omit<Painting, "id"> & { id?: string }) => void;
  onCancel: () => void;
}) {
  const [id, setId] = useState(painting?.id || "");
  const [title, setTitle] = useState(painting?.title || "");
  const [category, setCategory] = useState(painting?.category || "adobe");
  const [year, setYear] = useState(painting?.year?.toString() || "2023");
  const [medium, setMedium] = useState(painting?.medium || "Acrylic on canvas");
  const [size, setSize] = useState(painting?.size || "");
  const [image, setImage] = useState(painting?.image || "/images/paintings/");

  return (
    <div className="mb-8 p-6 bg-white rounded border border-medium-gray">
      <h2 className="font-serif text-xl mb-4">
        {painting ? "Edit painting" : "Add painting"}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1">ID (slug)</label>
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="e.g. taos-2"
            className="w-full px-3 py-2 border rounded"
            disabled={!!painting}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Painting["category"])}
            className="w-full px-3 py-2 border rounded"
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Medium</label>
          <input
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Size</label>
          <input
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder='e.g. 24" x 30"'
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">Image path</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="/images/paintings/your-image.jpg"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <button
          onClick={() =>
            onSave({
              id: painting ? painting.id : id || undefined,
              title,
              category: category as Painting["category"],
              year: parseInt(year, 10) || 2023,
              medium,
              size,
              image,
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
