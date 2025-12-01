# p5.js + Vite Boilerplate

Minimal Vite setup that runs a modern p5.js sketch in [instance mode](https://github.com/processing/p5.js/wiki/Global-and-instance-mode). The project is configured for ESM, hot module replacement, and production builds via Vite, with all source modules authored in TypeScript.

## Requirements

- Node.js 18+
- npm 9+

## Getting Started

```bash
npm install
npm run dev
```

The dev server prints a local URL (typically `http://localhost:5173`). Edit any file in `src/` and Vite will hot-reload the sketch without refreshing the page.

## Available Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Starts Vite in development mode with HMR |
| `npm run build` | Outputs a production build into `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint and checks Prettier formatting in `src/` |
| `npm run prettier` | Formats files under `src/` with Prettier |

## Project Structure

```
├── index.html        # Vite entry document
├── public/           # Static assets copied as-is
├── src/
│   ├── constants.ts  # Shared constants + app metadata
│   ├── main.ts       # Vite entry point, wires p5 instance
│   ├── sketch.ts     # p5 sketch definition
│   └── style.css     # Minimal styling + canvas framing
└── vite.config.ts    # Vite configuration (ESM)
```

### Sketch Authoring Tips

- Add new helpers/modules under `src/` and import them from `sketch.ts`—keep `main.ts` for orchestration only.
- Use instance mode: export `createSketch()` from `sketch.ts` and let `main.ts` handle instantiation + HMR cleanup.
- Centralize tweakable values inside `constants.ts` for easier reuse, documentation, and AGENT checklist compliance.

## Production Build

Run `npm run build`, then deploy the `dist/` directory to any static host (Vercel, Netlify, GitHub Pages, etc). Use `npm run preview` to verify production output locally.

## Updating This Boilerplate

- Keep `AGENTS.md` in sync with the latest lessons learned or workflow expectations.
- Increment `APP_VERSION` within `src/constants.ts` whenever you cut a release or make notable boilerplate-wide changes.
- Document new commands/modules in this README as you extend the starter template.
