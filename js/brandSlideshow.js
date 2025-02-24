document.addEventListener('DOMContentLoaded', function() {
    // Check if the section with the 'brands' class exists
    const section = document.querySelector('.brands');
    if (!section) {
        console.error("Section with the class '.brands' not found.");
        return; // Stop execution if the section is not found
    }

    // List of image paths (make sure these are correct relative paths)
    const images = [
        'img/slideshow-polytec.png',
        'img/slideshow-nikpol.png',
        'img/slideshow-pivotech.png',
        'img/slideshow-dorset.png',
        'img/slideshow-coolingBrothers.png'
    ];

    // Create the track for slides
    const track = document.createElement('div');
    track.style.display = 'flex';
    track.style.gap = '2rem';
    track.style.transition = 'transform 0.2s ease-in-out'; // Smooth transition for sliding

    // Create three sets of slides for smooth looping
    for (let i = 0; i < images.length * 3; i++) {
        const slide = document.createElement('div');
        slide.style.flex = '0 0 auto';
        slide.style.width = '200px';
        slide.style.height = '100px';

        const img = document.createElement('img');
        img.src = images[i % images.length];  // Cycles through images
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';

        // Add event listener to check image loading
        img.onload = function() {
            console.log('Image loaded: ' + img.src);
        };
        img.onerror = function() {
            console.error('Error loading image: ' + img.src);
        };

        slide.appendChild(img);
        track.appendChild(slide);
    }

    // Create a container to hold the track and make it scrollable
    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.overflow = 'hidden';
    container.appendChild(track);
    section.appendChild(container);

    // Variables for sliding logic
    let position = 0;
    const slideWidth = 220; // Total width of each slide (width + gap)
    const singleSetWidth = slideWidth * images.length;  // Width of one full cycle of images

    // Function to move the slides horizontally
    function moveSlides() {
        position -= 2;  // Moves slides to the left

        // If the track has moved beyond one set of images, reset the position to create a loop effect
        if (position < -singleSetWidth) {
            position += singleSetWidth;
        }

        // Apply the calculated transform to move the slides
        track.style.transform = `translateX(${position}px)`;
    }

    // Start the animation of the slides
    setInterval(moveSlides, 20); // Adjust the interval for speed of the scrolling
});
