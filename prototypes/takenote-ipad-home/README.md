# Olaa Takenote: iPad home prototype

A clickable prototype of the Olaa Takenote home screen for iPad: a movable liquid-glass note window built for Apple Pencil, free-floating files and folders, a day-mood picker, and a Today view that links Notes with Olaa Habits and Olaa Language.

**Status: UI prototype.** It is a design and interaction study written in plain HTML, CSS and JavaScript. It is not the production app:

- no backend, no sync, no accounts;
- notes and files live in memory and are lost on reload;
- only the theme, recent emoji and ticked habits are kept, in the browser's `localStorage`;
- Apple Calendar events and past days in the calendar are labelled sample data;
- "Add to Home Screen" and "Share" only show a message.

For the architecture this prototype feeds into, see branch 03 (Olaa Takenote) in the `olaa-platform` repository, mainly modules 03.04 (digital canvas), 03.05 (Apple Pencil) and 03.06 (inking tools).

## Run it

Any static file server works. The page must be served over HTTP (not opened as a file) so the emoji list can load.

```bash
cd prototypes/takenote-ipad-home
python3 -m http.server 4173 --bind 127.0.0.1
```

Then open `http://127.0.0.1:4173/` in Safari on iPad (same network: use the computer's address and `--bind 0.0.0.0`) or in a desktop browser.

## Test it

```bash
cd prototypes/takenote-ipad-home
npm install
npx playwright install chromium
npm test
```

The smoke tests start a local server, load the page and check: no script errors, no Content-Security-Policy violations, drawing a stroke, the emoji picker, the long-press menu, importing a text file, and that HTML in a file name is shown as text.

## Folder layout

```text
prototypes/takenote-ipad-home/
├── index.html              markup only; strict Content-Security-Policy
├── css/app.css             all styles; light and dark themes as tokens
├── js/emoji.js             emoji image map (empty on purpose, see below)
├── js/app.js               all behaviour, one IIFE, no globals besides EMOJI
├── data/emoji-all.json     emoji names and categories (no images)
├── scripts/build_standalone.py   bundles everything into one HTML file
├── tests/smoke.spec.mjs    Playwright smoke tests
├── playwright.config.mjs
├── package.json            dev dependency only: @playwright/test (pinned)
├── package-lock.json       locked dependency tree for the tests
├── REVIEW.md               strengths, weaknesses and next steps
├── SECURITY.md             threat model and protections for this prototype
└── THIRD_PARTY_NOTICES.md
```

## Emoji

The repository contains no emoji artwork. The app draws emoji with the device's own font, which is Apple Color Emoji on iPad and Mac, so it looks the same there as Apple's images. Apple's emoji images are Apple's property and are not licensed for redistribution, so they are never committed. `scripts/build_standalone.py --apple-emoji <dir>` can add them to a private, local build for demos.

## Main interactions

| Area | How it works |
|---|---|
| Note window | Pencil draws, a finger moves the page, pinch to zoom, drag the corner to resize. Red: close to the toolbar. Yellow: 75% of the screen. Green: full screen. |
| Pens | Pen (fountain, ballpoint, brush), pencil, highlighter, eraser, lasso. Drag a pen up or down to change thickness; tap it again for options. Hold still at the end of a stroke to snap a shape. |
| Files | Drag freely; hold one over another to make a folder; press and hold a file for its menu; press and hold empty space to select, group, delete or change icons. |
| Top bar | Mood emoji (tap), New note, Import, Files, light or dark. Tap the date for the calendar and habits. |
