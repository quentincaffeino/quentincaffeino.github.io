/**
 * @param {Response} response
 * @returns {Response}
 */
export default function isResponseOk(response) {
  if (response.ok) return response;
  else throw { error: "response is not ok", response };
}
