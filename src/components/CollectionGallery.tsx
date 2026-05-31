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

  const selectedIndex = selectedPainting
    ? paintings.findIndex((p) => p.id === selectedPainting.id)
    : -1;

  function goToPrevious() {
    if (selectedIndex > 0) {
      setSelectedPainting(paintings[selectedIndex - 1]);
    }
  }

  function goToNext() {
    if (selectedIndex >= 0 && selectedIndex < paintings.length - 1) {
      setSelectedPainting(paintings[selectedIndex + 1]);
    }
  }

  return (
    <section className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-10 sm:py-12 md:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
        {paintings.map((painting) => {
          const src = overrides[painting.id] ?? painting.image;
          return (
            <div
              key={painting.id}
              id={painting.id}
              className="group text-left block w-full md:w-[70%] md:mx-auto"
            >
              <button
                type="button"
                onClick={() => setSelectedPainting(painting)}
                className="block w-full text-left"
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
              </button>
              <div className="mt-2 flex items-center justify-between gap-2">
                <h3 className="font-serif text-sm sm:text-base group-hover:text-gold transition-colors min-w-0">
                  {painting.title}
                </h3>
                <a
                  href={`mailto:ykj@ykjgallery.com?subject=Inquiry about ${painting.title}`}
                  className="shrink-0 px-3 py-1.5 sm:px-4 sm:py-2 border-2 border-gold text-gold font-semibold tracking-wider uppercase text-xs hover:bg-gold hover:text-white transition-colors duration-300"
                >
                  Inquire
                </a>
              </div>
              <div className="text-xs sm:text-sm text-text-secondary space-y-0.5 mt-0.5">
                <p>{painting.year}</p>
                <p>{painting.medium}</p>
                <p>{painting.size}</p>
              </div>
            </div>
          );
        })}
      </div>

      {selectedPainting && selectedIndex >= 0 && (
        <PaintingModal
          painting={selectedPainting}
          imageSrc={overrides[selectedPainting.id] ?? selectedPainting.image}
          onClose={() => setSelectedPainting(null)}
          onPrevious={goToPrevious}
          onNext={goToNext}
          hasPrevious={selectedIndex > 0}
          hasNext={selectedIndex < paintings.length - 1}
          onImageUploaded={refresh}
        />
      )}
    </section>
  );
}
