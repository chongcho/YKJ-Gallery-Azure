import type { Metadata } from "next";
import VideoEmbed from "@/components/VideoEmbed";
import { videos } from "@/data/videos";

export const metadata: Metadata = {
  title: "Video",
  description:
    "Watch videos of Young K Jang's painting process and art collections.",
};

export default function VideoPage() {
  const hasEmbeddedVideos = videos.some(
    (v) => v.src || v.youtubeId || v.vimeoId
  );

  return (
    <>
      <section className="bg-warm-gray py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">Video</h1>
          <div className="w-20 h-0.5 bg-gold mx-auto" />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">
          Explore videos of Young K Jang&apos;s painting process and art
          collections.
        </p>

        {!hasEmbeddedVideos && (
          <div className="mb-12 p-4 bg-warm-gray border-l-4 border-gold text-sm text-text-secondary">
            <strong>To add videos:</strong> Place your .mp4 or .webm files in{" "}
            <code className="bg-white px-1">public/videos/</code> and name them{" "}
            <code className="bg-white px-1">adobe-3a.mp4</code>,{" "}
            <code className="bg-white px-1">golf.mp4</code>,{" "}
            <code className="bg-white px-1">cactus-5.mp4</code>.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <VideoEmbed
              key={video.title}
              title={video.title}
              description={video.description}
              placeholder={video.placeholder}
              src={video.src}
              youtubeId={video.youtubeId}
              vimeoId={video.vimeoId}
            />
          ))}
        </div>
      </section>
    </>
  );
}
