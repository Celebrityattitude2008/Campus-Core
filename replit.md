# Campus Core

A comprehensive student platform for Benson Idahosa University students.

## Architecture

Two parallel servers run concurrently:

1. **React App** (`UI UX UPGRADES/`) — Port 5000 (external: 80)
   - A reference/showcase React + Vite app demonstrating the UI/UX design system
   - Run via: `cd 'UI UX UPGRADES' && pnpm run dev`

2. **HTML Static Pages** (root `/`) — Port 3000
   - The actual BIU Archive platform in plain HTML/CSS/JS
   - Run via: `python3 -m http.server 3000`

## Shared Design System

All HTML pages use two shared files:
- `biu-design.css` — Full design system: CSS variables, glassmorphism cards, animated blobs, top navbar, bottom nav, auth pages, splash screen, ripple buttons, stat grid
- `biu-design.js` — Shared JS: VoxelText splash screen, theme toggle, dropdown menu, bottom nav active state, ripple buttons, card animations

## HTML Pages (21 files)

| Page | File | Description |
|------|------|-------------|
| Dashboard | `index.html` | Main hub with welcome card, stats, quick actions, activity feed |
| Login | `login.html` | Firebase auth sign-in |
| Sign Up | `sign.html` | Firebase auth registration |
| Reset Password | `resetpassword.html` | Firebase password reset |
| Profile | `profile.html` | Firebase auth profile with edit modal |
| View Profile | `viewprofile.html` | Public profile viewer (UID from query params) |
| CGPA Calculator | `cgpa.html` | Grade point calculator |
| AI Chatbot | `chatbot.html` | Mock AI study assistant |
| Discussions | `discussions.html` | Community forum threads |
| Assignments | `assignment.html` | Task tracker with completion toggle |
| Calendar | `calendar.html` | Monthly calendar with events |
| Downloads | `download.html` | File resource library |
| Hall of Fame | `hall.html` | Leaderboard with podium |
| News | `news.html` | Campus news feed |
| Notes | `note.html` | Personal notes with modal editor |
| Past Questions | `pq.html` | Searchable exam paper archive |
| SkillSwap | `skillswap.html` | Peer skill exchange marketplace |
| Subscriptions | `subscriptions.html` | Free/Pro/Gold tier plans |
| Admin | `admin.html` | Admin command center |
| Privacy Policy | `privacy.html` | Privacy policy document |
| Support | `support.html` | FAQ + contact methods |

## Design Features

- **Glassmorphism**: `backdrop-filter: blur()` cards with semi-transparent backgrounds
- **Animated Blobs**: Three floating gradient orbs in the background on every page
- **Top Navbar**: Gradient "BIU Archive" brand, guest badge, theme toggle, menu button
- **Bottom Nav**: 5-item nav (Home, Calendar, Notes, AI Chat, Profile) with active state
- **Dark/Light Mode**: Persisted to localStorage via CSS custom properties
- **Ripple Buttons**: Material-style click ripple effect on all `.btn` elements
- **Splash Screen**: VoxelText "CAMPUS CORE" with layered 3D effect + progress bar
- **Auth Pages**: Liquid wave, animated blobs, glassmorphism card with gradient avatar

## Firebase Config

- **Project**: `campus-core-7ca30`
- **API Key**: `AIzaSyDvSFDc8V_u9pqICK-FH_S8tZTPi-p16gU`
- **Database URL**: `https://campus-core-7ca30-default-rtdb.firebaseio.com`
- Auth pages use Firebase Auth SDK v9.23.0 (compat)
- Profile and viewprofile pages use Firebase Realtime Database

## Standard Page Template

```html
<body class="page-body">
  <div class="animated-bg"> <!-- 3 blobs --> </div>
  <header class="top-navbar"> <!-- brand + actions --> </header>
  <nav class="nav-dropdown" id="nav-dropdown"> <!-- all page links --> </nav>
  <main class="main-content"> <!-- page content --> </main>
  <nav class="bottom-nav"> <!-- 5 items --> </nav>
</body>
```

Auth pages use `<body class="auth-body">` with a `.liquid-wave` element.

