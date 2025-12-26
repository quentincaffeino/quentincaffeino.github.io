/**
 * @param {Response} response
 * @returns {Response}
 */
export default function isResponseOk(response) {
  if (response.ok) return response;
  else throw { message: `response from '${(new URL(response.url)).host}' is not ok`, response };
}
