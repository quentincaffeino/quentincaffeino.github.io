<script>
  import ProjectCard from "./ProjectCard.svelte";

  export let projects;
</script>

<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
  {#each projects as project}
    <ProjectCard {project} />
  {/each}

  <slot name="after" />
</div>
