import Link from "next/link";
import ExhibitionImage from "./ExhibitionImage";

interface Exhibition {
  id: string;
  title: string;
  tagline: string | null;
  description: string | null;
  location: string | null;
  link: string | null;
  link_label: string | null;
  images: { src: string }[];
}

const exhibitions: Exhibition[] = [
  {
    id: "1",
    title: "Seattle Art Fair",
    tagline: null,
    description: null,
    location: null,
    link: "https://seattleartfair.com/",
    link_label: "Learn More",
    images: [
      { src: "/images/exhibition/Seattle Art Fair 2023.jpg" },
      { src: "/images/exhibition/Seattle Art Fair-Lumen Field.jpg" },
    ],
  },
  {
    id: "2",
    title: "Young K. Jang & Young Nam Cho",
    tagline: "Memories, Moments, Hopes",
    description:
      "THE SPACE Art and Meet. A joint exhibition featuring Young-Nam Cho and Young-Kyung Jang.",
    location: "Event Center",
    link: null,
    link_label: null,
    images: [{ src: "/images/exhibition/YKJ and YNC-1.jpg" }],
  },
  {
    id: "3",
    title: "Student Exhibition",
    tagline: null,
    description: "Student artwork showcase at THE SPACE.",
    location: null,
    link: null,
    link_label: null,
    images: [
      { src: "/images/exhibition/student-exhibition-1.jpg" },
      { src: "/images/exhibition/student-exhibition-2.jpg" },
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
                className="overflow-hidden rounded-sm bg-warm-gray aspect-video"
              >
                <ExhibitionImage
                  src={img.src}
                  alt={`${exhibition.title} ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {exhibition.link && (
            <div className="text-center mt-8">
              <Link
                href={exhibition.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2.5 border-2 border-gold text-gold font-semibold tracking-wider uppercase text-sm hover:bg-gold hover:text-white transition-colors duration-300"
              >
                {exhibition.link_label || "Learn More"}
              </Link>
            </div>
          )}
        </article>
      ))}
    </section>
  );
}
