import { minify } from "html-minifier-terser";
import { prerendering } from "$app/environment";

const minification_options = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  conservativeCollapse: true,
  decodeEntities: true,
  html5: true,
  ignoreCustomComments: [/^#/],
  minifyCSS: true,
  minifyJS: false,
  removeAttributeQuotes: true,
  removeComments: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  sortAttributes: true,
  sortClassName: true,
};

export async function handle({ event, resolve }) {
  const response = await resolve(event);

  if (prerendering && response.headers.get("content-type") === "text/html") {
    return new Response(
      await minify(await response.text(), minification_options),
      {
        status: response.status,
        headers: response.headers,
      }
    );
  }

  return response;
}
