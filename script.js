// Remove or comment out the header hide/show logic
/*
let lastScroll = 0;
const header = document.querySelector('.sticky-header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('hidden');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('hidden')) {
        // Scrolling down
        header.classList.add('hidden');
    } else if (currentScroll < lastScroll && header.classList.contains('hidden')) {
        // Scrolling up
        header.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
});
*/

// Scroll to top functionality
const scrollToTopBtn = document.getElementById("scrollToTop");

window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

scrollToTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}); 

// Contact form handling
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (form && formMessage) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            formMessage.innerHTML = "Thank you! Your message has been sent.";
            formMessage.style.color = 'green';
            form.reset();
        })
        .catch(error => {
            formMessage.innerHTML = "Oops! There was a problem submitting your Message .";
            formMessage.style.color = 'red';
        });
    });
}

// Mobile scroll handling
function handleScroll() {
    if (window.innerWidth <= 768) { // Only for mobile devices
        const body = document.body;
        if (window.scrollY === 0) {
            body.classList.add('at-top');
        } else {
            body.classList.remove('at-top');
        }
    }
}

window.addEventListener('scroll', handleScroll);
handleScroll();

// Book list scrolling functionality
function initializeBookScroller(containerId, leftBtnId, rightBtnId, indicatorsId) {
    const container = document.getElementById(containerId);
    const bookList = container.querySelector('.book-list');
    const scrollLeftBtn = document.getElementById(leftBtnId);
    const scrollRightBtn = document.getElementById(rightBtnId);
    const indicators = document.getElementById(indicatorsId).getElementsByClassName('scroll-dot');
    
    let scrollPosition = 0;
    const scrollAmount = 200; // Reduced from 300 to 200 for smaller steps
    
    function updateScrollButtons() {
        scrollLeftBtn.style.display = scrollPosition <= 0 ? 'none' : 'block';
        scrollRightBtn.style.display = 
            scrollPosition >= (bookList.scrollWidth - bookList.clientWidth - 50) ? 'none' : 'block';
    }

    function updateScrollDots() {
        const scrollPercentage = scrollPosition / (bookList.scrollWidth - bookList.clientWidth);
        const activeDotIndex = Math.round(scrollPercentage * (indicators.length - 1));
        
        Array.from(indicators).forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDotIndex);
        });
    }

    scrollLeftBtn.addEventListener('click', () => {
        scrollPosition = Math.max(0, scrollPosition - scrollAmount);
        bookList.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        updateScrollButtons();
        updateScrollDots();
    });

    scrollRightBtn.addEventListener('click', () => {
        scrollPosition = Math.min(
            bookList.scrollWidth - bookList.clientWidth,
            scrollPosition + scrollAmount
        );
        bookList.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        updateScrollButtons();
        updateScrollDots();
    });

    // Initialize scroll buttons visibility
    updateScrollButtons();
    updateScrollDots();
}

// Initialize both scrollers when the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('english-books')) {
        initializeBookScroller('english-books', 'scrollLeftEnglish', 'scrollRightEnglish', 'english-indicators');
        initializeBookScroller('arabic-books', 'scrollLeftArabic', 'scrollRightArabic', 'arabic-indicators');
    }
    if (document.getElementById('logic-books')) {
        initializeBookScroller('logic-books', 'scrollLeftLogic', 'scrollRightLogic', 'logic-indicators');
    }
    if (document.getElementById('science-books')) {
        initializeBookScroller('science-books', 'scrollLeftScience', 'scrollRightScience', 'science-indicators');
    }
});