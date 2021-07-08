/**
 * @param {Response} response
 * @returns {Response}
 */
export function isResponseOk(response) {
  if (response.ok) return response;
  else throw { error: "response is not ok", response };
}

/**
 * @param {String} str
 * @returns {String}
 */
export function graphqlMinify(str) {
  return str.replace(/\n/g, " ").replace(/\ +/g, " ").trim();
}
