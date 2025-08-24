// Enhanced Language Manager that uses the consolidated translations system
// This file now extends the functionality from translations.js
class LanguageManager {
    constructor() {
        this.init();
    }

    init() {
        // First initialize translations
        if (typeof initializeTranslations === 'function') {
            initializeTranslations();
        }
        
        // Then setup the language selector
        this.setupLanguageSelector();
        
        // Load saved language preference from localStorage
        this.loadSavedLanguage();
    }
    
    loadSavedLanguage() {
        const savedLanguage = localStorage.getItem('preferredLanguage');
        if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
            this.changeLanguage(savedLanguage);
            
            // Update the selector to match the saved language
            const languageSelect = document.getElementById('languageSelect');
            if (languageSelect) {
                languageSelect.value = savedLanguage;
            }
        } else {
            // Apply default language translations
            if (typeof updateAllTexts === 'function') {
                setTimeout(updateAllTexts, 100);
            }
        }
    }

    setupLanguageSelector() {
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            // Add all available languages to the selector if not already present
            this.populateLanguageSelector(languageSelect);
            
            languageSelect.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
        }
    }
    
    changeLanguage(lang) {
        if (typeof setLanguage === 'function') {
            setLanguage(lang);
        }
    }

    populateLanguageSelector(selector) {
        // Clear existing options
        selector.innerHTML = '';
        
        // Add options for all available languages
        const languages = [
            { code: 'es', name: 'Español' },
            { code: 'en', name: 'English' },
            { code: 'it', name: 'Italiano' },
            { code: 'fr', name: 'Français' },
            { code: 'pt', name: 'Português' }
        ];
        
        languages.forEach(lang => {
            const option = document.createElement('option');
            option.value = lang.code;
            option.textContent = lang.name;
            selector.appendChild(option);
        });
    }

    changeLanguage(lang) {
        // Use the global setLanguage function from translations.js
        if (typeof setLanguage === 'function') {
            setLanguage(lang);
        }
    }

    // Delegate to global translation functions
    t(key) {
        return typeof t === 'function' ? t(key) : key;
    }

    getCurrentLanguage() {
        return currentLanguage || 'es';
    }

}

// Export for use in main script
window.LanguageManager = LanguageManager;
