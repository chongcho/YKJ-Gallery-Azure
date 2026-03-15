"use client";

interface VideoEmbedProps {
  title: string;
  /** Path to local video file (e.g. /videos/adobe-3a.mp4) */
  src?: string;
  /** YouTube video ID (e.g. from https://www.youtube.com/watch?v=VIDEO_ID) */
  youtubeId?: string;
  /** Vimeo video ID (e.g. from https://vimeo.com/VIDEO_ID) */
  vimeoId?: string;
  /** Fallback image when no video is provided */
  placeholder: string;
  description: string;
}

export default function VideoEmbed({
  title,
  src,
  youtubeId,
  vimeoId,
  placeholder,
  description,
}: VideoEmbedProps) {
  const hasVideo = src || youtubeId || vimeoId;

  if (src) {
    const videoSrc = src.includes(" ") ? src.split(" ").join("%20") : src;
    return (
      <div>
        <div className="relative w-full aspect-video overflow-hidden bg-warm-gray rounded-sm">
          <video
            src={videoSrc}
            controls
            playsInline
            poster={placeholder}
            className="w-full h-full object-contain"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <h3 className="font-serif text-lg mt-3">{title}</h3>
        <p className="text-sm text-text-secondary">{description}</p>
      </div>
    );
  }

  if (youtubeId) {
    return (
      <div>
        <div className="relative w-full aspect-video overflow-hidden bg-warm-gray rounded-sm">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
        <h3 className="font-serif text-lg mt-3">{title}</h3>
        <p className="text-sm text-text-secondary">{description}</p>
      </div>
    );
  }

  if (vimeoId) {
    return (
      <div>
        <div className="relative w-full aspect-video overflow-hidden bg-warm-gray rounded-sm">
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}`}
            title={title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
        <h3 className="font-serif text-lg mt-3">{title}</h3>
        <p className="text-sm text-text-secondary">{description}</p>
      </div>
    );
  }

  return (
    <div className="group">
      <div className="relative overflow-hidden bg-warm-gray rounded-sm">
        <img
          src={placeholder}
          alt={title}
          className="w-full aspect-video object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform pointer-events-none">
            <svg
              className="w-6 h-6 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <h3 className="font-serif text-lg mt-3">{title}</h3>
      <p className="text-sm text-text-secondary">{description}</p>
    </div>
  );
}
