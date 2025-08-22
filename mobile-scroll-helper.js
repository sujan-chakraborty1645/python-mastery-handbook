/* Mobile Scroll Helper - JS to enhance mobile scrolling and navigation experience */

document.addEventListener('DOMContentLoaded', function() {
    // Improve mobile scrolling behavior
    enhanceMobileScrolling();
    
    // Setup touch interactions
    setupTouchInteractions();
    
    // Add mobile-specific event listeners
    addMobileEventListeners();
});

/**
 * Enhance scrolling behavior on mobile devices
 */
function enhanceMobileScrolling() {
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').length > 1) {
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Scroll with a small offset for header
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                    
                    // If on mobile and sidebar is open, close it
                    if (window.innerWidth <= 768) {
                        document.body.classList.remove('sidebar-open');
                        const sidebar = document.getElementById('sidebar');
                        if (sidebar) {
                            sidebar.classList.remove('open');
                        }
                    }
                }
            }
        });
    });
    
    // Prevent code blocks from causing horizontal scrolling issues
    document.querySelectorAll('pre, code').forEach(block => {
        block.addEventListener('touchstart', function(e) {
            // If code block has scroll, prevent parent element from scrolling
            if (this.scrollWidth > this.clientWidth) {
                e.stopPropagation();
            }
        });
    });
}

/**
 * Setup touch-specific interactions
 */
function setupTouchInteractions() {
    // Add active states for better touch feedback
    document.querySelectorAll('button, .btn, .nav-link, .mobile-nav-item').forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        element.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        });
    });
    
    // Make code comparison sections horizontally scrollable on touch
    document.querySelectorAll('.code-comparison').forEach(section => {
        let startX, scrollLeft;
        
        section.addEventListener('touchstart', function(e) {
            startX = e.touches[0].pageX - section.offsetLeft;
            scrollLeft = section.scrollLeft;
        });
        
        section.addEventListener('touchmove', function(e) {
            if (!startX) return;
            
            const x = e.touches[0].pageX - section.offsetLeft;
            const walk = (x - startX) * 1.5; // Scroll speed multiplier
            section.scrollLeft = scrollLeft - walk;
        });
    });
}

/**
 * Add mobile-specific event listeners
 */
function addMobileEventListeners() {
    // Detect orientation change and adjust content as needed
    window.addEventListener('orientationchange', function() {
        // Allow time for orientation change to complete
        setTimeout(function() {
            // Readjust any elements that need fixing after orientation change
            document.querySelectorAll('.table-responsive, .code-comparison').forEach(el => {
                el.style.width = '100%';
            });
            
            // Reset scroll position if needed
            if (document.body.scrollHeight <= window.innerHeight) {
                window.scrollTo(0, 0);
            }
        }, 300);
    });
    
    // Hide address bar on page load
    window.addEventListener('load', function() {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        
        // Try to hide the address bar
        window.scrollTo(0, 1);
    });
}
