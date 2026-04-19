"use client";

import { useEffect, useState } from "react";
import VideoEmbed from "./VideoEmbed";
import { createClient } from "@/lib/supabase/client";
import { videos as staticVideos } from "@/data/videos";

interface Video {
  title: string;
  description: string;
  placeholder: string;
  src?: string | null;
  youtube_id?: string | null;
  vimeo_id?: string | null;
}

export default function VideoContent() {
  const [videos, setVideos] = useState<Video[]>(
    staticVideos.map((v) => ({
      title: v.title,
      description: v.description,
      placeholder: v.placeholder,
      src: v.src,
      youtube_id: v.youtubeId,
      vimeo_id: v.vimeoId,
    }))
  );
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
          .from("videos")
          .select("*")
          .order("order", { ascending: true });
        if (data && data.length > 0) {
          setVideos(
            data.map((v) => ({
              title: v.title,
              description: v.description,
              placeholder: v.placeholder,
              src: v.src,
              youtube_id: v.youtube_id,
              vimeo_id: v.vimeo_id,
            }))
          );
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [supabase]);

  const hasEmbeddedVideos = videos.some(
    (v) => v.src || v.youtube_id || v.vimeo_id
  );

  if (loading) {
    return (
      <section className="max-w-5xl mx-auto px-6 py-16 text-center text-text-secondary">
        Loading videos…
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">
        Explore videos of Young K Jang&apos;s painting process and art
        collections.
      </p>

      {!hasEmbeddedVideos && (
        <div className="mb-12 p-4 bg-warm-gray border-l-4 border-gold text-sm text-text-secondary">
          <strong>To add videos:</strong> Large .mp4 bundles are not deployed (hosting
          size limit). Use <strong>YouTube</strong> or <strong>Vimeo</strong> IDs in
          admin/data, or host files externally and set <code className="bg-white px-1">src</code> in{" "}
          <code className="bg-white px-1">src/data/videos.ts</code>. See{" "}
          <code className="bg-white px-1">public/videos/README.md</code>.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <VideoEmbed
            key={video.title}
            title={video.title}
            description={video.description}
            placeholder={video.placeholder}
            src={video.src ?? undefined}
            youtubeId={video.youtube_id ?? undefined}
            vimeoId={video.vimeo_id ?? undefined}
          />
        ))}
      </div>
    </section>
  );
}
