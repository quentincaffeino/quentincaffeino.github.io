<script>
  import MainSection from "$lib/sections/Main.svelte";
  import ToTopButton from "$lib/components/ToTopButton.svelte";
  import Blocks from "$lib/blocks/index.svelte";

  const GH_USERNAME = import.meta.env.VITE_GH_USERNAME;

  // @hmr:keep-all

  /** @type {import('./$types').PageData} */
  export let data;
  let { userData, blocks } = data;
  $: ({ userData, blocks } = data);
</script>

<svelte:head>
  <title>{GH_USERNAME}</title>
</svelte:head>

<section class="h-screen">
  <MainSection {userData} />
</section>

<!-- footer is below main because I need it to be above for censor hover to work,
  and above everything else so that it displays below any other blocks -->
<footer
  class="fixed bottom-0 w-full p-1 pb-4 text-sm text-center text-gray-700 transform -translate-x-1/2 sm:pb-2 left-1/2"
>
  <div class="inline-block pb-2 censorable-made-with-text sm:pb-0">
    <span>made with</span>
    <span class="hidden">☕ ☕</span>
    ☕
  </div>

  <span class="hidden px-2 text-gray-400 sm:inline-block">&bull;</span>
  <br class="block sm:hidden" />

  <span>
    powered by 🔥
    <a
      class="border-b-[1px] border-[#ff3e00] hover:text-[#ff3e00]"
      href="https://github.com/sveltejs/kit"
      rel="noreferrer noopener external"
      target="_blank"
    >
      @sveltejs/kit
    </a>
  </span>
</footer>

<div>
  {#each [...blocks.values()] as block}
    <section id={block.name} class="mb-6 bg-gray-50">
      <Blocks name={block.name} props={block.data} />
    </section>
  {/each}

  <ToTopButton />
</div>

<style lang="postcss">
  .censorable-made-with-text:hover > span:first-of-type {
    @apply hidden;
  }
  .censorable-made-with-text:hover > span:last-of-type {
    @apply inline-block;
  }
</style>
