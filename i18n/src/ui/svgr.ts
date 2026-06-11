// Browser-side SVGR wrapper. This module is bundled by esbuild as an IIFE and
// injected into ui.html (see esbuild.bundle.mjs). It runs in the plugin's UI
// iframe (a real browser), NOT in the Figma sandbox, because @svgr/core is
// Babel-based and needs a browser-like environment.
import { transform } from "@svgr/core";
import jsxPlugin from "@svgr/plugin-jsx";
import svgoPlugin from "@svgr/plugin-svgo";

interface SvgrConvertOptions {
  native: boolean;
  replaceAttrValues: Record<string, string>;
  componentName: string;
}

declare global {
  interface Window {
    __svgrConvert?: (
      svg: string,
      opts: SvgrConvertOptions,
    ) => Promise<string>;
  }
}

// Call transform() directly (NOT loadConfig) so cosmiconfig's Node fs path is
// never reached in the browser bundle.
window.__svgrConvert = (svg, { native, replaceAttrValues, componentName }) =>
  transform(
    svg,
    {
      plugins: [svgoPlugin, jsxPlugin],
      native,
      replaceAttrValues,
      typescript: true,
      // SVGO's convertColors normalizes colors (e.g. "#FF0000" -> "red",
      // "#ffffff" -> "#fff") before replaceAttrValues runs, which breaks the
      // exact-hex matching. Disable it so Figma's hex values pass through
      // verbatim and the theme-token replacement always matches.
      svgoConfig: {
        plugins: [
          {
            name: "preset-default",
            params: { overrides: { convertColors: false } },
          },
        ],
      },
    },
    { componentName },
  );
