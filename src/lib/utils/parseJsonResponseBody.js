/**
 * @param {Response} response
 * @returns {Object}
 */
export default async function parseJsonResponseBody(response) {
  const responseText = await response.text();
  try {
    return JSON.parse(responseText);
  } catch (exception) {
    throw { message: "failed to parse json", exception, responseText };
  }
}
