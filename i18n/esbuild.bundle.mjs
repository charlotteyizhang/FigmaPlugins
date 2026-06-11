import * as esbuild from "esbuild";
import * as process from "node:process";
import { readFile, writeFile, mkdir } from "node:fs/promises";

const SVGR_MARKER = "<!-- SVGR_BUNDLE -->";

// @svgr/core is a Node/Babel library; this bundle runs in the UI iframe (browser).
// path/os get real browser shims (esbuild `alias` below). util and cosmiconfig get
// functional inline shims; everything else is stubbed empty because @svgr/core only
// touches them through its config-file search, which we never trigger (we pass full
// config to transform() directly). Stubbing `typescript` drops ~9MB of dead weight —
// the `typescript: true` SVGR option uses @babel/preset-typescript, not this package.
const UTIL_SHIM = `
function promisify(fn){return function(...a){return new Promise((res,rej)=>{try{res(typeof fn==="function"?fn(...a):undefined)}catch(e){rej(e)}})}}
function inspect(x){try{return JSON.stringify(x)}catch(e){return String(x)}}
function format(...a){return a.map(x=>typeof x==="string"?x:inspect(x)).join(" ")}
function inherits(ctor,sup){ctor.super_=sup;Object.setPrototypeOf(ctor.prototype,sup.prototype)}
function deprecate(fn){return fn}
module.exports={promisify,inspect,format,inherits,deprecate,types:{},TextEncoder:globalThis.TextEncoder,TextDecoder:globalThis.TextDecoder};
`;
const COSMI_SHIM = `
function mk(){return {search:async()=>null,load:async()=>null,searchSync:()=>null,loadSync:()=>null,clearLoadCache(){},clearSearchCache(){},clearCaches(){}};}
function cosmiconfig(){return mk();}
function cosmiconfigSync(){return mk();}
module.exports={cosmiconfig,cosmiconfigSync,defaultLoaders:{},defaultLoadersSync:{},getDefaultSearchPlaces:()=>[],getDefaultSearchPlacesSync:()=>[]};
`;
const SPECIAL_SHIMS = {
  util: UTIL_SHIM,
  "node:util": UTIL_SHIM,
  cosmiconfig: COSMI_SHIM,
};
const EMPTY_STUBS = [
  "fs",
  "fs/promises",
  "node:fs",
  "node:fs/promises",
  "module",
  "node:module",
  "url",
  "node:url",
  "crypto",
  "node:crypto",
  "stream",
  "node:stream",
  "assert",
  "node:assert",
  "typescript",
];

const stubNodeBuiltins = {
  name: "stub-node-builtins",
  setup(build) {
    const names = [...EMPTY_STUBS, ...Object.keys(SPECIAL_SHIMS)];
    const filter = new RegExp(
      `^(${names.map((b) => b.replace("/", "\\/")).join("|")})$`,
    );
    build.onResolve({ filter }, (args) => ({
      path: args.path,
      namespace: "node-stub",
    }));
    build.onLoad({ filter: /.*/, namespace: "node-stub" }, (args) => ({
      contents: SPECIAL_SHIMS[args.path] ?? "module.exports = {};",
      loader: "js",
    }));
  },
};

const svgrAlias = {
  path: "path-browserify",
  "node:path": "path-browserify",
  os: "os-browserify",
  "node:os": "os-browserify",
};

// Build the main sandbox code.
const codeConfig = {
  entryPoints: ["./src/code.ts"],
  bundle: true,
  minify: false,
  sourcemap: true,
  target: ["es2017"],
  platform: "browser",
  tsconfig: "./tsconfig.json",
  outfile: "./target/code.js",
};

// Build the UI-side SVGR wrapper as an IIFE we inject into the HTML.
const svgrConfig = {
  entryPoints: ["./src/ui/svgr.ts"],
  bundle: true,
  minify: true,
  sourcemap: false,
  format: "iife",
  target: ["es2017"],
  platform: "browser",
  tsconfig: "./tsconfig.json",
  define: { "process.env.NODE_ENV": '"production"' },
  // @svgr/core (via babel) touches process.* at runtime; the iframe has no Node
  // `process`. Provide a minimal shim scoped to the injected <script>.
  banner: {
    js: "var process={env:{NODE_ENV:'production'},platform:'browser',cwd:function(){return '/'},argv:[],version:'',versions:{},nextTick:function(f){Promise.resolve().then(f)}};",
  },
  alias: svgrAlias,
  plugins: [stubNodeBuiltins],
  write: false,
  outfile: "./target/svgr.js",
};

// Inject the bundled IIFE in place of the marker. Two hazards to defuse:
//   1. The minified bundle contains "$&" / "$'" sequences. String.replace treats
//      those as special patterns in a *string* replacement (insert match / insert
//      text-after-match), which would splice copies of the surrounding template
//      into the output. Passing a *function* replacer disables that entirely.
//   2. A stray "</script" substring would prematurely close the inline <script>.
//      Escaping to "<\/script" is equivalent inside JS string/regex literals but
//      isn't seen as a closing tag by the HTML parser.
const injectBundle = (template, iife) => {
  if (!template.includes(SVGR_MARKER)) {
    throw new Error(`ui.html is missing the ${SVGR_MARKER} marker`);
  }
  const safe = iife.replace(/<\/script/gi, "<\\/script");
  return template.replace(SVGR_MARKER, () => `<script>\n${safe}\n</script>`);
};

const buildUiHtml = async () => {
  const result = await esbuild.build(svgrConfig);
  const template = await readFile("./ui.html", "utf8");
  const html = injectBundle(template, result.outputFiles[0].text);
  await mkdir("./target", { recursive: true });
  await writeFile("./target/ui.html", html, "utf8");
  console.log("Built ./target/ui.html");
};

const buildAll = async () => {
  await Promise.all([esbuild.build(codeConfig), buildUiHtml()]);
};

const main = async () => {
  console.log(process.argv);
  const input = process.argv[2] ?? "--build";
  switch (input) {
    case "--build":
      await buildAll();
      return;
    case "--watch": {
      const ctx = await esbuild.context(codeConfig);
      await ctx.watch();
      await buildUiHtml();
      // Rebuild the UI bundle whenever the source files change.
      const svgrCtx = await esbuild.context({
        ...svgrConfig,
        write: false,
        plugins: [
          stubNodeBuiltins,
          {
            name: "rebuild-ui-html",
            setup(build) {
              build.onEnd(async (res) => {
                if (res.outputFiles && res.outputFiles[0]) {
                  const template = await readFile("./ui.html", "utf8");
                  const html = injectBundle(template, res.outputFiles[0].text);
                  await mkdir("./target", { recursive: true });
                  await writeFile("./target/ui.html", html, "utf8");
                  console.log("Rebuilt ./target/ui.html");
                }
              });
            },
          },
        ],
      });
      await svgrCtx.watch();
      return;
    }
    default:
      console.error("Unknown command:", input);
  }
};

await main();
