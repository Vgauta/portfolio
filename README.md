# Digital Partnership Portfolio

A static cinematic portfolio experience for Gautam Patel × Diya Vaghasiya.

## Run locally

```bash
cd /workspace/portfolio
npm run serve
```

Then open:

```text
http://localhost:4173
```

## Validate JavaScript

```bash
npm run build
```

## Troubleshooting

If the browser console or terminal shows a request for `/src/style.css`, that path is supported by `src/style.css`, which forwards to the main stylesheet at `src/styles.css`.

Requests for `/favicon.ico` or `/.well-known/appspecific/com.chrome.devtools.json` can appear as `404` in the Python static server logs and are harmless browser/devtools probes.
