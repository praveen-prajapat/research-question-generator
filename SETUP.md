# Research Question Generator 2040 — Setup Guide

## Overview

This app uses **Cloudflare Workers AI** (free, no credit card) as the LLM backend and deploys to **GitHub Pages** for free hosting.

---

## Step 1 — Deploy the Cloudflare Worker (5 minutes)

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and sign up free
2. Click **Workers & Pages** → **Create** → **Worker**
3. Name it `research-ai` → click **Deploy**
4. Click **Edit Code**, paste the contents of `cloudflare-worker/worker.js`, click **Deploy**
5. Go to **Settings** → **Bindings** → **Add** → **AI**
   - Variable name: `AI`
   - Click **Save**
6. Your Worker URL will look like: `https://research-ai.YOUR-NAME.workers.dev`

---

## Step 2 — Configure the App

Open `src/lib/generator.js` and replace the placeholder:

```js
const WORKER_URL = "https://research-ai.YOUR-NAME.workers.dev"; // ← paste your URL here
```

---

## Step 3 — Deploy to GitHub Pages

### First time setup:

```bash
# 1. Create a new repo on github.com named: research-question-generator

# 2. In this folder, run:
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/research-question-generator.git
git push -u origin main
```

### Enable GitHub Pages:

1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Click **Save**

### Your site will be live at:

```
https://YOUR-USERNAME.github.io/research-question-generator/
```

The GitHub Actions workflow (`.github/workflows/deploy.yml`) runs automatically on every push to `main`.

---

## Free Tier Limits

| Service | Free Limit |
|---|---|
| Cloudflare Workers AI | 10,000 requests/day |
| GitHub Pages | Unlimited static hosting |
| GitHub Actions | 2,000 minutes/month |

More than enough for a conference poster demo.

---

## Local Development

```bash
npm install
npm run dev
```

Then open http://localhost:5173

> Note: The AI calls will hit your live Cloudflare Worker even in local dev.
