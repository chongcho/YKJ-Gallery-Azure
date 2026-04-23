import ExhibitionImage from "./ExhibitionImage";

interface Exhibition {
  id: string;
  title: string;
  tagline: string | null;
  description: string | null;
  location: string | null;
  images: { src: string }[];
}

const exhibitions: Exhibition[] = [
  {
    id: "1",
    title: "Seattle Art Fair",
    tagline: null,
    description: null,
    location: null,
    images: [
      { src: "/images/exhibition/Seattle Art Fair 2023.jpg" },
      { src: "/images/exhibition/Seattle Art Fair-Lumen Field.jpg" },
    ],
  },
  {
    id: "2",
    title: "Young K. Jang & Young Nam Cho",
    tagline: "Memories, Moments, Hopes",
    description: null,
    location: null,
    images: [
      { src: "/images/exhibition/YNC-1.jpg" },
      { src: "/images/exhibition/YKJ and YNC-2.jpg" },
    ],
  },
  {
    id: "3",
    title: "THE SPACE Exhibition",
    tagline: null,
    description: null,
    location: null,
    images: [
      { src: "/images/exhibition/THE SPACE Exhibition-1.jpg" },
      { src: "/images/exhibition/THE SPACE Exhibition-2.jpg" },
      { src: "/images/exhibition/THE SPACE Exhibition-3.jpg" },
    ],
  },
];

export default function ExhibitionContent() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 space-y-20">
      {exhibitions.map((exhibition) => (
        <article key={exhibition.id}>
          <h2 className="font-serif text-3xl text-center mb-2">
            {exhibition.title}
          </h2>
          {exhibition.tagline && (
            <p className="text-center text-text-secondary mb-8">
              — {exhibition.tagline} —
            </p>
          )}
          {exhibition.description && (
            <p className="text-center text-text-secondary mb-8 max-w-2xl mx-auto">
              {exhibition.description}
            </p>
          )}
          {exhibition.location && (
            <p className="text-center text-sm text-text-secondary mb-8">
              Location: {exhibition.location}
            </p>
          )}

          <div className="space-y-6">
            {(exhibition.images || []).map((img, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-sm bg-warm-gray"
              >
                <ExhibitionImage
                  src={img.src}
                  alt={`${exhibition.title} ${i + 1}`}
                  className="block w-full h-auto"
                />
              </div>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}
