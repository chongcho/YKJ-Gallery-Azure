import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Exhibition",
  description:
    "YKJ Gallery exhibitions and art fair participation. Seattle Art Fair 2023.",
};

const exhibitions = [
  {
    title: "Seattle Art Fair 2023",
    date: "July 27 - 30, 2023",
    location: "Seattle",
    description: "YKJ Gallery participated in the Seattle Art Fair 2023.",
    image: "/images/exhibition/seattle-art-fair-2023.jpg",
    link: "https://seattleartfair.com/",
    linkLabel: "Learn More",
  },
];

export default function ExhibitionPage() {
  return (
    <>
      <section className="bg-warm-gray py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">Exhibition</h1>
          <div className="w-20 h-0.5 bg-gold mx-auto" />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="space-y-16">
          {exhibitions.map((exhibition) => (
            <article
              key={exhibition.title}
              className="flex flex-col md:flex-row gap-12 items-start"
            >
              <div className="md:w-1/2">
                <div className="aspect-video bg-warm-gray overflow-hidden rounded-sm">
                  <img
                    src={exhibition.image}
                    alt={exhibition.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <h2 className="font-serif text-3xl mb-2">{exhibition.title}</h2>
                <p className="text-gold font-semibold mb-2">
                  {exhibition.date}
                </p>
                <p className="text-text-secondary mb-2">{exhibition.location}</p>
                <p className="text-text-secondary leading-relaxed mb-6">
                  {exhibition.description}
                </p>
                <Link
                  href={exhibition.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2.5 border-2 border-gold text-gold font-semibold tracking-wider uppercase text-sm hover:bg-gold hover:text-white transition-colors duration-300"
                >
                  {exhibition.linkLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
