import isResponseOk from "$lib/utils/isResponseOk";
import parseJsonResponseBody from "$lib/utils/parseJsonResponseBody";

const username = import.meta.env.VITE_GH_USERNAME;

/**
 * @param {{fetch: Window.fetch}} props
 * @returns {Promise<Object>}
 */
export function fetchUserData(props = {}) {
  if (!props?.fetch) {
    throw new Error('fetch is required');
  }

  return props
    .fetch("https://api.github.com/users/" + username)
    .then(isResponseOk)
    .then(parseJsonResponseBody);
}
