/**
 * @param {string} url
 * @param {{ token: string, authViaQuery?: boolean }} props
 * @returns {Request}
 */
export default function prepareAuthorizedGithubRequest(
  url,
  props = { token, authViaQuery: false }
) {
  let request;

  // Passing token in url is insecure so it is advised not to use this
  // But this can be helpful for testing purposes
  if (props.authViaQuery) {
    const urlObj = new URL(url);
    const search = urlObj.searchParams;
    search.set("access_token", props.token);
    request = new Request(urlObj.toString());
  } else {
    request = new Request(url, {
      credentials: "include",
    });

    request.headers.set("Authorization", "Bearer " + props.token);
  }

  return request;
}
