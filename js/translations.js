// Translation system for Coffee Machine Workshop
// Uses translations-data.js to avoid CORS issues with local files

const translations = {};
const supportedLanguages = ['en', 'es', 'it', 'fr', 'pt'];

// Initialize translations from the data file
function initializeTranslations() {
    if (typeof translationsData !== 'undefined') {
        Object.assign(translations, translationsData);
    } else {
        console.error('translations-data.js not loaded. Make sure to include it before translations.js');
    }
}

// Language management
let currentLanguage = 'es'; // Default language

function setLanguage(lang) {
    currentLanguage = lang;
    updateAllTexts();
    localStorage.setItem('preferredLanguage', lang);
}

function getCurrentTranslation() {
    return translations[currentLanguage] || translations['en'] || {};
}

function t(key) {
    const translation = getCurrentTranslation();
    return translation[key] || key;
}

function updateAllTexts() {
    // Update header
    const headerTitle = document.querySelector('header h1');
    if (headerTitle) headerTitle.textContent = t('title');
    
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) subtitle.textContent = t('subtitle');
    
    const printInstructions = document.querySelector('.print-instructions p');
    if (printInstructions) printInstructions.innerHTML = t('printInstructions');
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Update section titles when templates are loaded
    setTimeout(() => {
        updateSectionTitles();
        updateCardContent();
        updateInstructionsContent();
    }, 100);
}

function updateNavigationButtons() {
    const navButtons = [
        { id: 'orders-btn', icon: '<i class="fas fa-clipboard-list"></i>', key: 'orders' },
        { id: 'constraints-btn', icon: '<i class="fas fa-exclamation-triangle"></i>', key: 'constraints' },
        { id: 'tasks-btn', icon: '<i class="fas fa-wrench"></i>', key: 'tasks' },
        { id: 'resources-btn', icon: '<i class="fas fa-box"></i>', key: 'resources' },
        { id: 'events-btn', icon: '<i class="fas fa-dice"></i>', key: 'events' },
        { id: 'objectives-btn', icon: '<i class="fas fa-bullseye"></i>', key: 'objectives' },
        { id: 'all-btn', icon: '<i class="fas fa-th"></i>', key: 'allCards' },
        { id: 'budget-btn', icon: '<i class="fas fa-money-bill-wave"></i>', key: 'budget' },
        { id: 'instructions-btn', icon: '<i class="fas fa-book"></i>', key: 'gameInstructions' }
    ];
    
    navButtons.forEach(btn => {
        const element = document.getElementById(btn.id);
        if (element) {
            element.innerHTML = `${btn.icon} ${t(btn.key)}`;
        }
    });
}

function updateSectionTitles() {
    const titleMappings = [
        { selector: '#orders-section h2', key: 'orderCardsTitle' },
        { selector: '#constraints-section h2', key: 'constraintsTitle' },
        { selector: '#tasks-section h2', key: 'tasksTitle' },
        { selector: '#resources-section h2', key: 'resourcesTitle' },
        { selector: '#events-section h2', key: 'eventsTitle' },
        { selector: '#objectives-section h2', key: 'objectivesTitle' },
        { selector: '#budget-section h2', key: 'budgetCardsTitle' },
        { selector: '#instructions-section .instructions-header h2', key: 'instructionsTitle' }
    ];
    
    titleMappings.forEach(mapping => {
        const element = document.querySelector(mapping.selector);
        if (element) {
            element.textContent = t(mapping.key);
        }
    });
}

function updateCardContent() {
    // Update order cards
    updateOrderCards();
    updateBudgetCards();
    updateCommonLabels();
}

function updateOrderCards() {
    // Update order card titles
    document.querySelectorAll('.order-card.simple .card-header h3').forEach(el => {
        el.textContent = t('simpleOrder');
    });
    document.querySelectorAll('.order-card.medium .card-header h3').forEach(el => {
        el.textContent = t('mediumOrder');
    });
    document.querySelectorAll('.order-card.complex .card-header h3').forEach(el => {
        el.textContent = t('complexOrder');
    });
    document.querySelectorAll('.order-card.urgent .card-header h3').forEach(el => {
        el.textContent = t('urgentOrder');
    });
    
    // Update priority levels
    document.querySelectorAll('.priority.low').forEach(el => {
        el.textContent = t('lowPriority');
    });
    document.querySelectorAll('.priority.medium').forEach(el => {
        el.textContent = t('mediumPriority');
    });
    document.querySelectorAll('.priority.high').forEach(el => {
        el.textContent = t('highPriority');
    });
    document.querySelectorAll('.priority.urgent').forEach(el => {
        el.textContent = t('urgentPriority');
    });
}

function updateBudgetCards() {
    // Update budget card titles
    document.querySelectorAll('.budget-card .card-header h3').forEach(el => {
        const text = el.textContent;
        if (text.includes('$50') || text.includes('50')) {
            el.textContent = t('money50');
        } else if (text.includes('$100') || text.includes('100')) {
            el.textContent = t('money100');
        } else if (text.includes('$20') || text.includes('20')) {
            el.textContent = t('money20');
        } else if (text.includes('$5') || text.includes('5')) {
            el.textContent = t('money5');
        } else if (text.includes('$10') || text.includes('10')) {
            el.textContent = t('money10');
        }
    });
    
    // Update budget card footers
    document.querySelectorAll('.budget-card .card-footer small').forEach(el => {
        const text = el.textContent.toLowerCase();
        if (text.includes('basic') || text.includes('básica')) {
            el.textContent = t('basicFunding');
        } else if (text.includes('standard') || text.includes('estándar')) {
            el.textContent = t('standardFunding');
        } else if (text.includes('medium') || text.includes('media')) {
            el.textContent = t('mediumFunding');
        } else if (text.includes('high') || text.includes('alta')) {
            el.textContent = t('highFunding');
        } else if (text.includes('premium')) {
            el.textContent = t('premiumFunding');
        }
    });
}

function updateCommonLabels() {
    // Update common field labels
    document.querySelectorAll('.card-content strong').forEach(el => {
        const text = el.textContent.trim();
        if (text.includes('Tiempo límite:') || text.includes('Time limit:')) {
            el.textContent = t('timeLimit');
        } else if (text.includes('Cliente:') || text.includes('Client:')) {
            el.textContent = t('client');
        } else if (text.includes('Puntos:') || text.includes('Points:')) {
            el.textContent = t('points');
        } else if (text.includes('Valor:') || text.includes('Value:')) {
            el.textContent = t('budgetValue');
        }
    });
    
    // Update budget card use text
    document.querySelectorAll('.budget-card .card-content p').forEach(el => {
        if (el.textContent.includes('Can be used') || el.textContent.includes('Se puede usar')) {
            el.innerHTML = el.innerHTML.replace(
                /(Can be used to purchase resources|Se puede usar para comprar recursos)/, 
                t('budgetNote')
            );
        }
    });
}

function updateInstructionsContent() {
    const instructionsSection = document.querySelector('#instructions-section');
    if (!instructionsSection) return;
    
    // Update download button
    const downloadBtn = instructionsSection.querySelector('#download-instructions-btn');
    if (downloadBtn) {
        downloadBtn.innerHTML = `<i class="fas fa-download"></i> ${t('downloadInstructions')}`;
    }
    
    // Update objective section
    const objectiveTitle = instructionsSection.querySelector('.instruction-block h3');
    if (objectiveTitle && objectiveTitle.textContent.includes('Objective')) {
        objectiveTitle.innerHTML = `<i class="fas fa-bullseye"></i> ${t('objective')}`;
    }
    
    const objectiveText = instructionsSection.querySelector('.instruction-block p');
    if (objectiveText) {
        objectiveText.textContent = t('objectiveText');
    }
}

// Initialize language from localStorage or browser preference
function initializeLanguage() {
    // First initialize translations from data file
    initializeTranslations();
    
    const savedLanguage = localStorage.getItem('preferredLanguage');
    const browserLanguage = navigator.language.substring(0, 2);
    
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
    } else if (translations[browserLanguage]) {
        currentLanguage = browserLanguage;
    } else {
        currentLanguage = 'es'; // Default to Spanish
    }
    
    // Set the language selector value
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = currentLanguage;
    }
    
    updateAllTexts();
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        initializeTranslations,
        setLanguage, 
        t, 
        getCurrentTranslation, 
        initializeLanguage, 
        updateAllTexts 
    };
}
