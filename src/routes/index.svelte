<script context="module">
  import { fetchGithubData } from "$lib/api/github";

  export const prerender = true;

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch, session, context }) {
    const projects = await fetchGithubData({ fetch });

    return {
      props: {
        projects,
      },
    };
  }
</script>

<script>
  import MainSection from "$lib/sections/Main.svelte";
  import ProjectsSection from "$lib/sections/Projects.svelte";
  import ToTopButton from "$lib/components/ToTopButton.svelte";

  // @hmr:keep
  export let projects;
</script>

<svelte:head>
  <title>quentincaffeino</title>
</svelte:head>

<section class="h-screen">
  <MainSection />
</section>

<div class="">
  <section>
    <ProjectsSection {projects} />
  </section>

  <ToTopButton />
</div>
