import { test, expect } from "@playwright/experimental-ct-svelte";
import Card from "./Card.svelte";

test("should apply custom class", async ({ mount }) => {
  const className = "hello-world";

  const component = await mount(Card, { props: { class: className } });

  await expect(component).toHaveClass(new RegExp(".*" + className + ".*"));
});
