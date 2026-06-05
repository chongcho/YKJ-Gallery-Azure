export type PaintingImageOverride =
  | string
  | {
      url: string;
      imagePath: string;
    };

export function resolvePaintingImageSrc(
  painting: { id: string; image: string },
  overrides: Record<string, PaintingImageOverride>,
  catalogVersion: string
): string {
  const separator = painting.image.includes("?") ? "&" : "?";
  const staticSrc = `${painting.image}${separator}v=${catalogVersion}`;

  const override = overrides[painting.id];
  if (!override) return staticSrc;

  if (typeof override === "string") {
    // Legacy manifest entries are ignored so redeployed repo images take precedence.
    return staticSrc;
  }

  if (override.imagePath === painting.image) {
    return override.url;
  }

  return staticSrc;
}
