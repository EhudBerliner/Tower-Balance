# 🏗️ Tower Balance – מגדל האיזון

A physics-based tower balancing game, built as a fully offline-capable **Progressive Web App (PWA)**.

## 🌐 Play Online (GitHub Pages)

**[▶ Play Now](https://YOUR-USERNAME.github.io/tower-balance/balance-tower-game.html)**

> Replace `YOUR-USERNAME` with your GitHub username after deploying.

---

## 🚀 Deploy to GitHub Pages

1. **Fork / clone** this repository.
2. Go to **Settings → Pages**.
3. Set source to **Deploy from branch → `main` / root (`/`)**.
4. Done! The game will be live at `https://YOUR-USERNAME.github.io/tower-balance/`.

---

## 📁 Project Structure

```
tower-balance/
├── balance-tower-game.html   # Main game (single-file app)
├── manifest.json             # PWA manifest
├── sw.js                     # Service Worker (offline + update management)
├── i18n.js                   # English / Hebrew translations dictionary
├── version.json              # Version file (checked by SW for updates)
├── icons/                    # App icons (all sizes)
│   ├── icon-192x192.png
│   ├── icon-512x512.png
│   └── ...
├── .nojekyll                 # Prevents GitHub Pages from running Jekyll
└── README.md
```

---

## ✨ Features

| Category | Feature |
|---|---|
| **Version Management** | Visual version badge (click to hard-reset), auto-update detection via `version.json`, Service Worker update prompt every 5 min |
| **App Reset** | Hidden hard-reset (click version badge), selective reset modal (keep scores / settings / progress) |
| **PWA Install** | Custom install banner, Apple Touch Icon support, install state management |
| **Offline** | Full offline play via Service Worker cache, offline/online banner + toast |
| **Mobile UX** | Hamburger side menu, pull-to-refresh (toggleable), swipe gestures, haptic feedback, safe-area insets |
| **Toasts & Modals** | Toast system (success / error / info), modal backdrop with scroll-lock |
| **Persistence** | Auto-save game state, high scores, dark/light mode, all settings to `localStorage` |
| **Language** | English (default) & Hebrew – instant switch, RTL/LTR flip, managed via `i18n.js` |
| **Performance** | `IntersectionObserver` lazy-loading, Watchdog for canvas recovery |

---

## 🎮 How to Play

- **Drag & Drop** tourists onto the tower floors.
- Keep the tower balanced – watch the stability meter!
- Each tourist has different weight (Regular / Heavy / Light / Special).
- The tower falls when the tilt angle exceeds 45°.

---

## 🛠 Development

No build tools required – pure HTML/CSS/JS.

```bash
# Serve locally (Python)
python3 -m http.server 8080
# Then open http://localhost:8080/balance-tower-game.html
```

---

## 📄 License

MIT © Tower Balance Contributors
