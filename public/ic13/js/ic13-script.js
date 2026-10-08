// IC13 – COSC 2328 – Professor McCurry
// Implemented by: Zied Raboudi

// --- Order State ---
let selectedProduct = null;
let quantity = 1;
let discountRate = 0;

console.log("--- Order State ---");
console.log(selectedProduct, quantity, discountRate);

// --- Display Update ---
function calculateTotal() {
  if (!selectedProduct) {
    return 0;
  }
  const subtotal = selectedProduct.price * quantity;
  return subtotal - subtotal * discountRate;
}

function updateDisplay() {
  const summaryProduct = document.getElementById("summary-product");
  const summaryTotal = document.getElementById("summary-total");

  if (selectedProduct) {
    summaryProduct.textContent = selectedProduct.name + " x " + quantity;
    summaryTotal.textContent = "Total: $" + calculateTotal().toFixed(2);
  } else {
    summaryProduct.textContent = "No product selected";
    summaryTotal.textContent = "Total: $0";
  }
}

console.log("--- Display Update ---");
updateDisplay();

// --- Mouse Events ---
const gallery = document.getElementById("product-gallery");
const productNameInput = document.getElementById("product-name");

gallery.addEventListener("click", function (event) {
  const card = event.target.closest(".product-card");

  if (card) {
    selectedProduct = {
      name: card.dataset.productName,
      price: Number(card.dataset.price)
    };
    productNameInput.value = selectedProduct.name;
    console.log("Selected: " + selectedProduct.name + " at $" + selectedProduct.price);
    updateDisplay();
  }
});

console.log("--- Mouse Events --- click listener attached to the gallery");

// --- Keyboard Events ---
const promoInput = document.getElementById("promo-code");
const promoMessage = document.getElementById("promo-message");

promoInput.addEventListener("keyup", function () {
  const code = promoInput.value.toUpperCase();

  if (code === "") {
    promoMessage.textContent = "";
    discountRate = 0;
  } else if (code === "SAVE10") {
    promoMessage.textContent = "Promo code applied: 10% off";
    discountRate = 0.10;
  } else {
    promoMessage.textContent = "That promo code is not valid";
    discountRate = 0;
  }

  console.log("Promo typed: " + code + " | discount rate: " + discountRate);
  updateDisplay();
});

console.log("--- Keyboard Events --- keyup listener attached to the promo field");

// --- Form Submit ---
const orderForm = document.getElementById("order-form");

orderForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!selectedProduct) {
    console.log("Submit blocked: no product selected");
    alert("Please select a product before placing your order.");
    return;
  }

  const total = calculateTotal().toFixed(2);
  console.log("Order placed: " + selectedProduct.name + " x " + quantity + " = $" + total);
  alert("Order placed\n\nProduct: " + selectedProduct.name + "\nQuantity: " + quantity + "\nTotal: $" + total);
});

console.log("--- Form Submit --- submit listener attached to the order form");
