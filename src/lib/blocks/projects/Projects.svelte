<script context="module">
  const sortByStars = (a, b) => (a.stargazerCount > b.stargazerCount ? -1 : 1);

  const sortArchivedToEnd = (a, b) =>
    a.isArchived ? 1 : b.isArchived ? -1 : 0;

  const filterOutForksExceptions = [
    "JavaToUML", // This is actually a contribution I never made bc owners project is basically dead
    "omnipay-gopay", // Same as with JavaToUML
  ];
  const filterOutForks = (project) =>
    filterOutForksExceptions.indexOf(project.name) !== -1 || !project.isFork;
</script>

<script>
  import ProjectList from "./ProjectList.svelte";

  /** @type {Object} */
  export let data;

  let personalProjects;
  $: personalProjects =
    data?.viewer?.repositories?.nodes
      ?.filter(filterOutForks)
      ?.sort(sortByStars)
      ?.sort(sortArchivedToEnd) || [];

  let contributionProjects =
    data?.viewer?.repositoriesContributedTo?.nodes || [];
</script>

<h2 class="sticky top-0 z-10 bg-gray-50 section-header section-header--1">
  Projects
</h2>

<div class="section-body">
  {#if personalProjects.length}
    <h3 class="sticky z-10 bg-gray-50 section-header section-header--2">
      Personal
    </h3>

    <div class="mb-6">
      <ProjectList projects={personalProjects} />
    </div>
  {/if}

  {#if contributionProjects.length}
    <h3 class="sticky z-10 bg-gray-50 section-header section-header--2">
      Contributions
    </h3>

    <div>
      <ProjectList projects={contributionProjects} />
    </div>
  {/if}
</div>

<style>
  .section-header--1 {
    height: 4.75rem;
  }

  .section-header--2 {
    top: 4.75rem;
  }
</style>