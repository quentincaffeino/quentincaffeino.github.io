<script>
  import hexToLuma from "$lib/utils/hexToLuma";

  export let language;
  let className = "";
  export { className as class };

  let lightness = 0;
  $: lightness = hexToLuma(language.color);
</script>

<span
  class="{className} {lightness > 150 ? 'text-black' : 'text-white'}"
  style="--color:{language.color ?? 'black'}"
>
  {language.name?.trim()}
</span>

<style lang="postcss">
  span {
    @apply rounded-full px-2 py-[0.0625rem] text-xs;
    background-color: var(--color, black);
  }
</style>
