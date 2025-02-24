document.addEventListener('DOMContentLoaded', function() {
    const section = document.querySelector('.brands');

    console.log('Current path:', window.location.pathname);
    console.log('Full URL:', window.location.href);

    const images = [
        '{{ site.baseurl}}/img/slideshow-polytec.png',
        '{{ site.baseurl}}/img/slideshow-nikpol.png',
        '{{ site.baseurl}}/img/slideshow-pivotech.png',
        '../../img/slideshow-dorset.png',
        '../../img/slideshow-coolingBrothers.png'
    ];

    const track = document.createElement('div');
    track.style.display = 'flex';
    track.style.gap = '2rem';

    // Create three sets of slides for smooth looping
    for (let i = 0; i < images.length * 3; i++) {
        const slide = document.createElement('div');
        slide.style.flex = '0 0 auto';
        slide.style.width = '200px';
        slide.style.height = '100px';
        
        const img = document.createElement('img');
        img.src = images[i % images.length];
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        
        slide.appendChild(img);
        track.appendChild(slide);
    }

    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.overflow = 'hidden';
    container.appendChild(track);
    section.appendChild(container);

    let position = 0;
    const slideWidth = 220; // width + gap
    const slides = track.children;
    const singleSetWidth = slideWidth * images.length;
    
    function moveSlides() {
        position -= 2;
        
        // Check if we need to reset position
        if (position < -singleSetWidth - 50) {
            position += singleSetWidth;
        }
        
        track.style.transform = `translateX(${position}px)`;
    }

    // Run animation
    setInterval(moveSlides, 20);
});