# NoFussQR â€” Agent Instructions

Free, open-source, browser-only QR code generator. No backend, no accounts, no tracking.

## Stack

- **React 19 + TypeScript (strict) + Vite 6**
- **qr-code-styling v1.9.2** â€” QR engine (imperative, browser-native)
- **CSS custom properties + CSS Modules** â€” no Tailwind, no CSS-in-JS
- **GitHub Pages** â€” static deploy via GitHub Actions

## Running the project

```bash
npm run dev       # dev server (reads PORT env var for Claude preview)
npm run build     # type-check + production build
npm run preview   # preview production build locally
```

## Architecture

### State

One flat `QRConfig` object in `useState` inside `QRConfigProvider`. Exposed via `useQRConfig()` hook â€” **never prop-drill the config**. Section components read/write directly from context.

```
src/state/types.ts          â€” QRConfig interface + all union types
src/state/QRConfigContext   â€” Provider + { config, update, updateGradient, updateLogo, reset }
src/qr/defaults.ts          â€” DEFAULT_CONFIG
src/qr/mapConfig.ts         â€” pure fn: QRConfig â†’ qr-code-styling Options
src/qr/useQRCode.ts         â€” hook: creates/appends/updates/downloads the QR instance
```

### Component structure

```
components/
  layout/    â€” Header, Footer (no QR knowledge)
  preview/   â€” PreviewPanel (calls useQRCode once), QRPreview, DownloadBar
  controls/  â€” one Section component per feature group (reads/writes via useQRConfig)
  ui/        â€” dumb primitives (Field, Tooltip, Select, Slider, ColorInput,
                SegmentedControl, Toggle, FileDrop) â€” no QR or state knowledge
```

**Rule:** `ui/` components take only `value` + `onChange` props. Section components take no props â€” they pull from context.

### QR engine integration

`useQRCode` wraps the imperative library. Key rules:

- **Create once** via ref; call `.update(mapConfigToOptions(config))` on every config change
- **Shape changes require a new instance** â€” `qr-code-styling.update()` does not update the outer SVG clipPath. `useQRCode` recreates the instance when `config.shape` changes and re-appends to the DOM
- **StrictMode guard** â€” always `node.innerHTML = ''` before `.append()`
- **Never pass empty string** to `data` â€” pass `' '` as fallback (library throws on `''`)
- **JPEG + transparent bg** â€” force solid background on export; JPEG has no alpha channel

### Data flow

```
Section component  â†’  update(patch)  â†’  QRConfig  â†’  mapConfigToOptions  â†’  qrRef.update()  â†’  DOM
DownloadBar        â†’  download(format, size)  â†’  qrRef.update(size overrides) â†’ .download()
```

## Design system

Tokens live in `src/styles/tokens.css`. Use CSS custom properties everywhere.

**Core palette:**
- `--bg: #faf9f6` warm off-white
- `--ink: #1a1915` near-black
- `--accent: #c9613f` clay/terracotta â€” used sparingly (primary button, active segment, focus ring)
- **No purple gradients, no glow, no glassmorphism**

**Fonts:** Source Serif 4 (wordmark/display) Â· Inter (UI) Â· IBM Plex Mono (hex values/code)

**Layout:** Two-pane grid â€” 420px controls (left, scrollable) + 1fr preview (right, sticky). Stacks to single column below 860px with preview first.

**4px spacing scale:** `--s1` through `--s10`. Always use tokens, never raw pixel values.

## Coding standards

- **TypeScript strict** â€” no `any`, no type assertions unless unavoidable
- **No comments** unless the WHY is non-obvious (hidden constraint, gotcha, workaround)
- **No unused imports, variables, or parameters** â€” `noUnusedLocals` + `noUnusedParameters` are on
- **No prop-drilling** â€” section components use `useQRConfig()` directly
- **No new dependencies** without a clear reason â€” keep the bundle lean
- **CSS Modules** for component-scoped styles; global layout/tokens in `styles/`
- **Pure functions** for config mapping â€” `mapConfigToOptions` must stay a side-effect-free pure function
- **No feature flags, no backwards-compat shims** â€” just change the code

## Known limitations

| Feature | Status | Reason |
|---|---|---|
| Mask pattern (0â€“7) | Not supported | `qr-code-styling` v1.9.2 auto-selects mask; `qrOptions.maskPattern` is not in the type definitions |
| Trackable/redirect links | Intentionally excluded | Static QR only â€” what you type is what encodes |

## Deploy

1. Repo must be named `nofussqr` (the Vite base path is `/nofussqr/`)
2. Repo Settings â†’ Pages â†’ Source = **GitHub Actions**
3. Update the GitHub URL in `Header.tsx` and `Footer.tsx`
4. Push to `main` â†’ `.github/workflows/deploy.yml` auto-deploys

`vite.config.ts` reads `GITHUB_PAGES=true` env var to set the base path. Local dev always uses `/`.

## What NOT to do

- Do not add a backend, database, or any server-side component
- Do not add analytics, tracking pixels, or third-party scripts
- Do not add user accounts or authentication
- Do not add trackable/redirect QR links
- Do not add Tailwind or a CSS framework
- Do not add Redux, Zustand, or any external state library
- Do not add React Router (single-page app, no routing needed)
