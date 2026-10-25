// HW7 – COSC 2328 – Professor McCurry
// Implemented by: Zied Raboudi

// --- PokemonCard: one card, built entirely from props (7.6) ---
function PokemonCard(props) {
    return (
        <div className="pokemon-card">
            <img src={"https://placehold.co/150x150/4FC3F7/333333?text=" + props.name} alt={props.name} />
            <h3>{props.name}</h3>
            <p className="letters">{props.name.length} letters</p>
        </div>
    );
}

// --- PokemonRoster: one card per entry, via map() + key (7.7) ---
function PokemonRoster(props) {
    return (
        <div className="roster">
            {props.pokemon.map(function (entry) {
                return <PokemonCard key={entry.name} name={entry.name} />;
            })}
        </div>
    );
}

// --- App: composes the header and the roster (7.8) ---
function App(props) {
    return (
        <div>
            <header className="page-header">
                <h1>PokeRoster</h1>
                <h2>Showing {props.roster.length} short-named Pokemon, shortest name first</h2>
            </header>
            <PokemonRoster pokemon={props.roster} />
        </div>
    );
}

// --- Fetch first, process, then render (7.3, 7.4, 7.5, 7.8, 7.9) ---
async function loadRoster() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");

        if (!response.ok) {
            throw new Error("PokeAPI responded with status " + response.status);
        }

        const data = await response.json();

        // 7.4 keep only the short names
        const shortNames = data.results.filter(function (entry) {
            return entry.name.length <= 6;
        });

        // 7.5 shortest name first
        const sortedRoster = shortNames.sort(function (a, b) {
            return a.name.length - b.name.length;
        });

        // 7.8 only now does the data exist, so only now do we render
        const root = ReactDOM.createRoot(document.querySelector("#root"));
        root.render(<App roster={sortedRoster} />);
    } catch (error) {
        // 7.9 React never got its data, so fall back to plain DOM
        document.querySelector("#root").innerHTML =
            '<p class="error-message">Sorry, the roster could not be loaded right now. Please check your internet connection and refresh the page to try again.</p>';
    }
}

loadRoster();
