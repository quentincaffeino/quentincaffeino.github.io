import hexToRGB from "./hexToRGB";
import rgbToLuma from "./rgbToLuma";

/**
 * @param {string} hex
 * @returns {number}
 */
export default function hexToLuma(hex) {
  return rgbToLuma(hexToRGB(hex));
}
