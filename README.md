# 🏗️ Tower Balance Game - Updated v1.1.0

## 🎮 Overview
Advanced physics-based tower balancing game with full PWA support, dynamic versioning, and comprehensive data management.

## ✨ New Features (v1.1.0)

### 1. PWA Installation System
- **Automatic Installation Prompt**: Shows after 3 seconds if not dismissed
- **Custom Install Banner**: Slides from bottom with app branding
- **Smart Dismissal**: Remembers user choice, resets after 30 days
- **Installation Tracking**: Records install date and status in stats
- **Standalone Detection**: Knows when app is installed

### 2. Advanced Reset System
- **Hard Reset (Hidden)**: Click version number 5 times within 2 seconds
  - Clears: localStorage, sessionStorage, Cookies, Service Workers, Caches, IndexedDB
  - Forces complete app refresh
- **Selective Reset**: Choose what to keep:
  - ☑️ Game Progress
  - ☑️ High Scores
  - ☑️ Settings
  - Clears everything else

### 3. Dynamic Version Management
- **Version from JSON**: All version numbers load from `version.json`
- **Automatic Updates**: Version displays update across entire app
- **Service Worker Sync**: SW automatically updates with new version

### 4. Improved Physics
- **Reduced Sensitivity**: Tower tilt is less sensitive (more gameplay time)
- **Better Balance**: `COLLAPSE_DEG` increased to 40° (was 35°)
- **Smoother Feel**: Improved damping and spring constants
- **Visual Feedback**: Angle indicator with danger warnings

### 5. Enhanced Logo Integration
- **Multi-Size Icons**: 16x16, 32x32, 152x152, 192x192, 512x512, 1024x1024
- **Apple Touch Icon**: Full iOS support
- **Manifest Integration**: All icons properly referenced
- **Favicon**: Dynamic favicon from logo

### 6. Floor Selection Improvement
- **Pick Any Floor**: Can now place character on any floor level
- **Visual Feedback**: Ghost preview shows valid/invalid placement
- **Smart Positioning**: Characters auto-position in available slots

## 📁 File Structure

```
tower-balance/
├── index.html              # Main game file
├── manifest.json           # PWA manifest (updated)
├── version.json            # Version configuration
├── sw.js                   # Service Worker (updated)
├── i18n.js                 # Internationalization (placeholder)
├── logo.png                # Main logo (1024x1024)
├── icons/                  # Generated icons
│   ├── icon-16x16.png
│   ├── icon-32x32.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   └── icon-512x512.png
├── version-manager.js      # Version management system
├── pwa-install-system.js   # PWA installation manager
├── app-reset-system.js     # App reset & data management
└── README.md               # This file
```

## 🚀 Installation & Setup

### Quick Start
```bash
# Serve with any HTTP server
python -m http.server 8000
# or
npx http-server -p 8000
```

Open browser: `http://localhost:8000`

### Install as PWA

#### Mobile (Android/iOS)
1. Open in browser (Chrome/Safari)
2. Wait for install banner (or tap Share → Add to Home Screen)
3. Follow prompts

#### Desktop
1. Open in Chrome/Edge
2. Click install icon in address bar
3. Click "Install"

## 🎯 How to Use New Features

### Installing the App
1. Open game in browser
2. Wait for install banner to appear (bottom of screen)
3. Click "Install" button
4. App will be added to home screen/app menu
5. Can now play offline!

### Hard Reset (Emergency)
1. Click on version number (bottom-right) 5 times quickly
2. Confirm in popup dialog
3. App will completely reset and reload
4. **Warning**: This deletes ALL data!

### Selective Reset
1. Open side menu (☰)
2. Go to Settings
3. Scroll to "Reset Data"
4. Check boxes for data to KEEP:
   - ☑️ Keep game progress
   - ☑️ Keep high scores
   - ☑️ Keep settings
5. Click "Reset"
6. App resets and reloads with saved data

### Playing with Floor Selection
1. Drag character from "Next" preview
2. Move near any floor level
3. Green ghost = valid placement
4. Red ghost with X = invalid (floor full)
5. Release to place
6. Character auto-positions in empty slot

## 🔧 Configuration Files

### version.json
```json
{
  "version": "1.1.0",
  "releaseDate": "2026-02-27",
  "notes": "PWA features, reset system, improved physics"
}
```

**All version displays automatically update from this file!**

### manifest.json
Complete PWA manifest with:
- App name and short name
- Icons in all sizes
- Theme colors
- Display mode (standalone)
- Orientation (portrait)
- Start URL
- Scope
- Categories

### sw.js (Service Worker)
Features:
- Dynamic version loading from version.json
- Cache-first strategy for assets
- Network-first for version.json
- Auto-cleanup of old caches
- Background sync support
- Push notification handlers

## 🎮 Game Features

### Physics Engine
- **Real COM Calculation**: Σ(m·r) / Σ(m)
- **Dynamic Pivot**: Shifts to edge when COM exits base
- **Moment of Inertia**: Includes characters and structure
- **Sliding Physics**: Characters slide at critical angles
- **Wind Effects**: Dynamic wind force (hard/expert modes)
- **Impact System**: Drop height affects stability

### Character Types
| Type | Mass | Icon | Frequency |
|------|------|------|-----------|
| Standard | 1.0 | 🧍 | Common |
| Heavy | 2.5 | 🏋️ | Every 5 turns |
| Child | 0.5 | 👶 | Random |

### Difficulty Levels
| Level | Timer | Wind | Notes |
|-------|-------|------|-------|
| Easy | ❌ | ❌ | Learn mechanics |
| Medium | 15s | ❌ | Moderate challenge |
| Hard | 10s | ✅ | High difficulty |
| Expert | 8s | ✅ | Maximum challenge |

### Game Mechanics
- **Floor Limit**: Max 4 characters per floor
- **Overflow Push**: 5th character pushes out 1st
- **Sliding**: Characters slide when tilt > 15°
- **Collapse**: Game over at 40° tilt
- **Scoring**: Points for placement + stability bonuses

## 📊 Stats & Progress
Game tracks:
- Total games played
- Best score
- Best tourists count
- Total tourists placed
- Install status
- Install date

All saved in localStorage as `tb_stats`

## 🎨 UI/UX Features

### HUD Elements
- **Score Display**: Real-time score
- **Turn Counter**: Current turn number
- **Tourist Count**: Total placed
- **Next Character**: Preview of next type
- **Timer Bar**: Visual countdown (if enabled)
- **Stability Meter**: Shows current tilt with needle

### Visual Feedback
- **Ghost Preview**: Green (valid) / Red (invalid)
- **Danger Tilt**: Screen flash at high angles
- **Tilt Arc**: Shows exact angle at tower base
- **COM Indicator**: Visible in top view mode
- **Shadow**: Dynamic shadow shows tilt direction

### Camera Modes
- **Default**: Isometric 3D view
- **Top View**: See COM and balance clearly
- **Horizon**: Focus on angle measurement
- **Auto-Tracking**: Follows tower movement

### Sound Effects
- 🎵 Place character
- 🎵 Score points
- 🎵 Warning (danger tilt)
- 🎵 Collapse
- Toggle in settings

### Haptic Feedback
- Vibration on placement
- Vibration on game over
- Vibration on menu actions
- Toggle in settings

## 🌐 Internationalization
Currently supports:
- English (en)
- Hebrew (he) - RTL support

Language switches automatically based on browser settings.

## 🔒 Privacy & Data

### What We Store (localStorage)
- `tb_gamestate`: Current game progress
- `tb_stats`: Game statistics
- `tb_settings`: User preferences
- `tb_language`: Language choice
- `tb_version`: App version
- `tb_install_dismissed`: Install banner dismissal
- `tb_install_dismissed_date`: Dismissal timestamp

### What We DON'T Store
- ❌ Personal information
- ❌ Location data
- ❌ Contact information
- ❌ Analytics/tracking data

### Data Management
- All data stored locally on device
- No server communication
- No external analytics
- Complete user control via reset features

## 🐛 Troubleshooting

### App Won't Install
- Clear browser cache
- Check browser supports PWA (Chrome, Edge, Safari)
- Ensure HTTPS or localhost
- Try incognito/private mode

### Game Won't Load
1. Hard reset (click version 5 times)
2. Clear browser data manually
3. Uninstall and reinstall
4. Check console for errors

### Physics Feels Wrong
- Check difficulty setting
- Try different device
- Report issue with device/browser info

### Save Data Lost
- Check if reset was performed
- Look for backup in localStorage
- Stats may reset on major updates

## 🚧 Known Issues
- iOS Safari sometimes delays install prompt
- Some Android browsers need manual "Add to Home Screen"
- Haptic feedback doesn't work in all browsers
- IndexedDB clear may require page reload on some devices

## 🔮 Roadmap

### v1.2.0 (Planned)
- [ ] Achievements system
- [ ] Daily challenges
- [ ] More character types
- [ ] Power-ups
- [ ] Tutorial mode

### v1.3.0 (Planned)
- [ ] Multiplayer support
- [ ] Global leaderboard
- [ ] Custom tower skins
- [ ] Weather effects
- [ ] Story mode

### v2.0.0 (Future)
- [ ] 3D graphics option
- [ ] VR support
- [ ] Level editor
- [ ] Community challenges
- [ ] Cross-device sync

## 🤝 Contributing
Want to contribute? Great!
1. Fork the project
2. Create feature branch
3. Make your changes
4. Test thoroughly
5. Submit pull request

## 📄 License
MIT License - feel free to use and modify!

## 🙏 Credits
- **Physics Engine**: Classical mechanics principles
- **Design**: Modern mobile-first approach
- **Icons**: Generated from main logo
- **Fonts**: Google Fonts (Orbitron, Rajdhani)
- **PWA**: Modern web standards

## 📞 Support
Found a bug? Have a suggestion?
- Open an issue on GitHub
- Contact via email
- Join our community

## 📈 Changelog

### v1.1.0 (2026-02-27)
- ✨ Added PWA installation system
- ✨ Added hard reset feature (click version 5x)
- ✨ Added selective reset with data preservation
- ✨ Dynamic version loading from version.json
- 🔧 Reduced physics sensitivity (40° collapse angle)
- 🔧 Improved floor selection (any floor)
- 🎨 Added logo and multi-size icons
- 🎨 Enhanced visual feedback
- 📱 Better mobile optimization
- 🐛 Various bug fixes

### v1.0.0 (Initial)
- 🎮 Core game mechanics
- ⚙️ Physics engine
- 🎨 UI/UX design
- 📊 Stats tracking
- 🎵 Sound effects
- 🌐 Internationalization
- 💾 Local storage

---

**Enjoy playing Tower Balance! 🏗️**

Made with ❤️ by the Tower Balance Team
