// HW8 – COSC 2328 – Professor McCurry
// Implemented by: Zied Raboudi

// --- TaskCard: one task row. Holds no state, just reports the delete upward (8.6) ---
function TaskCard(props) {
    return (
        <div className={"task-card " + props.task.priority.toLowerCase()}>
            <span className="task-name">{props.task.name}</span>
            <span className={"badge " + props.task.priority.toLowerCase()}>{props.task.priority}</span>
            <button className="delete-btn" onClick={() => props.onDelete(props.task.id)}>✕</button>
        </div>
    );
}

// --- TaskList: empty state, or one card per task (8.7) ---
function TaskList(props) {
    if (props.tasks.length === 0) {
        return <p className="empty-state">No tasks yet. Add one above.</p>;
    }

    return (
        <div className="task-list">
            {props.tasks.map(function (task) {
                return <TaskCard key={task.id} task={task} onDelete={props.onDelete} />;
            })}
        </div>
    );
}

// --- App: owns every piece of state on the page (8.3, 8.4, 8.5, 8.8, 8.9) ---
function App() {
    const [tasks, setTasks] = React.useState([]);
    const [taskName, setTaskName] = React.useState('');
    const [priority, setPriority] = React.useState('Medium');
    const [error, setError] = React.useState('');

    // 8.5 validate, then 8.8 build the task and append it
    function addTask() {
        if (taskName.trim() === '') {
            setError('Task name cannot be empty.');
            return;
        }

        setError('');

        const newTask = { id: Date.now(), name: taskName.trim(), priority };

        // a brand new array, so React sees a new value and re-renders
        setTasks([...tasks, newTask]);

        // clear the form for the next entry
        setTaskName('');
        setPriority('Medium');
    }

    // 8.9 keep everything except the id being removed
    function deleteTask(id) {
        setTasks(tasks.filter(t => t.id !== id));
    }

    function clearAll() {
        setTasks([]);
    }

    return (
        <div className="app">
            <header className="app-header">
                <h1>Quick Tasks</h1>
                <p>{tasks.length} task{tasks.length === 1 ? '' : 's'}</p>
            </header>

            <div className="form-row">
                <input
                    type="text"
                    placeholder="What needs doing?"
                    value={taskName}
                    onChange={e => setTaskName(e.target.value)}
                />

                <select value={priority} onChange={e => setPriority(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <button className="add-btn" onClick={addTask}>Add Task</button>
            </div>

            {error && <p className="error-message">{error}</p>}

            <TaskList tasks={tasks} onDelete={deleteTask} />

            {tasks.length > 0 && <button className="clear-btn" onClick={clearAll}>Clear All</button>}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
