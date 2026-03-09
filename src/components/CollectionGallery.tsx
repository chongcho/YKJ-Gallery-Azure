"use client";

import { useState } from "react";
import { paintings, categories } from "@/data/paintings";
import PaintingModal from "./PaintingModal";
import type { Painting } from "@/data/paintings";

export default function CollectionGallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(
    null
  );

  const filtered =
    activeCategory === "all"
      ? paintings
      : paintings.filter((p) => p.category === activeCategory);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Category filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-5 py-2 text-sm tracking-wider uppercase transition-colors duration-200 ${
              activeCategory === cat.id
                ? "bg-gold text-white"
                : "bg-warm-gray text-text-secondary hover:bg-gold/10 hover:text-gold"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((painting) => (
          <button
            key={painting.id}
            id={painting.id}
            onClick={() => setSelectedPainting(painting)}
            className="group text-left"
          >
            <div className="overflow-hidden bg-warm-gray">
              <img
                src={painting.image}
                alt={painting.title}
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <h3 className="font-serif text-base mt-2 group-hover:text-gold transition-colors">
              {painting.title}
            </h3>
            <p className="text-xs text-text-secondary">{painting.size}</p>
          </button>
        ))}
      </div>

      {selectedPainting && (
        <PaintingModal
          painting={selectedPainting}
          onClose={() => setSelectedPainting(null)}
        />
      )}
    </section>
  );
}
