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
        return `
<!DOCTYPE html>
<html lang="${currentLang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t('instructionsTitle') || 'Game Instructions'}</title>
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
    <h1>${t('instructionsTitle') || 'Game Instructions - Coffee Machine Workshop'}</h1>
    
    <h2>🎯 ${t('objective') || 'Objective'}</h2>
    <p>${t('objectiveText') || 'Manage a coffee machine to complete the maximum number of orders within the time limit, while maintaining quality and avoiding team burnout.'}</p>
    
    <h2>⚙️ ${t('initialSetup') || 'Initial Setup'}</h2>
    <div class="setup-grid">
        <div>
            <h3>${t('forFacilitator') || 'For the Facilitator:'}</h3>
            <ul>
                <li>Divide participants into teams of 3-5 people</li>
                <li>Prepare card decks (print cards from this system)</li>
                <li>Assign each team: work table, card organization space, scoring materials</li>
            </ul>
        </div>
        <div>
            <h3>${t('initialResources') || 'Initial Resources per Team:'}</h3>
            <ul>
                <li><strong>50 coffee beans</strong> (represented by tokens or noted on paper)</li>
                <li><strong>$100 initial budget</strong> (virtual money to buy resources)</li>
                <li><strong>Maximum capacity:</strong> 3 simultaneous orders in process</li>
                <li><strong>Initial time:</strong> Each round lasts 10-15 minutes</li>
            </ul>
        </div>
    </div>
    
    <h2>🎴 ${t('cardTypes') || 'Card Types'}</h2>
    <div class="card-types-grid">
        <div class="card-type">
            <h3>🔵 ORDER CARDS (Blue)</h3>
            <ul>
                <li><strong>Simple:</strong> 1-2 coffees | 5 beans | 2 min | +1 point</li>
                <li><strong>Medium:</strong> 3-5 coffees | 8 beans | 4 min | +2 points</li>
                <li><strong>Complex:</strong> 6-10 coffees | 15 beans | 6 min | +3 points</li>
                <li><strong>Urgent:</strong> Variable | Reduced time | +4 points | Penalty if not completed</li>
            </ul>
        </div>
        <div class="card-type">
            <h3>🔴 CONSTRAINT CARDS (Red)</h3>
            <ul>
                <li><strong>Minor Breakdown:</strong> Reduces speed for 1 round</li>
                <li><strong>Major Breakdown:</strong> Cannot process orders for 2 turns</li>
                <li><strong>Resource Shortage:</strong> Only 30 beans available this round</li>
                <li><strong>Burnout:</strong> After 6 consecutive orders, 50% efficiency</li>
            </ul>
        </div>
        <div class="card-type">
            <h3>🟡 TASK CARDS (Yellow)</h3>
            <ul>
                <li><strong>Maintenance:</strong> Takes 1 turn, prevents breakdowns</li>
                <li><strong>Inventory:</strong> Takes 30 minutes, +20 coffee beans</li>
                <li><strong>Training:</strong> Takes 1 round, +25% efficiency next round</li>
            </ul>
        </div>
        <div class="card-type">
            <h3>🟢 RESOURCE CARDS (Green)</h3>
            <ul>
                <li><strong>Basic Restocking:</strong> +50 beans | Cost: $15 | Time: 3 min</li>
                <li><strong>Express Supply:</strong> +25 beans | Cost: $25 | Time: 1 min</li>
                <li><strong>Support Technician:</strong> Repairs breakdowns | Cost: $40 | Time: 4 min</li>
                <li><strong>Additional Machine:</strong> Doubles capacity | Cost: $60 per use | 3 rounds</li>
            </ul>
        </div>
    </div>
    
    <h2>🏆 ${t('scoringSystem') || 'Scoring System'}</h2>
    <div class="setup-grid">
        <div>
            <h3>${t('positivePoints') || 'Positive Points:'}</h3>
            <ul>
                <li>Simple Order completed: +1 point</li>
                <li>Medium Order completed: +2 points</li>
                <li>Complex Order completed: +3 points</li>
                <li>Urgent Order completed: +4 points</li>
                <li>Quality bonus (if maintenance done): +1 extra point</li>
            </ul>
        </div>
        <div>
            <h3>${t('penalties') || 'Penalties:'}</h3>
            <ul>
                <li>Failed urgent order: -2 points</li>
                <li>Active burnout: -1 point per order</li>
                <li>Resource waste: -1 point</li>
            </ul>
        </div>
    </div>
    
    <h2>⚠️ ${t('importantRules') || 'Important Rules'}</h2>
    <div class="rules-grid">
        <div class="rule-item">
            <h3>${t('timeManagement') || 'Time Management:'}</h3>
            <p>${t('timeManagementText') || 'Each action consumes real clock time. Teams must manage their time as a resource.'}</p>
        </div>
        <div class="rule-item">
            <h3>${t('maximumCapacity') || 'Maximum Capacity:'}</h3>
            <p>${t('capacityText') || 'Maximum 3 orders in process simultaneously. Exceeding capacity = automatic burnout.'}</p>
        </div>
        <div class="rule-item">
            <h3>${t('budgetManagement') || 'Budget Management:'}</h3>
            <p>${t('budgetText') || 'All resource cards have a money cost. Budget is limited and must be managed carefully.'}</p>
        </div>
        <div class="rule-item">
            <h3>${t('qualityVsSpeed') || 'Quality vs Speed:'}</h3>
            <p>${t('qualityText') || 'Doing maintenance prevents breakdowns. Skipping maintenance = risk of major breakdown.'}</p>
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
