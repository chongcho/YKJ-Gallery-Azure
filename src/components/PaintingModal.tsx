"use client";

import { useEffect, useRef, useState } from "react";
import type { Painting } from "@/data/paintings";
import { useSwAuth } from "@/hooks/useSwAuth";

interface Props {
  painting: Painting;
  /** Resolved image URL (static path or blob override) */
  imageSrc: string;
  onClose: () => void;
  onImageUploaded?: () => void;
}

function fileToBase64(file: File): Promise<{ base64: string; contentType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const comma = dataUrl.indexOf(",");
      if (comma === -1) {
        reject(new Error("Invalid file data"));
        return;
      }
      const header = dataUrl.slice(0, comma);
      const contentTypeMatch = header.match(/data:([^;]+)/);
      const contentType = contentTypeMatch
        ? contentTypeMatch[1]
        : file.type || "image/jpeg";
      const base64 = dataUrl.slice(comma + 1);
      resolve({ base64, contentType });
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function PaintingModal({
  painting,
  imageSrc,
  onClose,
  onImageUploaded,
}: Props) {
  const { isAuthenticated } = useSwAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewKey, setPreviewKey] = useState(0);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setUploadError("Choose an image file first.");
      return;
    }
    setUploadError(null);
    setUploading(true);
    try {
      const { base64, contentType } = await fileToBase64(file);
      const res = await fetch("/api/upload-painting-image", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paintingId: painting.id,
          imageBase64: base64,
          contentType,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setUploadError(data.error || `Upload failed (${res.status})`);
        return;
      }
      onImageUploaded?.();
      setPreviewKey((k) => k + 1);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white max-w-4xl w-full max-h-[90vh] overflow-auto flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-3xl text-text-secondary hover:text-text-primary z-10"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="md:w-3/5 bg-warm-gray flex flex-col p-4 md:min-h-[320px]">
          <div className="flex-1 flex items-center justify-center min-h-[200px]">
            <img
              key={`${imageSrc}-${previewKey}`}
              src={imageSrc}
              alt={painting.title}
              className="max-h-[70vh] w-auto object-contain"
              onError={(e) => {
                e.currentTarget.src = "/images/placeholder.svg";
                e.currentTarget.onerror = null;
              }}
            />
          </div>

          {isAuthenticated && (
            <form
              onSubmit={handleUpload}
              className="mt-4 pt-4 border-t border-medium-gray space-y-2"
            >
              <p className="text-xs text-text-secondary">
                Replace image for this painting (saved to Azure Blob; public URL
                updates the gallery).
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="text-xs max-w-full"
                  disabled={uploading}
                />
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-gold text-white hover:bg-gold/90 disabled:opacity-50"
                >
                  {uploading ? "Uploading…" : "Upload"}
                </button>
              </div>
              {uploadError && (
                <p className="text-xs text-red-600">{uploadError}</p>
              )}
            </form>
          )}
        </div>

        <div className="md:w-2/5 p-8 flex flex-col justify-center">
          <h2 className="font-serif text-3xl mb-1">{painting.title}</h2>
          <div className="w-10 h-0.5 bg-gold mb-6" />

          <dl className="space-y-3 text-sm">
            <div className="flex items-start justify-between gap-4">
              <dt className="font-semibold shrink-0">Artist</dt>
              <dd className="text-text-secondary text-right">Young K. Jang</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="font-semibold shrink-0">Year</dt>
              <dd className="text-text-secondary text-right">{painting.year}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="font-semibold shrink-0">Medium</dt>
              <dd className="text-text-secondary text-right">{painting.medium}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="font-semibold shrink-0">Size</dt>
              <dd className="text-text-secondary text-right">{painting.size}</dd>
            </div>
          </dl>

          <a
            href={`mailto:ykj@ykjgallery.com?subject=Inquiry about ${painting.title}`}
            className="mt-8 inline-block px-6 py-2.5 border-2 border-gold text-gold font-semibold tracking-wider uppercase text-sm hover:bg-gold hover:text-white transition-colors duration-300 text-center"
          >
            Inquire
          </a>

          <button
            type="button"
            onClick={onClose}
            className="mt-3 md:hidden inline-block px-6 py-2.5 border-2 border-medium-gray text-text-primary font-semibold tracking-wider uppercase text-sm hover:bg-medium-gray/40 transition-colors duration-300 text-center"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
