{
  # Fetch user's public repositories
  viewer {
    repositories(
      first: 100
      privacy: PUBLIC
      orderBy: { field: PUSHED_AT, direction: DESC }
    ) {
      nodes {
        url
        name
        stargazerCount
        description
        isArchived
        isFork
        languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
          nodes {
            name
            color
          }
        }
      }
    }
  }

  # Fetch repositories that user has contributed to
  user(login: "{{= it.username }}") {

    # Since github only allows to get updates on timespan of one year, generate query for all years user has been registered
    {{ for(let year = it.currentYear + 1; year > it.endAtYear; --year) { }}

      contributionsCollection{{= year - 1 }}: contributionsCollection(
        from: "{{= year - 1 }}-01-01T00:00:00Z"
        to: "{{= year }}-01-01T00:00:00Z"
      ) {
        pullRequestContributionsByRepository(maxRepositories: 100) {
          repository {
            url
            name: nameWithOwner
            isPrivate
            owner {
              login
            }
            description
            languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
              nodes {
                name
                color
              }
            }
          }
        }
      }

    {{ } }}

  }
}
