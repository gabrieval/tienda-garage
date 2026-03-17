import { getImageSrc } from "./imagePath";

/**
 * Firestore mantiene `image` como string (compat) pero permite múltiples valores separados por coma.
 * Ej:
 *  - "a.jpg, b.jpg, https://..."  -> ["a.jpg","b.jpg","https://..."]
 */
export const parseProductImages = (imageField) => {
  if (!imageField) return [];

  if (Array.isArray(imageField)) {
    return imageField
      .map((v) => (typeof v === "string" ? v.trim() : ""))
      .filter(Boolean);
  }

  if (typeof imageField !== "string") return [];

  return imageField
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
};

export const getProductImageSrcs = (imageField) => {
  return parseProductImages(imageField).map((img) => getImageSrc(img));
};

export const getPrimaryProductImageSrc = (imageField) => {
  const [first] = parseProductImages(imageField);
  return first ? getImageSrc(first) : "";
};

export const serializeProductImages = (images) => {
  // Útil para cuando guardes/edites productos: se guarda como string separado por comas.
  return parseProductImages(images).join(", ");
};

