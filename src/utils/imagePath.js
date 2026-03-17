// Cache-bust: al refrescar la página se pide la imagen de nuevo (evita ver la anterior al reemplazar el archivo)
const cacheBust = Date.now();

/**
 * Convierte el nombre de archivo de imagen (guardado en Firebase) en la ruta local.
 * Las imágenes se sirven desde public/img/
 * @param {string} filename - Nombre del archivo (ej: "producto1.jpg")
 * @returns {string} - Ruta para usar en src (ej: "/img/producto1.jpg?t=...")
 */
export const getImageSrc = (filename) => {
  if (!filename) return "";
  // Si ya es una URL completa (retrocompatibilidad), se usa tal cual
  if (typeof filename === "string" && filename.startsWith("http")) {
    return filename;
  }
  return `/img/${filename}?t=${cacheBust}`;
};
