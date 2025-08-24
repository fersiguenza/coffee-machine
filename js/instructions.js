// Instructions functionality
class InstructionsManager {
    constructor(languageManager) {
        this.languageManager = languageManager;
        this.init();
    }

    init() {
        this.setupDownloadButton();
    }

    setupDownloadButton() {
        const downloadBtn = document.getElementById('download-instructions-btn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadInstructions());
        }
    }

    downloadInstructions() {
        try {
            const currentLang = this.languageManager.getCurrentLanguage();
            const t = (key) => this.languageManager.t(key);
            
            // Create a new window with instructions content
            const instructionsWindow = window.open('', '_blank');
            
            // Generate the HTML content for instructions
            const instructionsHTML = this.generateInstructionsHTML(currentLang, t);
            
            // Write the content and focus the window
            instructionsWindow.document.write(instructionsHTML);
            instructionsWindow.document.close();
            instructionsWindow.focus();
            
        } catch (error) {
            console.error('Error generating instructions download:', error);
            alert('Error generating instructions. Please try again.');
        }
    }

    generateInstructionsHTML(currentLang, t) {
        // Create a helper function to create list items from newline-separated translated text
        const createListItems = (text) => {
            if (!text) return '';
            return text.split('\n').map(line => `<li>${line}</li>`).join('');
        };

        return `
<!DOCTYPE html>
<html lang="${currentLang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t('instructionsTitle')}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
            color: #333;
        }
        h1 { color: #8B4513; border-bottom: 3px solid #D2691E; padding-bottom: 10px; }
        h2 { color: #A0522D; margin-top: 30px; }
        h3 { color: #CD853F; }
        .setup-grid, .card-types-grid, .rules-grid { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 20px; 
            margin: 20px 0; 
        }
        .card-type { 
            background: #f9f9f9; 
            padding: 15px; 
            border-radius: 8px; 
            border-left: 4px solid #D2691E; 
        }
        .rule-item { 
            background: #f0f8ff; 
            padding: 15px; 
            border-radius: 8px; 
            border-left: 4px solid #4682B4; 
        }
        ul { padding-left: 20px; }
        li { margin: 5px 0; }
        @media print {
            body { margin: 0; padding: 15px; font-size: 12px; }
            .card-types-grid, .rules-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <h1>${t('instructionsTitle')}</h1>
    
    <h2>🎯 ${t('objective')}</h2>
    <p>${t('objectiveText')}</p>
    
    <h2>⚙️ ${t('initialSetup')}</h2>
    <div class="setup-grid">
        <div>
            <h3>${t('forFacilitator')}</h3>
            <ul>
                ${createListItems(t('facilitatorInstructions'))}
            </ul>
        </div>
        <div>
            <h3>${t('initialResources')}</h3>
            <ul>
                ${createListItems(t('resourcesList'))}
            </ul>
        </div>
    </div>
    
    <h2>🎴 ${t('cardTypes')}</h2>
    <div class="card-types-grid">
        <div class="card-type">
            <h3>🔵 ${t('orderCardsLong')}</h3>
            <ul>
                ${createListItems(t('orderCardsList'))}
            </ul>
        </div>
        <div class="card-type">
            <h3>🔴 ${t('constraintCardsLong')}</h3>
            <ul>
                ${createListItems(t('constraintCardsList'))}
            </ul>
        </div>
        <div class="card-type">
            <h3>🟡 ${t('taskCardsLong')}</h3>
            <ul>
                ${createListItems(t('taskCardsList'))}
            </ul>
        </div>
        <div class="card-type">
            <h3>🟢 ${t('resourceCardsLong')}</h3>
            <ul>
                ${createListItems(t('resourceCardsList'))}
            </ul>
        </div>
    </div>
    
    <h2>🏆 ${t('scoringSystem')}</h2>
    <div class="setup-grid">
        <div>
            <h3>${t('positivePoints')}</h3>
            <ul>
                ${createListItems(t('positivePointsList'))}
            </ul>
        </div>
        <div>
            <h3>${t('penalties')}</h3>
            <ul>
                ${createListItems(t('penaltiesList'))}
            </ul>
        </div>
    </div>
    
    <h2>⚠️ ${t('importantRules')}</h2>
    <div class="rules-grid">
        <div class="rule-item">
            <h3>${t('timeManagement')}</h3>
            <p>${t('timeManagementText')}</p>
        </div>
        <div class="rule-item">
            <h3>${t('maximumCapacity')}</h3>
            <p>${t('capacityText')}</p>
        </div>
        <div class="rule-item">
            <h3>${t('budgetManagement')}</h3>
            <p>${t('budgetText')}</p>
        </div>
        <div class="rule-item">
            <h3>${t('qualityVsSpeed')}</h3>
            <p>${t('qualityText')}</p>
        </div>
    </div>
    
    <script>
        window.onload = function() {
            setTimeout(() => window.print(), 500);
        };
    </script>
</body>
</html>`;
    }
}

// Export for use in main script
window.InstructionsManager = InstructionsManager;
