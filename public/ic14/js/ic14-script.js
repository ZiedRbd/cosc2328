// IC14 – COSC 2328 – Professor McCurry
// Implemented by: Zied Raboudi

// --- Product Constructor ---

function Product(name, price, category, inStock) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.inStock = inStock;
}

Product.prototype.getInfo = function () {
    const stock = this.inStock ? "In stock" : "Out of stock";
    return this.name + " — $" + this.price.toFixed(2) + " (" + this.category + ") — " + stock;
};

Product.prototype.isExpensive = function () {
    return this.price > 50;
};

// --- Catalog Array ---

let catalog = [
    new Product("Mechanical Keyboard", 89.99, "Accessories", true),
    new Product("USB-C Cable", 12.50, "Accessories", true),
    new Product("Monitor Stand", 45.00, "Furniture", false),
    new Product("Noise Cancelling Headphones", 199.99, "Audio", true),
    new Product("Mouse Pad", 9.99, "Accessories", true),
    new Product("Webcam", 74.95, "Video", false)
];

// --- DOM Elements ---

const productContainer = document.querySelector("#product-container");
const statsContainer = document.querySelector("#stats-container");
const btnShowAll = document.querySelector("#btn-show-all");
const btnSortPrice = document.querySelector("#btn-sort-price");
const btnFilterExpensive = document.querySelector("#btn-filter-expensive");
const btnCalculateTotal = document.querySelector("#btn-calculate-total");

// --- Render with forEach ---

function renderProducts(products) {
    productContainer.textContent = "";

    products.forEach(function (product) {
        const card = document.createElement("div");
        card.classList.add("product-card");

        const title = document.createElement("h3");
        title.textContent = product.name;

        const price = document.createElement("p");
        price.classList.add("product-price");
        price.textContent = "$" + product.price.toFixed(2);

        const category = document.createElement("p");
        category.classList.add("product-category");
        category.textContent = product.category;

        const stock = document.createElement("p");
        stock.classList.add(product.inStock ? "in-stock" : "out-of-stock");
        stock.textContent = product.inStock ? "In stock" : "Out of stock";

        const info = document.createElement("p");
        info.textContent = product.getInfo();

        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(category);
        card.appendChild(stock);
        card.appendChild(info);

        if (product.isExpensive()) {
            const badge = document.createElement("span");
            badge.classList.add("premium-badge");
            badge.textContent = "Premium";
            card.appendChild(badge);
        }

        productContainer.appendChild(card);
    });
}

// --- Show All ---

btnShowAll.addEventListener("click", function () {
    renderProducts(catalog);
    statsContainer.textContent = "Showing all " + catalog.length + " products.";
    console.log("Show all:", catalog.length, "products");
});

// --- Sort with sort() ---

btnSortPrice.addEventListener("click", function () {
    const sorted = catalog.slice().sort(function (a, b) {
        return a.price - b.price;
    });

    renderProducts(sorted);
    statsContainer.textContent = "Sorted by price, lowest first.";
    console.log("Sorted:", sorted.map(function (p) { return p.price; }));
});

// --- Filter with filter() ---

btnFilterExpensive.addEventListener("click", function () {
    const expensive = catalog.filter(function (product) {
        return product.isExpensive();
    });

    renderProducts(expensive);
    statsContainer.textContent = expensive.length + " of " + catalog.length + " products cost more than $50.";
    console.log("Expensive:", expensive.length, "matches");
});

// --- Total with reduce() ---

btnCalculateTotal.addEventListener("click", function () {
    const total = catalog.reduce(function (sum, product) {
        return sum + product.price;
    }, 0);

    statsContainer.textContent = "Total catalog value: $" + total.toFixed(2);
    console.log("Total value:", total.toFixed(2));
});

console.log("IC14 ready —", catalog.length, "products in catalog");
