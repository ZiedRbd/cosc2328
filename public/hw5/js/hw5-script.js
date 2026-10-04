// HW5 – COSC 2328 – Professor McCurry
// Implemented by: Zied Raboudi

console.log("=== BOOKSTORE INVENTORY CALCULATOR ===");

// 5.2 Book inventory variables & data

const book1 = { title: "Clean Code", author: "Robert C. Martin", price: 32.99 };
const book2 = { title: "Eloquent JavaScript", author: "Marijn Haverbeke", price: 24.50 };
const book3 = { title: "The Pragmatic Programmer", author: "David Thomas", price: 41.75 };

const TAX_RATE = 0.0825;
let isMember = true;

console.log("--- Book Inventory ---");
console.log(book1.title + " by " + book1.author + " - " + formatCurrency(book1.price));
console.log(book2.title + " by " + book2.author + " - " + formatCurrency(book2.price));
console.log(book3.title + " by " + book3.author + " - " + formatCurrency(book3.price));

// 5.3 Function declarations

function calculateSubtotal(price, quantity) {
  return price * quantity;
}

function formatCurrency(amount) {
  return "$" + amount.toFixed(2);
}

console.log("--- Function Declarations Test ---");
console.log("Subtotal for 3 x " + book1.title + ": " + formatCurrency(calculateSubtotal(book1.price, 3)));
console.log("Subtotal for 2 x " + book2.title + ": " + formatCurrency(calculateSubtotal(book2.price, 2)));

// 5.4 Arrow functions

const calculateTax = subtotal => subtotal * TAX_RATE;

const applyMemberDiscount = (subtotal, isMember) => {
  return isMember ? subtotal * 0.9 : subtotal;
};

console.log("--- Arrow Functions Test ---");
console.log("Tax on $100.00: " + formatCurrency(calculateTax(100)));
console.log("Member price of $100.00: " + formatCurrency(applyMemberDiscount(100, true)));
console.log("Non-member price of $100.00: " + formatCurrency(applyMemberDiscount(100, false)));

// 5.5 Function expression with default parameters

const calculateTotal = function(price, quantity = 1, isMember = false) {
  const subtotal = calculateSubtotal(price, quantity);
  const discounted = applyMemberDiscount(subtotal, isMember);
  return discounted + calculateTax(discounted);
};

console.log("--- Function Expression with Defaults ---");
console.log("2 x " + book1.title + ", member: " + formatCurrency(calculateTotal(book1.price, 2, isMember)));
console.log("2 x " + book2.title + ", default non-member: " + formatCurrency(calculateTotal(book2.price, 2)));
console.log("1 x " + book3.title + ", all defaults: " + formatCurrency(calculateTotal(book3.price)));

// 5.6 Rest operator

function calculateBulkOrder(...prices) {
  let total = 0;
  for (const price of prices) {
    total = total + price;
  }
  return total;
}

console.log("--- Rest Operator Test ---");
console.log("Three books: " + formatCurrency(calculateBulkOrder(book1.price, book2.price, book3.price)));
console.log("Five books: " + formatCurrency(calculateBulkOrder(10, 15.5, 20, 8.25, 12)));

// 5.7 Callback functions

function processOrder(book, quantity, callback) {
  const total = callback(book.price, quantity);
  return book.title + " x " + quantity + ": " + formatCurrency(total);
}

const standardPricing = (price, quantity) => price * quantity;
const memberPricing = (price, quantity) => price * quantity * 0.9;

console.log("--- Callback Functions ---");
console.log("Standard: " + processOrder(book2, 3, standardPricing));
console.log("Member: " + processOrder(book2, 3, memberPricing));

// 5.8 Object methods with this

const orderSummary = {
  customerName: "Zied Raboudi",
  items: [],

  addItem: function(book, quantity) {
    this.items.push({ book: book, quantity: quantity });
  },

  getTotal: function() {
    let total = 0;
    for (const item of this.items) {
      total = total + item.book.price * item.quantity;
    }
    return total;
  },

  displaySummary: function() {
    let summary = "Order for " + this.customerName + "\n";
    for (const item of this.items) {
      summary = summary + "  " + item.book.title + " x " + item.quantity + " = " + formatCurrency(item.book.price * item.quantity) + "\n";
    }
    summary = summary + "Total: " + formatCurrency(this.getTotal());
    return summary;
  }
};

console.log("--- Object Methods ---");
orderSummary.addItem(book1, 1);
orderSummary.addItem(book3, 2);
console.log("Order total: " + formatCurrency(orderSummary.getTotal()));
console.log(orderSummary.displaySummary());

// 5.9 Truthy/falsy conditional logic

function validateDiscount(code) {
  if (code) {
    const upper = code.toUpperCase();
    if (upper === "MEMBER10") {
      return 0.10;
    } else if (upper === "SAVE20") {
      return 0.20;
    }
  }
  return 0;
}

console.log("--- Truthy/Falsy Validation ---");
console.log("MEMBER10: " + validateDiscount("MEMBER10"));
console.log("SAVE20: " + validateDiscount("SAVE20"));
console.log("Empty string: " + validateDiscount(""));
console.log("INVALID: " + validateDiscount("INVALID"));

// 5.10 Closures

function createOrderProcessor(storeName) {
  const storeTaxRate = 0.0825;

  function processStoreOrder(book, quantity) {
    const subtotal = book.price * quantity;
    const total = subtotal + subtotal * storeTaxRate;
    return storeName + ": " + book.title + " x " + quantity + " = " + formatCurrency(total);
  }

  return processStoreOrder;
}

console.log("--- Nested Functions & Closures ---");
const austinStore = createOrderProcessor("Austin Book Corner");
console.log(austinStore(book1, 2));
console.log(austinStore(book2, 1));
console.log(austinStore(book3, 3));
