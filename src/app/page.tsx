import Link from "next/link";
import HeroSlideshow from "@/components/HeroSlideshow";
import { paintings } from "@/data/paintings";

export default function Home() {
  const featured = paintings.slice(0, 6);

  return (
    <>
      <HeroSlideshow />

      {/* Featured Works */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="font-serif text-4xl text-center mb-2">
          Featured Works
        </h2>
        <div className="w-16 h-0.5 bg-gold mx-auto mb-12" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((painting) => (
            <Link
              key={painting.id}
              href={`/collection#${painting.id}`}
              className="group block"
            >
              <div className="overflow-hidden bg-warm-gray">
                <img
                  src={painting.image}
                  alt={painting.title}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h3 className="font-serif text-lg mt-3 group-hover:text-gold transition-colors">
                {painting.title}
              </h3>
              <p className="text-sm text-text-secondary">
                {painting.medium}, {painting.year}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/collection"
            className="inline-block px-8 py-3 border-2 border-gold text-gold font-semibold tracking-wider uppercase text-sm hover:bg-gold hover:text-white transition-colors duration-300"
          >
            View Full Collection
          </Link>
        </div>
      </section>

      {/* About Preview */}
      <section className="bg-warm-gray">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img
              src="/images/gallery-bg.jpg"
              alt="YKJ Gallery"
              className="w-full h-80 object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="font-serif text-3xl mb-4">About the Artist</h2>
            <div className="w-12 h-0.5 bg-gold mb-6" />
            <p className="text-text-secondary leading-relaxed mb-6">
              Young K Jang is a contemporary artist who has been pursuing her
              modern-abstract painting areas for decades. Her paintings are
              inspired by the people, nature, and things around us.
            </p>
            <Link
              href="/artist"
              className="inline-block px-6 py-2.5 border-2 border-gold text-gold font-semibold tracking-wider uppercase text-sm hover:bg-gold hover:text-white transition-colors duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
