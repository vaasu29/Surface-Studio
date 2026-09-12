# Surface Studio

Surface Studio is an adaptive layout engine for multi-surface interactive ads. Design one campaign once, preview it across multiple placements, and get an explainable score when copy or positioning creates a risk.

This project was built for the Flam Frontend R&D assignment. The important idea is that responsive adaptation is treated as a layout problem with inspectable rules, not as a collection of disconnected hand-tuned designs.

## What to look for

- Switch between Mobile story, Social square, Web banner, and Product card.
- Select the headline or another element in the preview and edit its content or geometry in the Inspector.
- Switch to Web banner to see the constraint-based composition reflow.
- Make the headline longer to trigger the explainable layout score warning.
- Open `Inspect engine output` to see the portable JSON schema generated for the active surface.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

## Build for production

```bash
npm run build
npm run preview
```

## Publish to GitHub

Create an empty repository on GitHub, then run these commands from this folder:

```bash
git init
git add .
git commit -m "Build adaptive multi-surface ad layout engine"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/surface-studio.git
git push -u origin main
```

Replace `YOUR_USERNAME` and the repository name with your own values. The assignment submission should include this repository link.

## Deploy on Netlify

1. Sign in to Netlify and choose **Add new site** -> **Import an existing project**.
2. Choose GitHub and select the `surface-studio` repository.
3. Use these build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: leave blank
4. Choose **Deploy site**.
5. Rename the generated site to something memorable, such as `surface-studio-flam`.

Every future push to `main` will trigger a new deploy automatically.

## Architecture

```text
src/
  engine/
    layoutSolver.ts  # surface-specific adaptation rules
    scoring.ts       # explainable layout checks
    schema.ts        # surfaces and starter campaign data
    types.ts         # shared engine contracts
  App.tsx            # editor shell and preview interaction
  styles.css         # visual system
```

The engine is intentionally independent from the React rendering layer. That leaves a clear path to add drag-and-drop constraints, export formats, and server-side rendering without rewriting the editor.
