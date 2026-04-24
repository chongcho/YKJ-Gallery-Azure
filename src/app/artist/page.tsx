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

      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="font-serif text-3xl mb-2">Artist Statement</h2>
        <div className="w-12 h-0.5 bg-gold mb-6" />
        <div className="space-y-4 text-text-secondary leading-relaxed">
          <p>
            My work is a dialogue between the external landscapes that inspire
            me and the internal abstractions that emerge from them. I move
            fluidly between representation and abstraction, allowing each mode
            to inform the other. The cactus and Taos series reflect my
            fascination with place, its resilience, architecture, and cultural
            resonance, while the Blossom and Flower paintings explore the
            intimate beauty of organic forms, growth, and renewal.
          </p>
          <p>
            The Abstract series represents my pursuit of pure form, color, and
            texture. These works are not bound by recognizable imagery but
            instead invite viewers to experience emotion and rhythm directly. By
            shifting between figurative and abstract approaches, I seek to
            capture both the tangible and intangible qualities of the world
            around us.
          </p>
          <p>
            Scale plays an important role in my practice. Smaller canvases allow
            for intimate studies, while larger works create immersive
            environments that envelop the viewer. This variation reflects my
            belief that art should exist on multiple levels, personal,
            monumental, and everything in between.
          </p>
          <p>
            Travel and cultural encounters also shape my work. From the deserts
            of the American Southwest to the historic streets of Cesky Krumlov,
            I draw inspiration from diverse geographies. Each place leaves an
            imprint, becoming part of the visual and emotional vocabulary I
            bring to the canvas.
          </p>
          <p>
            Ultimately, my paintings are explorations of contrast: nature and
            geometry, intimacy and scale, representation and abstraction. They
            are invitations to see the world both as it is and as it might be
            reimagined through color, form, and feeling.
          </p>
        </div>
      </section>
    </>
  );
}
