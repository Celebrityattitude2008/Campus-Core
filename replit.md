# Campus Core

A comprehensive student platform for Benson Idahosa University (BIU) students.

## Run & Operate

- **Dev server**: `npm run dev` (port 5000)
- **Build**: `npm run build` → outputs to `dist/`
- **Required env vars**: None (Firebase config is embedded in `config.js`)

## Stack

- **Frontend**: Plain HTML + CSS + vanilla JS (multi-page)
- **Build tool**: Vite 6.3.5 (multi-page input, all `*.html` files)
- **Auth/DB**: Firebase (Auth + Realtime Database) v9.23.0 compat SDK
- **Runtime**: Node.js 20

## Where things live

- `index.html` — main dashboard (entry point)
- `biu-design.css` / `biu-design.js` — shared design system (all pages use these)
- `unified-design-system.css` — alternate design tokens
- `config.js` — Firebase config (client-side, public credentials)
- `brain.js` — chatbot response logic
- `vite.config.js` — Vite multi-page build config (port 5000)

## Architecture decisions

- Multi-page HTML app (not a SPA) — each `.html` file is a separate Vite entry point
- Firebase client credentials are embedded directly in `config.js` (safe — Firebase security is enforced via Firebase Security Rules, not secret keys)
- Vite dev server runs on port 5000 to match Replit's webview port requirement
- Firebase compat SDK loaded via CDN per-page; `config.js` sets `window.firebaseConfig`

## Product

| Page | Description |
|------|-------------|
| Dashboard (`index.html`) | Main hub with welcome card, stats, quick actions |
| Login / Sign Up / Reset | Firebase auth flows |
| Profile / View Profile | Firebase Realtime Database user profiles |
| CGPA Calculator | Grade point calculator |
| AI Chatbot | Study assistant using Gemini API |
| Discussions / Assignments / Calendar | Student productivity tools |
| Downloads / Past Questions | Resource library |
| Hall of Fame / News | Campus leaderboard and news feed |
| Notes / SkillSwap | Personal notes and peer skill exchange |
| Subscriptions | Free/Pro/Gold tier plans |
| Admin | Admin command center |

## User preferences

- Keep the existing multi-page HTML structure — do not convert to a React SPA

## Gotchas

- `config.js` is loaded via `<script src="/config.js">` in each page before Firebase SDKs
- The Gemini API key (`geminiApiKey`) in `config.js` must be filled in for the AI chatbot to work
- All HTML pages reference `/biu-design.css` and `/biu-design.js` as shared assets
- `temp_index.html` is a draft page — not part of main navigation
- All internal hrefs use extensionless paths (e.g. `href="privacy"` not `href="privacy.html"`) — Vite resolves these correctly
- Notes stored under `notes/<uid>/` in Firebase; Discussions under `discussions/`; SkillSwap under `skillswap/`
- `biu-design.js` `initAuthState()` redirects unauthenticated users to `login` AND redirects already-logged-in users away from auth pages to `index`

## Pointers

- Firebase project: `campus-core-7ca30`
- Firebase Realtime Database: `https://campus-core-7ca30-default-rtdb.firebaseio.com`
- Skills: `.local/skills/workflows/SKILL.md`, `.local/skills/environment-secrets/SKILL.md`
