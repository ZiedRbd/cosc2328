// IC15 – COSC 2328 – Professor McCurry
// Implemented by: Zied Raboudi

// --- DOM Elements ---

const searchButton = document.querySelector("#btn-search");
const pokemonInput = document.querySelector("#pokemon-input");
const statusMessage = document.querySelector("#status-message");
const pokemonCard = document.querySelector("#pokemon-card");

// --- Render ---

function renderPokemon(data) {
    pokemonCard.textContent = "";

    const sprite = document.createElement("img");
    sprite.src = data.sprites.front_default;
    sprite.alt = data.name;

    const name = document.createElement("h2");
    name.textContent = data.name;

    const typeNames = data.types.map(function (entry) {
        return entry.type.name;
    });

    const typeLine = document.createElement("p");

    typeNames.forEach(function (typeName) {
        const badge = document.createElement("span");
        badge.classList.add("type-badge");
        badge.textContent = typeName;
        typeLine.appendChild(badge);
    });

    pokemonCard.appendChild(sprite);
    pokemonCard.appendChild(name);
    pokemonCard.appendChild(typeLine);

    console.log(data.name + " — types: " + typeNames.join(", "));
}

// --- Fetch with async / await ---

async function searchPokemon(name) {
    statusMessage.classList.remove("status-error");
    statusMessage.textContent = "Searching...";

    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + name.toLowerCase().trim());

        if (!response.ok) {
            throw new Error("No Pokemon found called \"" + name + "\". Check the spelling and try again.");
        }

        const data = await response.json();

        statusMessage.textContent = "";
        renderPokemon(data);
    } catch (error) {
        pokemonCard.textContent = "";
        statusMessage.classList.add("status-error");
        statusMessage.textContent = error.message;
        console.log("Caught:", error.message);
    }
}

// --- Wire the button ---

searchButton.addEventListener("click", function () {
    searchPokemon(pokemonInput.value);
});

console.log("IC15 ready — type a name and press Search");
