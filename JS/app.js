import items from "./data.js";

// Get references to the button and body element
const rotateButton = document.getElementById("rotateButton");
const body = document.body;

// Add a click event listener to the button
rotateButton.addEventListener("click", () => {
  // Toggle the 'rotate' class on the body to trigger the animation
  body.classList.toggle("rotate");

  // Remove the 'rotate' class after the animation completes (2 seconds)
  setTimeout(() => {
    body.classList.remove("rotate");
  }, 2000);
});

// DOG API

// Establish the button:

// JavaScript to handle the "Dog" link click
document.getElementById("randomDog").addEventListener("click", async () => {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    if (response.ok) {
      const data = await response.json();
      const dogImageElement = document.getElementById("dogImage");
      dogImageElement.src = data.message;

      // Show the popup overlay
      document.getElementById("dogPopup").style.display = "block";
    } else {
      throw new Error("Failed to fetch a dog image.");
    }
  } catch (error) {
    console.error(error);
    // Handle any errors here
  }
});

// Close the popup when clicking anywhere on the overlay
document.getElementById("dogPopup").addEventListener("click", () => {
  document.getElementById("dogPopup").style.display = "none";
});

// GLITCH?
// Get references to the button and the body element
const fontChangeButton = document.getElementById("fontChangeButton");
// Add a click event listener to the button
fontChangeButton.addEventListener("click", () => {
  // Apply the 'font-change' class to change the font
  body.classList.add("font-change");

  // Remove the 'font-change' class after a delay (3 seconds)
  setTimeout(() => {
    body.classList.remove("font-change");
  }, 3000);
});

// DATA DISPLAY

function displayItemsAsCardsHTML() {
  const container = document.getElementById("itemContainer");

  // Loop through the items in the array from store.js and generate HTML for each item
  items.forEach((item) => {
    const { id, name, title, link, description, price, image } = item;
    const colElement = document.createElement("div");
    colElement.classList.add("col-lg-4", "col-md-6", "col-sm-12");

    // create HTML content for the column
    colElement.innerHTML =
      /* html */
      `
    <div class="card" data-item=${name}>
      <div class="image-wrapper">
      <img
      src="${image}"
      class="card-img-top mb-3"
      alt="${name}"
    />
    <div class="card-img-overlay card-inverse"></div>
      </div>
    <div class="card-body">
      <a href="${link}" target="blank" rel="noopener">
        <h5 class="card-title">
          ${title}
        </h5>
      </a>
      <p class="d-inline-flex gap-1">
        <a
          class="btn btn-info"
          data-bs-toggle="collapse"
          href="#collapse-${id}"
          role="button"
          aria-expanded="false"
          aria-controls="collapse-${id}"
        >
          Description
        </a>
      </p>
      <div class="collapse" id="collapse-${id}">
        <div class="card card-body">
          <p class="card-text">
            ${description}
          </p>
        </div>
      </div>
      <p class="card-text">Price: $${price}</p>
      <a
        href="#"
        class="btn btn-success btn-block add-to-cart"
        id="toggleCheckboxButton"
        >Add to Cart</a
      >
    </div>
  </div>
    `;

    // Append the item to the row container
    container.appendChild(colElement);
  });
}

displayItemsAsCardsHTML();

// ADD TO CART FUNCTIONALITY
// Get all buttons with the class "add-to-cart"
const addToCartButtons = document.querySelectorAll(".add-to-cart");

// Initialize the card states from local storage or set to an empty object if not found
const cardStates = JSON.parse(localStorage.getItem("cardStates")) || {};

// Function to update card state and local storage
function updateCardState(item, state) {
  cardStates[item] = state;
  localStorage.setItem("cardStates", JSON.stringify(cardStates));
}

// Add a click event listener to each button
addToCartButtons.forEach((button) => {
  // Get the item name from the data-item attribute
  const card = button.closest(".card");
  const overlay = card.querySelector(".card-img-overlay");
  const item = card.getAttribute("data-item");

  // Set the initial state based on local storage (if available)
  if (cardStates[item]) {
    // const card = button.closest(".card");
    // const overlay = card.querySelector(".card-img-overlay");
    card.classList.add("added-to-cart");
    overlay.classList.add("active-overlay");
    button.textContent = "Added";
  }

  button.addEventListener("click", function () {
    event.preventDefault();
    // Toggle the "added-to-cart" class to change the card color
    const card = button.closest(".card");
    const overlay = card.querySelector(".card-img-overlay");
    card.classList.toggle("added-to-cart");
    overlay.classList.toggle("active-overlay");

    // Toggle the button text between "Add to Cart" and "Added"
    button.textContent = card.classList.contains("added-to-cart")
      ? "Added"
      : "Add to Cart";

    // Update the card state in local storage
    updateCardState(item, card.classList.contains("added-to-cart"));
  });
});
