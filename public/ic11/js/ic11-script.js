// IC11 – COSC 2328 – Professor McCurry
// Implemented by: Zied Raboudi

console.log("--- Function Declarations ---");

function greet(name) {
  return "Hello, " + name + "!";
}

function area(width, height) {
  return width * height;
}

console.log(greet("Maria"));
console.log(area(5, 3));

console.log("--- Function Expression & Arrow Functions ---");

const multiply = function (a, b) {
  return a * b;
};

const divide = (a, b) => {
  return a / b;
};

const square = n => n * n;

console.log(multiply(3, 4));
console.log(divide(10, 3).toFixed(2));
console.log(square(5));

console.log("--- Default Parameters & Rest Operator ---");

function greetUser(name, greeting = "Hello") {
  return greeting + ", " + name;
}

function sumAll(...numbers) {
  let total = 0;
  for (const n of numbers) {
    total = total + n;
  }
  return total;
}

console.log(greetUser("Zied"));
console.log(greetUser("Zied", "Welcome"));
console.log(sumAll(1, 2, 3));
console.log(sumAll(5, 10, 15, 20));

console.log("--- Callback Functions ---");

function processNumber(value, callback) {
  console.log("processing " + value);
  return callback(value);
}

const double = n => n * 2;
const triple = n => n * 3;

console.log(processNumber(5, double));
console.log(processNumber(5, triple));

console.log("--- Object Methods with this ---");

const product = {
  brand: "Logitech",
  price: 25,
  quantity: 4,

  total: function () {
    return this.price * this.quantity;
  },

  describe: function () {
    return this.brand + " costs $" + this.price.toFixed(2) + " each, " + this.quantity + " in stock";
  }
};

console.log(product.total());
console.log(product.describe());
