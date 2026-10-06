// IC12 – COSC 2328 – Professor McCurry
// Implemented by: Zied Raboudi

// --- Element Selection by ID ---
const statusBox = document.getElementById("status-box");
statusBox.textContent = "DOM loaded and ready to go";
console.log("--- Element Selection by ID ---");
console.log(statusBox);

// --- Element Selection with querySelector ---
const firstCard = document.querySelector(".card");
const firstCardText = firstCard.querySelector("p");
firstCardText.textContent = "This card was selected with querySelector.";
console.log("--- Element Selection with querySelector ---");
console.log(firstCard);

// --- Adding Classes ---
firstCard.classList.add("highlight");
statusBox.classList.add("active");
console.log("--- Adding Classes ---");
console.log(firstCard.classList);
console.log(statusBox.classList);

// --- Selecting Many Elements ---
const listItems = document.querySelectorAll(".list-item");
console.log("--- Selecting Many Elements ---");
console.log(listItems.length);

listItems.forEach(function (item, index) {
  console.log(item.textContent);
  if (index % 2 === 0) {
    item.classList.add("highlight");
  }
});

// --- Toggling and Removing Classes ---
const thirdCard = document.getElementById("card-3");
console.log("--- Toggling and Removing Classes ---");

thirdCard.classList.toggle("hidden");
console.log(thirdCard.classList.contains("hidden"));

thirdCard.classList.toggle("hidden");
console.log(thirdCard.classList.contains("hidden"));

const secondCard = document.getElementById("card-2");
secondCard.classList.remove("card");
console.log(secondCard.classList);

// --- textContent vs innerHTML ---
const secondCardText = secondCard.querySelector("p");
secondCardText.textContent = "Even a <script> tag stays plain text with textContent.";
console.log("--- textContent vs innerHTML ---");
console.log(secondCardText.textContent);

// --- Stretch: card ids and headings ---
const allCards = document.querySelectorAll(".card");
console.log("--- Stretch: Card IDs and Headings ---");

allCards.forEach(function (card) {
  const heading = card.querySelector("h2");
  console.log(card.id + " : " + heading.textContent);
});

// --- Stretch: item counter ---
const counter = document.getElementById("counter");
counter.textContent = "Total list items found: " + listItems.length;
console.log("--- Stretch: Item Counter ---");
console.log(counter.textContent);
