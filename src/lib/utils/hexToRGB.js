/**
 * @typedef ColorRGB
 * @prop {number} r
 * @prop {number} g
 * @prop {number} b
 */

/**
 * @param {string} hex
 * @returns {ColorRGB}
 */
export default function hexToRGB(hex) {
  if (!hex || !hex.length) return { r: 0, g: 0, b: 0 };

  if (hex.startsWith("#")) hex = hex.substring(1);

  const hexParts = hex.match(/.{1,2}/g);
  const rgb = {
    r: parseInt(hexParts[0], 16),
    g: parseInt(hexParts[1], 16),
    b: parseInt(hexParts[2], 16),
  };

  return rgb;
}
