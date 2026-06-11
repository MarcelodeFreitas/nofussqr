# NoFussQR

Free, customizable QR codes with no signup, no subscriptions, and no clutter.

Use it here: [https://marcelodefreitas.github.io/nofussqr/](https://marcelodefreitas.github.io/nofussqr/)

NoFussQR is a browser-only QR code generator built with React, TypeScript, and Vite. Everything runs locally in the user's browser: no backend, no accounts, no tracking, and no redirect service.

## Features

- Encode URLs or plain text
- Live QR preview
- Error correction controls
- Square or circular QR shape
- Custom dot and corner styles
- Solid colors, transparent background, or gradients
- Optional center logo upload
- Export as SVG, PNG, JPEG, or WEBP
- Export raster images up to 4096 px
- Saves non-image settings locally in the browser

## Tech Stack

- React
- TypeScript
- Vite
- qr-code-styling
- CSS Modules

## Local Development

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite, usually:

```text
http://localhost:5173/
```

## Production Build

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`.

## GitHub Pages Deploy

This repo includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

To deploy:

1. Push the repository to GitHub.
2. In the GitHub repo, go to Settings -> Pages.
3. Set Source to GitHub Actions.
4. Push to the `main` branch.

The app uses relative asset paths, so it can be hosted from a user site or from a project site without changing the Vite base path.

## Privacy

NoFussQR does not send QR content to a server. The encoded text, styling options, and logo image stay in the browser. Only non-image settings are stored in local browser storage so the interface can remember preferences.

## License

MIT License. See [LICENSE](LICENSE).
