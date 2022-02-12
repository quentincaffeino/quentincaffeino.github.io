<script>
  import StarIcon from "svelte-feather-icons/src/icons/StarIcon.svelte";
  import ArchiveIcon from "svelte-feather-icons/src/icons/ArchiveIcon.svelte";
  import Card from "$lib/components/Card.svelte";
  import LanguagePill from "./LanguagePill.svelte";

  export let project;
</script>

<Card class="p-1">
  <a
    href={project.url}
    class="flex-grow"
    rel="noreferrer noopener external"
    target="_blank"
  >
    <div class="flex flex-col px-2 pt-1 mb-1 space-y-1">
      <!-- Header -->
      <div class="flex flex-row items-center title">
        <h1 class="flex flex-grow font-bold break-all">
          {project.name}
        </h1>

        {#if project.isArchived}
          <span title="Archived">
            <ArchiveIcon size="1x" class="ml-4 opacity-50" />
          </span>
        {/if}
      </div>

      <!-- Description -->
      {#if project.description}
        <p class="text-sm">
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
    </div>
  </a>

  {#if project.stargazerCount > 0}
    <!-- Footer -->
    <div class="flex flex-row px-2 py-1 space-x-4 rounded-lg bg-gray-50">
      {#if project.stargazerCount > 0}
        <div
          class="flex flex-row items-center"
          title="{project.stargazerCount} stars"
        >
          <StarIcon size="1x" class="text-yellow-500 fill-current" />
          <span class="pl-1">{project.stargazerCount}</span>
        </div>
      {/if}
    </div>
  {/if}
</Card>
