import minifyGraphQLString from "$lib/utils/minifyGraphQLString";
import isResponseOk from "$lib/utils/isResponseOk";
import prepareAuthorizedGithubRequest from "$lib/utils/prepareAuthorizedGithubRequest";
import parseJsonResponseBody from "$lib/utils/parseJsonResponseBody";
import Projects from "./Projects.svelte";
import reposGraphql from "./github/repos.gql.tpl";

export const component = Projects;

export const name = "projects";

export async function load({ fetch }) {
  const reposGraphqlQuery = reposGraphql({
    username: import.meta.env.VITE_GH_USERNAME,
    currentYear: new Date().getFullYear(),
    endAtYear: 2012, // TODO: Replace with year from profile creation date
  });

  const minifiedReposGraphqlQuery = minifyGraphQLString(reposGraphqlQuery);

  const body = JSON.stringify({
    query: minifiedReposGraphqlQuery,
  });

  const request = prepareAuthorizedGithubRequest(
    "/graphql",
    import.meta.env.VITE_GH_OAUTH_TOKEN,
    { requestInit: { method: "POST", body } }
  );

  return fetch(request)
    .then(isResponseOk)
    .then(parseJsonResponseBody)
    .catch((error) => ({ error: error.message }));
}

export default Projects;
