// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Book list scrolling functionality
    const scrollLeft = document.getElementById("scrollLeft");
    const scrollRight = document.getElementById("scrollRight");
    const bookWrapper = document.querySelector(".book-list-wrapper");
    const dots = document.querySelectorAll('.scroll-dot');

    if (scrollLeft && scrollRight && bookWrapper) {
        // Calculate the width of a single book item including gap
        const getItemWidth = () => {
            const bookItem = bookWrapper.querySelector('.book-item');
            const style = window.getComputedStyle(bookItem);
            const width = bookItem.offsetWidth;
            const margin = parseInt(style.marginRight) || 0;
            return width + margin;
        };

        // Number of items to scroll per click
        const itemsPerScroll = 2;

        // Handle left scroll
        scrollLeft.addEventListener("click", () => {
            const scrollAmount = getItemWidth() * itemsPerScroll;
            bookWrapper.scrollBy({
                left: -scrollAmount,
                behavior: "smooth"
            });
            updateDots();
        });

        // Handle right scroll
        scrollRight.addEventListener("click", () => {
            const scrollAmount = getItemWidth() * itemsPerScroll;
            bookWrapper.scrollBy({
                left: scrollAmount,
                behavior: "smooth"
            });
            updateDots();
        });

        // Handle dot navigation
        const updateDots = () => {
            const totalScroll = bookWrapper.scrollWidth - bookWrapper.clientWidth;
            const currentScroll = bookWrapper.scrollLeft;
            const currentIndex = Math.round((currentScroll / totalScroll) * (dots.length - 1));

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });

            // Update scroll button visibility
            scrollLeft.style.opacity = bookWrapper.scrollLeft <= 0 ? "0.5" : "1";
            scrollRight.style.opacity = 
                bookWrapper.scrollLeft >= totalScroll ? "0.5" : "1";
        };

        // Handle dot clicks
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const totalScroll = bookWrapper.scrollWidth - bookWrapper.clientWidth;
                const scrollTo = (totalScroll / (dots.length - 1)) * index;
                
                bookWrapper.scrollTo({
                    left: scrollTo,
                    behavior: 'smooth'
                });
                
                updateDots();
            });
        });

        // Update dots on scroll
        bookWrapper.addEventListener('scroll', updateDots);
        
        // Initial update
        updateDots();
    }

    // Scroll to top functionality
    const scrollToTopBtn = document.getElementById("scrollToTop");
    
    if (scrollToTopBtn) {
        // Show/hide scroll to top button
        window.addEventListener('scroll', () => {
            if (document.documentElement.scrollTop > 100) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        });

        // Handle scroll to top click
        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
