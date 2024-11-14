// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get the form element by ID
    const contactForm = document.querySelector("form");
  
    // Add submit event listener
    contactForm.addEventListener("submit", function(event) {
      // Prevent the default form submission
      event.preventDefault();
  

        alert("Message sent successfully!");
        
        // Optionally reset the form
        contactForm.reset();
    })})
  