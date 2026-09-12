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
