<script>
  import ArtistCard from "./ArtistCard.svelte";

  export let topartists;
  export let error;

  const LASTFM_USER = import.meta.env.VITE_LASTFM_USER;
</script>

<h2 class="sticky top-0 z-10 bg-gray-50 section-header section-header--1">
  I enjoy music a lot

  <small
    class="block pt-2 text-gray-500 text-opacity-50 md:inline-block md:pt-0"
  >
    <span class="hidden px-2 md:inline-block">&bull;</span>
    here are my top artists this week
  </small>
</h2>

{#if error}
  <div class="px-3 break-all">
    Something went wrong...<br />{error.message}
  </div>
{:else}
  <div
    class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 section-body"
  >
    {#each topartists.artist as artist}
      <ArtistCard {artist} />
    {/each}
  </div>
{/if}

<div class="px-3 mt-2">
  <a
    class="hover:text-[#FF1744] opacity-50 hover:opacity-100"
    href="https://www.last.fm/user/{LASTFM_USER}"
    rel="noreferrer noopener external"
    target="_blank"
  >
    <span class="text-sm">source</span>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 48 48"
      width="16"
      height="16"
      class="inline-block mt-0.5"
    >
      <title>Last.fm</title>
      <path
        fill="#FF1744"
        d="M21.4,33.4l-1.6-4.3c0,0-2.6,2.9-6.6,2.9C9.8,32,7,29,7,24.2c0-6.1,3.4-8.2,6.5-8.2c4.4,0,5.8,2.8,7.1,6.4l1.6,4.9c1.6,4.8,4.6,8.7,13.4,8.7c6.2,0,10.5-1.9,10.5-6.8c0-4-2.3-6.1-6.7-7.1l-3.2-0.7c-2.2-0.5-3-1.5-3-2.9c0-1.7,1.7-2.5,3.9-2.5c2.4,0,3.8,0.9,4,3l5-1c-0.4-4.5-3.7-6-8.9-6c-4.5,0-9.1,1.6-9.1,7c0,3.4,1.8,5.6,6,6.6l3.4,0.8C40,26.9,41,28,41,29.4c0,1.8-2,2.6-5.4,2.6c-5.1,0-7.2-2.6-8.4-6.2l-1.7-4.9C23.4,14.4,20,12,13.3,12C5.9,12,2,16.6,2,24.4C2,31.9,5.9,36,13,36C18.7,36,21.4,33.4,21.4,33.4L21.4,33.4z"
      ></path>
    </svg>
  </a>
</div>
