// ════════════════════════════════════════════════════════════════
// VERSION MANAGER - Load version from version.json
// ════════════════════════════════════════════════════════════════

let APP_VERSION = '1.1.0'; // Fallback

// Load version from version.json
fetch('./version.json?t=' + Date.now())
    .then(r => r.json())
    .then(data => {
        APP_VERSION = data.version;
        console.log('[Version] Loaded:', APP_VERSION);
        
        // Update all version displays
        document.querySelectorAll('[data-app-version]').forEach(el => {
            el.textContent = 'v' + APP_VERSION;
        });
        
        // Update manifest
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                type: 'UPDATE_VERSION',
                version: APP_VERSION
            });
        }
    })
    .catch(e => {
        console.warn('[Version] Failed to load version.json:', e);
    });
