<script context="module">
  /**
   * @param {Object} image
   * @returns {Object}
   */
  function normalizeLastFMImage(image) {
    image.url = image["#text"];

    switch (image.size) {
      case "small":
        image.width = 34;
        break;
      case "medium":
        image.width = 64;
        break;
      case "large":
        image.width = 174;
        break;
      case "extralarge":
        image.width = 300;
        break;
    }

    return image;
  }
</script>

<script>
  import Card from "$lib/components/Card.svelte";

  export let artist;

  let images = [];
  $: images =
    artist.spotify?.images ||
    // fall back to default lastfm images
    artist.image
      // extralarge and mega are mostly the same
      .filter((image) => image.size !== "mega")
      .map(normalizeLastFMImage) ||
    [];

  let src = "";
  $: if (images.length) src = images[0].url;

  let srcset = "";
  $: srcset = images
    .map((image) => image.url + " " + image.width + "w")
    .join(", ");
</script>

<div class="">
  <Card>
    <img class="aspect-square" alt={artist.name} {src} {srcset} />
  </Card>

  <div class="px-2 py-1 font-semibold">
    {artist.name}
  </div>
</div>
