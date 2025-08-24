// Template loading system for modular HTML
class TemplateLoader {
    constructor() {
        this.contentArea = document.getElementById('content-area');
        this.templates = new Map();
        this.currentTemplate = null;
        this.initImageMapping();
    }

    // Initialize mapping between card types/names and available images
    initImageMapping() {
        this.cardImages = {
            // Order cards
            'simple_order': 'easy.png',
            'medium_order': 'medium.png',
            'complex_order': 'hard.png',
            'urgent_order': 'vip.png',
            'massive_order': 'corpo_meeting.png',
            
            // Constraint cards
            'minor_breakdown': 'minor_issue.png',
            'major_breakdown': 'major_issue.png',
            'beans_shortage': 'missing_beans.png',
            'power_outage': 'no_light.png',
            'burnout': 'burn_out.png',
            'perfect_storm': 'perfect_storm.png',
            'bad_quality': 'bad_quality.png',
            'slow_beans': 'beans_slow.png',
            
            // Task cards
            'maintenance': 'clean.png',
            'training': 'training.png',
            'inspection': 'inspect.png',
            'configure': 'configure.png',
            'upgrade': 'upgrade.png',
            'tech_support': 'tech_support.png',
            'efficiency': 'efficiency_master.png',
            'inventory': 'inventary.png',
            
            // Resource cards
            'beans_supply': 'beans.png',
            'extra_machine': 'extra_machine.png',
            'additional_staff': 'aditional_personal.png',
            'efficiency': 'efficiency_master.png',
            'inventory': 'inventary.png',
            'provider_change': 'change_provider.png',
            'beans': 'beans.png',
            'timeout': 'time_out.png',
            
            // Event cards
            'half_time': 'half_time.png',
            'double_order': 'double.png',
            'mission_impossible': 'mission_impossible.png',
            'satisfaction': 'satisfaction.png',
            'extra_machine': 'extra_machine.png',
            'beans': 'beans.png',
            'aditional_personal': 'aditional_personal.png',
            'time_out': 'time_out.png',
            'inspect': 'inspect.png',
            'clean': 'clean.png',
            'no_light': 'no_light.png',
            'bad_quality': 'bad_quality.png',
            'beans_slow': 'beans_slow.png',
            'missing_beans': 'missing_beans.png',
            'corpo_meeting': 'corpo_meeting.png',
            'major_issue': 'major_issue.png',
            'perfect_storm': 'perfect_storm.png',
            
            // Objective cards
            'easy': 'easy.png',
            'medium': 'medium.png',
            'hard': 'hard.png',
            'satisfaction': 'satisfaction.png',
            'mission_impossible': 'mission_impossible.png',
            'training': 'training.png',
            'vip': 'vip.png',
            'corpo_meeting': 'corpo_meeting.png',
            'upgrade': 'upgrade.png',
            'burn_out': 'burn_out.png',
            'please': 'please.png',
            'perfect_storm': 'perfect_storm.png',
            
            // Budget cards
            'budget': 'budget.png'
        };
    }

    // Get image HTML for a card type
    getCardImage(cardType, altText = '') {
        const imageName = this.cardImages[cardType];
        if (imageName) {
            return `<div class="card-image-container"><img src="images/${imageName}" alt="${altText}" class="card-image"></div>`;
        }
        return '';
    }

    async loadTemplate(templateName) {
        console.log('Loading template:', templateName); // DEBUG
        // If template is already loaded, just show it
        if (this.templates.has(templateName)) {
            this.showTemplate(templateName);
            return;
        }

        try {
            // For now, we'll use the embedded templates from the original HTML
            // In the future, these could be separate HTML files
            const template = this.getEmbeddedTemplate(templateName);
            console.log('Template content length:', template ? template.length : 'NULL'); // DEBUG
            
            if (template) {
                this.templates.set(templateName, template);
                this.showTemplate(templateName);
            } else {
                console.error(`Template '${templateName}' not found`);
            }
        } catch (error) {
            console.error(`Error loading template '${templateName}':`, error);
        }
    }

    showTemplate(templateName) {
        const template = this.templates.get(templateName);
        if (template) {
            this.contentArea.innerHTML = template;
            this.currentTemplate = templateName;
            
            // Update translations after template loads
            if (window.updateAllTexts) {
                setTimeout(() => window.updateAllTexts(), 50);
            }
            
            // Call post-load callback if instructions section is loaded
            if (templateName === 'instructions') {
                // Re-initialize the download button listener
                setTimeout(() => {
                    const downloadBtn = document.getElementById('download-instructions-btn');
                    if (downloadBtn && window.app && window.app.managers.instructions) {
                        downloadBtn.addEventListener('click', () => {
                            window.app.managers.instructions.downloadInstructions();
                        });
                    }
                }, 100);
            }
        }
    }

    getEmbeddedTemplate(templateName) {
        // This contains all the embedded templates
        // In a future refactor, these could be moved to separate files
        const templates = {
            'orders': `
                <section id="orders-section" class="card-section">
                    <h2></h2>
                    <!-- Updated with bean costs: ${new Date().toISOString()} -->
                    <div class="cards-grid">
                        <div class="card order-card simple">
                            <div class="card-header">
                                <h3></h3>
                                <span class="priority low"></span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('simple_order', 'Simple Order')}
                                <div class="coffee-amount">1-2 <i class="fas fa-coffee"></i></div>
                                <div class="bean-cost-display" style="display:block !important; visibility:visible !important; opacity:1 !important;">☕ <span class="bean-cost-text"></span> 6</div>
                                <div class="details">
                                    <p><strong class="beans-required-label"></strong> 6 <span class="beans-per-coffee-text">(3 per coffee)</span></p>
                                    <p><strong class="time-limit-label"></strong> 5 <span class="minutes-text">minutes</span></p>
                                    <p><strong class="client-label"></strong> <span class="client-office-a">Office A</span></p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small><span class="points-label"></span> +1</small>
                            </div>
                        </div>
                        <div class="card order-card simple">
                            <div class="card-header">
                                <h3></h3>
                                <span class="priority low"></span>
                            </div>
                                                        <div class="card-content">
                                ${this.getCardImage('simple_order', 'Simple Order')}
                                <div class="coffee-amount">2 <i class="fas fa-coffee"></i></div>
                                <div class="bean-cost-display">☕ <span class="bean-cost-text"></span> 6</div>
                                <div class="details">
                                    <p><strong class="beans-required-label"></strong> 6 <span class="beans-per-coffee-text">(3 per coffee)</span></p>
                                    <p><strong class="time-limit-label"></strong> 5 <span class="minutes-text">minutes</span></p>
                                    <p><strong class="client-label"></strong> <span class="client-office-b">Office B</span></p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small><span class="points-label"></span> +1</small>
                            </div>
                        </div>
                        <div class="card order-card medium">
                            <div class="card-header">
                                <h3></h3>
                                <span class="priority medium"></span>
                            </div>
                                                        <div class="card-content">
                                ${this.getCardImage('medium_order', 'Medium Order')}
                                <div class="coffee-amount">3-4 <i class="fas fa-coffee"></i></div>
                                <div class="bean-cost-display">☕ <span class="bean-cost-text"></span> 12</div>
                                <div class="details">
                                    <p><strong class="beans-required-label"></strong> 12 <span class="beans-per-coffee-text">(3 per coffee)</span></p>
                                    <p><strong class="time-limit-label"></strong> 8 <span class="minutes-text">minutes</span></p>
                                    <p><strong class="client-label"></strong> <span class="client-department-c">Department C</span></p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small><span class="points-label"></span> +2</small>
                            </div>
                        </div>
                        <div class="card order-card medium">
                            <div class="card-header">
                                <h3></h3>
                                <span class="priority medium"></span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('medium_order', 'Medium Order')}
                                <div class="coffee-amount">4 <i class="fas fa-coffee"></i></div>
                                <div class="bean-cost-display">☕ <span class="bean-cost-text"></span> 12</div>
                                <div class="details">
                                    <p><strong class="beans-required-label"></strong> 12 <span class="beans-per-coffee-text">(3 per coffee)</span></p>
                                    <p><strong class="time-limit-label"></strong> 7 <span class="minutes-text">minutes</span></p>
                                    <p><strong class="client-label"></strong> <span class="client-it">IT Department</span></p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small><span class="points-label"></span> +2</small>
                            </div>
                        </div>
                        <div class="card order-card complex">
                            <div class="card-header">
                                <h3></h3>
                                <span class="priority high"></span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('complex_order', 'Complex Order')}
                                <div class="coffee-amount">6-10 <i class="fas fa-coffee"></i></div>
                                <div class="bean-cost-display">☕ <span class="bean-cost-text"></span> 24</div>
                                <div class="details">
                                    <p><strong class="beans-required-label"></strong> 24 <span class="beans-per-coffee-text">(3 per coffee)</span></p>
                                    <p><strong class="time-limit-label"></strong> 12 <span class="minutes-text">minutes</span></p>
                                    <p><strong class="client-label"></strong> <span class="client-vip">VIP Client</span></p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small><span class="points-label"></span> +3</small>
                            </div>
                        </div>
                        <div class="card order-card complex">
                            <div class="card-header">
                                <h3></h3>
                                <span class="priority high"></span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('massive_order', 'Massive Order')}
                                <div class="coffee-amount">8-12 <i class="fas fa-coffee"></i></div>
                                <div class="bean-cost-display">☕ <span class="bean-cost-text"></span> 30</div>
                                <div class="details">
                                    <p><strong class="beans-required-label"></strong> 30 <span class="beans-per-coffee-text">(3 per coffee)</span></p>
                                    <p><strong class="time-limit-label"></strong> 15 <span class="minutes-text">minutes</span></p>
                                    <p><strong class="client-label"></strong> <span class="client-corporate">Corporate Event</span></p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small><span class="points-label"></span> +4</small>
                            </div>
                        </div>
                        <div class="card order-card urgent">
                            <div class="card-header">
                                <h3></h3>
                                <span class="priority urgent"></span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('urgent_order', 'Urgent Order')}
                                <div class="coffee-amount">3 <i class="fas fa-coffee"></i></div>
                                <div class="bean-cost-display">☕ <span class="bean-cost-text"></span> 9</div>
                                <div class="details">
                                    <p><strong class="beans-required-label"></strong> 9 <span class="beans-per-coffee-text">(3 per coffee)</span></p>
                                    <p><strong class="time-limit-label"></strong> 3 <span class="minutes-text">minutes</span></p>
                                    <p><strong class="client-label"></strong> <span class="client-ceo">CEO</span></p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small><span class="points-label"></span> +5 | <span class="penalty-label">Delay penalty</span>: -3</small>
                            </div>
                        </div>
                        <div class="card order-card urgent">
                            <div class="card-header">
                                <h3></h3>
                                <span class="priority urgent"></span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('urgent_order', 'Urgent Order')}
                                <div class="coffee-amount">1 <i class="fas fa-coffee"></i></div>
                                <div class="bean-cost-display">☕ <span class="bean-cost-text"></span> 3</div>
                                <div class="details">
                                    <p><strong class="beans-required-label"></strong> 3 <span class="beans-per-coffee-text">(3 per coffee)</span></p>
                                    <p><strong class="time-limit-label"></strong> 2 <span class="minutes-text">minutes</span></p>
                                    <p><strong class="client-label"></strong> <span class="client-crisis">Crisis Meeting</span></p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small><span class="points-label"></span> +3 | <span class="penalty-label">Delay penalty</span>: -2</small>
                            </div>
                        </div>
                    </div>
                </section>
            `,
            'budget': `
                <section id="budget-section" class="card-section">
                    <h2>💰 Budget Cards</h2>
                    <div class="cards-container">
                        <div class="card budget-card">
                            <div class="card-header">
                                <h3>$5 BILL</h3>
                                <span class="budget-value">$5</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('budget', '$5 Bill')}
                                <div class="details">
                                    <p><strong>Value:</strong> $5</p>
                                    <p><strong>Use:</strong> Can be used to purchase resources</p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small>Basic funding</small>
                            </div>
                        </div>
                        <div class="card budget-card">
                            <div class="card-header">
                                <h3>$10 BILL</h3>
                                <span class="budget-value">$10</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('budget', '$10 Bill')}
                                <div class="details">
                                    <p><strong>Value:</strong> $10</p>
                                    <p><strong>Use:</strong> Can be used to purchase resources</p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small>Standard funding</small>
                            </div>
                        </div>
                        <div class="card budget-card">
                            <div class="card-header">
                                <h3>$20 BILL</h3>
                                <span class="budget-value">$20</span>
                            </div>
                            <div class="card-content">
                                <div class="details">
                                    <p><strong>Value:</strong> $20</p>
                                    <p><strong>Use:</strong> Can be used to purchase resources</p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small>Medium funding</small>
                            </div>
                        </div>
                        <div class="card budget-card">
                            <div class="card-header">
                                <h3>$50 BILL</h3>
                                <span class="budget-value">$50</span>
                            </div>
                            <div class="card-content">
                                <div class="details">
                                    <p><strong>Value:</strong> $50</p>
                                    <p><strong>Use:</strong> Can be used to purchase resources</p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small>High funding</small>
                            </div>
                        </div>
                        <div class="card budget-card">
                            <div class="card-header">
                                <h3>$100 BILL</h3>
                                <span class="budget-value">$100</span>
                            </div>
                            <div class="card-content">
                                <div class="details">
                                    <p><strong>Value:</strong> $100</p>
                                    <p><strong>Use:</strong> Can be used to purchase resources</p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small>Premium funding</small>
                            </div>
                        </div>
                    </div>
                </section>
            `,
            'beans': `
                <section id="beans-section" class="card-section">
                    <h2></h2>
                    <div class="cards-grid">
                        <div class="card beans-card basic">
                            <div class="card-header">
                                <h3 class="basic-beans-title">BASIC BEANS</h3>
                                <span class="bean-type basic bean-type-basic">BASIC</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('beans', 'Basic Beans')}
                                <div class="bean-amount"><span class="bean-count">10</span> <span class="beans-text">beans</span></div>
                                <div class="details">
                                    <p><strong class="yield-label">Yield:</strong> <span class="coffee-count">3</span> <span class="full-coffees-text">full coffees</span></p>
                                    <p><strong class="quality-label">Quality:</strong> <span class="quality-standard">Standard</span></p>
                                    <p><strong class="usage-time-label">Usage time:</strong> <span class="seconds-per-coffee">30 seconds per coffee</span></p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small class="basic-resource-text">Basic resource for standard coffee</small>
                            </div>
                        </div>
                        <div class="card beans-card medium">
                            <div class="card-header">
                                <h3 class="medium-beans-title">MEDIUM BEANS</h3>
                                <span class="bean-type medium bean-type-medium">MEDIUM</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('beans', 'Medium Beans')}
                                <div class="bean-amount"><span class="bean-count">20</span> <span class="beans-text">beans</span></div>
                                <div class="details">
                                    <p><strong class="yield-label">Yield:</strong> <span class="coffee-count">6</span> <span class="full-coffees-text">full coffees</span></p>
                                    <p><strong class="quality-label">Quality:</strong> <span class="quality-standard">Standard</span></p>
                                    <p><strong class="usage-time-label">Usage time:</strong> <span class="seconds-per-coffee">30 seconds per coffee</span></p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small class="medium-resource-text">Medium resource for multiple orders</small>
                            </div>
                        </div>
                        <div class="card beans-card premium">
                            <div class="card-header">
                                <h3 class="premium-beans-title">PREMIUM BEANS</h3>
                                <span class="bean-type premium bean-type-premium">PREMIUM</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('beans', 'Premium Beans')}
                                <div class="bean-amount"><span class="bean-count">50</span> <span class="beans-text">beans</span></div>
                                <div class="details">
                                    <p><strong class="yield-label">Yield:</strong> <span class="coffee-count">16</span> <span class="full-coffees-text">full coffees</span></p>
                                    <p><strong class="quality-label">Quality:</strong> <span class="quality-high">High</span></p>
                                    <p><strong class="usage-time-label">Usage time:</strong> <span class="seconds-per-coffee">30 seconds per coffee</span></p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small class="premium-resource-text">Premium resource for complex orders</small>
                            </div>
                        </div>
                        <div class="card beans-card bulk">
                            <div class="card-header">
                                <h3 class="bulk-beans-title">BULK BEANS</h3>
                                <span class="bean-type bulk bean-type-bulk">BULK</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('beans', 'Bulk Beans')}
                                <div class="bean-amount"><span class="bean-count">100</span> <span class="beans-text">beans</span></div>
                                <div class="details">
                                    <p><strong class="yield-label">Yield:</strong> <span class="coffee-count">33</span> <span class="full-coffees-text">full coffees</span></p>
                                    <p><strong class="quality-label">Quality:</strong> <span class="quality-standard">Standard</span></p>
                                    <p><strong class="usage-time-label">Usage time:</strong> <span class="seconds-per-coffee">30 seconds per coffee</span></p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small class="bulk-resource-text">Bulk resource for large operations</small>
                            </div>
                        </div>
                    </div>
                </section>
            `,
            'instructions': `
                <section id="instructions-section" class="card-section">
                    <div class="instructions-container">
                        <div class="instructions-header">
                            <h2>Game Instructions - Coffee Machine Workshop</h2>
                            <button id="download-instructions-btn" class="download-btn">
                                <i class="fas fa-download"></i> Download PDF Instructions
                            </button>
                        </div>
                        <div class="instructions-content">
                            <div class="instruction-block">
                                <h3><i class="fas fa-bullseye"></i> Objective</h3>
                                <p>Manage a coffee machine to complete the maximum number of orders within the time limit, while maintaining quality and avoiding team burnout.</p>
                            </div>
                            <div class="instruction-block">
                                <h3><i class="fas fa-cogs"></i> Initial Setup</h3>
                                <p>Teams of 3-5 people, initial resources: 50 coffee beans, $100 budget, max 3 simultaneous orders.</p>
                            </div>
                            <div class="instruction-block">
                                <h3><i class="fas fa-trophy"></i> Scoring</h3>
                                <p>Points for completed orders: Simple (+1), Medium (+2), Complex (+3), Urgent (+4). Penalties for failed urgent orders (-2).</p>
                            </div>
                        </div>
                    </div>
                </section>
            `,
            'constraints': `
                <section id="constraints-section" class="card-section">
                    <h2></h2>
                    <div class="cards-grid">
                        <div class="card constraint-card breakdown">
                            <div class="card-header">
                                <h3 class="minor-breakdown-title">MINOR BREAKDOWN</h3>
                                <span class="effect negative negative-effect-text">NEGATIVE EFFECT</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('minor_breakdown', 'Minor Breakdown')}
                                <div class="constraint-bean-cost">☕ <span class="extra-cost-text">Extra cost</span>: +2 <span class="beans-per-coffee-text">beans per coffee</span></div>
                                <p><strong class="effect-label">Effect:</strong> <span class="production-reduced">Reduces production speed by 50% for 2 rounds</span></p>
                                <p><strong class="cause-label">Cause:</strong> <span class="machine-overload">Machine overload</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="repair-maintenance-text">Can be fixed with Maintenance card</small>
                            </div>
                        </div>
                        <div class="card constraint-card breakdown">
                            <div class="card-header">
                                <h3>AVERÍA MAYOR</h3>
                                <span class="effect critical">CRÍTICO</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('major_breakdown', 'Major Breakdown')}
                                <div class="constraint-bean-cost">☕ Costo extra: +5 granos por café</div>
                                <p><strong>Efecto:</strong> Máquina fuera de servicio durante 3 rondas</p>
                                <p><strong>Causa:</strong> Trabajo excesivo fuera de horario</p>
                            </div>
                            <div class="card-footer">
                                <small>Requiere 2 cartas de Mantenimiento para reparar</small>
                            </div>
                        </div>
                        <div class="card constraint-card resources">
                            <div class="card-header">
                                <h3>ESCASEZ DE GRANOS</h3>
                                <span class="effect warning">ADVERTENCIA</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('beans_shortage', 'Beans Shortage')}
                                <div class="constraint-bean-cost">☕ Granos limitados: máx 9 granos por pedido</div>
                                <p><strong>Efecto:</strong> Solo puedes completar pedidos de 3 cafés o menos</p>
                                <p><strong>Duración:</strong> Hasta conseguir recursos</p>
                            </div>
                            <div class="card-footer">
                                <small>Se resuelve con carta de Reabastecimiento</small>
                            </div>
                        </div>
                    </div>
                </section>
            `,
            'tasks': `
                <section id="tasks-section" class="card-section">
                    <h2>Task Cards</h2>
                    <div class="cards-grid">
                        <div class="card task-card maintenance">
                            <div class="card-header">
                                <h3 class="machine-cleaning-title">MACHINE CLEANING</h3>
                                <span class="time-cost">2 min</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('maintenance', 'Machine Cleaning')}
                                <p><strong class="benefit-label">Benefit:</strong> <span class="prevents-minor-breakdowns">Prevents minor breakdowns</span></p>
                                <p><strong class="recommended-frequency-label">Recommended frequency:</strong> <span class="every-5-orders">Every 5 orders</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="preventive-task-text">Preventive task</small>
                            </div>
                        </div>
                        <div class="card task-card training">
                            <div class="card-header">
                                <h3 class="training-title">TRAINING</h3>
                                <span class="time-cost">5 min</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('training', 'Training')}
                                <p><strong class="benefit-label">Benefit:</strong> <span class="reduces-order-time">Reduces order time by 20%</span></p>
                                <p><strong class="effect-duration-label">Effect duration:</strong> <span class="rest-of-game">Rest of the game</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="long-term-investment-text">Long-term investment</small>
                            </div>
                        </div>
                        <div class="card task-card maintenance">
                            <div class="card-header">
                                <h3 class="technical-inspection-title">TECHNICAL INSPECTION</h3>
                                <span class="time-cost">3 min</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('inspection', 'Technical Inspection')}
                                <p><strong class="benefit-label">Benefit:</strong> <span class="detects-problems">Detects problems before major breakdowns</span></p>
                                <p><strong class="effect-label">Effect:</strong> <span class="prevents-major-breakdown">Prevents 1 major breakdown</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="preventive-maintenance-text">Preventive maintenance</small>
                            </div>
                        </div>
                        <div class="card task-card admin">
                            <div class="card-header">
                                <h3 class="configuration-title">CONFIGURATION</h3>
                                <span class="time-cost">4 min</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('configure', 'Machine Configuration')}
                                <p><strong class="benefit-label">Benefit:</strong> <span class="optimizes-performance">Optimizes machine performance</span></p>
                                <p><strong class="effect-label">Effect:</strong> <span class="speed-increase">+10% speed for 3 rounds</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="system-optimization-text">System optimization</small>
                            </div>
                        </div>
                        <div class="card task-card admin">
                            <div class="card-header">
                                <h3 class="inventory-title">INVENTORY</h3>
                                <span class="time-cost">3 min</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('inventory', 'Inventory Check')}
                                <p><strong class="benefit-label">Benefit:</strong> <span class="get-free-beans">Get +20 free coffee beans</span></p>
                                <p><strong class="additional-effect-label">Additional effect:</strong> <span class="know-real-stock">Know the real stock</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="resource-control-text">Resource control</small>
                            </div>
                        </div>
                        <div class="card task-card training">
                            <div class="card-header">
                                <h3 class="efficiency-mastery-title">EFFICIENCY MASTERY</h3>
                                <span class="time-cost">6 min</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('efficiency', 'Efficiency Mastery')}
                                <p><strong class="benefit-label">Benefit:</strong> <span class="max-capacity-increase">Maximum capacity +1 simultaneous order</span></p>
                                <p><strong class="duration-label">Duration:</strong> <span class="permanent-text">Permanent</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="permanent-improvement-text">Permanent improvement</small>
                            </div>
                        </div>
                    </div>
                </section>
            `,
            'resources': `
                <section id="resources-section" class="card-section">
                    <h2>Resource Cards</h2>
                    <div class="cards-grid">
                        <div class="card resource-card supply">
                            <div class="card-header">
                                <h3 class="coffee-beans-supply-title">COFFEE BEANS SUPPLY</h3>
                                <span class="resource-type basic-type">BASIC</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('beans_supply', 'Coffee Beans Supply')}
                                <p><strong class="quantity-label">Quantity:</strong> <span class="beans-quantity">+50 coffee beans</span></p>
                                <p><strong class="wait-time-label">Wait time:</strong> <span class="minutes-value">3 minutes</span></p>
                                <p><strong class="cost-label">Cost:</strong> <span class="cost-value">$15</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="must-order-advance-text">Must be ordered in advance</small>
                            </div>
                        </div>
                        <div class="card resource-card equipment">
                            <div class="card-header">
                                <h3 class="technical-support-title">TECHNICAL SUPPORT</h3>
                                <span class="resource-type service-type">SERVICE</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('tech_support', 'Technical Support')}
                                <p><strong class="benefit-label">Benefit:</strong> <span class="repairs-breakdown-text">Repairs any breakdown</span></p>
                                <p><strong class="arrival-time-label">Arrival time:</strong> <span class="minutes-value">4 minutes</span></p>
                                <p><strong class="cost-label">Cost:</strong> <span class="cost-value">$40</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="professional-service-text">Professional service</small>
                            </div>
                        </div>
                        <div class="card resource-card equipment">
                            <div class="card-header">
                                <h3 class="extra-machine-title">EXTRA MACHINE</h3>
                                <span class="resource-type equipment-type">EQUIPMENT</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('extra_machine', 'Extra Machine')}
                                <p><strong class="benefit-label">Benefit:</strong> <span class="capacity-increase">+2 capacity for 3 rounds</span></p>
                                <p><strong class="setup-time-label">Setup time:</strong> <span class="minutes-value">2 minutes</span></p>
                                <p><strong class="cost-label">Cost:</strong> <span class="cost-value">$60</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="temporary-capacity-text">Temporary capacity boost</small>
                            </div>
                        </div>
                        <div class="card resource-card staff">
                            <div class="card-header">
                                <h3 class="additional-staff-title">ADDITIONAL STAFF</h3>
                                <span class="resource-type personnel-type">PERSONNEL</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('additional_staff', 'Additional Staff')}
                                <p><strong class="benefit-label">Benefit:</strong> <span class="reduce-task-times">Reduce all task times by 50%</span></p>
                                <p><strong class="duration-label">Duration:</strong> <span class="rounds-value">2 rounds</span></p>
                                <p><strong class="cost-label">Cost:</strong> <span class="cost-value">$35</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="temporary-help-text">Temporary help</small>
                            </div>
                        </div>
                        <div class="card resource-card supply">
                            <div class="card-header">
                                <h3 class="provider-change-title">PROVIDER CHANGE</h3>
                                <span class="resource-type upgrade-type">UPGRADE</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('provider_change', 'Provider Change')}
                                <p><strong class="benefit-label">Benefit:</strong> <span class="better-beans-text">Better beans: +1 point per order</span></p>
                                <p><strong class="duration-label">Duration:</strong> <span class="permanent-text">Permanent</span></p>
                                <p><strong class="cost-label">Cost:</strong> <span class="cost-value">$80</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="quality-improvement-text">Quality improvement</small>
                            </div>
                        </div>
                        <div class="card resource-card equipment">
                            <div class="card-header">
                                <h3 class="machine-upgrade-title">MACHINE UPGRADE</h3>
                                <span class="resource-type upgrade-type">UPGRADE</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('upgrade', 'Machine Upgrade')}
                                <p><strong class="benefit-label">Benefit:</strong> <span class="faster-processing-text">25% faster processing</span></p>
                                <p><strong class="installation-label">Installation:</strong> <span class="minutes-value">5 minutes</span></p>
                                <p><strong class="cost-label">Cost:</strong> <span class="cost-value">$100</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="permanent-improvement-text">Permanent improvement</small>
                            </div>
                        </div>
                        <div class="card resource-card rest">
                            <div class="card-header">
                                <h3 class="time-out-title">TIME OUT</h3>
                                <span class="resource-type recovery-type">RECOVERY</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('timeout', 'Time Out')}
                                <p><strong class="benefit-label">Benefit:</strong> <span class="removes-burnout-text">Removes burnout effects</span></p>
                                <p><strong class="duration-label">Duration:</strong> <span class="minutes-value">3 minutes</span></p>
                                <p><strong class="cost-label">Cost:</strong> <span class="cost-value">$20</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="team-recovery-text">Team recovery</small>
                            </div>
                        </div>
                        <div class="card resource-card supply">
                            <div class="card-header">
                                <h3 class="premium-beans-resource-title">PREMIUM BEANS</h3>
                                <span class="resource-type premium-type">PREMIUM</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('beans', 'Premium Beans')}
                                <p><strong class="quantity-label">Quantity:</strong> <span class="premium-beans-quantity">+30 premium beans</span></p>
                                <p><strong class="effect-label">Effect:</strong> <span class="bonus-point-text">Each coffee gives +1 bonus point</span></p>
                                <p><strong class="cost-label">Cost:</strong> <span class="cost-value">$45</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="quality-over-quantity-text">Quality over quantity</small>
                            </div>
                        </div>
                    </div>
                </section>
            `,
            'events': `
                <section id="events-section" class="card-section">
                    <h2>Event Cards</h2>
                    <div class="cards-grid">
                        <div class="card event-card positive">
                            <div class="card-header">
                                <h3 class="special-promotion-title">SPECIAL PROMOTION</h3>
                                <span class="event-type good good-news-text">GOOD NEWS</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('double_order', 'Special Promotion')}
                                <p><strong class="effect-label">Effect:</strong> <span class="double-points-text">All orders are worth double points this round</span></p>
                                <p><strong class="condition-label">Condition:</strong> <span class="no-breakdowns-text">Only if there are no breakdowns</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="golden-opportunity-text">Golden opportunity</small>
                            </div>
                        </div>
                        <div class="card event-card positive">
                            <div class="card-header">
                                <h3 class="extra-time-title">EXTRA TIME</h3>
                                <span class="event-type good good-news-text">GOOD NEWS</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('half_time', 'Extra Time')}
                                <p><strong class="effect-label">Effect:</strong> <span class="extra-minutes-text">+5 additional minutes for this round</span></p>
                                <p><strong class="condition-label">Condition:</strong> <span class="once-per-game-text">Only applicable once per game</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="needed-break-text">Needed break</small>
                            </div>
                        </div>
                        <div class="card event-card positive">
                            <div class="card-header">
                                <h3 class="free-machine-title">FREE NEW MACHINE</h3>
                                <span class="event-type good good-news-text">GOOD NEWS</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('extra_machine', 'Free New Machine')}
                                <p><strong class="effect-label">Effect:</strong> <span class="free-machine-rounds-text">Free additional machine for 2 rounds</span></p>
                                <p><strong class="benefit-label">Benefit:</strong> <span class="processing-capacity-text">+2 processing capacity</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="manufacturer-gift-text">Manufacturer's gift</small>
                            </div>
                        </div>
                        <div class="card event-card positive">
                            <div class="card-header">
                                <h3 class="free-premium-beans-title">FREE PREMIUM BEANS</h3>
                                <span class="event-type good good-news-text">GOOD NEWS</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('beans', 'Free Premium Beans')}
                                <p><strong class="effect-label">Effect:</strong> <span class="premium-beans-points-text">+25 premium beans (worth +1 point per coffee)</span></p>
                                <p><strong class="benefit-label">Benefit:</strong> <span class="quality-improvement-text">Quality improvement at no cost</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="supplier-sample-text">Supplier sample</small>
                            </div>
                        </div>
                        <div class="card event-card neutral">
                            <div class="card-header">
                                <h3 class="temporary-staff-title">TEMPORARY STAFF</h3>
                                <span class="event-type neutral neutral-event-text">NEUTRAL</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('aditional_personal', 'Temporary Staff')}
                                <p><strong class="effect-label">Effect:</strong> <span class="free-help-text">Free help for 1 round</span></p>
                                <p><strong class="condition-label">Condition:</strong> <span class="must-train-text">Must train staff (1 turn)</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="trainee-text">Trainee in training</small>
                            </div>
                        </div>
                        <div class="card event-card neutral">
                            <div class="card-header">
                                <h3 class="shift-change-title">SHIFT CHANGE</h3>
                                <span class="event-type neutral neutral-event-text">NEUTRAL</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('time_out', 'Shift Change')}
                                <p><strong class="effect-label">Effect:</strong> <span class="mandatory-pause-text">Mandatory 2-minute break</span></p>
                                <p><strong class="benefit-label">Benefit:</strong> <span class="removes-burnout-text">Removes burnout if present</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="company-policy-text">Company policy</small>
                            </div>
                        </div>
                        <div class="card event-card negative">
                            <div class="card-header">
                                <h3 class="inspection-visit-title">INSPECTION VISIT</h3>
                                <span class="event-type bad bad-news-text">BAD NEWS</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('inspect', 'Inspection Visit')}
                                <p><strong class="effect-label">Effect:</strong> <span class="breakdown-penalty-text">If there's a breakdown, -5 points penalty</span></p>
                                <p><strong class="prevention-label">Prevention:</strong> <span class="working-machines-text">Have all machines working</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="keep-order-text">Keep everything in order!</small>
                            </div>
                        </div>
                        <div class="card event-card negative">
                            <div class="card-header">
                                <h3 class="urgent-cleaning-title">URGENT CLEANING</h3>
                                <span class="event-type bad challenge-text">CHALLENGE</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('clean', 'Urgent Cleaning')}
                                <p><strong class="effect-label">Effect:</strong> <span class="cleaning-task-text">Must complete a cleaning task before the next order</span></p>
                                <p><strong class="penalty-label">Penalty:</strong> <span class="non-compliance-text">-2 points if you don't comply</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="mandatory-compliance-text">Mandatory compliance</small>
                            </div>
                        </div>
                        <div class="card event-card negative">
                            <div class="card-header">
                                <h3 class="power-outage-title">POWER OUTAGE</h3>
                                <span class="event-type bad crisis-text">CRISIS</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('no_light', 'Power Outage')}
                                <p><strong class="effect-label">Effect:</strong> <span class="no-processing-text">Can't process orders for 3 minutes</span></p>
                                <p><strong class="impact-label">Impact:</strong> <span class="urgent-fail-text">Urgent orders automatically fail</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="force-majeure-text">Force majeure</small>
                            </div>
                        </div>
                        <div class="card event-card negative">
                            <div class="card-header">
                                <h3 class="defective-beans-title">DEFECTIVE BEANS</h3>
                                <span class="event-type bad bad-news-text">BAD NEWS</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('bad_quality', 'Defective Beans')}
                                <p><strong class="effect-label">Effect:</strong> <span class="next-orders-penalty-text">The next 3 orders give -1 point each</span></p>
                                <p><strong class="solution-label">Solution:</strong> <span class="buy-new-beans-text">Buy new beans</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="quality-issue-text">Quality issue</small>
                            </div>
                        </div>
                        <div class="card event-card negative">
                            <div class="card-header">
                                <h3 class="slow-beans-title">SLOW BEANS</h3>
                                <span class="event-type bad problem-text">PROBLEM</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('beans_slow', 'Slow Beans')}
                                <p><strong class="effect-label">Effect:</strong> <span class="extra-minute-text">All orders take +1 extra minute</span></p>
                                <p><strong class="duration-label">Duration:</strong> <span class="end-of-round-text">Until the end of the round</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="defective-batch-text">Defective batch</small>
                            </div>
                        </div>
                        <div class="card event-card negative">
                            <div class="card-header">
                                <h3 class="missing-inventory-title">MISSING INVENTORY</h3>
                                <span class="event-type bad crisis-text">CRISIS</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('missing_beans', 'Missing Inventory')}
                                <p><strong class="effect-label">Effect:</strong> <span class="minus-beans-text">-20 beans immediately</span></p>
                                <p><strong class="cause-label">Cause:</strong> <span class="inventory-error-text">Inventory counting error</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="administrative-error-text">Administrative error</small>
                            </div>
                        </div>
                        <div class="card event-card negative">
                            <div class="card-header">
                                <h3 class="corporate-meeting-title">CORPORATE MEETING</h3>
                                <span class="event-type bad mandatory-text">MANDATORY</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('corpo_meeting', 'Corporate Meeting')}
                                <p><strong class="effect-label">Effect:</strong> <span class="lost-time-text">Lose 4 minutes of productive time</span></p>
                                <p><strong class="reality-label">Reality:</strong> <span class="cant-reject-text">You can't reject the meeting</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="corporate-priorities-text">Corporate priorities</small>
                            </div>
                        </div>
                        <div class="card event-card negative">
                            <div class="card-header">
                                <h3 class="major-breakdown-title">MAJOR BREAKDOWN</h3>
                                <span class="event-type bad crisis-text">CRISIS</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('major_issue', 'Major Breakdown')}
                                <p><strong class="effect-label">Effect:</strong> <span class="reduced-capacity-text">Capacity reduced by half for 2 rounds</span></p>
                                <p><strong class="solution-label">Solution:</strong> <span class="technical-support-text">Mandatory technical support</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="immediate-repair-text">Requires immediate repair</small>
                            </div>
                        </div>
                        <div class="card event-card negative">
                            <div class="card-header">
                                <h3 class="perfect-storm-title">PERFECT STORM</h3>
                                <span class="event-type bad catastrophe-text">CATASTROPHE</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('perfect_storm', 'Perfect Storm')}
                                <p><strong class="effect-label">Effect:</strong> <span class="activate-constraints-text">Activates 2 random constraints immediately</span></p>
                                <p><strong class="duration-label">Duration:</strong> <span class="rest-of-game-text">Rest of the game</span></p>
                            </div>
                            <div class="card-footer">
                                <small class="everything-wrong-text">When everything goes wrong at once</small>
                            </div>
                        </div>
                    </div>
                </section>
            `,
            'objectives': `
                <section id="objectives-section" class="card-section">
                    <h2>Objective Cards</h2>
                    <div class="cards-grid">
                        <div class="card objective-card easy">
                            <div class="card-header">
                                <h3 class="customer-satisfaction-title">Customer Satisfaction</h3>
                                <span class="difficulty easy difficulty-easy-text">Easy</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('satisfaction', 'Customer Satisfaction')}
                                <div class="target"><span class="target-label">Target:</span> <span class="complete-orders-no-delays">Complete 3 orders without any delays</span></div>
                                <div class="details">
                                    <p><strong class="reward-label">Reward:</strong> <span class="bonus-points">+2 bonus points</span></p>
                                    <p><strong class="strategy-label">Strategy:</strong> <span class="focus-simple-orders">Focus on simple orders first</span></p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small class="good-for-beginners-text">Good for beginners</small>
                            </div>
                        </div>
                        <div class="card objective-card easy">
                            <div class="card-header">
                                <h3 class="quality-first-title">Quality First</h3>
                                <span class="difficulty easy difficulty-easy-text">Easy</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('easy', 'Quality First')}
                                <div class="target"><span class="target-label">Target:</span> <span class="complete-maintenance-tasks">Complete 2 maintenance tasks in one round</span></div>
                                <div class="details">
                                    <p><strong class="reward-label">Reward:</strong> <span class="bonus-points">+3 bonus points</span></p>
                                    <p><strong class="strategy-label">Strategy:</strong> <span class="prioritize-maintenance">Prioritize maintenance early</span></p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small class="prevention-better-text">Prevention is better than cure</small>
                            </div>
                        </div>
                        <div class="card objective-card medium">
                            <div class="card-header">
                                <h3 class="efficiency-master-title">Efficiency Master</h3>
                                <span class="difficulty medium difficulty-medium-text">Medium</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('medium', 'Efficiency Master')}
                                <div class="target"><span class="target-label">Target:</span> <span class="complete-orders-no-extras">Complete 8 orders without using extra resources</span></div>
                                <div class="details">
                                    <p><strong class="reward-label">Reward:</strong> <span class="bonus-points">+5 bonus points</span></p>
                                    <p><strong class="strategy-label">Strategy:</strong> <span class="manage-resources">Manage initial resources carefully</span></p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small class="resource-management-text">Resource management challenge</small>
                            </div>
                        </div>
                        <div class="card objective-card medium">
                            <div class="card-header">
                                <h3 class="speed-runner-title">Speed Runner</h3>
                                <span class="difficulty medium difficulty-medium-text">Medium</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('training', 'Speed Runner')}
                                <div class="target"><span class="target-label">Target:</span> <span class="complete-orders-time-limit">Complete 6 orders in under 10 minutes</span></div>
                                <div class="details">
                                    <p><strong class="reward-label">Reward:</strong> <span class="bonus-points">+4 bonus points</span></p>
                                    <p><strong class="strategy-label">Strategy:</strong> <span class="focus-simple-medium">Focus on simple and medium orders</span></p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small class="time-management-text">Time management is key</small>
                            </div>
                        </div>
                        <div class="card objective-card hard">
                            <div class="card-header">
                                <h3 class="storm-survivor-title">Perfect Storm Survivor</h3>
                                <span class="difficulty hard difficulty-hard-text">Hard</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('hard', 'Perfect Storm Survivor')}
                                <div class="target"><span class="target-label">Target:</span> <span class="complete-with-constraints">Complete 5 orders while having 2 active constraints</span></div>
                                <div class="details">
                                    <p><strong class="reward-label">Reward:</strong> <span class="bonus-points">+8 bonus points</span></p>
                                    <p><strong class="strategy-label">Strategy:</strong> <span class="adapt-quickly">Adapt quickly to changing conditions</span></p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small class="crisis-management-text">Crisis management test</small>
                            </div>
                        </div>
                        <div class="card objective-card hard">
                            <div class="card-header">
                                <h3 class="vip-treatment-title">VIP Treatment</h3>
                                <span class="difficulty hard difficulty-hard-text">Hard</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('vip', 'VIP Treatment')}
                                <div class="target"><span class="target-label">Target:</span> <span class="complete-urgent-orders">Complete 3 urgent orders without any failures</span></div>
                                <div class="details">
                                    <p><strong class="reward-label">Reward:</strong> <span class="bonus-points">+10 bonus points</span></p>
                                    <p><strong class="strategy-label">Strategy:</strong> <span class="save-resources">Save resources for urgent moments</span></p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small class="high-pressure-text">High pressure situation</small>
                            </div>
                        </div>
                        <div class="card objective-card hard">
                            <div class="card-header">
                                <h3 class="corporate-meeting-title">Corporate Meeting</h3>
                                <span class="difficulty hard difficulty-hard-text">Hard</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('corpo_meeting', 'Corporate Meeting')}
                                <div class="target"><span class="target-label">Target:</span> <span class="complete-massive-orders">Complete 1 massive order + 3 regular orders</span></div>
                                <div class="details">
                                    <p><strong class="reward-label">Reward:</strong> <span class="bonus-points">+12 bonus points</span></p>
                                    <p><strong class="strategy-label">Strategy:</strong> <span class="plan-resources">Plan resource allocation carefully</span></p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small class="big-client-text">Big client, big responsibility</small>
                            </div>
                        </div>
                        <div class="card objective-card hard">
                            <div class="card-header">
                                <h3 class="zero-waste-title">Zero Waste Champion</h3>
                                <span class="difficulty hard difficulty-hard-text">Hard</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('upgrade', 'Zero Waste Champion')}
                                <div class="target"><span class="target-label">Target:</span> <span class="end-zero-beans">End the game with exactly 0 beans remaining</span></div>
                                <div class="details">
                                    <p><strong class="reward-label">Reward:</strong> <span class="bonus-points">+6 bonus points</span></p>
                                    <p><strong class="strategy-label">Strategy:</strong> <span class="precise-calculation">Perfect resource calculation required</span></p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small class="precision-planning-text">Precision planning challenge</small>
                            </div>
                        </div>
                        <div class="card objective-card impossible">
                            <div class="card-header">
                                <h3 class="burnout-prevention-title">Burnout Prevention</h3>
                                <span class="difficulty impossible difficulty-impossible-text">Impossible</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('burn_out', 'Burnout Prevention')}
                                <div class="target"><span class="target-label">Target:</span> <span class="no-rest-breaks">Complete 15 orders without any rest breaks</span></div>
                                <div class="details">
                                    <p><strong class="lesson-label">Lesson:</strong> <span class="sustainable-pace">Sustainable pace is crucial</span></p>
                                    <p><strong class="reality-check-label">Reality Check:</strong> <span class="health-before">Health before productivity</span></p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small class="work-life-balance-text">Learn the importance of work-life balance</small>
                            </div>
                        </div>
                        <div class="card objective-card impossible">
                            <div class="card-header">
                                <h3 class="mission-impossible-title">Mission Impossible</h3>
                                <span class="difficulty impossible difficulty-impossible-text">Impossible</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('mission_impossible', 'Mission Impossible')}
                                <div class="target"><span class="target-label">Target:</span> <span class="too-many-orders">Complete 20 orders in 3 rounds with 30 beans</span></div>
                                <div class="details">
                                    <p><strong class="lesson-label">Lesson:</strong> <span class="learn-no">Learn to say NO</span></p>
                                    <p><strong class="reality-check-label">Reality Check:</strong> <span class="math-truth">Math doesn't lie</span></p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small class="designed-fail-text">Designed to fail - that's the point</small>
                            </div>
                        </div>
                        <div class="card objective-card impossible">
                            <div class="card-header">
                                <h3 class="please-everyone-title">Please Everyone</h3>
                                <span class="difficulty impossible difficulty-impossible-text">Impossible</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('please', 'Please Everyone')}
                                <div class="target"><span class="target-label">Target:</span> <span class="complete-all-orders">Complete all orders (even conflicting ones) perfectly</span></div>
                                <div class="details">
                                    <p><strong class="lesson-label">Lesson:</strong> <span class="cant-please-all">You can't please everyone</span></p>
                                    <p><strong class="reality-check-label">Reality Check:</strong> <span class="prioritization">Prioritization is essential</span></p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small class="art-of-no-text">Teaching the art of saying no</small>
                            </div>
                        </div>
                        <div class="card objective-card impossible">
                            <div class="card-header">
                                <h3 class="perfect-storm-title">Perfect Storm</h3>
                                <span class="difficulty impossible difficulty-impossible-text">Impossible</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('perfect_storm', 'Perfect Storm')}
                                <div class="target"><span class="target-label">Target:</span> <span class="maintain-quality">Maintain 100% quality while everything breaks down</span></div>
                                <div class="details">
                                    <p><strong class="lesson-label">Lesson:</strong> <span class="unwinnable">Some situations are unwinnable</span></p>
                                    <p><strong class="reality-check-label">Reality Check:</strong> <span class="cut-losses">Know when to cut losses</span></p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small class="damage-control-text">Sometimes the best strategy is damage control</small>
                            </div>
                        </div>
                    </div>
                </section>
            `
        };

        return templates[templateName] || null;
    }

    showAllSections() {
        // Load all templates and show them all
        const allTemplates = ['orders', 'constraints', 'tasks', 'resources', 'events', 'objectives', 'budget'];
        let combinedHTML = '';
        
        allTemplates.forEach(templateName => {
            const template = this.getEmbeddedTemplate(templateName);
            if (template) {
                combinedHTML += template;
            }
        });
        
        this.contentArea.innerHTML = combinedHTML;
        this.currentTemplate = 'all';
    }
}

// Export for use in other modules
window.TemplateLoader = TemplateLoader;
