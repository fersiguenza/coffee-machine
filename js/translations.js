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
    updateBeansCards();
    updateConstraintCards();
    updateTaskCards();
    updateResourceCards();
    updateObjectiveCards();
    updateEventCards();
    updateCommonLabels();
    // Client labels are handled within updateCommonLabels
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

function updateBeansCards() {
    // Update beans card titles
    document.querySelectorAll('.basic-beans-title').forEach(el => {
        el.textContent = t('basicBeans');
    });
    document.querySelectorAll('.medium-beans-title').forEach(el => {
        el.textContent = t('mediumBeans');
    });
    document.querySelectorAll('.premium-beans-title').forEach(el => {
        el.textContent = t('premiumBeans');
    });
    document.querySelectorAll('.bulk-beans-title').forEach(el => {
        el.textContent = t('bulkBeans');
    });
    
    // Update bean types
    document.querySelectorAll('.bean-type-basic').forEach(el => {
        el.textContent = t('basicType');
    });
    document.querySelectorAll('.bean-type-medium').forEach(el => {
        el.textContent = t('mediumType');
    });
    document.querySelectorAll('.bean-type-premium').forEach(el => {
        el.textContent = t('premiumType');
    });
    document.querySelectorAll('.bean-type-bulk').forEach(el => {
        el.textContent = t('bulkType');
    });
    
    // Update beans card details
    document.querySelectorAll('.beans-text').forEach(el => {
        el.textContent = t('beansText');
    });
    document.querySelectorAll('.yield-label').forEach(el => {
        el.textContent = t('yield') + ':';
    });
    document.querySelectorAll('.full-coffees-text').forEach(el => {
        el.textContent = t('fullCoffees');
    });
    document.querySelectorAll('.quality-label').forEach(el => {
        el.textContent = t('quality') + ':';
    });
    document.querySelectorAll('.quality-standard').forEach(el => {
        el.textContent = t('standardQuality');
    });
    document.querySelectorAll('.quality-high').forEach(el => {
        el.textContent = t('highQuality');
    });
    document.querySelectorAll('.usage-time-label').forEach(el => {
        el.textContent = t('usageTime') + ':';
    });
    document.querySelectorAll('.seconds-per-coffee').forEach(el => {
        el.textContent = t('secondsPerCoffee');
    });
    
    // Update beans card footers
    document.querySelectorAll('.basic-resource-text').forEach(el => {
        el.textContent = t('basicResourceText');
    });
    document.querySelectorAll('.medium-resource-text').forEach(el => {
        el.textContent = t('mediumResourceText');
    });
    document.querySelectorAll('.premium-resource-text').forEach(el => {
        el.textContent = t('premiumResourceText');
    });
    document.querySelectorAll('.bulk-resource-text').forEach(el => {
        el.textContent = t('bulkResourceText');
    });
}

function updateConstraintCards() {
    // Update constraint card titles
    document.querySelectorAll('.minor-breakdown-title').forEach(el => {
        el.textContent = t('minorBreakdown');
    });
    
    // Update effect types
    document.querySelectorAll('.negative-effect-text').forEach(el => {
        el.textContent = t('negativeEffect');
    });
    
    // Update constraint card details
    document.querySelectorAll('.extra-cost-text').forEach(el => {
        el.textContent = t('extraCost');
    });
    document.querySelectorAll('.effect-label').forEach(el => {
        el.textContent = t('effect') + ':';
    });
    document.querySelectorAll('.production-reduced').forEach(el => {
        el.textContent = t('productionReduced');
    });
    document.querySelectorAll('.cause-label').forEach(el => {
        el.textContent = t('cause') + ':';
    });
    document.querySelectorAll('.machine-overload').forEach(el => {
        el.textContent = t('machineOverload');
    });
    
    // Update repair text
    document.querySelectorAll('.repair-maintenance-text').forEach(el => {
        el.textContent = t('repairMaintenance');
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
    
    // Update classes with specific labels
    document.querySelectorAll('.bean-cost-text').forEach(el => {
        el.textContent = t('beanCost') + ': ';
    });
    
    document.querySelectorAll('.beans-required-label').forEach(el => {
        el.textContent = t('beansRequired') + ': ';
    });
    
    document.querySelectorAll('.time-limit-label').forEach(el => {
        el.textContent = t('timeLimit') + ': ';
    });
    
    document.querySelectorAll('.client-label').forEach(el => {
        el.textContent = t('client') + ': ';
    });
    
    document.querySelectorAll('.points-label').forEach(el => {
        el.textContent = t('points') + ': ';
    });
    
    document.querySelectorAll('.beans-per-coffee-text').forEach(el => {
        el.textContent = '(' + t('beansPerCoffee') + ')';
    });
    
    document.querySelectorAll('.minutes-text').forEach(el => {
        el.textContent = t('minutes');
    });
    
    document.querySelectorAll('.client-office-a').forEach(el => {
        el.textContent = t('officeA');
    });
    
    document.querySelectorAll('.client-office-b').forEach(el => {
        el.textContent = t('officeB');
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

function updateTaskCards() {
    // Update task card titles
    document.querySelectorAll('.machine-cleaning-title').forEach(el => {
        el.textContent = t('machineCleaningTitle');
    });
    document.querySelectorAll('.training-title').forEach(el => {
        el.textContent = t('trainingTitle');
    });
    document.querySelectorAll('.technical-inspection-title').forEach(el => {
        el.textContent = t('technicalInspectionTitle');
    });
    document.querySelectorAll('.configuration-title').forEach(el => {
        el.textContent = t('configurationTitle');
    });
    document.querySelectorAll('.inventory-title').forEach(el => {
        el.textContent = t('inventoryTitle');
    });
    document.querySelectorAll('.efficiency-mastery-title').forEach(el => {
        el.textContent = t('efficiencyMasteryTitle');
    });
    
    // Update task card details
    document.querySelectorAll('.benefit-label').forEach(el => {
        el.textContent = t('benefit') + ':';
    });
    document.querySelectorAll('.recommended-frequency-label').forEach(el => {
        el.textContent = t('recommendedFrequency');
    });
    document.querySelectorAll('.additional-effect-label').forEach(el => {
        el.textContent = t('additionalEffect');
    });
    document.querySelectorAll('.effect-duration-label').forEach(el => {
        el.textContent = t('duration') + ':';
    });
    document.querySelectorAll('.duration-label').forEach(el => {
        el.textContent = t('duration') + ':';
    });
    
    // Update task card content
    document.querySelectorAll('.prevents-minor-breakdowns').forEach(el => {
        el.textContent = t('preventsCrash');
    });
    document.querySelectorAll('.every-5-orders').forEach(el => {
        el.textContent = t('every5orders');
    });
    document.querySelectorAll('.reduces-order-time').forEach(el => {
        el.textContent = t('reducesOrderTime');
    });
    document.querySelectorAll('.rest-of-game').forEach(el => {
        el.textContent = t('restOfGame');
    });
    document.querySelectorAll('.detects-problems').forEach(el => {
        el.textContent = t('detectsProblems');
    });
    document.querySelectorAll('.prevents-major-breakdown').forEach(el => {
        el.textContent = t('preventsMajorBreakdown');
    });
    document.querySelectorAll('.optimizes-performance').forEach(el => {
        el.textContent = t('optimizesPerformance');
    });
    document.querySelectorAll('.speed-increase').forEach(el => {
        el.textContent = t('speedIncrease');
    });
    document.querySelectorAll('.get-free-beans').forEach(el => {
        el.textContent = t('getFreeBeansText');
    });
    document.querySelectorAll('.know-real-stock').forEach(el => {
        el.textContent = t('knowRealStock');
    });
    document.querySelectorAll('.max-capacity-increase').forEach(el => {
        el.textContent = t('maxCapacityIncrease');
    });
    document.querySelectorAll('.permanent-text').forEach(el => {
        el.textContent = t('permanentText');
    });
    
    // Update task card footers
    document.querySelectorAll('.preventive-task-text').forEach(el => {
        el.textContent = t('preventiveTask');
    });
    document.querySelectorAll('.long-term-investment-text').forEach(el => {
        el.textContent = t('longTermInvestment');
    });
    document.querySelectorAll('.preventive-maintenance-text').forEach(el => {
        el.textContent = t('preventiveMaintenance');
    });
    document.querySelectorAll('.system-optimization-text').forEach(el => {
        el.textContent = t('systemOptimization');
    });
    document.querySelectorAll('.resource-control-text').forEach(el => {
        el.textContent = t('resourceControl');
    });
    document.querySelectorAll('.permanent-improvement-text').forEach(el => {
        el.textContent = t('permanentImprovement');
    });
}

function updateResourceCards() {
    // Update resource card titles
    document.querySelectorAll('.coffee-beans-supply-title').forEach(el => {
        el.textContent = t('coffeeBeansSupplyTitle');
    });
    document.querySelectorAll('.technical-support-title').forEach(el => {
        el.textContent = t('technicalSupportTitle');
    });
    document.querySelectorAll('.extra-machine-title').forEach(el => {
        el.textContent = t('extraMachineTitle');
    });
    document.querySelectorAll('.additional-staff-title').forEach(el => {
        el.textContent = t('additionalStaffTitle');
    });
    document.querySelectorAll('.provider-change-title').forEach(el => {
        el.textContent = t('providerChangeTitle');
    });
    document.querySelectorAll('.machine-upgrade-title').forEach(el => {
        el.textContent = t('machineUpgradeTitle');
    });
    document.querySelectorAll('.time-out-title').forEach(el => {
        el.textContent = t('timeOutTitle');
    });
    document.querySelectorAll('.premium-beans-resource-title').forEach(el => {
        el.textContent = t('premiumBeansResourceTitle');
    });
    
    // Update resource types
    document.querySelectorAll('.resource-type.basic-type').forEach(el => {
        el.textContent = t('basicType');
    });
    document.querySelectorAll('.resource-type.service-type').forEach(el => {
        el.textContent = t('serviceType');
    });
    document.querySelectorAll('.resource-type.equipment-type').forEach(el => {
        el.textContent = t('equipmentType');
    });
    document.querySelectorAll('.resource-type.personnel-type').forEach(el => {
        el.textContent = t('personnelType');
    });
    document.querySelectorAll('.resource-type.upgrade-type').forEach(el => {
        el.textContent = t('upgradeType');
    });
    document.querySelectorAll('.resource-type.recovery-type').forEach(el => {
        el.textContent = t('recoveryType');
    });
    document.querySelectorAll('.resource-type.premium-type').forEach(el => {
        el.textContent = t('premiumType');
    });
    
    // Update resource card labels
    document.querySelectorAll('.quantity-label').forEach(el => {
        el.textContent = t('quantity');
    });
    document.querySelectorAll('.wait-time-label').forEach(el => {
        el.textContent = t('waitTime');
    });
    document.querySelectorAll('.arrival-time-label').forEach(el => {
        el.textContent = t('arrivalTime');
    });
    document.querySelectorAll('.setup-time-label').forEach(el => {
        el.textContent = t('setupTime');
    });
    document.querySelectorAll('.installation-label').forEach(el => {
        el.textContent = t('installation');
    });
    
    // Update resource card content
    document.querySelectorAll('.beans-quantity').forEach(el => {
        el.textContent = t('beansQuantity');
    });
    document.querySelectorAll('.premium-beans-quantity').forEach(el => {
        el.textContent = t('premiumBeansQuantity');
    });
    document.querySelectorAll('.repairs-breakdown-text').forEach(el => {
        el.textContent = t('repairsBreakdown');
    });
    document.querySelectorAll('.capacity-increase').forEach(el => {
        el.textContent = t('capacityIncrease');
    });
    document.querySelectorAll('.reduce-task-times').forEach(el => {
        el.textContent = t('reduceTaskTimes');
    });
    document.querySelectorAll('.better-beans-text').forEach(el => {
        el.textContent = t('betterBeans');
    });
    document.querySelectorAll('.faster-processing-text').forEach(el => {
        el.textContent = t('fasterProcessing');
    });
    document.querySelectorAll('.removes-burnout-text').forEach(el => {
        el.textContent = t('removesBurnout');
    });
    document.querySelectorAll('.bonus-point-text').forEach(el => {
        el.textContent = t('bonusPoint');
    });
    document.querySelectorAll('.rounds-value').forEach(el => {
        el.textContent = '2 ' + t('rounds');
    });
    
    // Update resource card footers
    document.querySelectorAll('.must-order-advance-text').forEach(el => {
        el.textContent = t('mustOrderAdvance');
    });
    document.querySelectorAll('.professional-service-text').forEach(el => {
        el.textContent = t('professionalService');
    });
    document.querySelectorAll('.temporary-capacity-text').forEach(el => {
        el.textContent = t('temporaryCapacity');
    });
    document.querySelectorAll('.temporary-help-text').forEach(el => {
        el.textContent = t('temporaryHelp');
    });
    document.querySelectorAll('.quality-improvement-text').forEach(el => {
        el.textContent = t('qualityImprovement');
    });
    document.querySelectorAll('.team-recovery-text').forEach(el => {
        el.textContent = t('teamRecovery');
    });
    document.querySelectorAll('.quality-over-quantity-text').forEach(el => {
        el.textContent = t('qualityOverQuantity');
    });
}

function updateEventCards() {
    // Update event card titles
    document.querySelectorAll('.special-promotion-title').forEach(el => {
        el.textContent = t('specialPromotionTitle');
    });
    document.querySelectorAll('.extra-time-title').forEach(el => {
        el.textContent = t('extraTimeTitle');
    });
    document.querySelectorAll('.free-machine-title').forEach(el => {
        el.textContent = t('freeMachineTitle');
    });
    document.querySelectorAll('.free-premium-beans-title').forEach(el => {
        el.textContent = t('freePremiumBeansTitle');
    });
    document.querySelectorAll('.temporary-staff-title').forEach(el => {
        el.textContent = t('temporaryStaffTitle');
    });
    document.querySelectorAll('.shift-change-title').forEach(el => {
        el.textContent = t('shiftChangeTitle');
    });
    document.querySelectorAll('.inspection-visit-title').forEach(el => {
        el.textContent = t('inspectionVisitTitle');
    });
    document.querySelectorAll('.urgent-cleaning-title').forEach(el => {
        el.textContent = t('urgentCleaningTitle');
    });
    document.querySelectorAll('.power-outage-title').forEach(el => {
        el.textContent = t('powerOutageTitle');
    });
    document.querySelectorAll('.defective-beans-title').forEach(el => {
        el.textContent = t('defectiveBeansTitle');
    });
    document.querySelectorAll('.slow-beans-title').forEach(el => {
        el.textContent = t('slowBeansTitle');
    });
    document.querySelectorAll('.missing-inventory-title').forEach(el => {
        el.textContent = t('missingInventoryTitle');
    });
    document.querySelectorAll('.corporate-meeting-title').forEach(el => {
        el.textContent = t('corporateMeetingTitle');
    });
    document.querySelectorAll('.major-breakdown-title').forEach(el => {
        el.textContent = t('majorBreakdownTitle');
    });
    document.querySelectorAll('.perfect-storm-title').forEach(el => {
        el.textContent = t('perfectStormTitle');
    });
    
    // Update event types
    document.querySelectorAll('.good-news-text').forEach(el => {
        el.textContent = t('goodNewsType');
    });
    document.querySelectorAll('.neutral-event-text').forEach(el => {
        el.textContent = t('neutralType');
    });
    document.querySelectorAll('.bad-news-text').forEach(el => {
        el.textContent = t('badNewsType');
    });
    document.querySelectorAll('.challenge-text').forEach(el => {
        el.textContent = t('challengeType');
    });
    document.querySelectorAll('.crisis-text').forEach(el => {
        el.textContent = t('crisisType');
    });
    document.querySelectorAll('.mandatory-text').forEach(el => {
        el.textContent = t('mandatoryType');
    });
    document.querySelectorAll('.catastrophe-text').forEach(el => {
        el.textContent = t('catastropheType');
    });
    
    // Update event card labels
    document.querySelectorAll('.condition-label').forEach(el => {
        el.textContent = t('condition');
    });
    document.querySelectorAll('.prevention-label').forEach(el => {
        el.textContent = t('prevention');
    });
    document.querySelectorAll('.impact-label').forEach(el => {
        el.textContent = t('impact');
    });
    document.querySelectorAll('.solution-label').forEach(el => {
        el.textContent = t('solution');
    });
    document.querySelectorAll('.reality-label').forEach(el => {
        el.textContent = t('reality');
    });
    document.querySelectorAll('.effect-label').forEach(el => {
        el.textContent = t('effect') + ':';
    });
    
    // Update event card content
    document.querySelectorAll('.double-points-text').forEach(el => {
        el.textContent = t('doublePoints');
    });
    document.querySelectorAll('.no-breakdowns-text').forEach(el => {
        el.textContent = t('noBreakdowns');
    });
    document.querySelectorAll('.extra-minutes-text').forEach(el => {
        el.textContent = t('extraMinutes');
    });
    document.querySelectorAll('.once-per-game-text').forEach(el => {
        el.textContent = t('oncePerGame');
    });
    document.querySelectorAll('.free-machine-rounds-text').forEach(el => {
        el.textContent = t('freeMachineRounds');
    });
    document.querySelectorAll('.processing-capacity-text').forEach(el => {
        el.textContent = t('processingCapacity');
    });
    document.querySelectorAll('.premium-beans-points-text').forEach(el => {
        el.textContent = t('premiumBeansPoints');
    });
    document.querySelectorAll('.quality-improvement-text').forEach(el => {
        el.textContent = t('qualityImprovementNoCost');
    });
    document.querySelectorAll('.free-help-text').forEach(el => {
        el.textContent = t('freeHelp');
    });
    document.querySelectorAll('.must-train-text').forEach(el => {
        el.textContent = t('mustTrain');
    });
    document.querySelectorAll('.mandatory-pause-text').forEach(el => {
        el.textContent = t('mandatoryPause');
    });
    document.querySelectorAll('.breakdown-penalty-text').forEach(el => {
        el.textContent = t('breakdownPenalty');
    });
    document.querySelectorAll('.working-machines-text').forEach(el => {
        el.textContent = t('workingMachines');
    });
    document.querySelectorAll('.cleaning-task-text').forEach(el => {
        el.textContent = t('cleaningTask');
    });
    document.querySelectorAll('.non-compliance-text').forEach(el => {
        el.textContent = t('nonCompliance');
    });
    document.querySelectorAll('.no-processing-text').forEach(el => {
        el.textContent = t('noProcessing');
    });
    document.querySelectorAll('.urgent-fail-text').forEach(el => {
        el.textContent = t('urgentFail');
    });
    document.querySelectorAll('.next-orders-penalty-text').forEach(el => {
        el.textContent = t('nextOrdersPenalty');
    });
    document.querySelectorAll('.buy-new-beans-text').forEach(el => {
        el.textContent = t('buyNewBeans');
    });
    document.querySelectorAll('.extra-minute-text').forEach(el => {
        el.textContent = t('extraMinute');
    });
    document.querySelectorAll('.end-of-round-text').forEach(el => {
        el.textContent = t('endOfRound');
    });
    document.querySelectorAll('.minus-beans-text').forEach(el => {
        el.textContent = t('minusBeans');
    });
    document.querySelectorAll('.inventory-error-text').forEach(el => {
        el.textContent = t('inventoryError');
    });
    document.querySelectorAll('.lost-time-text').forEach(el => {
        el.textContent = t('lostTime');
    });
    document.querySelectorAll('.cant-reject-text').forEach(el => {
        el.textContent = t('cantReject');
    });
    document.querySelectorAll('.reduced-capacity-text').forEach(el => {
        el.textContent = t('reducedCapacity');
    });
    document.querySelectorAll('.technical-support-text').forEach(el => {
        el.textContent = t('technicalSupportRequired');
    });
    document.querySelectorAll('.activate-constraints-text').forEach(el => {
        el.textContent = t('activateConstraints');
    });
    document.querySelectorAll('.rest-of-game-text').forEach(el => {
        el.textContent = t('restOfGame');
    });
    
    // Update event card footers
    document.querySelectorAll('.golden-opportunity-text').forEach(el => {
        el.textContent = t('goldenOpportunity');
    });
    document.querySelectorAll('.needed-break-text').forEach(el => {
        el.textContent = t('neededBreak');
    });
    document.querySelectorAll('.manufacturer-gift-text').forEach(el => {
        el.textContent = t('manufacturerGift');
    });
    document.querySelectorAll('.supplier-sample-text').forEach(el => {
        el.textContent = t('supplierSample');
    });
    document.querySelectorAll('.trainee-text').forEach(el => {
        el.textContent = t('trainee');
    });
    document.querySelectorAll('.company-policy-text').forEach(el => {
        el.textContent = t('companyPolicy');
    });
    document.querySelectorAll('.keep-order-text').forEach(el => {
        el.textContent = t('keepOrder');
    });
    document.querySelectorAll('.mandatory-compliance-text').forEach(el => {
        el.textContent = t('mandatoryCompliance');
    });
    document.querySelectorAll('.force-majeure-text').forEach(el => {
        el.textContent = t('forceMajeure');
    });
    document.querySelectorAll('.quality-issue-text').forEach(el => {
        el.textContent = t('qualityIssue');
    });
    document.querySelectorAll('.defective-batch-text').forEach(el => {
        el.textContent = t('defectiveBatch');
    });
    document.querySelectorAll('.administrative-error-text').forEach(el => {
        el.textContent = t('administrativeError');
    });
    document.querySelectorAll('.corporate-priorities-text').forEach(el => {
        el.textContent = t('corporatePriorities');
    });
    document.querySelectorAll('.immediate-repair-text').forEach(el => {
        el.textContent = t('immediateRepair');
    });
    document.querySelectorAll('.everything-wrong-text').forEach(el => {
        el.textContent = t('everythingWrong');
    });
}

function updateObjectiveCards() {
    // Update objective card titles
    document.querySelectorAll('.customer-satisfaction-title').forEach(el => {
        el.textContent = t('customerSatisfactionTitle');
    });
    document.querySelectorAll('.quality-first-title').forEach(el => {
        el.textContent = t('qualityFirstTitle');
    });
    document.querySelectorAll('.efficiency-master-title').forEach(el => {
        el.textContent = t('efficiencyMasterObjTitle');
    });
    document.querySelectorAll('.speed-runner-title').forEach(el => {
        el.textContent = t('speedRunnerTitle');
    });
    document.querySelectorAll('.storm-survivor-title').forEach(el => {
        el.textContent = t('stormSurvivorTitle');
    });
    document.querySelectorAll('.vip-treatment-title').forEach(el => {
        el.textContent = t('vipTreatmentTitle');
    });
    document.querySelectorAll('.corporate-meeting-title').forEach(el => {
        el.textContent = t('corporateMeetingObjTitle');
    });
    document.querySelectorAll('.zero-waste-title').forEach(el => {
        el.textContent = t('zeroWasteTitle');
    });
    document.querySelectorAll('.burnout-prevention-title').forEach(el => {
        el.textContent = t('burnoutPreventionTitle');
    });
    document.querySelectorAll('.mission-impossible-title').forEach(el => {
        el.textContent = t('missionImpossibleTitle');
    });
    document.querySelectorAll('.please-everyone-title').forEach(el => {
        el.textContent = t('pleaseEveryoneTitle');
    });
    document.querySelectorAll('.perfect-storm-title').forEach(el => {
        el.textContent = t('perfectStormObjTitle');
    });
    
    // Update difficulty labels
    document.querySelectorAll('.difficulty-easy-text').forEach(el => {
        el.textContent = t('difficultyEasy');
    });
    document.querySelectorAll('.difficulty-medium-text').forEach(el => {
        el.textContent = t('difficultyMedium');
    });
    document.querySelectorAll('.difficulty-hard-text').forEach(el => {
        el.textContent = t('difficultyHard');
    });
    document.querySelectorAll('.difficulty-impossible-text').forEach(el => {
        el.textContent = t('difficultyImpossible');
    });
    
    // Update objective card labels
    document.querySelectorAll('.target-label').forEach(el => {
        el.textContent = t('target');
    });
    document.querySelectorAll('.reward-label').forEach(el => {
        el.textContent = t('reward');
    });
    document.querySelectorAll('.strategy-label').forEach(el => {
        el.textContent = t('strategy');
    });
    document.querySelectorAll('.lesson-label').forEach(el => {
        el.textContent = t('lesson');
    });
    document.querySelectorAll('.reality-check-label').forEach(el => {
        el.textContent = t('realityCheck');
    });
    
    // Update objective card targets
    document.querySelectorAll('.complete-orders-no-delays').forEach(el => {
        el.textContent = t('completeNoDelays');
    });
    document.querySelectorAll('.complete-maintenance-tasks').forEach(el => {
        el.textContent = t('completeMaintenanceTasks');
    });
    document.querySelectorAll('.complete-orders-no-extras').forEach(el => {
        el.textContent = t('completeNoExtras');
    });
    document.querySelectorAll('.complete-orders-time-limit').forEach(el => {
        el.textContent = t('completeTimeLimit');
    });
    document.querySelectorAll('.complete-with-constraints').forEach(el => {
        el.textContent = t('completeWithConstraints');
    });
    document.querySelectorAll('.complete-urgent-orders').forEach(el => {
        el.textContent = t('completeUrgentOrders');
    });
    document.querySelectorAll('.complete-massive-orders').forEach(el => {
        el.textContent = t('completeMassiveOrders');
    });
    document.querySelectorAll('.end-zero-beans').forEach(el => {
        el.textContent = t('endZeroBeans');
    });
    document.querySelectorAll('.no-rest-breaks').forEach(el => {
        el.textContent = t('noRestBreaks');
    });
    document.querySelectorAll('.too-many-orders').forEach(el => {
        el.textContent = t('tooManyOrders');
    });
    document.querySelectorAll('.complete-all-orders').forEach(el => {
        el.textContent = t('completeAllOrders');
    });
    document.querySelectorAll('.maintain-quality').forEach(el => {
        el.textContent = t('maintainQuality');
    });
    
    // Update objective card details
    document.querySelectorAll('.bonus-points').forEach(el => {
        const text = el.textContent;
        // Keep the original number, just translate the text
        const match = text.match(/\+(\d+)/);
        if (match) {
            el.textContent = '+' + match[1] + ' ' + t('bonusPoints').replace(/\+\d+/, '');
        }
    });
    document.querySelectorAll('.focus-simple-orders').forEach(el => {
        el.textContent = t('focusSimpleOrders');
    });
    document.querySelectorAll('.prioritize-maintenance').forEach(el => {
        el.textContent = t('prioritizeMaintenance');
    });
    document.querySelectorAll('.manage-resources').forEach(el => {
        el.textContent = t('manageResources');
    });
    document.querySelectorAll('.focus-simple-medium').forEach(el => {
        el.textContent = t('focusSimpleMedium');
    });
    document.querySelectorAll('.adapt-quickly').forEach(el => {
        el.textContent = t('adaptQuickly');
    });
    document.querySelectorAll('.save-resources').forEach(el => {
        el.textContent = t('saveResources');
    });
    document.querySelectorAll('.plan-resources').forEach(el => {
        el.textContent = t('planResources');
    });
    document.querySelectorAll('.precise-calculation').forEach(el => {
        el.textContent = t('preciseCalculation');
    });
    document.querySelectorAll('.sustainable-pace').forEach(el => {
        el.textContent = t('sustainablePace');
    });
    document.querySelectorAll('.learn-no').forEach(el => {
        el.textContent = t('learnNo');
    });
    document.querySelectorAll('.math-truth').forEach(el => {
        el.textContent = t('mathTruth');
    });
    document.querySelectorAll('.cant-please-all').forEach(el => {
        el.textContent = t('cantPleaseAll');
    });
    document.querySelectorAll('.prioritization').forEach(el => {
        el.textContent = t('prioritization');
    });
    document.querySelectorAll('.unwinnable').forEach(el => {
        el.textContent = t('unwinnable');
    });
    document.querySelectorAll('.cut-losses').forEach(el => {
        el.textContent = t('cutLosses');
    });
    
    // Update objective card footers
    document.querySelectorAll('.good-for-beginners-text').forEach(el => {
        el.textContent = t('goodForBeginners');
    });
    document.querySelectorAll('.prevention-better-text').forEach(el => {
        el.textContent = t('preventionBetter');
    });
    document.querySelectorAll('.resource-management-text').forEach(el => {
        el.textContent = t('resourceManagement');
    });
    document.querySelectorAll('.time-management-text').forEach(el => {
        el.textContent = t('timeManagement');
    });
    document.querySelectorAll('.crisis-management-text').forEach(el => {
        el.textContent = t('crisisManagement');
    });
    document.querySelectorAll('.high-pressure-text').forEach(el => {
        el.textContent = t('highPressure');
    });
    document.querySelectorAll('.big-client-text').forEach(el => {
        el.textContent = t('bigClient');
    });
    document.querySelectorAll('.precision-planning-text').forEach(el => {
        el.textContent = t('precisionPlanning');
    });
    document.querySelectorAll('.work-life-balance-text').forEach(el => {
        el.textContent = t('workLifeBalance');
    });
    document.querySelectorAll('.designed-fail-text').forEach(el => {
        el.textContent = t('designedFail');
    });
    document.querySelectorAll('.art-of-no-text').forEach(el => {
        el.textContent = t('artOfNo');
    });
    document.querySelectorAll('.damage-control-text').forEach(el => {
        el.textContent = t('damageControl');
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
