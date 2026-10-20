# i18n

Figma plugin that generates i18n variables, React components and SVGR output from selected layers.

## Development

Requires Node 24+.

```sh
npm install
npm run watch      # rebuild on change
npm run build      # one-off build into ./target
npm run typecheck
npm run lint
npm run format
```

Then in Figma: Plugins → Development → Import plugin from manifest… and pick `manifest.json`.
