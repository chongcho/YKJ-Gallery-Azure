"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  { image: "/images/paintings/taos.jpg", title: "Taos" },
  { image: "/images/paintings/blossom.jpg", title: "Blossom" },
  { image: "/images/paintings/cactus-4.jpg", title: "Cactus 4" },
  { image: "/images/paintings/flowers.jpg", title: "Flowers" },
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-black">
      {slides.map((slide, i) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover opacity-70"
          />
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="font-serif text-5xl md:text-7xl mb-4 drop-shadow-lg">
            YKJ Gallery
          </h1>
          <p className="text-lg md:text-xl tracking-widest uppercase mb-8 drop-shadow-md">
            Contemporary Art by Young K Jang
          </p>
          <Link
            href="/#collection"
            className="inline-block px-8 py-3 border-2 border-white text-white font-semibold tracking-wider uppercase text-sm hover:bg-white hover:text-text-primary transition-colors duration-300"
          >
            Explore Collection
          </Link>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === current ? "bg-gold" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
