/**
 * @typedef ColorRGB
 * @prop {number} r
 * @prop {number} g
 * @prop {number} b
 */

/**
 * @param {String} hex
 * @returns {ColorRGB}
 */
export function hexToRGB(hex) {
  if (!hex || !hex.length) return { r: 0, g: 0, b: 0 };

  if (hex.startsWith("#")) hex = hex.substr(1);

  const hexParts = hex.match(/.{1,2}/g);
  const rgb = {
    r: parseInt(hexParts[0], 16),
    g: parseInt(hexParts[1], 16),
    b: parseInt(hexParts[2], 16),
  };

  return rgb;
}

/**
 * @see https://stackoverflow.com/questions/596216/formula-to-determine-perceived-brightness-of-rgb-color/596241#596241
 * @param {ColorRGB} color
 * @returns {number}
 */
export function rgbToLuma(color) {
  return ((color.r << 1) + color.r + (color.g << 2) + color.b) >> 3;
}

/**
 * @param {String} hex
 * @returns {number}
 */
export function hexToLuma(hex) {
  return rgbToLuma(hexToRGB(hex));
}
