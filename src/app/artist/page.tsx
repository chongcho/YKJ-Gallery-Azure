import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artist",
  description:
    "Young K Jang — contemporary artist pursuing modern-abstract painting for decades. Inspired by people, nature, and the world around us.",
};

export default function ArtistPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="bg-warm-gray py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">Artists</h1>
          <div className="w-20 h-0.5 bg-gold mx-auto" />
        </div>
      </section>

      {/* Artist profile */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-2/5">
            <img
              src="/images/paintings/blossom-4.jpg"
              alt="Young K Jang artwork"
              className="w-full object-cover shadow-lg"
            />
          </div>

          <div className="md:w-3/5">
            <h2 className="font-serif text-4xl mb-2">Young K Jang</h2>
            <div className="w-12 h-0.5 bg-gold mb-6" />

            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Young K Jang is a contemporary artist, has been pursuing her
                modern-abstract painting areas for decades. Her paintings are
                inspired by the people, nature, and things around us. She paints
                them with unique patterns, lines, and depth of colors on the
                canvas.
              </p>
              <p>
                The implications of each painting may vary by perspectives at
                the time and environment of the individuals. Young Ky lives in
                Seattle area, teaches painting the students, keeps her unique
                identity with seamless ideas and challenges.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-medium-gray">
              <h3 className="font-serif text-xl mb-3">Details</h3>
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
                <dt className="font-semibold">Medium</dt>
                <dd className="text-text-secondary">Acrylic on canvas</dd>
                <dt className="font-semibold">Style</dt>
                <dd className="text-text-secondary">
                  Contemporary, Modern Abstract
                </dd>
                <dt className="font-semibold">Location</dt>
                <dd className="text-text-secondary">Seattle, WA, USA</dd>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="bg-warm-gray py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-center mb-8">
            Selected Works
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "/images/paintings/taos.jpg",
              "/images/paintings/cactus-5.jpg",
              "/images/paintings/flowers.jpg",
              "/images/paintings/wildflowers.jpg",
            ].map((src) => (
              <img
                key={src}
                src={src}
                alt="Selected work"
                className="w-full h-48 object-cover"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
