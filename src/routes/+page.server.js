import { fetchUserData } from "$lib/api/github";
import { blocksMap } from "$lib/blocks/index.svelte";

const ghUsername = import.meta.env.VITE_GH_USERNAME;

/**
 * @type {import('@sveltejs/kit').PageServerLoad}
 */
export async function load({ fetch }) {
  let userData = {};

  if (ghUsername) {
    userData = (await fetchUserData({ fetch }).catch(console.error)) || {};
  }

  const readyBlocks = new Map();

  for (const [name, { load }] of blocksMap.entries()) {
    const data = await load({ fetch });
    readyBlocks.set(name, { name, data });
  }

  return {
    userData,
    blocks: readyBlocks,
  };
}
