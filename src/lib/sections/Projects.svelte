<script context="module">
  const sortByStars = (a, b) => (a.stargazerCount > b.stargazerCount ? -1 : 1);

  const sortArchivedToEnd = (a, b) =>
    a.isArchived ? 1 : b.isArchived ? -1 : 0;
</script>

<script>
  import ProjectList from "$lib/components/Project/ProjectList.svelte";

  /** @type {Object} */
  export let projects;
</script>

<h2 class="section-header section-header--1">Projects</h2>

<div class="mb-24 section-body">
  <h3 class="sticky top-0 z-10 bg-gray-50 section-header section-header--2">
    Personal
  </h3>

  <div class="mb-6">
    <ProjectList
      projects={projects?.data?.viewer?.repositories?.nodes
        ?.sort(sortByStars)
        ?.sort(sortArchivedToEnd)}
    />
  </div>

  <h3 class="sticky top-0 z-10 bg-gray-50 section-header section-header--2">
    Contributions
  </h3>

  <div class="mb-6">
    <ProjectList
      projects={projects?.data?.viewer?.repositoriesContributedTo?.nodes}
    />
  </div>
</div>

<!-- Bottom gradient -->
<div
  class="absolute z-20 w-full h-6 bottom-24 bg-gradient-to-t from-gray-50 to-transparent"
/>
