<script context="module">
  import * as projects from "./projects";
  import * as topartists from "./topartists";

  export const blocksMap = new Map();
  blocksMap.set("projects", projects);
  blocksMap.set("topartists", topartists);

  function getBlockComponent(name) {
    const block = blocksMap.get(name);
    if (!block) {
      throw new Error("unable to find block " + name);
    }
    return block.component;
  }
</script>

<script>
  export let name;
  export let props;
</script>

<svelte:component this={getBlockComponent(name)} {...props} />
