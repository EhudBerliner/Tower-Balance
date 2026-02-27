// Tower Balance - i18n Translations
// Format: key: { element_type, usage/context, en: "...", he: "..." }

const I18N = {
  // === App-level ===
  appName:               { type: "title",    usage: "Browser tab and app title",           en: "Tower Balance",              he: "מגדל האיזון" },
  appSubtitle:           { type: "subtitle", usage: "Tagline on start screen",             en: "Manage center of mass, keep balance and reach a new high score!", he: "נהל מרכז מסה, שמור על איזון והגע לשיא חדש!" },

  // === Start Screen ===
  diffEasy:              { type: "button",   usage: "Difficulty selector",                 en: "Easy",                       he: "קל" },
  diffMedium:            { type: "button",   usage: "Difficulty selector",                 en: "Medium",                     he: "בינוני" },
  diffHard:              { type: "button",   usage: "Difficulty selector",                 en: "Hard",                       he: "קשה" },
  diffExpert:            { type: "button",   usage: "Difficulty selector",                 en: "Expert",                     he: "מומחה" },
  startBtn:              { type: "button",   usage: "Start game action",                   en: "Start Game",                 he: "התחל משחק" },
  bestScore:             { type: "label",    usage: "Best score label on start screen",    en: "Best Score",                 he: "שיא" },

  // === HUD (In-game heads-up display) ===
  hudScore:              { type: "label",    usage: "Score label in HUD",                  en: "Score",                      he: "ניקוד" },
  hudTurn:               { type: "label",    usage: "Turn counter label in HUD",           en: "Turn",                       he: "תור" },
  hudTourists:           { type: "label",    usage: "Tourist counter label in HUD",        en: "Tourists",                   he: "תיירים" },
  hudStability:          { type: "label",    usage: "Stability meter label in HUD",        en: "Stability",                  he: "יציבות" },
  hudNext:               { type: "label",    usage: "Next character label in HUD",         en: "Next:",                      he: "הבא:" },
  hudCharNormal:         { type: "label",    usage: "Character type name in HUD",          en: "Regular",                    he: "רגיל" },
  hudCharHeavy:          { type: "label",    usage: "Character type name in HUD",          en: "Heavy",                      he: "כבד" },
  hudCharLight:          { type: "label",    usage: "Character type name in HUD",          en: "Light",                      he: "קל" },
  hudCharSpecial:        { type: "label",    usage: "Character type name in HUD",          en: "Special",                    he: "מיוחד" },

  // === Controls ===
  ctrlTopView:           { type: "button",   usage: "Camera control tooltip",              en: "Top View",                   he: "מבט מלמעלה" },
  ctrlHorizon:           { type: "button",   usage: "Camera control tooltip",              en: "Horizon View",               he: "מבט אופק" },
  ctrlResetView:         { type: "button",   usage: "Camera control tooltip",              en: "Reset Camera",               he: "איפוס מצלמה" },
  ctrlSettings:          { type: "button",   usage: "Open settings menu button",           en: "Settings",                   he: "הגדרות" },

  // === Game Over Screen ===
  gameOverTitle:         { type: "heading",  usage: "Game over screen title",              en: "Tower Collapsed!",           he: "המגדל קרס!" },
  gameOverScore:         { type: "label",    usage: "Final score label",                   en: "Score",                      he: "ניקוד" },
  gameOverTourists:      { type: "label",    usage: "Final tourists count label",          en: "Tourists",                   he: "תיירים" },
  gameOverMaxAngle:      { type: "label",    usage: "Maximum angle label",                 en: "Max Angle",                  he: "זווית מקסימלית" },
  restartBtn:            { type: "button",   usage: "Restart game action",                 en: "Play Again",                 he: "שחק שוב" },
  newHighScore:          { type: "message",  usage: "New high score notification",         en: "🏆 New High Score!",          he: "🏆 שיא חדש!" },

  // === Settings Modal ===
  settingsTitle:         { type: "heading",  usage: "Settings modal title",                en: "Settings",                   he: "הגדרות" },
  settingsLanguage:      { type: "label",    usage: "Language selector label",             en: "Language",                   he: "שפה" },
  settingsDarkMode:      { type: "label",    usage: "Dark/Light mode toggle label",        en: "Dark Mode",                  he: "מצב לילה" },
  settingsVibration:     { type: "label",    usage: "Vibration toggle label",              en: "Vibration",                  he: "רטט" },
  settingsSounds:        { type: "label",    usage: "Sound effects toggle label",          en: "Sound Effects",              he: "צלילים" },
  settingsAnimations:    { type: "label",    usage: "Animations toggle label",             en: "Animations",                 he: "אנימציות" },
  settingsPullRefresh:   { type: "label",    usage: "Pull-to-refresh toggle label",        en: "Pull to Refresh",            he: "משיכה לרענון" },
  settingsClose:         { type: "button",   usage: "Close settings modal button",         en: "Close",                      he: "סגור" },
  settingsReset:         { type: "button",   usage: "Open selective reset modal",          en: "Reset Data",                 he: "איפוס נתונים" },

  // === Hamburger Menu ===
  menuTitle:             { type: "heading",  usage: "Side menu title",                     en: "Menu",                       he: "תפריט" },
  menuNewGame:           { type: "button",   usage: "Side menu action",                    en: "New Game",                   he: "משחק חדש" },
  menuSettings:          { type: "button",   usage: "Side menu action",                    en: "Settings",                   he: "הגדרות" },
  menuStats:             { type: "button",   usage: "Side menu action",                    en: "Statistics",                 he: "סטטיסטיקות" },

  // === Stats Modal ===
  statsTitle:            { type: "heading",  usage: "Statistics modal title",              en: "Statistics",                 he: "סטטיסטיקות" },
  statsGamesPlayed:      { type: "label",    usage: "Stat row label",                      en: "Games Played",               he: "משחקים" },
  statsBestScore:        { type: "label",    usage: "Stat row label",                      en: "Best Score",                 he: "שיא ניקוד" },
  statsBestTourists:     { type: "label",    usage: "Stat row label",                      en: "Most Tourists",              he: "שיא תיירים" },
  statsTotalTourists:    { type: "label",    usage: "Stat row label",                      en: "Total Tourists",             he: "סה\"כ תיירים" },
  statsClose:            { type: "button",   usage: "Close stats modal",                   en: "Close",                      he: "סגור" },

  // === Selective Reset Modal ===
  resetTitle:            { type: "heading",  usage: "Selective reset modal title",         en: "Reset Data",                 he: "איפוס נתונים" },
  resetDesc:             { type: "message",  usage: "Reset modal description",             en: "Select what to keep before resetting:", he: "בחר מה לשמור לפני האיפוס:" },
  resetKeepProgress:     { type: "checkbox", usage: "Keep game progress option",           en: "Keep game progress",         he: "שמור התקדמות משחק" },
  resetKeepHighScore:    { type: "checkbox", usage: "Keep high scores option",             en: "Keep high scores",           he: "שמור שיאים" },
  resetKeepSettings:     { type: "checkbox", usage: "Keep settings option",                en: "Keep settings",              he: "שמור הגדרות" },
  resetConfirm:          { type: "button",   usage: "Confirm reset action",                en: "Reset Now",                  he: "אפס עכשיו" },
  resetCancel:           { type: "button",   usage: "Cancel reset action",                 en: "Cancel",                     he: "ביטול" },

  // === PWA Install Banner ===
  installTitle:          { type: "heading",  usage: "PWA install banner heading",          en: "Install App",                he: "התקן אפליקציה" },
  installDesc:           { type: "message",  usage: "PWA install banner description",      en: "Install for quick access and offline play!", he: "התקן לגישה מהירה ומשחק ללא אינטרנט!" },
  installBtn:            { type: "button",   usage: "Install PWA action",                  en: "Install",                    he: "התקן" },
  installDismiss:        { type: "button",   usage: "Dismiss install banner",              en: "Not Now",                    he: "לא עכשיו" },

  // === Network / Offline Toasts & Banners ===
  offlineBanner:         { type: "banner",   usage: "Offline status banner text",          en: "No internet connection",     he: "אין חיבור לאינטרנט" },
  onlineToast:           { type: "toast",    usage: "Back-online notification",            en: "Internet connection restored ✓", he: "חיבור לאינטרנט שוחזר ✓" },
  slowConnectionToast:   { type: "toast",    usage: "Slow/save-data connection warning",   en: "Slow connection detected – reduced mode active", he: "חיבור איטי זוהה – מצב חיסכון פעיל" },

  // === Version / Update Prompts ===
  versionLabel:          { type: "label",    usage: "Version badge text prefix",           en: "v",                          he: "v" },
  updateAvailable:       { type: "prompt",   usage: "New version available prompt",        en: "New version available! Update now?", he: "גרסה חדשה זמינה! עדכן עכשיו?" },

  // === General Toasts ===
  toastSaved:            { type: "toast",    usage: "Auto-save confirmation",              en: "Saved ✓",                    he: "נשמר ✓" },
  toastInvalidMove:      { type: "toast",    usage: "Invalid move attempt",                en: "Can't place here",           he: "אין אפשרות לבצע מהלך" },
  toastResetDone:        { type: "toast",    usage: "Reset completed notification",        en: "Reset complete",             he: "האיפוס הושלם" },
  toastInstalled:        { type: "toast",    usage: "PWA installed success notification",  en: "App installed successfully! 🎉", he: "האפליקציה הותקנה בהצלחה! 🎉" },
};

// Returns the translated string for the given key in the active language
function t(key) {
  const lang = window._appLang || 'en';
  const entry = I18N[key];
  if (!entry) { console.warn('[i18n] Missing key:', key); return key; }
  return entry[lang] || entry['en'] || key;
}

// Apply translations to all elements that have data-i18n attribute
function applyTranslations(lang) {
  window._appLang = lang;
  const isRTL = (lang === 'he');
  document.documentElement.lang = lang;
  document.documentElement.dir  = isRTL ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const attr = el.dataset.i18nAttr; // e.g. "placeholder" or "title"
    const val = t(key);
    if (attr) {
      el.setAttribute(attr, val);
    } else {
      el.textContent = val;
    }
  });
}
