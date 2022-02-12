/**
 * @param {Response} response
 * @returns {Response}
 */
export default function isResponseOk(response) {
  if (response.ok) return response;
  else throw { error: `response from '${response.url}' is not ok`, response };
}
