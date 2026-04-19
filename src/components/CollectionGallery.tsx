"use client";

import { useState } from "react";
import { paintings } from "@/data/paintings";
import PaintingModal from "./PaintingModal";
import type { Painting } from "@/data/paintings";

export default function CollectionGallery() {
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(
    null
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div
        className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6"
        style={{ columnFill: "balance" }}
      >
        {paintings.map((painting) => (
          <button
            key={painting.id}
            id={painting.id}
            onClick={() => setSelectedPainting(painting)}
            className="group text-left break-inside-avoid mb-6 block w-full"
          >
            <div className="overflow-hidden bg-warm-gray rounded-sm">
              <img
                src={painting.image}
                alt={painting.title}
                className="w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
                style={{ display: "block" }}
                onError={(e) => {
                  e.currentTarget.src = "/images/placeholder.svg";
                  e.currentTarget.onerror = null;
                }}
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
