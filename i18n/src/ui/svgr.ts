// Browser-side SVGR wrapper. This module is bundled by esbuild as an IIFE and
// injected into ui.html (see esbuild.bundle.mjs). It runs in the plugin's UI
// iframe (a real browser), NOT in the Figma sandbox, because @svgr/core is
// Babel-based and needs a browser-like environment.
import { transform } from "@svgr/core";
import jsxPlugin from "@svgr/plugin-jsx";
import svgoPlugin from "@svgr/plugin-svgo";

type SvgTarget = "native" | "react" | "skia";

interface SvgrConvertOptions {
  target: SvgTarget;
  replaceAttrValues: Record<string, string>;
  componentName: string;
}

declare global {
  interface Window {
    __svgrConvert?: (svg: string, opts: SvgrConvertOptions) => Promise<string>;
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

// Collect the color-token namespaces used in the body (the `names[0]` part of
// each token, referenced as `namespace[theme].field`) and build a single import
// from the given module. Returns "" when no themed tokens are present.
const colorsImportLine = (body: string, importPath: string): string => {
  const namespaces = [...new Set(body.match(/[A-Za-z_$][\w$]*(?=\[theme\])/g))];
  return namespaces.length > 0
    ? `import { ${namespaces.sort().join(", ")} } from "${importPath}";\n`
    : "";
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
  const colorsImport = colorsImportLine(body, "../theme/colors");

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

// Map react-native-svg JSX to @shopify/react-native-skia JSX. Per the skia docs
// (shapes/path): the path comes from `path`, fill color from `color`, fill rule
// from `fillType` ("winding"/"evenOdd"), and a stroked path uses style="stroke"
// with strokeCap/strokeJoin/strokeMiter. SVG's clipRule has no skia equivalent.
const toSkiaJsx = (body: string): string => {
  let out = body;
  // <Path> -> <skia.Path>, </Path> -> </skia.Path>, etc.
  out = out.replace(/<(\/?)([A-Z][\w]*)/g, "<$1skia.$2");
  // d="..." -> path={mkSkiaPathFromSVGString("...")}
  out = out.replace(/\bd="([^"]*)"/g, 'path={mkSkiaPathFromSVGString("$1")}');
  // SVG fill rule -> skia fillType; drop clipRule (no skia equivalent).
  out = out
    .replace(/\bfillRule="evenodd"/g, 'fillType="evenOdd"')
    .replace(/\bfillRule="nonzero"/g, 'fillType="winding"')
    .replace(/\s*clipRule="[^"]*"/g, "");
  // Stroke attributes -> skia paint props; a stroked path needs style="stroke".
  out = out
    .replace(/\bstrokeLinecap=/g, "strokeCap=")
    .replace(/\bstrokeLinejoin=/g, "strokeJoin=")
    .replace(/\bstrokeMiterlimit=/g, "strokeMiter=")
    .replace(/\bstroke=/g, 'style="stroke" color=');
  // fill -> color (project convention; skia's documented prop is `color`).
  out = out.replace(/\bfill=/g, "color=");
  return out;
};

// Rewrite SVGR's react-native-svg output into a @shopify/react-native-skia
// component: scale the canvas to the viewBox, namespace every SVG element under
// `skia.` (e.g. <Path> -> <skia.Path>), and import colors from lunar-apps-native
// (this output targets a different project than the React Native template).
const toSkiaComponent = (svgrOutput: string, componentName: string): string => {
  const svgMatch = svgrOutput.match(/<Svg\b([^>]*)>([\s\S]*)<\/Svg>/);
  if (!svgMatch) return svgrOutput; // unexpected shape — return as-is

  const { w, h } = extractDims(svgMatch[1], svgrOutput);
  const body = toSkiaJsx(formatChildren(svgMatch[2]));
  // Component name: *SVG -> *skia, else append "skia".
  const base = componentName.endsWith("SVG")
    ? componentName.slice(0, -3)
    : componentName;
  const name = `${base}skia`;
  const colorsImport = colorsImportLine(
    body,
    "lunar-apps-native/src/theme/colors",
  );
  // mkSkiaPathFromSVGString is only needed when there are paths (d attributes).
  const pathImport = body.includes("mkSkiaPathFromSVGString(")
    ? `import { mkSkiaPathFromSVGString } from "./formatSVG";\n`
    : "";

  return `import * as skia from "@shopify/react-native-skia";
import type { HasTheme } from "lunar-apps-native/src/components/types";
import type { CommonSVGProps, ViewBox } from "lunar-apps-native/src/constants/formatSVG";
import { mkWidthHeightViewbox } from "lunar-apps-native/src/constants/formatSVG";
${pathImport}${colorsImport}
interface ${name}Props extends HasTheme, CommonSVGProps {}
const viewBox: ViewBox = {
  w: ${w},
  h: ${h},
};

export const ${name} = ({ width, height, theme }: ${name}Props) => {
  const widthHeightViewbox = mkWidthHeightViewbox({ viewBox, width, height });
  const scale = Math.min(
    widthHeightViewbox.width / viewBox.w,
    widthHeightViewbox.height / viewBox.h,
  );
  return (
    <skia.Canvas style={{ width: viewBox.w * scale, height: viewBox.h * scale }}>
${body}
    </skia.Canvas>
  );
};
`;
};

// Call transform() directly (NOT loadConfig) so cosmiconfig's Node fs path is
// never reached in the browser bundle.
window.__svgrConvert = async (
  svg,
  { target, replaceAttrValues, componentName },
) => {
  // Native and Skia both build on SVGR's react-native-svg output.
  const native = target !== "react";
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

  // React Native -> scaling template; Skia -> Canvas template; React (web) keeps
  // SVGR's default component.
  if (target === "skia") return toSkiaComponent(output, componentName);
  if (target === "native") return toRNScalingComponent(output, componentName);
  return output;
};
