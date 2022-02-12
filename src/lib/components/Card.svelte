<script>
  let className = "";
  export { className as class };
</script>

<article
  class="flex flex-col overflow-hidden bg-white border shadow-sm rounded-xl {className}"
>
  <slot />
</article>
