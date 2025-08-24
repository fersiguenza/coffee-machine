// Navigation and section management
class NavigationManager {
    constructor(templateLoader) {
        this.currentSection = 'orders';
        this.templateLoader = templateLoader;
        this.init();
    }

    init() {
        this.setupNavigationListeners();
        this.showSection('orders'); // Default section
    }

    setupNavigationListeners() {
        // Navigation buttons
        document.getElementById('orders-btn').addEventListener('click', () => this.showSection('orders'));
        document.getElementById('constraints-btn').addEventListener('click', () => this.showSection('constraints'));
        document.getElementById('tasks-btn').addEventListener('click', () => this.showSection('tasks'));
        document.getElementById('resources-btn').addEventListener('click', () => this.showSection('resources'));
        document.getElementById('beans-btn').addEventListener('click', () => this.showSection('beans'));
        document.getElementById('events-btn').addEventListener('click', () => this.showSection('events'));
        document.getElementById('objectives-btn').addEventListener('click', () => this.showSection('objectives'));
        document.getElementById('all-btn').addEventListener('click', () => this.showSection('all'));
        document.getElementById('budget-btn').addEventListener('click', () => this.showSection('budget'));
        document.getElementById('instructions-btn').addEventListener('click', () => this.showSection('instructions'));
    }

    showSection(section) {
        // Remove active class from all buttons
        const buttons = document.querySelectorAll('.nav-btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        
        // Show selected section using template loader
        if (section === 'all') {
            this.templateLoader.showAllSections();
            this.currentSection = 'all';
        } else {
            this.templateLoader.loadTemplate(section);
            this.currentSection = section;
        }
        
        // Activate the corresponding button
        const buttonId = section === 'all' ? 'all-btn' : section + '-btn';
        const activeButton = document.getElementById(buttonId);
        if (activeButton) activeButton.classList.add('active');
    }

    getCurrentSection() {
        return this.currentSection;
    }
}

// Export for use in main script
window.NavigationManager = NavigationManager;
