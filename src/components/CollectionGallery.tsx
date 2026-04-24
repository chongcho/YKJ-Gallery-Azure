"use client";

import { useState } from "react";
import { paintings } from "@/data/paintings";
import PaintingModal from "./PaintingModal";
import type { Painting } from "@/data/paintings";
import { usePaintingImageOverrides } from "@/hooks/usePaintingImageOverrides";

export default function CollectionGallery() {
  const { overrides, refresh } = usePaintingImageOverrides();
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(
    null
  );

  return (
    <section className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-10 sm:py-12 md:py-16">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6">
        {paintings.map((painting) => {
          const src = overrides[painting.id] ?? painting.image;
          return (
            <button
              key={painting.id}
              id={painting.id}
              onClick={() => setSelectedPainting(painting)}
              className="group text-left block w-full"
            >
              <div className="overflow-hidden bg-warm-gray rounded-sm">
                <img
                  src={src}
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
              <h3 className="font-serif text-sm sm:text-base mt-2 group-hover:text-gold transition-colors">
                {painting.title}
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary">{painting.size}</p>
            </button>
          );
        })}
      </div>

      {selectedPainting && (
        <PaintingModal
          painting={selectedPainting}
          imageSrc={overrides[selectedPainting.id] ?? selectedPainting.image}
          onClose={() => setSelectedPainting(null)}
          onImageUploaded={refresh}
        />
      )}
    </section>
  );
}
