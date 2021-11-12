import { print } from "graphql";
import { graphqlMinify, isResponseOk } from "./utils";
import reposGraphql from "../graphql/github/repos.gql";

const username = import.meta.env.VITE_GH_USERNAME;
const token = import.meta.env.VITE_GH_OAUTH_TOKEN;

/**
 * @param {String} url
 * @param {{ authViaQuery: boolean }} props
 * @returns {Request}
 */
function prepareAuthorizedRequest(url, props = { authViaQuery: false }) {
  let request;

  if (props.authViaQuery) {
    request = new Request(url + "?access_token=" + token);
  } else {
    request = new Request(url, {
      credentials: "include",
    });

    request.headers.set("Authorization", "bearer " + token);
  }

  return request;
}

/**
 * @param {{fetch: Window.fetch}} props
 * @returns {Promise<Object>}
 */
export function fetchUserData(props = { fetch: window.fetch }) {
  return props
    .fetch("https://api.github.com/users/" + username)
    .then(isResponseOk)
    .then((res) => res.json());
}

/**
 * @param {{fetch: Window.fetch}} props
 * @returns {Promise<>}
 */
export function fetchReposData(props = { fetch: window.fetch }) {
  return props
    .fetch(
      prepareAuthorizedRequest("https://api.github.com/graphql", {
        // authViaQuery: true,
      }),
      {
        method: "POST",
        body: JSON.stringify({
          query: graphqlMinify(print(reposGraphql)),
        }),
      }
    )
    .then(isResponseOk)
    .then((res) => res.json());
}
