import type { Metadata } from "next";
import Link from "next/link";
import ExhibitionImage from "@/components/ExhibitionImage";

export const metadata: Metadata = {
  title: "Exhibition",
  description:
    "YKJ Gallery exhibitions — Seattle Art Fair, Young K. Jang & Young Nam Cho, Student Exhibition.",
};

const exhibitions = [
  {
    id: "seattle-art-fair",
    title: "Seattle Art Fair",
    images: [
      "/images/exhibition/seattle-art-fair-2023.jpg",
      "/images/exhibition/seattle-art-fair-interior.jpg",
    ],
    link: "https://seattleartfair.com/",
    linkLabel: "Learn More",
  },
  {
    id: "young-k-jang-young-nam-cho",
    title: "Young K. Jang & Young Nam Cho",
    tagline: "Memories, Moments, Hopes",
    description:
      "THE SPACE Art and Meet. A joint exhibition featuring Young-Nam Cho and Young-Kyung Jang.",
    images: ["/images/exhibition/young-k-jang-young-nam-cho.jpg"],
    location: "Event Center",
  },
  {
    id: "student-exhibition",
    title: "Student Exhibition",
    description: "Student artwork showcase at THE SPACE.",
    images: [
      "/images/exhibition/student-exhibition-1.jpg",
      "/images/exhibition/student-exhibition-2.jpg",
    ],
  },
];

export default function ExhibitionPage() {
  return (
    <>
      <section className="bg-warm-gray py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">Exhibitions</h1>
          <div className="w-20 h-0.5 bg-gold mx-auto" />
        </div>
      </section>

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
              {exhibition.images.map((src, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-sm bg-warm-gray aspect-video"
                >
                  <ExhibitionImage
                    src={src}
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
                  {exhibition.linkLabel}
                </Link>
              </div>
            )}
          </article>
        ))}
      </section>
    </>
  );
}
