// ════════════════════════════════════════════════════════════════
// APP RESET & DATA MANAGEMENT SYSTEM
// ════════════════════════════════════════════════════════════════

class AppResetManager {
    constructor() {
        this.versionClickCount = 0;
        this.versionClickTimer = null;
        this.initHardReset();
        this.initSelectiveReset();
    }
    
    // 1.1 Hard Reset - Hidden feature activated by clicking version number
    initHardReset() {
        const versionElement = document.getElementById('appVersion');
        if (!versionElement) return;
        
        versionElement.style.cursor = 'pointer';
        versionElement.addEventListener('click', () => {
            this.versionClickCount++;
            
            // Clear timer if exists
            if (this.versionClickTimer) {
                clearTimeout(this.versionClickTimer);
            }
            
            // Reset counter after 2 seconds
            this.versionClickTimer = setTimeout(() => {
                this.versionClickCount = 0;
            }, 2000);
            
            // 5 clicks within 2 seconds triggers hard reset confirmation
            if (this.versionClickCount >= 5) {
                this.versionClickCount = 0;
                this.confirmHardReset();
            }
        });
    }
    
    confirmHardReset() {
        const confirmed = confirm(
            '⚠️ איפוס מלא של האפליקציה\n\n' +
            'פעולה זו תמחק:\n' +
            '• כל הנתונים השמורים\n' +
            '• היסטוריית משחקים\n' +
            '• הגדרות אישיות\n' +
            '• Service Workers\n' +
            '• Cache\n\n' +
            'האם להמשיך?'
        );
        
        if (confirmed) {
            this.performHardReset();
        }
    }
    
    // 1.2 Deep Data Cleanup
    async performHardReset() {
        console.log('[Reset] Starting hard reset...');
        
        try {
            // Show loading indicator
            showToast('מאפס את האפליקציה...', 'info', 30000);
            
            // 1. Clear localStorage
            localStorage.clear();
            console.log('[Reset] localStorage cleared');
            
            // 2. Clear sessionStorage
            sessionStorage.clear();
            console.log('[Reset] sessionStorage cleared');
            
            // 3. Clear cookies
            this.clearAllCookies();
            console.log('[Reset] Cookies cleared');
            
            // 4. Unregister all Service Workers
            if ('serviceWorker' in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                await Promise.all(registrations.map(reg => reg.unregister()));
                console.log('[Reset] Service Workers unregistered:', registrations.length);
            }
            
            // 5. Clear all caches
            if ('caches' in window) {
                const cacheNames = await caches.keys();
                await Promise.all(cacheNames.map(name => caches.delete(name)));
                console.log('[Reset] Caches cleared:', cacheNames.length);
            }
            
            // 6. Clear IndexedDB
            await this.clearIndexedDB();
            console.log('[Reset] IndexedDB cleared');
            
            console.log('[Reset] Hard reset completed');
            
            // 7. Force reload
            setTimeout(() => {
                location.reload(true);
            }, 500);
            
        } catch (error) {
            console.error('[Reset] Error during hard reset:', error);
            alert('שגיאה באיפוס האפליקציה. אנא נסה שוב.');
        }
    }
    
    clearAllCookies() {
        const cookies = document.cookie.split(';');
        
        for (let cookie of cookies) {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
            
            // Delete cookie for all paths and domains
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=' + location.hostname;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.' + location.hostname;
        }
    }
    
    async clearIndexedDB() {
        if (!('indexedDB' in window)) return;
        
        try {
            const databases = await indexedDB.databases();
            await Promise.all(
                databases.map(db => {
                    return new Promise((resolve, reject) => {
                        const request = indexedDB.deleteDatabase(db.name);
                        request.onsuccess = () => resolve();
                        request.onerror = () => reject(request.error);
                        request.onblocked = () => {
                            console.warn('[Reset] IndexedDB delete blocked:', db.name);
                            resolve(); // Continue anyway
                        };
                    });
                })
            );
        } catch (error) {
            console.warn('[Reset] IndexedDB clear failed:', error);
        }
    }
    
    // 1.3 Selective Reset
    initSelectiveReset() {
        const confirmBtn = document.getElementById('confirmResetBtn');
        if (!confirmBtn) return;
        
        confirmBtn.addEventListener('click', async () => {
            await this.performSelectiveReset();
        });
    }
    
    async performSelectiveReset() {
        console.log('[Reset] Starting selective reset...');
        
        try {
            // Get checkboxes
            const keepProgress = document.getElementById('keepProgress')?.checked;
            const keepHighScore = document.getElementById('keepHighScore')?.checked;
            const keepSettings = document.getElementById('keepSettings')?.checked;
            
            // Backup selected data
            const backups = {};
            
            if (keepProgress) {
                backups.gamestate = localStorage.getItem('tb_gamestate');
                console.log('[Reset] Backing up progress');
            }
            
            if (keepHighScore) {
                backups.stats = localStorage.getItem('tb_stats');
                console.log('[Reset] Backing up high scores');
            }
            
            if (keepSettings) {
                backups.settings = localStorage.getItem('tb_settings');
                backups.language = localStorage.getItem('tb_language');
                backups.version = localStorage.getItem('tb_version');
                console.log('[Reset] Backing up settings');
            }
            
            // Clear everything
            localStorage.clear();
            sessionStorage.clear();
            
            // Restore backed up data
            Object.entries(backups).forEach(([key, value]) => {
                if (value !== null) {
                    if (key === 'gamestate') localStorage.setItem('tb_gamestate', value);
                    else if (key === 'stats') localStorage.setItem('tb_stats', value);
                    else if (key === 'settings') localStorage.setItem('tb_settings', value);
                    else if (key === 'language') localStorage.setItem('tb_language', value);
                    else if (key === 'version') localStorage.setItem('tb_version', value);
                }
            });
            
            // Clear Service Workers and caches
            if ('serviceWorker' in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                await Promise.all(registrations.map(reg => reg.unregister()));
            }
            
            if ('caches' in window) {
                const cacheNames = await caches.keys();
                await Promise.all(cacheNames.map(name => caches.delete(name)));
            }
            
            console.log('[Reset] Selective reset completed');
            
            // Close modal
            closeModal('resetModal');
            
            // Show success message
            showToast(t('toastResetDone'), 'success');
            
            // Reload after short delay
            setTimeout(() => {
                location.reload(true);
            }, 800);
            
        } catch (error) {
            console.error('[Reset] Error during selective reset:', error);
            alert('שגיאה באיפוס. אנא נסה שוב.');
        }
    }
}

// Initialize App Reset Manager
let appResetManager;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        appResetManager = new AppResetManager();
    });
} else {
    appResetManager = new AppResetManager();
}
