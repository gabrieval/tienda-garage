const formatter = new Intl.NumberFormat("es-AR", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});
/**
 * Formatea un valor numérico a formato de moneda.
 * @param {number|string} value - El valor a formatear.
 * @returns {string} El valor formateado como moneda.
 */
export const formatMoney = (value) => {
  const numberValue = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numberValue)) return "$0";
  return `$${formatter.format(numberValue)}`;
};

