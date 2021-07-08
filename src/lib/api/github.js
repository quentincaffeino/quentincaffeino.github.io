import { print } from "graphql";
import { graphqlMinify, isResponseOk } from "./utils";
import githubGraphql from "../graphql/github-repos.gql";

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
 * @returns {Promise<>}
 */
export function fetchGithubData(props = { fetch: window.fetch }) {
  return props
    .fetch(
      prepareAuthorizedRequest("https://api.github.com/graphql", {
        // authViaQuery: true,
      }),
      {
        method: "POST",
        body: JSON.stringify({
          query: graphqlMinify(print(githubGraphql)),
        }),
      }
    )
    .then(isResponseOk)
    .then((res) => res.json());
}
