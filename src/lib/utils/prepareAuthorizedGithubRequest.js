const BASE_URL = "https://api.github.com";
const ACCESS_TOKEN_URL_PARAM_KEY = "access_token";
const AUTHORIZATION_HEADER = "Authorization";

/**
 * @param {string} path
 * @param {string} token
 * @param {{ authViaQuery?: boolean }} props
 * @returns {Request}
 */
export default function prepareAuthorizedGithubRequest(
  path,
  token,
  props = {}
) {
  const urlObj = new URL(BASE_URL + path);

  let request;

  // Passing token in url is insecure so it is advised not to use this
  // But this can be helpful for testing purposes
  if (props.authViaQuery) {
    urlObj.searchParams.set(ACCESS_TOKEN_URL_PARAM_KEY, token);
    request = new Request(urlObj);
  } else {
    request = new Request(urlObj, {
      credentials: "include",
    });

    request.headers.set(AUTHORIZATION_HEADER, "Bearer " + token);
  }

  return request;
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("should create a request object with provided path", () => {
    const path = "/path";
    const correctResult = BASE_URL + path;

    const result = prepareAuthorizedGithubRequest(path, "");

    expect(result.url).toEqual(correctResult);
  });

  it("should create a request object with provided path and an auth token in url", () => {
    const path = "/path";
    const token = "hellow-world";
    const props = { authViaQuery: true };

    const result = prepareAuthorizedGithubRequest(path, token, props);

    const url = new URL(result.url);
    expect(url.searchParams.has(ACCESS_TOKEN_URL_PARAM_KEY)).toBeTruthy();
    expect(url.searchParams.get(ACCESS_TOKEN_URL_PARAM_KEY)).toEqual(token);
  });

  it("should create a request object with provided path and an auth token as a bearer header and include credentials", () => {
    const path = "/path";
    const token = "hellow-world";

    const result = prepareAuthorizedGithubRequest(path, token);

    expect(result.headers.has(AUTHORIZATION_HEADER)).toBeTruthy();
    expect(result.headers.get(AUTHORIZATION_HEADER)).toEqual("Bearer " + token);
  });
}
