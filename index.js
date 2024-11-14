// For navbar active
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  navLinks.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// // Filter Logic
// const priceRange = document.getElementById('price-range');
// const priceValue = document.getElementById('price-value');

// priceRange.addEventListener('input', () => {
//     priceValue.value = priceRange.value;
// });


// // Handle form submission (filter logic)
// document.getElementById('filter-form').addEventListener('submit', function (e) {
//   e.preventDefault();
  
//   const houseType = document.getElementById('house-type').value;
//   const price = priceRange.value;
  
//   console.log(`House Type: ${houseType}, Max Price: ${price}`);
// });

// Load properties on the home page


// fetch("properties.json")
//   .then((response) => response.json())
//   .then((properties) => {
//     const propertyList = document.getElementById("property-list");
//     properties.forEach((property) => {
//       const propertyItem = document.createElement("div");
//       propertyItem.classList.add("card", "property-item", "shadow", "rounded");

//       propertyItem.innerHTML = `
//         <div onclick="window.location='property.html?id=${property.id}'">
//           <img src="${property.featuredImage}" class="card-img" alt="property_image">
//           <div class="card-body">
//             <h5 class="card-title mb-3">${property.name}</h5>
//             <div class="d-flex align-items-center mb-2">
//                 <p class="card-text mb-0 me-2"><strong>Price:</strong> ${property.price}</p>
//                 <span class="badge bg-secondary text-white p-2">${property.category}</span>
//             </div>
//             <p class="mb-0 d-flex align-items-center card-text mb-2">
//                 <i class="fa fa-home me-1"></i> ${property.type}
//             </p>
//             <div class="d-flex align-items-center gap-3 flex-wrap">
//                 <p class="mb-0 d-flex align-items-center">
//                     <i class="fa fa-bed me-1"></i> ${property.bedrooms} beds
//                 </p>
//                 <p class="mb-0 d-flex align-items-center">
//                     <i class="fas fa-bath me-1"></i> ${property.bathrooms} baths
//                 </p>
//             </div>
//           </div>
//         </div>
//       `;
//       propertyList.appendChild(propertyItem);
//     });
//   });
// Filter Logic
const priceRange = document.getElementById('priceRange');
const houseType = document.getElementById('houseType');
const filterForm = document.querySelector('form');

// Handle form submission (filter logic)
filterForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const selectedHouseType = houseType.value;
  const selectedPriceRange = priceRange.value;

  // Filter properties based on selected values
  fetch("properties.json")
    .then((response) => response.json())
    .then((properties) => {
      const filteredProperties = properties.filter(property => {
        let matchesHouseType = true;
        let matchesPrice = true;

        if (selectedHouseType !== "Choose House Type") {
          matchesHouseType = property.type.toLowerCase() === selectedHouseType.toLowerCase();
        }

        if (selectedPriceRange !== "Choose Price Range") {
          const priceValue = parseInt(property.price.replace(/[^0-9.-]+/g, ""));
          switch (selectedPriceRange) {
            case "under-100k":
              matchesPrice = priceValue < 100000;
              break;
            case "100k-500k":
              matchesPrice = priceValue >= 100000 && priceValue <= 500000;
              break;
            case "500k-1M":
              matchesPrice = priceValue >= 500000 && priceValue <= 1000000;
              break;
            case "above-1M":
              matchesPrice = priceValue > 1000000;
              break;
          }
        }

        return matchesHouseType && matchesPrice;
      });

      displayProperties(filteredProperties); // Call the function to display filtered properties
    })
    .catch((error) => console.error('Error loading properties:', error));
});

// Function to display the properties
function displayProperties(properties) {
  const propertyList = document.getElementById("property-list");
  propertyList.innerHTML = ''; // Clear existing properties

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
}

  

