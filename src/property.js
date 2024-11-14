// Load specific property details on the property page
const params = new URLSearchParams(window.location.search);
const propertyId = params.get("id");

if (propertyId) {
  fetch('../properties.json')
    .then((response) => response.json())
    .then((properties) => {
      const property = properties.find((p) => p.id == propertyId);
      if (property) {
        const detailsSection = document.getElementById("property-details");

        // Set the initial layout and content
        detailsSection.classList.add("w-100", "detail-page");
        detailsSection.innerHTML = `
          <div class="property-container w-75 mx-auto d-flex">
            <!-- Left side: Thumbnails -->
            <div class="small-image-container d-flex flex-column align-items-center mr-3" id="smallImageContainer"></div>
            
            <!-- Right side: Carousel -->
            <div id="carouselExample" class="carousel slide carousel-container">
              <div class="carousel-inner" id="carouselImages"></div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          <!-- Tabs and Content Section -->
          <div class="tabs-content w-75 mx-auto mt-5">
            <h1 class="property-title">${property.name}</h1>
            <div class="d-flex gap-3">
              <div id="details-tab" class="tab" onclick="showTab('details')">Details</div>
              <div id="summary-tab" class="tab active" onclick="showTab('summary')">Summary</div>
              <div id="videos-tab" class="tab" onclick="showTab('videos')">Videos</div>
            </div>
            <div class="tab-content mt-4">
              <div id="details-section" class="tab-section border rounded p-4 shadow">
                <p><strong>Price:</strong> ${property.price}</p>
                <p><strong>Type:</strong> ${property.type}</p>
                <p><strong>Bedrooms:</strong> ${property.bedrooms}</p>
                <p><strong>Bathrooms:</strong> ${property.bathrooms}</p>
                <p><strong>BER Rating:</strong> ${property.berRating}  </p>
                 <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#bookingModal">
    Book an Appointment
  </button>
  <div class="modal fade" id="bookingModal" tabindex="-1" aria-labelledby="bookingModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="bookingModalLabel">Book an Appointment</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Booking Form -->
          <form id="appointmentForm" onsubmit="submitAppointment(event)">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input type="text" class="form-control" id="name" required>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" required>
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label">Phone</label>
              <input type="tel" class="form-control" id="phone" required>
            </div>
            <div class="mb-3">
              <label for="date" class="form-label">Date</label>
              <input type="date" class="form-control" id="date" required>
            </div>
            <div class="mb-3">
              <label for="time" class="form-label">Time</label>
              <input type="time" class="form-control" id="time" required>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
              </div>
              <div id="summary-section" class="tab-section  border rounded p-4 shadow"  style="display: block;">
                <p><strong>Summary:</strong></p>
                <p>${property.description}</p>
              </div>
              <div id="videos-section" class="tab-section  border rounded p-4 shadow" style="display: none;">
                <div class="embed-responsive embed-responsive-16by9 mt-3">
    <iframe 
        class="embed-responsive-item container"
        style="height: 500px" 
        src="https://www.youtube.com/embed/dcyDtVRFVq0" 
        allowfullscreen
        title="Sample Video"
    ></iframe>
</div>
              </div>
            </div>
          </div>
        `;
        // to prevent selecting previous dates
        const today = new Date().toISOString().split("T")[0];
        document.getElementById("date").setAttribute("min", today);

        const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

        minutes = minutes < 10 ? '0' + minutes : minutes;
        const currentTime = `${hours}:${minutes}`;
      
        // Set minimum time for the time input
        document.getElementById("time").setAttribute("min", currentTime);

        // Populate carousel items and small images
        const carouselImages = document.getElementById("carouselImages");
        const smallImageContainer = document.getElementById("smallImageContainer");

        property.otherMedia.forEach((media, index) => {
          const activeClass = index === 0 ? "active" : "";
          const carouselItem = `
            <div class="carousel-item ${activeClass}">
              <img src="${media.src}" class="d-block w-100 carousel-img" alt="Property Image ${index + 1}">
            </div>
          `;
          carouselImages.innerHTML += carouselItem;

          const smallImage = `
            <img src="${media.src}" class="small-image mb-3" alt="Thumbnail ${index + 1}" data-bs-target="#carouselExample" data-bs-slide-to="${index}">
          `;
          smallImageContainer.innerHTML += smallImage;
        });

        // Event listener for small images to navigate the carousel
        const smallImages = document.querySelectorAll('.small-image');
        smallImages.forEach((smallImage) => {
          smallImage.addEventListener('click', function (event) {
            const slideToIndex = event.target.getAttribute('data-bs-slide-to');
            const carousel = new bootstrap.Carousel(document.getElementById('carouselExample'));
            carousel.to(slideToIndex);
          });
        });
      }
    })
    .catch((error) => console.error('Error loading properties:', error));
}

//Show alert on submit book an appointment form

function submitAppointment(event){
  event.preventDefault(); // Prevent form from submitting normally
  alert("Appointment booked successfully!"); // Show alert message
  const modal = bootstrap.Modal.getInstance(document.getElementById("bookingModal"));
  modal.hide(); // Hide the modal
  event.target.reset() // Reset the form fields
}

// Tab switching function
function showTab(tabName) {
  const tabSections = document.querySelectorAll('.tab-section');
  tabSections.forEach((section) => {
    section.style.display = 'none';
  });

  const tabs = document.querySelectorAll('.tab');
  tabs.forEach((tab) => {
    tab.classList.remove('active');
  });

  document.getElementById(tabName + '-section').style.display = 'block';
  document.getElementById(tabName + '-tab').classList.add('active');
}

// By default, show the "details" tab content
document.addEventListener('DOMContentLoaded', () => {
  showTab('summary');
});






