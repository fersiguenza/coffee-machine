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
            'simple_order': 'please.png',
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
            
            // Resource cards
            'beans_supply': 'beans.png',
            'extra_machine': 'extra_machine.png',
            'additional_staff': 'aditional_personal.png',
            'efficiency': 'efficiency_master.png',
            'inventory': 'inventary.png',
            'provider_change': 'change_provider.png',
            
            // Event cards
            'timeout': 'time_out.png',
            'half_time': 'half_time.png',
            'double_order': 'double.png',
            'mission_impossible': 'mission_impossible.png',
            'satisfaction': 'satisfaction.png',
            
            // Objective cards
            'easy': 'easy.png',
            'medium': 'medium.png',
            'hard': 'hard.png',
            
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
        // If template is already loaded, just show it
        if (this.templates.has(templateName)) {
            this.showTemplate(templateName);
            return;
        }

        try {
            // For now, we'll use the embedded templates from the original HTML
            // In the future, these could be separate HTML files
            const template = this.getEmbeddedTemplate(templateName);
            
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
                    <h2>Order Cards</h2>
                    <div class="cards-grid">
                        <div class="card order-card simple">
                            <div class="card-header">
                                <h3>PEDIDO SIMPLE</h3>
                                <span class="priority low">BAJA</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('simple_order', 'Simple Order')}
                                <div class="coffee-amount">1-2 <i class="fas fa-coffee"></i></div>
                                <div class="details">
                                    <p><strong>Tiempo límite:</strong> 5 minutos</p>
                                    <p><strong>Cliente:</strong> Oficina A</p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small>Puntos: +1</small>
                            </div>
                        </div>
                        <div class="card order-card simple">
                            <div class="card-header">
                                <h3>PEDIDO SIMPLE</h3>
                                <span class="priority low">BAJA</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('simple_order', 'Simple Order')}
                                <div class="coffee-amount">2 <i class="fas fa-coffee"></i></div>
                                <div class="details">
                                    <p><strong>Tiempo límite:</strong> 6 minutos</p>
                                    <p><strong>Cliente:</strong> Recepción</p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small>Puntos: +1</small>
                            </div>
                        </div>
                        <div class="card order-card medium">
                            <div class="card-header">
                                <h3>PEDIDO MEDIO</h3>
                                <span class="priority medium">MEDIA</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('medium_order', 'Medium Order')}
                                <div class="coffee-amount">3-5 <i class="fas fa-coffee"></i></div>
                                <div class="details">
                                    <p><strong>Tiempo límite:</strong> 8 minutos</p>
                                    <p><strong>Cliente:</strong> Sala de Juntas</p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small>Puntos: +2</small>
                            </div>
                        </div>
                        <div class="card order-card medium">
                            <div class="card-header">
                                <h3>PEDIDO MEDIO</h3>
                                <span class="priority medium">MEDIA</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('medium_order', 'Medium Order')}
                                <div class="coffee-amount">4 <i class="fas fa-coffee"></i></div>
                                <div class="details">
                                    <p><strong>Tiempo límite:</strong> 7 minutos</p>
                                    <p><strong>Cliente:</strong> Departamento IT</p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small>Puntos: +2</small>
                            </div>
                        </div>
                        <div class="card order-card complex">
                            <div class="card-header">
                                <h3>PEDIDO COMPLEJO</h3>
                                <span class="priority high">ALTA</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('complex_order', 'Complex Order')}
                                <div class="coffee-amount">6-10 <i class="fas fa-coffee"></i></div>
                                <div class="details">
                                    <p><strong>Tiempo límite:</strong> 12 minutos</p>
                                    <p><strong>Cliente:</strong> Cliente VIP</p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small>Puntos: +3</small>
                            </div>
                        </div>
                        <div class="card order-card complex">
                            <div class="card-header">
                                <h3>PEDIDO MASIVO</h3>
                                <span class="priority high">ALTA</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('massive_order', 'Massive Order')}
                                <div class="coffee-amount">8-12 <i class="fas fa-coffee"></i></div>
                                <div class="details">
                                    <p><strong>Tiempo límite:</strong> 15 minutos</p>
                                    <p><strong>Cliente:</strong> Evento Corporativo</p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small>Puntos: +4</small>
                            </div>
                        </div>
                        <div class="card order-card urgent">
                            <div class="card-header">
                                <h3>PEDIDO URGENTE</h3>
                                <span class="priority urgent">URGENTE</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('urgent_order', 'Urgent Order')}
                                <div class="coffee-amount">3 <i class="fas fa-coffee"></i></div>
                                <div class="details">
                                    <p><strong>Tiempo límite:</strong> 3 minutos</p>
                                    <p><strong>Cliente:</strong> CEO</p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small>Puntos: +5 | Penalización por retraso: -3</small>
                            </div>
                        </div>
                        <div class="card order-card urgent">
                            <div class="card-header">
                                <h3>PEDIDO URGENTE</h3>
                                <span class="priority urgent">URGENTE</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('urgent_order', 'Urgent Order')}
                                <div class="coffee-amount">1 <i class="fas fa-coffee"></i></div>
                                <div class="details">
                                    <p><strong>Tiempo límite:</strong> 2 minutos</p>
                                    <p><strong>Cliente:</strong> Reunión de Crisis</p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small>Puntos: +3 | Penalización por retraso: -2</small>
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
                                <div class="money-icon">💵</div>
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
                                <div class="money-icon">💴</div>
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
                                <div class="money-icon">💶</div>
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
                                <div class="money-icon">💷</div>
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
                    <h2>Constraint Cards</h2>
                    <div class="cards-grid">
                        <div class="card constraint-card breakdown">
                            <div class="card-header">
                                <h3>AVERÍA MENOR</h3>
                                <span class="effect negative">EFECTO NEGATIVO</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('minor_breakdown', 'Minor Breakdown')}
                                <p><strong>Efecto:</strong> Reduce la velocidad de producción en 50% durante 2 rondas</p>
                                <p><strong>Causa:</strong> Sobrecarga de la máquina</p>
                            </div>
                            <div class="card-footer">
                                <small>Se puede reparar con carta de Mantenimiento</small>
                            </div>
                        </div>
                        <div class="card constraint-card breakdown">
                            <div class="card-header">
                                <h3>AVERÍA MAYOR</h3>
                                <span class="effect critical">CRÍTICO</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('major_breakdown', 'Major Breakdown')}
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
                                <h3>LIMPIEZA DE MÁQUINA</h3>
                                <span class="time-cost">2 min</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('maintenance', 'Machine Cleaning')}
                                <p><strong>Beneficio:</strong> Previene averías menores</p>
                                <p><strong>Frecuencia recomendada:</strong> Cada 5 pedidos</p>
                            </div>
                            <div class="card-footer">
                                <small>Tarea preventiva</small>
                            </div>
                        </div>
                        <div class="card task-card training">
                            <div class="card-header">
                                <h3>CAPACITACIÓN</h3>
                                <span class="time-cost">5 min</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('training', 'Training')}
                                <p><strong>Beneficio:</strong> Reduce tiempo de pedidos en 20%</p>
                                <p><strong>Duración del efecto:</strong> Resto del juego</p>
                            </div>
                            <div class="card-footer">
                                <small>Inversión a largo plazo</small>
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
                                <h3>COFFEE BEANS SUPPLY</h3>
                                <span class="resource-type">BASIC</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('beans_supply', 'Coffee Beans Supply')}
                                <p><strong>Quantity:</strong> +50 coffee beans</p>
                                <p><strong>Wait time:</strong> 3 minutes</p>
                                <p><strong>Cost:</strong> $15</p>
                            </div>
                            <div class="card-footer">
                                <small>Must be ordered in advance</small>
                            </div>
                        </div>
                        <div class="card resource-card equipment">
                            <div class="card-header">
                                <h3>TECHNICAL SUPPORT</h3>
                                <span class="resource-type">SERVICE</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('tech_support', 'Technical Support')}
                                <p><strong>Benefit:</strong> Repairs any breakdown</p>
                                <p><strong>Arrival time:</strong> 4 minutes</p>
                                <p><strong>Cost:</strong> $40</p>
                            </div>
                            <div class="card-footer">
                                <small>Professional service</small>
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
                                <h3>PROMOCIÓN ESPECIAL</h3>
                                <span class="event-type good">BUENA NOTICIA</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('double_order', 'Special Promotion')}
                                <p><strong>Efecto:</strong> Todos los pedidos valen puntos dobles esta ronda</p>
                                <p><strong>Condición:</strong> Solo si no hay averías</p>
                            </div>
                            <div class="card-footer">
                                <small>Oportunidad de oro</small>
                            </div>
                        </div>
                        <div class="card event-card negative">
                            <div class="card-header">
                                <h3>VISITA DE INSPECCIÓN</h3>
                                <span class="event-type bad">MALA NOTICIA</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('inspect', 'Inspection Visit')}
                                <p><strong>Efecto:</strong> Si hay alguna avería, penalización de -5 puntos</p>
                                <p><strong>Prevención:</strong> Tener todas las máquinas funcionando</p>
                            </div>
                            <div class="card-footer">
                                <small>¡Mantén todo en orden!</small>
                            </div>
                        </div>
                        <div class="card event-card negative">
                            <div class="card-header">
                                <h3>LIMPIEZA URGENTE</h3>
                                <span class="event-type bad">DESAFÍO</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('clean', 'Urgent Cleaning')}
                                <p><strong>Efecto:</strong> Debes completar una tarea de limpieza antes del próximo pedido</p>
                                <p><strong>Penalización:</strong> -2 puntos si no cumples</p>
                            </div>
                            <div class="card-footer">
                                <small>Cumplimiento obligatorio</small>
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
                                <h3>Customer Satisfaction</h3>
                                <span class="difficulty easy">Easy</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('satisfaction', 'Customer Satisfaction')}
                                <div class="target">Target: Complete 3 orders without any delays</div>
                                <div class="details">
                                    <p><strong>Reward:</strong> +2 bonus points</p>
                                    <p><strong>Strategy:</strong> Focus on simple orders first</p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small>Good for beginners</small>
                            </div>
                        </div>
                        <div class="card objective-card impossible">
                            <div class="card-header">
                                <h3>Mission Impossible</h3>
                                <span class="difficulty impossible">Impossible</span>
                            </div>
                            <div class="card-content">
                                ${this.getCardImage('mission_impossible', 'Mission Impossible')}
                                <div class="target">Target: Complete 20 orders in 3 rounds with 30 beans</div>
                                <div class="details">
                                    <p><strong>Lesson:</strong> Learn to say NO</p>
                                    <p><strong>Reality Check:</strong> Math doesn't lie</p>
                                </div>
                            </div>
                            <div class="card-footer">
                                <small>Designed to fail - that's the point</small>
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
