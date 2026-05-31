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
      className="fixed inset-0 z-[100] flex flex-col bg-black"
      role="dialog"
      aria-modal="true"
      aria-label={painting.title}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-30 text-3xl leading-none text-white/80 hover:text-white transition-colors"
        aria-label="Close"
      >
        &times;
      </button>

      <div
        className="relative flex-1 flex items-center justify-center min-h-0 w-full p-4 sm:p-6 md:p-10"
        onClick={onClose}
      >
        <img
          key={`${imageSrc}-${previewKey}`}
          src={imageSrc}
          alt={painting.title}
          className="max-h-full max-w-full object-contain select-none"
          draggable={false}
          onClick={(e) => e.stopPropagation()}
          onError={(e) => {
            e.currentTarget.src = "/images/placeholder.svg";
            e.currentTarget.onerror = null;
          }}
        />
      </div>

      <div
        className="relative z-20 shrink-0 bg-gradient-to-t from-black via-black/95 to-transparent px-4 sm:px-6 md:px-10 pt-10 pb-5 sm:pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-5xl mx-auto flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-white mb-1">
              {painting.title}
            </h2>
            <div className="w-10 h-0.5 bg-gold mb-4" />

            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-2 text-sm">
              <div>
                <dt className="font-semibold text-white/70">Artist</dt>
                <dd className="text-white/90">Young K. Jang</dd>
              </div>
              <div>
                <dt className="font-semibold text-white/70">Year</dt>
                <dd className="text-white/90">{painting.year}</dd>
              </div>
              <div>
                <dt className="font-semibold text-white/70">Medium</dt>
                <dd className="text-white/90">{painting.medium}</dd>
              </div>
              <div>
                <dt className="font-semibold text-white/70">Size</dt>
                <dd className="text-white/90">{painting.size}</dd>
              </div>
            </dl>
          </div>

          <a
            href={`mailto:ykj@ykjgallery.com?subject=Inquiry about ${painting.title}`}
            className="shrink-0 inline-block px-6 py-2.5 border-2 border-gold text-gold font-semibold tracking-wider uppercase text-sm hover:bg-gold hover:text-white transition-colors duration-300 text-center"
          >
            Inquire
          </a>
        </div>

        {isAuthenticated && (
          <form
            onSubmit={handleUpload}
            className="max-w-5xl mx-auto mt-4 pt-4 border-t border-white/20 space-y-2"
          >
            <p className="text-xs text-white/60">
              Replace image for this painting (saved to Azure Blob; public URL
              updates the gallery).
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="text-xs max-w-full text-white"
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
              <p className="text-xs text-red-400">{uploadError}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
