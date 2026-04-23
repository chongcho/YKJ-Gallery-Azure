import VideoEmbed from "./VideoEmbed";
import { videos } from "@/data/videos";

export default function VideoContent() {
  const hasEmbeddedVideos = videos.some(
    (v) => v.src || v.youtubeId || v.vimeoId
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">
        Explore videos of Young K Jang&apos;s painting process and art
        collections.
      </p>

      {!hasEmbeddedVideos && (
        <div className="mb-12 p-4 bg-warm-gray border-l-4 border-gold text-sm text-text-secondary">
          <strong>To add videos:</strong> Large .mp4 bundles are not deployed (hosting
          size limit). Use <strong>YouTube</strong> or <strong>Vimeo</strong> IDs in{" "}
          <code className="bg-white px-1">src/data/videos.ts</code>, or host files
          externally and set <code className="bg-white px-1">src</code> there. See{" "}
          <code className="bg-white px-1">public/videos/README.md</code>.
        </div>
      )}

      <div className="flex flex-col gap-14">
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
  );
}
