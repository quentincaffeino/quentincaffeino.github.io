<script context="module">
  import * as projects from "./projects";
  import * as topartists from "./topartists";

  export const blocksMap = new Map();
  blocksMap.set("projects", projects);
  blocksMap.set("topartists", topartists);

  function getBlockComponent(name) {
    return blocksMap.get(name)?.component;
  }
</script>

<script>
  export let name;
  export let props;
</script>

<svelte:component this={getBlockComponent(name)} {...props} />
