import graphqlMinify from "$lib/utils/graphqlMinify";
import isResponseOk from "$lib/utils/isResponseOk";
import prepareAuthorizedRequest from "$lib/utils/prepareAuthorizedGithubRequest";
import parseJsonResponseBody from "$lib/utils/parseJsonResponseBody";
import Projects from "./Projects.svelte";
import reposGraphql from "./github/repos.gql.tpl";

export const component = Projects;

export const name = "projects";

export async function load({ fetch }) {
  return fetch(
    prepareAuthorizedRequest("https://api.github.com/graphql", {
      token: import.meta.env.VITE_GH_OAUTH_TOKEN,
    }),
    {
      method: "POST",
      body: JSON.stringify({
        query: graphqlMinify(
          reposGraphql({
            username: import.meta.env.VITE_GH_USERNAME,
            currentYear: new Date().getFullYear(),
            endAtYear: 2012, // TODO: Replace with year from profile creation date
          })
        ),
      }),
    }
  )
    .then(isResponseOk)
    .then(parseJsonResponseBody);
}

export default Projects;
