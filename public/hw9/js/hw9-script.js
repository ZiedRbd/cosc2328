// HW9 – COSC 2328 – Professor McCurry
// Implemented by: Zied Raboudi

/* Reflection

1. What does require('dotenv').config() do, and how does process.env.PI_LICENSE in
   hw9-routes.js get its value even though dotenv is not called there?

   It opens the .env file at the project root and copies every KEY=value line onto
   process.env. app.js runs it on the very first line, before it mounts any router.
   process.env belongs to the whole Node process and not to one file. By the time Node
   loads hw9-routes.js the three credentials are already sitting there, so the routes
   file only has to read them. Calling dotenv a second time would add nothing.

2. In IC20 your data was submitted with a <form> and e.preventDefault(). In HW9 there is
   no <form>. What changed? Why doesn't a plain <button> outside a form trigger a page
   reload?

   In IC20 the inputs sat inside a form element, and a button inside a form counts as a
   submit button by default. Clicking it made the browser send the form and reload the
   page, so e.preventDefault() was there to stop that. HW9 has no form at all. A button
   sitting on its own has nothing to submit. Clicking it does nothing except run my
   click handler, so there is no default behavior left to prevent.

3. What happens to the case list if the Docker container restarts? Why? What would you
   need to add to make the data survive a restart?

   It comes back empty and nextId goes back to 1. The cases array lives in the memory of
   the Node process. A restart kills that process and starts a fresh one, so the array
   is built again from the empty literal in the file. To survive a restart the data has
   to live outside the process. A file on disk or a database would do it, read back in
   when the server starts. With Docker that file also has to sit in a volume mounted
   from the host. Otherwise it gets thrown away with the container.

4. Your POST route returns 400 when suspect is missing. Where does the browser-side code
   receive that 400? How does response.ok help distinguish a 400 from a 201?

   It arrives on the line right after await fetch, inside the response object. It does
   not go to a catch block. The server did answer, and fetch only rejects when the
   request never got through at all. response.ok is what separates them. It is true
   only for statuses 200 to 299, so a 201 passes and a 400 fails. I branch on
   !response.ok. Then I read the JSON body for the error string and put it in the
   status paragraph under the button.

*/

// Step 11: pull the clearance values and draw them into the <dl>
async function loadCredentials() {
    const response = await fetch("/hw9/credentials");
    const data = await response.json();

    const panel = document.getElementById("credentials");
    panel.innerHTML = "";   // clear first, so a reload does not stack up

    // Object.entries turns { license: "NR-7729-OMEGA" } into [ ["license", "NR-7729-OMEGA"] ]
    Object.entries(data).forEach(function (entry) {
        const key = entry[0];
        const value = entry[1];

        const dt = document.createElement("dt");
        dt.textContent = key;

        const dd = document.createElement("dd");
        dd.textContent = value;

        panel.appendChild(dt);
        panel.appendChild(dd);
    });
}

// Step 12: redraw the case list from whatever the server is holding
async function loadCases() {
    const response = await fetch("/hw9/cases");
    const cases = await response.json();

    const list = document.getElementById("case-list");
    list.innerHTML = "";

    if (cases.length === 0) {
        const empty = document.createElement("li");
        empty.classList.add("empty-msg");
        empty.textContent = "No cases filed yet.";
        list.appendChild(empty);
        return;
    }

    cases.forEach(function (item) {
        const row = document.createElement("li");

        const id = document.createElement("div");
        id.classList.add("case-id");
        id.textContent = "Case #" + item.id;

        const suspect = document.createElement("div");
        suspect.classList.add("case-suspect");
        suspect.textContent = item.suspect;

        const location = document.createElement("div");
        location.classList.add("case-location");
        location.textContent = item.location;

        const notes = document.createElement("div");
        notes.classList.add("case-notes");
        notes.textContent = item.notes;

        const stamp = document.createElement("div");
        stamp.classList.add("case-ts");
        stamp.textContent = item.timestamp;

        row.appendChild(id);
        row.appendChild(suspect);
        row.appendChild(location);
        row.appendChild(notes);
        row.appendChild(stamp);
        list.appendChild(row);
    });
}

// Step 13: file one case, then refresh the list from the server
document.getElementById("log-btn").addEventListener("click", async function () {
    const suspectInput  = document.getElementById("suspect");
    const locationInput = document.getElementById("location");
    const notesInput    = document.getElementById("notes");
    const status        = document.getElementById("log-status");

    const response = await fetch("/hw9/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            suspect:  suspectInput.value,
            location: locationInput.value,
            notes:    notesInput.value
        })
    });

    // a 400 resolves just like a 201 does, so response.ok is what tells them apart
    if (!response.ok) {
        const problem = await response.json();
        status.textContent = problem.error;
        return;
    }

    suspectInput.value  = "";
    locationInput.value = "";
    notesInput.value    = "";
    status.textContent  = "";

    loadCases();
});

// run both once as soon as the page opens
loadCredentials();
loadCases();
