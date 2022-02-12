/**
 * @param {string} str
 * @returns {string}
 */
export default function graphqlMinify(str) {
  return str.replace(/\n/g, " ").replace(/\ +/g, " ").trim();
}
