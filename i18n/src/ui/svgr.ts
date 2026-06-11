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

// Pull the viewBox width/height out of the generated <Svg> open tag. Prefer the
// viewBox attribute (its 3rd/4th numbers define the coordinate space), falling
// back to width/height attributes.
const extractDims = (
  svgOpenTag: string,
  fullOutput: string,
): { w: string; h: string } => {
  const vb = fullOutput.match(
    /viewBox="\s*[-\d.]+\s+[-\d.]+\s+([-\d.]+)\s+([-\d.]+)\s*"/,
  );
  if (vb) return { w: vb[1], h: vb[2] };
  const w = svgOpenTag.match(/\bwidth=(?:\{([\d.]+)\}|"([\d.]+)")/);
  const h = svgOpenTag.match(/\bheight=(?:\{([\d.]+)\}|"([\d.]+)")/);
  return { w: w?.[1] ?? w?.[2] ?? "0", h: h?.[1] ?? h?.[2] ?? "0" };
};

// Re-indent flat/nested JSX children. SVGR (without prettier) emits the children
// on a single line; put each element on its own line so the output is readable.
const formatChildren = (inner: string): string => {
  const tokens: string[] = [];
  let i = 0;
  while (i < inner.length) {
    if (inner[i] === "<") {
      let j = i + 1;
      let quote: string | null = null;
      while (j < inner.length) {
        const c = inner[j];
        if (quote) {
          if (c === quote) quote = null;
        } else if (c === '"' || c === "'") {
          quote = c;
        } else if (c === ">") {
          j++;
          break;
        }
        j++;
      }
      tokens.push(inner.slice(i, j));
      i = j;
    } else {
      let j = i;
      while (j < inner.length && inner[j] !== "<") j++;
      const text = inner.slice(i, j).trim();
      if (text) tokens.push(text);
      i = j;
    }
  }

  const BASE = "        "; // 8 spaces — aligns under <Svg> in the template
  const lines: string[] = [];
  let depth = 0;
  for (const tok of tokens) {
    const isTag = tok.startsWith("<");
    const isClose = tok.startsWith("</");
    const isSelfClose = isTag && tok.endsWith("/>");
    const isOpen = isTag && !isClose && !isSelfClose;
    if (isClose) depth = Math.max(0, depth - 1);
    lines.push(BASE + "  ".repeat(depth) + tok);
    if (isOpen) depth += 1;
  }
  return lines.join("\n");
};

// Rewrite SVGR's default react-native-svg component into the project's
// scale-aware template (HasTheme/CommonSVGProps + mkWidthHeightViewbox). We keep
// SVGR's element imports and themed-fill JSX, and only swap the <Svg> wrapper.
const toRNScalingComponent = (
  svgrOutput: string,
  componentName: string,
): string => {
  const importMatch = svgrOutput.match(
    /import Svg,\s*\{([^}]*)\}\s*from\s*"react-native-svg";/,
  );
  const named = importMatch ? importMatch[1].trim() : "Path";

  const svgMatch = svgrOutput.match(/<Svg\b([^>]*)>([\s\S]*)<\/Svg>/);
  if (!svgMatch) return svgrOutput; // unexpected shape — return as-is

  const { w, h } = extractDims(svgMatch[1], svgrOutput);
  const body = formatChildren(svgMatch[2]);
  const name = componentName.endsWith("SVG")
    ? componentName
    : `${componentName}SVG`;

  // Collect the color-token namespaces used (the `names[0]` part of each token,
  // referenced as `namespace[theme].field`) and import them from the theme.
  const namespaces = [...new Set(body.match(/[A-Za-z_$][\w$]*(?=\[theme\])/g))];
  const colorsImport =
    namespaces.length > 0
      ? `import { ${namespaces.sort().join(", ")} } from "../theme/colors";\n`
      : "";

  return `import Svg, { ${named} } from "react-native-svg";
import type { HasTheme } from "../components/types";
import type { CommonSVGProps, ViewBox } from "../constants/formatSVG";
import { mkWidthHeightViewbox } from "../constants/formatSVG";
${colorsImport}
interface ${name}Props extends HasTheme, CommonSVGProps {}
const viewBox: ViewBox = {
  w: ${w},
  h: ${h},
};

export const ${name} = ({
  width,
  height,
  theme,
  overrideSizeTo100Percent,
}: ${name}Props) => {
  const widthHeightViewbox = mkWidthHeightViewbox({ viewBox, width, height });
  return (
    <Svg
      width={overrideSizeTo100Percent === "width" ? "100%" : widthHeightViewbox.width}
      height={overrideSizeTo100Percent === "height" ? "100%" : widthHeightViewbox.height}
      fill="none"
      viewBox={widthHeightViewbox.viewBox}
    >
${body}
    </Svg>
  );
};
`;
};

// Call transform() directly (NOT loadConfig) so cosmiconfig's Node fs path is
// never reached in the browser bundle.
window.__svgrConvert = async (
  svg,
  { native, replaceAttrValues, componentName },
) => {
  const output = await transform(
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

  // React Native output gets re-wrapped into the project's scaling template;
  // React (web) keeps SVGR's default component.
  return native ? toRNScalingComponent(output, componentName) : output;
};
