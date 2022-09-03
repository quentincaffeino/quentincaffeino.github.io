<script context="module">
  export const prerender = true;
</script>

<main class="container px-3 mx-auto">
  <slot />
</main>

<style>
  @import "../styles/app.css";

  .container {
    max-width: 1024px;
  }
</style>
