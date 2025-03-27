// gallery.js - Handles the gallery functionality

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery-slides');
    const slides = document.querySelectorAll('.gallery-slide');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    const dotsContainer = document.querySelector('.gallery-dots');
    
    let currentIndex = 0;
    let slidesPerView = getSlidesPerView();
    let totalGroups = Math.ceil(slides.length / slidesPerView);
    
    // Initialize gallery
    function initGallery() {
        // Create pagination dots
        createDots();
        
        // Set initial position
        updateGallery();
        
        // Add resize listener for responsive behavior
        window.addEventListener('resize', handleResize);
    }
    
    // Get number of slides to show based on screen width
    function getSlidesPerView() {
        return window.innerWidth < 768 ? 1 : 3;
    }
    
    // Handle window resize
    function handleResize() {
        const newSlidesPerView = getSlidesPerView();
        
        if (newSlidesPerView !== slidesPerView) {
            slidesPerView = newSlidesPerView;
            totalGroups = Math.ceil(slides.length / slidesPerView);
            
            // Reset current index if it's out of bounds
            if (currentIndex > totalGroups - 1) {
                currentIndex = totalGroups - 1;
            }
            
            // Update dots
            createDots();
            
            // Update gallery
            updateGallery();
        }
    }
    
    // Create pagination dots
    function createDots() {
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < totalGroups; i++) {
            const dot = document.createElement('span');
            dot.classList.add('gallery-dot');
            
            if (i === currentIndex) {
                dot.classList.add('active');
            }
            
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateGallery();
            });
            
            dotsContainer.appendChild(dot);
        }
    }
    
    // Update gallery position and state
    function updateGallery() {
        // Calculate position
        const slideWidth = slides[0].offsetWidth;
        const slideMargin = parseInt(window.getComputedStyle(slides[0]).marginRight) || 0;
        const offset = -currentIndex * slidesPerView * (slideWidth + slideMargin);
        
        // Apply transform
        gallery.style.transform = `translateX(${offset}px)`;
        
        // Update active dot
        const dots = document.querySelectorAll('.gallery-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Enable/disable arrows
        prevBtn.disabled = currentIndex === 0;
        prevBtn.classList.toggle('disabled', currentIndex === 0);
        
        nextBtn.disabled = currentIndex === totalGroups - 1;
        nextBtn.classList.toggle('disabled', currentIndex === totalGroups - 1);
    }
    
    // Previous slide
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateGallery();
        }
    });
    
    // Next slide
    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalGroups - 1) {
            currentIndex++;
            updateGallery();
        }
    });
    
    // Initialize gallery
    initGallery();
});