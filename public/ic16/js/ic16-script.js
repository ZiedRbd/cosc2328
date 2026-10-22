// IC16 – COSC 2328 – Professor McCurry
// Implemented by: Zied Raboudi

// --- Header Component (Step 5) ---
function Header() {
    return (
        <div className="header">
            <h1>Bikini Bottom Character Showcase</h1>
            <h2>Built with React, JSX, and props</h2>
        </div>
    );
}

// --- CharacterCard Component (Step 6) ---
function CharacterCard(props) {
    return (
        <div className="character-card">
            <div className="image-frame">
                <img src={props.image} alt={props.name} />
            </div>
            <h3>{props.name}</h3>
            <p className="role">{props.role}</p>
            <p>{props.description}</p>
        </div>
    );
}

// --- CharacterList Component (Step 7) ---
function CharacterList(props) {
    return (
        <div className="character-list">
            {props.characters.map(function (character, index) {
                return (
                    <CharacterCard
                        key={index}
                        name={character.name}
                        role={character.role}
                        image={character.image}
                        description={character.description}
                    />
                );
            })}
        </div>
    );
}

// --- App Component (Step 8) ---
function App() {
    const characters = [
        {
            name: "SpongeBob SquarePants",
            role: "Fry Cook Hero",
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/SpongeBob_character.svg",
            description: "An optimistic, energetic sea sponge who works at the Krusty Krab. Armed with his trusty spatula, he's always ready to help out in Bikini Bottom."
        },
        {
            name: "Patrick Star",
            role: "Best Friend & Sidekick",
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Patrick_Star_character.png",
            description: "SpongeBob's loyal best friend who lives under a rock. Despite his simple nature, his enthusiasm makes him a dependable ally."
        },
        {
            name: "Sandy Cheeks",
            role: "Karate Master & Scientist",
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Sandy_Cheeks_(transparent).png",
            description: "A tough squirrel from Texas who's a master of karate and science. Her inventions are crucial whenever Bikini Bottom needs saving."
        },
        {
            name: "Squidward Tentacles",
            role: "Reluctant Ally",
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Squidward_Tentacles.svg",
            description: "SpongeBob's grumpy neighbor who works at the Krusty Krab. Though he'd rather be playing clarinet, he'll help out... reluctantly."
        }
    ];

    return (
        <div>
            <Header />
            <CharacterList characters={characters} />
        </div>
    );
}

// --- Render (Steps 5 and 8) ---
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);
