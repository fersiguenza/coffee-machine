// Main application script - Clean and modular
class CoffeeMachineApp {
    constructor() {
        this.managers = {};
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeManagers();
            this.setupGlobalListeners();
        });
    }

    initializeManagers() {
        // Initialize all managers in the correct order
        this.managers.templateLoader = new TemplateLoader();
        this.managers.language = new LanguageManager();
        this.managers.navigation = new NavigationManager(this.managers.templateLoader);
        this.managers.instructions = new InstructionsManager(this.managers.language);
        
        // Make app globally accessible for template callbacks
        window.app = this;
        
        console.log('Coffee Machine Workshop initialized successfully');
    }

    setupGlobalListeners() {
        // Any global event listeners can go here
        // For now, just keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'p':
                        e.preventDefault();
                        this.printCurrentSection();
                        break;
                    case '1':
                        e.preventDefault();
                        this.managers.navigation.showSection('orders');
                        break;
                    case '2':
                        e.preventDefault();
                        this.managers.navigation.showSection('constraints');
                        break;
                    case '3':
                        e.preventDefault();
                        this.managers.navigation.showSection('tasks');
                        break;
                    case '4':
                        e.preventDefault();
                        this.managers.navigation.showSection('resources');
                        break;
                    case '5':
                        e.preventDefault();
                        this.managers.navigation.showSection('events');
                        break;
                    case '6':
                        e.preventDefault();
                        this.managers.navigation.showSection('objectives');
                        break;
                    case '0':
                        e.preventDefault();
                        this.managers.navigation.showSection('all');
                        break;
                }
            }
        });
    }

    printCurrentSection() {
        const currentSection = this.managers.navigation.getCurrentSection();
        
        if (currentSection === 'all') {
            window.print();
        } else {
            // Hide all sections except current
            const sections = document.querySelectorAll('.card-section');
            sections.forEach(section => {
                const shouldShow = section.id === `${currentSection}-section`;
                section.style.display = shouldShow ? 'block' : 'none';
            });
            
            // Print
            window.print();
            
            // Restore previous state
            this.managers.navigation.showSection(currentSection);
        }
    }

    // Public API for other scripts
    getManager(name) {
        return this.managers[name];
    }
}

// Initialize the application
const app = new CoffeeMachineApp();

// Make app globally available for debugging
window.CoffeeMachineApp = app;
