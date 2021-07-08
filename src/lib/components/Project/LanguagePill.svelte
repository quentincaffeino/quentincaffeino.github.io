<script>
  import { hexToLuma } from "$lib/utils";

  export let language;
  let className;
  export { className as class };

  let lightness = 0;
  $: lightness = hexToLuma(language.color);
</script>

<span
  class="rounded-full px-2 py-[0.0625rem] text-xs {className} {lightness > 150
    ? 'text-black'
    : 'text-white'}"
  style="--color:{language.color ?? 'black'}"
>
  {language.name.trim()}
</span>

<style>
  span {
    background-color: var(--color);
  }
</style>
