// IC18 – COSC 2328 – Professor McCurry
// Implemented by: Zied Raboudi

/* Reflection

1. What is prop-drilling? Describe a situation where it would be a problem.

   Prop-drilling is passing a piece of data down through components that do not
   actually use it, just so it can reach one further down that does. The middle
   components become couriers for data they have no interest in.

   It would be a problem here if App had to get mode down to ModeToggle through
   a layout wrapper and a controls panel. Both of those would need a mode prop
   and a toggleMode prop added to their signatures even though neither one reads
   them, and the day I renamed mode I would have to edit every component in that
   chain instead of just the two that use it.

2. What are the three things you need to use the Context API?

   Create: React.createContext() makes the context object. On its own it does
   nothing, it just registers the channel.

   Provide: wrapping part of the tree in <HabitatContext.Provider value={...}>
   broadcasts whatever is in value to everything inside it.

   Consume: React.useContext(HabitatContext) inside any component in that tree
   returns the value the Provider broadcast, with no props involved.

3. ModeToggle changes state that lives in App, but App never passed toggleMode
   as a prop. How does ModeToggle get access to it?

   App put toggleMode into the Provider's value object alongside mode. ModeToggle
   pulls both back out with React.useContext(HabitatContext). Functions travel
   through context exactly like any other value, so ModeToggle ends up holding a
   reference to the same function App defined. Calling it runs setMode inside App,
   App re-renders, and the new mode flows back down through the Provider to every
   component reading the context.

4. Where must React.createContext() be called, and why does placement matter?

   At the top level of the file, outside every component. If it sat inside a
   component, a brand new context object would be built on every single render,
   and the Provider and the consumers would end up pointing at different objects.
   The consumers would then read the default value instead of the real one, so
   the toggle would stop working.

5. What would you change to add a fifth component that also needed mode?

   One line inside that component: React.useContext(HabitatContext). Nothing else.
   App does not change, the Provider does not change, and no component in between
   needs a new prop. That is the whole point of doing it this way.

*/

console.log('React version:', React.version);
console.log('ReactDOM available:', typeof ReactDOM !== 'undefined');

// Step 5: the context object lives at the top level, outside every component
const HabitatContext = React.createContext();

// Step 7: reads mode from context, receives no props
function Header() {
    const { mode } = React.useContext(HabitatContext);

    return (
        <header>
            <h1>🌍 Pixel's Habitat</h1>
            <p>{mode === 'day' ? '☀️ Day Mode' : '🌙 Night Mode'}</p>
        </header>
    );
}

// Step 8: same context, different use of it
function HabitatView() {
    const { mode } = React.useContext(HabitatContext);

    return (
        <div className="scene">
            {mode === 'day' ? '☀️ 🌿 🐾' : '🌙 ⭐ 🐾'}
        </div>
    );
}

// Step 9: pulls the function out of context and calls it directly
function ModeToggle() {
    const { mode, toggleMode } = React.useContext(HabitatContext);

    return (
        <div className="controls">
            <button onClick={toggleMode}>
                {mode === 'day' ? 'Switch to Night Mode' : 'Switch to Day Mode'}
            </button>
        </div>
    );
}

// Step 6: holds the state and broadcasts it to everything inside the Provider
function App() {
    const [mode, setMode] = React.useState('day');

    function toggleMode() {
        setMode(mode === 'day' ? 'night' : 'day');
    }

    return (
        <HabitatContext.Provider value={{ mode, toggleMode }}>
            <div className={"habitat " + mode}>
                <Header />
                <HabitatView />
                <ModeToggle />
            </div>
        </HabitatContext.Provider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
