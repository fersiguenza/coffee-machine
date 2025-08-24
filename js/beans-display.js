// Beans display script - ensures that bean cost displays are shown

document.addEventListener('DOMContentLoaded', function() {
    // Function to make bean costs visible
    function ensureBeansVisible() {
        console.log('Ensuring bean costs are visible');
        
        // Fix bean cost positioning in order cards - move them to top of card content
        const orderCards = document.querySelectorAll('.order-card');
        orderCards.forEach(function(card) {
            const content = card.querySelector('.card-content');
            const beanCost = card.querySelector('.bean-cost-display');
            
            // If we found the elements, move bean cost to the beginning of card content
            if (content && beanCost) {
                // Move the bean cost to be the first element in the card content
                if (content.firstChild) {
                    content.insertBefore(beanCost, content.firstChild);
                }
                
                // Ensure bean cost text exists
                if (!beanCost.querySelector('.bean-cost-text')) {
                    const costText = document.createElement('span');
                    costText.className = 'bean-cost-text';
                    // Insert after the coffee emoji
                    const textNode = beanCost.firstChild;
                    if (textNode) {
                        beanCost.insertBefore(costText, textNode.nextSibling);
                    } else {
                        beanCost.appendChild(costText);
                    }
                }
            }
        });
        
        // Style bean costs in order cards
        const beanCosts = document.querySelectorAll('.bean-cost-display');
        beanCosts.forEach(function(cost) {
            cost.style.display = 'block';
            cost.style.visibility = 'visible';
            cost.style.opacity = '1';
        });
        
        // If translations are available, update the text
        if (typeof updateAllTexts === 'function') {
            setTimeout(updateAllTexts, 100);
        }
        
        // Style constraint bean costs
        const constraintCosts = document.querySelectorAll('.constraint-bean-cost');
        constraintCosts.forEach(function(cost) {
            cost.style.display = 'block';
            cost.style.visibility = 'visible';
            cost.style.opacity = '1';
        });
    }
    
    // Run on page load
    ensureBeansVisible();
    
    // Also run when templates might be loaded
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Wait a short time for template to be loaded
            setTimeout(ensureBeansVisible, 100);
        });
    });
});
