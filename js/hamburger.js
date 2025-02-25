const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const header = document.querySelector('header');

// Scroll event handler
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else if (!hamburger.classList.contains('active')) { // Only remove if menu isn't active
        header.classList.remove('header-scrolled');
    }
});

// Hamburger click handler
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    
    // Toggle header background based on menu state
    if (hamburger.classList.contains("active")) {
        header.classList.add('header-scrolled');
    } else if (window.scrollY <= 50) { // Only remove if we're at top of page
        header.classList.remove('header-scrolled');
    }
});

// Nav link click handler
document.querySelectorAll(".nav-link").forEach(n => n.
    addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        if (window.scrollY <= 50) { // Only remove if we're at top of page
            header.classList.remove('header-scrolled');
        }
    }));

window.addEventListener("load", function () {
        document.body.classList.add("loaded");
    });
      