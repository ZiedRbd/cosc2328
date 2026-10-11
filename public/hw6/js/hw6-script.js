// HW6 – COSC 2328 – Professor McCurry
// Implemented by: Zied Raboudi

const productPrices = {
  laptop: 999.99,
  tablet: 499.99,
  phone: 699.99,
  monitor: 299.99
};

const discountCodes = {
  SAVE10: 0.10,
  SAVE20: 0.20,
  STUDENT: 0.15
};

const calculateTax = subtotal => subtotal * 0.0825;

const applyDiscount = function(subtotal, code) {
  const cleanCode = code.trim().toUpperCase();

  if (!cleanCode) {
    return 0;
  }

  const rate = discountCodes[cleanCode];

  if (!rate) {
    return 0;
  }

  return subtotal * rate;
};

const orderForm = document.getElementById("orderForm");
const productInput = document.getElementById("product");
const quantityInput = document.getElementById("quantity");
const discountInput = document.getElementById("discountCode");
const resultsBox = document.getElementById("results");
const resultProduct = document.getElementById("result-product");
const resultQuantity = document.getElementById("result-quantity");
const resultSubtotal = document.getElementById("result-subtotal");
const resultDiscount = document.getElementById("result-discount");
const resultTax = document.getElementById("result-tax");
const resultTotal = document.getElementById("result-total");

orderForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const selectedProduct = productInput.value;
  const quantity = Number(quantityInput.value);
  const discountCode = discountInput.value.trim();
  const price = productPrices[selectedProduct];

  if (!selectedProduct || !price) {
    alert("Please choose a product before calculating.");
    return;
  }

  if (quantity < 1) {
    alert("Quantity must be at least 1.");
    return;
  }

  const subtotal = price * quantity;
  const discountAmount = applyDiscount(subtotal, discountCode);
  const discountedSubtotal = subtotal - discountAmount;
  const tax = calculateTax(discountedSubtotal);
  const total = discountedSubtotal + tax;

  resultProduct.textContent = productInput.options[productInput.selectedIndex].text;
  resultQuantity.textContent = quantity;
  resultSubtotal.textContent = "$" + subtotal.toFixed(2);
  resultDiscount.textContent = "-$" + discountAmount.toFixed(2);
  resultTax.textContent = "$" + tax.toFixed(2);
  resultTotal.textContent = "$" + total.toFixed(2);

  resultsBox.classList.remove("results-hidden");
});
