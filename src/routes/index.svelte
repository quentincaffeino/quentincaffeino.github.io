<script context="module">
  import { fetchGithubData } from "$lib/api/github";

  export const prerender = true;

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch, session, context }) {
    const projects =
      (await fetchGithubData({ fetch }).catch(console.error)) || {};

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

  <div
    class="fixed bottom-0 z-0 w-full p-1 pb-4 text-sm text-center text-gray-700 transform -translate-x-1/2 sm:pb-2 left-1/2"
  >
    <span class="inline-block pb-2 sm:pb-0">made with ☕</span>

    <span class="hidden px-2 text-gray-400 sm:inline-block">&bull;</span>
    <br class="block sm:hidden" />

    <span>
      powered by 🔥
      <a
        class="border-b-[1px] border-[#ff3e00]"
        href="https://github.com/sveltejs/kit">@sveltejs/kit</a
      >
    </span>
  </div>
</section>

<div>
  {#if Object.keys(projects).length}
    <section class="mb-6 bg-gray-50">
      <ProjectsSection {projects} />
    </section>

    <ToTopButton />
  {/if}
</div>
