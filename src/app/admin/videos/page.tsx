"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Video {
  id: string;
  title: string;
  description: string;
  placeholder: string;
  src: string | null;
  youtube_id: string | null;
  vimeo_id: string | null;
  order: number;
}

export default function AdminVideosPage() {
  const [items, setItems] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Video | null>(null);
  const [adding, setAdding] = useState(false);
  const supabase = createClient();

  async function fetchVideos() {
    if (!supabase) return;
    const { data } = await supabase
      .from("videos")
      .select("*")
      .order("order", { ascending: true });
    setItems((data as Video[]) || []);
  }

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    fetchVideos().finally(() => setLoading(false));
  }, [supabase]);

  async function handleDelete(id: string) {
    if (!supabase || !confirm("Remove this video?")) return;
    await supabase.from("videos").delete().eq("id", id);
    fetchVideos();
  }

  if (!supabase) {
    return (
      <div>
        <h1 className="font-serif text-3xl mb-6">Videos</h1>
        <p className="text-red-600">Supabase not configured.</p>
      </div>
    );
  }

  if (loading) return <p className="text-text-secondary">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl">Videos</h1>
        <button
          onClick={() => {
            setAdding(true);
            setEditing(null);
          }}
          className="px-4 py-2 bg-gold text-white text-sm font-semibold uppercase tracking-wider hover:bg-gold/90"
        >
          Add video
        </button>
      </div>

      {(adding || editing) && (
        <VideoForm
          video={editing || undefined}
          onSave={async (v) => {
            if (editing) {
              await supabase
                .from("videos")
                .update({
                  title: v.title,
                  description: v.description,
                  placeholder: v.placeholder,
                  src: v.src || null,
                  youtube_id: v.youtubeId || null,
                  vimeo_id: v.vimeoId || null,
                })
                .eq("id", editing.id);
            } else {
              const maxOrder = items.length > 0 ? Math.max(...items.map((i) => i.order)) + 1 : 0;
              await supabase.from("videos").insert({
                title: v.title,
                description: v.description,
                placeholder: v.placeholder,
                src: v.src || null,
                youtube_id: v.youtubeId || null,
                vimeo_id: v.vimeoId || null,
                order: maxOrder,
              });
            }
            setAdding(false);
            setEditing(null);
            fetchVideos();
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
              <th className="px-4 py-3 font-semibold">Title</th>
              <th className="px-4 py-3 font-semibold">Source</th>
              <th className="px-4 py-3 font-semibold w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((v) => (
              <tr key={v.id} className="border-t border-medium-gray">
                <td className="px-4 py-3">{v.title}</td>
                <td className="px-4 py-3 text-text-secondary">
                  {v.src && "File"}
                  {v.youtube_id && "YouTube"}
                  {v.vimeo_id && "Vimeo"}
                  {!v.src && !v.youtube_id && !v.vimeo_id && "—"}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => {
                      setEditing(v);
                      setAdding(false);
                    }}
                    className="text-gold hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(v.id)}
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

function VideoForm({
  video,
  onSave,
  onCancel,
}: {
  video?: Video;
  onSave: (v: {
    title: string;
    description: string;
    placeholder: string;
    src?: string;
    youtubeId?: string;
    vimeoId?: string;
  }) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(video?.title || "");
  const [description, setDescription] = useState(video?.description || "");
  const [placeholder, setPlaceholder] = useState(video?.placeholder || "/images/paintings/");
  const [src, setSrc] = useState(video?.src || "");
  const [youtubeId, setYoutubeId] = useState(video?.youtube_id || "");
  const [vimeoId, setVimeoId] = useState(video?.vimeo_id || "");

  return (
    <div className="mb-8 p-6 bg-white rounded border border-medium-gray">
      <h2 className="font-serif text-xl mb-4">
        {video ? "Edit video" : "Add video"}
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
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Placeholder image path</label>
          <input
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
            placeholder="/images/paintings/example.jpg"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Video file path (optional)</label>
          <input
            value={src}
            onChange={(e) => setSrc(e.target.value)}
            placeholder="/videos/my-video.mp4"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">YouTube video ID (optional)</label>
          <input
            value={youtubeId}
            onChange={(e) => setYoutubeId(e.target.value)}
            placeholder="dQw4w9WgXcQ"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Vimeo video ID (optional)</label>
          <input
            value={vimeoId}
            onChange={(e) => setVimeoId(e.target.value)}
            placeholder="123456789"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <button
          onClick={() =>
            onSave({
              title,
              description,
              placeholder,
              src: src || undefined,
              youtubeId: youtubeId || undefined,
              vimeoId: vimeoId || undefined,
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
