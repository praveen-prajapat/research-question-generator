# Research Question Generator 2040

A mobile-first, futuristic web app that generates novel, interdisciplinary PhD
research questions. Built for the **NUS Young Fellowship Programme 2026**
conference poster — scan a QR code, get a research idea in under a minute.

No backend, no API keys, runs entirely client-side, deploys for free on
GitHub Pages.

---

## What it does

1. **Landing** — glowing CTA, animated "synthesis core" visual.
2. **Field** — pick a discipline (CS, AI, Biology, Medicine, Economics, etc.).
3. **Interest** — type or tap a research interest (autocomplete suggestions).
4. **Horizon** — choose 2026 / 2035 / 2045 to set how speculative the result is.
5. **Generation sequence** — a 5-stage animated sequence (~6.5s).
6. **Result card** — the research question plus:
   - Why it matters
   - Interdisciplinary connections (animated nodes)
   - Novelty score (circular gauge)
   - Difficulty level (Easy / Medium / Hard / Moonshot)
   - Potential impact bars (academic / industrial / societal)
   - 3 suggested experiments
   - 3 future research directions
   - **Generate Another** / **Make It More Ambitious** actions

There's also a hidden **`/presentation`** route: a fullscreen, auto-cycling
showcase of randomly generated questions, meant to run unattended on a laptop
next to the poster during judging.

All questions are generated locally from a hand-built dataset
(`src/data/fields.js`) and a template engine (`src/lib/generator.js`) —
there are thousands of possible combinations, and nothing ever calls a
network API.

---

## Tech stack

- React 19 + Vite
- Tailwind CSS
- Framer Motion (animation)
- React Router (`HashRouter`, so it works on GitHub Pages with zero server config)
- lucide-react (icons)

---

## Run it locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open the printed `localhost` URL. The dev server supports hot reload.

To check the production build locally:

```bash
npm run build
npm run preview
```

---

## Deploy to GitHub Pages

### Option A — GitHub Actions (recommended, fully automatic)

This repo already includes `.github/workflows/deploy.yml`, which builds and
deploys the site every time you push to `main`.

1. Push this project to a new GitHub repository.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Push to `main` (or re-run the workflow from the **Actions** tab).
5. After the workflow finishes, your site is live at:
   `https://<your-username>.github.io/<your-repo-name>/`

No further configuration is needed — `vite.config.js` already uses
`base: './'`, so the build works at any subpath automatically.

### Option B — Manual deploy with `gh-pages`

```bash
npm install -D gh-pages
npm run build
npx gh-pages -d dist
```

Then in **Settings → Pages**, set the source to the `gh-pages` branch.

---

## Project structure

```
src/
  data/fields.js        # per-field technologies, problems, future domains
  lib/generator.js       # template engine that assembles a full result object
  components/            # shared UI: AmbientField, SynthesisCore, gauges, bars...
  pages/
    WizardApp.jsx         # orchestrates the landing -> field -> interest -> horizon -> result flow
    Landing.jsx
    FieldStep.jsx
    InterestStep.jsx
    HorizonStep.jsx
    GeneratingScreen.jsx
    ResultPage.jsx
    PresentationMode.jsx  # the hidden /presentation route
```

## Customizing the dataset

To add a new field, technology, or problem statement, edit
`src/data/fields.js` — every field entry has `technologies`, `problems`,
and `partners` (which other fields it pairs well with for the
"interdisciplinary connections" framing). No other code changes are needed;
the generator automatically picks up new entries.
