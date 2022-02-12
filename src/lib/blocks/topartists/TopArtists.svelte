<script>
  import ArtistCard from "./ArtistCard.svelte";

  export let topartists;
</script>

<h2 class="sticky top-0 z-10 bg-gray-50 section-header section-header--1">
  Top Artists

  <small
    class="block pt-2 text-gray-500 text-opacity-50 md:inline-block md:pt-0"
  >
    <span class="hidden px-2 md:inline-block">&bull;</span> last 7 days
  </small>
</h2>

<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 section-body">
  {#each topartists.artist as artist}
    <ArtistCard {artist} />
  {/each}
</div>
