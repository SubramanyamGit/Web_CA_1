//For navbar active
    document.addEventListener("DOMContentLoaded", function () {
        // Get all nav-link elements
        const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

        // Loop through each nav-link to find and set the active class based on the current URL
        navLinks.forEach(link => {
            if (link.href === window.location.href) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    });



// Load properties on the home page
fetch("properties.json")
  .then((response) => response.json())
  .then((properties) => {
    const propertyList = document.getElementById("property-list");
    properties.forEach((property) => {
      const propertyItem = document.createElement("div");
      propertyItem.classList.add("card", "property-item", "shadow", "rounded");

      propertyItem.innerHTML = `
        <div onclick="window.location='property.html?id=${property.id}'">
          <img src="${property.featuredImage}" class="card-img" alt="property_image">
          <div class="card-body">

    <h5 class="card-title mb-3">${property.name}</h5>
<div class="d-flex align-items-center mb-2">
    <p class="card-text mb-0 me-2"><strong>Price:</strong> ${property.price}</p>
    <span class="badge bg-secondary text-white p-2">${property.category}</span>
</div>
    <p class="mb-0 d-flex align-items-center card-text mb-2">
        <i class="fa fa-home me-1"></i> ${property.type}
    </p>

      <div class="d-flex align-items-center gap-3 flex-wrap">
  
    <p class="mb-0 d-flex align-items-center">
        <i class="fa fa-bed me-1"></i> ${property.bedrooms} beds
    </p>
    <p class="mb-0 d-flex align-items-center">
        <i class="fas fa-bath me-1"></i> ${property.bathrooms} baths
    </p>
</div>


          </div>
        </div>
      `;
      propertyList.appendChild(propertyItem);
    });
  });

// Load specific property details on the property page
const params = new URLSearchParams(window.location.search);
const propertyId = params.get("id");
if (propertyId) {
  fetch("properties.json")
    .then((response) => response.json())
    .then((properties) => {
      const property = properties.find((p) => p.id == propertyId);
      if (property) {
        const details = document.getElementById("property-details");
        details.classList.add("w-100");
        details.classList.add("detail-page");
        details.innerHTML = `
       <div id="carouselExample" class="carousel slide carousel-container w-75 mx-auto">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="${property.otherMedia[0].src}" class="d-block w-100 carousel-img" alt="Property Image 1">
    </div>
    <div class="carousel-item">
      <img src="${property.otherMedia[1].src}" class="d-block w-100 carousel-img" alt="Property Image 2">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

<div class="property-details w-75 ">
  <h1>${property.name}</h1>
  <p>${property.description}</p>
  <p class="price">Price: ${property.price}</p>
</div>

        `;
      }
    });
}
