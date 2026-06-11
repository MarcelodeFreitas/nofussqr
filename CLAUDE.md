# NoFussQR - Agent Instructions

Free, open-source, browser-only QR code generator. No backend, no accounts, no tracking.

## Stack

- React 19 + TypeScript strict + Vite 6
- qr-code-styling for QR generation and export
- CSS custom properties + CSS Modules
- GitHub Pages static deploy via GitHub Actions

## Running the project

```bash
npm run dev       # local dev server
npm run build     # type-check + production build
npm run preview   # preview production build locally
```

## Architecture

### State

One flat `QRConfig` object lives in `QRConfigProvider` and is exposed through `useQRConfig()`.
Section components read/write directly from context instead of prop-drilling config.

```text
src/state/types.ts          - QRConfig interface + union types
src/state/QRConfigContext   - Provider + { config, update, updateGradient, updateLogo, reset }
src/qr/defaults.ts          - DEFAULT_CONFIG
src/qr/mapConfig.ts         - pure QRConfig to qr-code-styling Options mapper
src/qr/useQRCode.ts         - creates, appends, updates, and downloads the QR instance
```

### Component structure

```text
components/
  layout/    - Header, Footer
  preview/   - PreviewPanel, QRPreview, DownloadBar
  controls/  - one section component per feature group
  ui/        - reusable primitives with no QR/state knowledge
```

`ui/` components should stay dumb: value in, callback out. Section components may use `useQRConfig()` directly.

### QR engine integration

`useQRCode` wraps the imperative `qr-code-styling` instance.

- Create the QR instance once via ref.
- Call `.update(mapConfigToOptions(config))` on config changes.
- Recreate the instance when `config.shape` changes because the library does not update the outer SVG clip path reliably.
- Clear the preview node before `.append()` to avoid duplicate SVGs under React StrictMode.
- Never pass an empty string as QR data; use a single-space fallback.
- Force a solid background for JPEG export when the UI background is transparent.

## Design system

Tokens live in `src/styles/tokens.css`. Use CSS custom properties for colors, spacing, type, and radii.

Core palette:

- `--bg: #faf9f6`
- `--ink: #1a1915`
- `--accent: #c9613f`

Keep the UI quiet and utilitarian. Avoid decorative gradients, glow effects, glassmorphism, and unnecessary framework dependencies.

## Coding standards

- Keep TypeScript strict.
- Avoid `any`.
- Avoid unused imports, variables, and parameters.
- Keep config mapping pure.
- Prefer small component-local CSS Modules plus shared global tokens.
- Do not add a router unless the product gains real multi-page navigation.
- Do not add a backend, database, analytics, accounts, tracking pixels, or redirect QR infrastructure.
- Do not add new dependencies without a clear reason.

## Known limitations

| Feature | Status | Reason |
|---|---|---|
| Mask pattern selection | Not supported | `qr-code-styling` auto-selects masks and does not expose a typed mask-pattern option. |
| Trackable or editable QR links | Intentionally excluded | NoFussQR generates static QR codes only. What the user types is what gets encoded. |

## Deploy

GitHub Pages deploys from `.github/workflows/deploy.yml` on pushes to `main`.

The Vite config uses `base: './'`, so the app works from a GitHub user site, project site, or custom subpath without changing the repo name.
