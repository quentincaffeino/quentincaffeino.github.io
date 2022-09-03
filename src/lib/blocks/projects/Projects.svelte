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

  const filterUniqueByKey = (getKey) => {
    const set = new Set();

    return (el) => {
      const key = getKey(el);

      if (set.has(key)) {
        return false;
      }

      set.add(key);
      return true;
    };
  };

  const filterOutPrivate = (project) => !project.isPrivate;

  const filterOutPersonal = (project) =>
    project?.owner?.login !== import.meta.env.VITE_GH_USERNAME;
</script>

<script>
  import ProjectList from "./ProjectList.svelte";

  /** @type {Object} */
  export let data;

  const personalProjects =
    data?.viewer?.repositories?.nodes
      ?.filter(filterOutForks)
      ?.filter(project => project.name !== 'Kingdom') // This is Gosha's project
      ?.sort(sortByStars)
      ?.sort(sortArchivedToEnd) || [];

  const contributionProjects =
    Object.values(data?.user || {})
      .reduce(
        (pv, cv) => [...pv, ...cv.pullRequestContributionsByRepository],
        []
      )
      .map((r) => r.repository)
      .filter(filterUniqueByKey((project) => project.name))
      .filter(filterOutPrivate)
      .filter(filterOutPersonal) || [];
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
