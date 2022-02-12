import { print } from "graphql";
import graphqlMinify from "$lib/utils/graphqlMinify";
import isResponseOk from "$lib/utils/isResponseOk";
import prepareAuthorizedRequest from "$lib/utils/prepareAuthorizedGithubRequest";
import parseJsonResponseBody from "$lib/utils/parseJsonResponseBody";
import Projects from "./Projects.svelte";
import reposGraphql from "./github/repos.gql";

export const component = Projects;

export const name = "projects";

export function load({ fetch }) {
  return fetch(
    prepareAuthorizedRequest("https://api.github.com/graphql", {
      token: import.meta.env.VITE_GH_OAUTH_TOKEN,
    }),
    {
      method: "POST",
      body: JSON.stringify({
        query: graphqlMinify(print(reposGraphql)),
      }),
    }
  )
    .then(isResponseOk)
    .then(parseJsonResponseBody);
}

export default Projects;
