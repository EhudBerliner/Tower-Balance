// ════════════════════════════════════════════════════════════════
// PWA INSTALLATION SYSTEM - Advanced
// ════════════════════════════════════════════════════════════════

class PWAInstallManager {
    constructor() {
        this.deferredPrompt = null;
        this.installBanner = document.getElementById('installBanner');
        this.installBtn = document.getElementById('installBtn');
        this.installDismissBtn = document.getElementById('installDismissBtn');
        
        this.init();
    }
    
    init() {
        // Capture the beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('[PWA] beforeinstallprompt event captured');
            e.preventDefault();
            
            // Don't show if user previously dismissed
            if (localStorage.getItem('tb_install_dismissed')) {
                console.log('[PWA] Install previously dismissed');
                return;
            }
            
            // Don't show if already installed
            if (this.isInstalled()) {
                console.log('[PWA] App already installed');
                return;
            }
            
            this.deferredPrompt = e;
            
            // Show install banner after delay
            setTimeout(() => {
                this.showInstallBanner();
            }, 3000);
        });
        
        // Handle install button click
        if (this.installBtn) {
            this.installBtn.addEventListener('click', async () => {
                await this.promptInstall();
            });
        }
        
        // Handle dismiss button click
        if (this.installDismissBtn) {
            this.installDismissBtn.addEventListener('click', () => {
                this.dismissInstallBanner();
            });
        }
        
        // Listen for successful installation
        window.addEventListener('appinstalled', (e) => {
            console.log('[PWA] App installed successfully');
            this.hideInstallBanner();
            this.onInstallSuccess();
        });
        
        // Check if app is already installed
        if (this.isInstalled()) {
            console.log('[PWA] App is running in standalone mode');
        }
    }
    
    isInstalled() {
        // Check if running in standalone mode
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        const isNavigatorStandalone = window.navigator.standalone === true;
        
        return isStandalone || isNavigatorStandalone;
    }
    
    showInstallBanner() {
        if (this.installBanner) {
            this.installBanner.classList.add('show');
            console.log('[PWA] Install banner shown');
        }
    }
    
    hideInstallBanner() {
        if (this.installBanner) {
            this.installBanner.classList.remove('show');
        }
    }
    
    dismissInstallBanner() {
        this.hideInstallBanner();
        localStorage.setItem('tb_install_dismissed', '1');
        localStorage.setItem('tb_install_dismissed_date', Date.now().toString());
        console.log('[PWA] Install banner dismissed');
    }
    
    async promptInstall() {
        if (!this.deferredPrompt) {
            console.log('[PWA] No deferred prompt available');
            return;
        }
        
        // Show the install prompt
        this.deferredPrompt.prompt();
        
        // Wait for the user to respond
        const { outcome } = await this.deferredPrompt.userChoice;
        console.log(`[PWA] User response: ${outcome}`);
        
        if (outcome === 'accepted') {
            this.onInstallAccepted();
        } else {
            this.onInstallDismissed();
        }
        
        // Clear the deferred prompt
        this.deferredPrompt = null;
        this.hideInstallBanner();
    }
    
    onInstallAccepted() {
        console.log('[PWA] User accepted installation');
        showToast(t('toastInstalled'), 'success', 3000);
    }
    
    onInstallDismissed() {
        console.log('[PWA] User dismissed installation');
        localStorage.setItem('tb_install_dismissed', '1');
        localStorage.setItem('tb_install_dismissed_date', Date.now().toString());
    }
    
    onInstallSuccess() {
        showToast(t('toastInstalled'), 'success', 3000);
        
        // Track installation
        if (typeof updateStats === 'function') {
            const stats = loadStats();
            stats.appInstalled = true;
            stats.installDate = Date.now();
            saveStats(stats);
        }
    }
    
    // Allow re-showing install prompt after certain time
    resetDismissal() {
        const dismissedDate = localStorage.getItem('tb_install_dismissed_date');
        if (dismissedDate) {
            const daysSince = (Date.now() - parseInt(dismissedDate)) / (1000 * 60 * 60 * 24);
            
            // Re-show after 30 days
            if (daysSince > 30) {
                localStorage.removeItem('tb_install_dismissed');
                localStorage.removeItem('tb_install_dismissed_date');
                console.log('[PWA] Install dismissal reset after 30 days');
                return true;
            }
        }
        return false;
    }
}

// Initialize PWA Install Manager
let pwaInstallManager;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        pwaInstallManager = new PWAInstallManager();
    });
} else {
    pwaInstallManager = new PWAInstallManager();
}
