<script>
  import StarIcon from "svelte-feather-icons/src/icons/StarIcon.svelte";
  import ArchiveIcon from "svelte-feather-icons/src/icons/ArchiveIcon.svelte";
  import Github from "simple-icons/icons/github.js";
  import LanguagePill from "./LanguagePill.svelte";

  export let project;
</script>

<article
  class="flex flex-col px-3 py-2 space-y-1 bg-white border rounded-lg shadow-sm"
>
  <!-- Header -->
  <div class="flex flex-row items-center title">
    <a
      href={project.url}
      class="flex flex-row items-center flex-grow"
      rel="noreferrer noopener"
      target="_blank"
    >
      <h1 class="flex flex-grow font-bold break-all">
        {project.name}
      </h1>
    </a>

    {#if project.isArchived}
      <ArchiveIcon size="1x" class="ml-4 opacity-50" title="Archived" />
    {/if}
  </div>

  <!-- Description -->
  {#if project.description}
    <p class="flex-grow text-sm">
      {project.description}
    </p>
  {/if}

  <!-- Languages -->
  {#if project?.languages?.nodes?.length}
    <div class="flex flex-row flex-wrap -mb-1">
      {#each project.languages.nodes as language}
        <LanguagePill {language} class="mb-1 mr-1" />
      {/each}
    </div>
  {/if}

  <!-- Footer -->
  <div class="flex flex-row">
    {#if project.stargazerCount > 0}
      <div
        class="flex flex-row items-center"
        title="{project.stargazerCount} stars"
      >
        <StarIcon size="1x" class="text-yellow-500" />
        <span class="pl-1">{project.stargazerCount}</span>
      </div>

      <span class="mx-1 text-gray-500">&bull;</span>
    {/if}

    <a
      href={project.url}
      class="flex flex-row items-center btn"
      rel="noreferrer noopener"
      target="_blank"
    >
      {@html Github.svg}

      <span class="ml-1 text-sm font-semibold">GitHub</span>
    </a>
  </div>
</article>

<style>
  .btn :global(svg) {
    width: 14px;
  }
</style>
