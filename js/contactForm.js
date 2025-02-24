document.getElementById('contactForm').addEventListener('submit', function(e) {
    // Prevent both default form submission and page jump
    e.preventDefault();
    e.stopPropagation();
    
    // Get message element
    const messageEl = document.getElementById('formMessage');
    
    // Show loading message
    messageEl.className = 'form-message loading';
    messageEl.textContent = 'Sending your request...';
    
    const formData = {
        name: document.getElementById('name').value,
        suburb: document.getElementById('suburb').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value
    };

    // Remove the form action and method attributes if they exist
    const form = document.getElementById('contactForm');
    form.removeAttribute('action');
    form.removeAttribute('method');

    fetch("https://formsubmit.co/ajax/harry.marshall.dev@gmail.com", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Clear form
        document.getElementById('contactForm').reset();
        // Show success message
        messageEl.className = 'form-message success';
        messageEl.textContent = 'Thank you! Your message has been sent.';
        
        // Optional: Hide success message after 5 seconds
        setTimeout(() => {
            messageEl.className = 'form-message'
            messageEl.textContent = '';
        }, 5000);
    })
    .catch(error => {
        console.log(error);
        // Show error message
        messageEl.className = 'form-message error';
        messageEl.textContent = 'Sorry, there was an error sending your message.';
    });

    // Return false to ensure no jumping
    return false;
});