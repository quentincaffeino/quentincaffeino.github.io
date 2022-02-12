/**
 * @see https://stackoverflow.com/questions/596216/formula-to-determine-perceived-brightness-of-rgb-color/596241#596241
 * @param {import("./hexToRGB").ColorRGB} color
 * @returns {number}
 */
export default function rgbToLuma(color) {
  return ((color.r << 1) + color.r + (color.g << 2) + color.b) >> 3;
}
