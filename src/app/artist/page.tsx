import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artist",
  description:
    "Young K. Jang is a contemporary artist whose modern abstract painting practice spans over a decade, inspired by people, nature, and everyday surroundings.",
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
              src="/Artist%20Profile/Artist-YKJ%20Profile%20Photo.jpg"
              alt="Young K Jang profile photo"
              className="w-full object-cover shadow-lg"
            />
          </div>

          <div className="md:w-3/5">
            <h2 className="font-serif text-4xl mb-2">Young K Jang</h2>
            <div className="w-12 h-0.5 bg-gold mb-6" />

            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Young K. Jang is a contemporary artist whose practice in modern
                abstract painting spans over a decade. Her work is inspired by
                people, nature, and everyday surroundings, expressed through
                distinctive patterns, dynamic lines, and layered color
                compositions that create depth and emotional resonance.
              </p>
              <p>
                Her paintings invite open interpretation, allowing meaning to
                shift depending on the viewer's perspective, context, and
                moment in time. This fluid relationship between artwork and
                audience is central to her artistic philosophy.
              </p>
              <p>
                Based in the Seattle area, Young K. Jang is the Executive
                Artist at THE SPACE, an art studio and gallery in Redmond,
                Washington. Through this platform, she supports the development
                of emerging contemporary artists and fosters connections within
                the art community. In parallel, she has been dedicated to
                teaching painting since 2010, helping students rediscover
                creativity and express their ideas on canvas.
              </p>
              <p>
                Her exhibition history includes participation in the Seattle Art
                Fair (2019, 2022), where she presented her modern abstract
                works, including the collaborative exhibition "Memories,
                Moments, Hopes" with renowned Korean pop artist Young-Nam Cho.
                She has also exhibited in group shows such as THE SPACE Art
                Exhibition.
              </p>
              <p>
                In addition to her visual work, she is the author of "ART and
                DESIGN" (2017), a publication featuring her modern abstract
                works.
              </p>
              <p>
                Through continuous exploration and experimentation, Young K.
                Jang maintains a distinctive artistic identity, driven by
                curiosity, innovation, and a commitment to creative growth.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
