// IC10 – COSC 2328 – Professor McCurry
// Implemented by: Zied Raboudi

const city = "Austin";
const country = "USA";
let population = 950000;

console.log("Location: " + city + ", " + country);
console.log("Population: " + population);

if (population > 1000000) {
    console.log("metropolis");
} else {
    console.log("growing city");
}

const isLoggedIn = true;

if (isLoggedIn) {
    console.log("Welcome back!");
} else {
    console.log("Please log in");
}

let username = "";

if (username) {
    console.log("Username accepted: " + username);
} else {
    console.log("Username is required");
}

const hasAccount = true;
const isEmailVerified = false;
const agreedToTerms = true;

if ((hasAccount && agreedToTerms) || isEmailVerified) {
    console.log("Registration allowed");
} else {
    console.log("Registration blocked");
}

let itemCount = 0;

if (itemCount) {
    console.log("Cart has " + itemCount + " items");
} else {
    console.log("Cart is empty");
}

itemCount = 5;

if (itemCount) {
    console.log("Cart has " + itemCount + " items");
} else {
    console.log("Cart is empty");
}

itemCount = null;

if (itemCount) {
    console.log("Cart has " + itemCount + " items");
} else {
    console.log("Cart is empty");
}

console.log("null == undefined is " + (null == undefined));
console.log("null === undefined is " + (null === undefined));
