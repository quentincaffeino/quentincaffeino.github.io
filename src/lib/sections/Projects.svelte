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
  import ProjectList from "$lib/components/Project/ProjectList.svelte";

  /** @type {Object} */
  export let projects;
</script>

<h2 class="sticky top-0 z-10 bg-gray-50 section-header section-header--1">
  Projects
</h2>

<div class="section-body">
  <h3 class="sticky z-10 bg-gray-50 section-header section-header--2">
    Personal
  </h3>

  <div class="mb-6">
    <ProjectList
      projects={projects?.data?.viewer?.repositories?.nodes
        ?.filter(filterOutForks)
        ?.sort(sortByStars)
        ?.sort(sortArchivedToEnd)}
    />
  </div>

  <h3 class="sticky z-10 bg-gray-50 section-header section-header--2">
    Contributions
  </h3>

  <div class="mb-6">
    <ProjectList
      projects={projects?.data?.viewer?.repositoriesContributedTo?.nodes}
    />
  </div>
</div>

<style>
  .section-header--1 {
    height: 4.75rem;
  }

  .section-header--2 {
    top: 4.75rem;
  }
</style>
