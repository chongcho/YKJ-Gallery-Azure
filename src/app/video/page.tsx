import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video",
  description:
    "Watch videos of Young K Jang's painting process and art collections.",
};

const videos = [
  {
    title: "Adobe 3a",
    description: "A painting process video showcasing the Adobe series.",
    placeholder: "/images/paintings/adobe-3.jpg",
  },
  {
    title: "Golf",
    description: "Art inspired by the greens and landscapes of the golf course.",
    placeholder: "/images/paintings/wildflowers.jpg",
  },
  {
    title: "Cactus 5",
    description: "Watch the creation of the Cactus 5 painting.",
    placeholder: "/images/paintings/cactus-5.jpg",
  },
];

export default function VideoPage() {
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
          Explore videos of Young K Jang&apos;s painting process. Videos are
          being migrated — check back soon for embedded playback.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div key={video.title} className="group">
              <div className="relative overflow-hidden bg-warm-gray">
                <img
                  src={video.placeholder}
                  alt={video.title}
                  className="w-full h-56 object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
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
              <h3 className="font-serif text-lg mt-3">{video.title}</h3>
              <p className="text-sm text-text-secondary">
                {video.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
