// IC20 – COSC 2328 – Professor McCurry
// Implemented by: Zied Raboudi

/* Reflection

1. What does express.json() do, and what would happen to req.body in your POST route
   without it?

   It is middleware that runs before any of my routes. It reads the raw JSON text off
   the incoming request and parses it into a real JavaScript object on req.body.
   Without it Express never fills that property in and req.body comes back undefined.
   My POST route reads req.body.name on its first line. Reading a property off
   undefined throws, so the request fails instead of answering.

2. What is the difference between HTTP status 200 and 201? When would you use each?

   200 means the request succeeded and here is the result. 201 means the request
   succeeded and something new now exists on the server because of it. My GET returns
   200 because it only hands back a list that was already sitting there. My POST
   returns 201 because a mission that did not exist a moment ago does now.

3. Your seed missions disappear every time the Docker container restarts. What would
   you need to add to make them persist?

   The array lives in the memory of the Node process. It dies when the process dies.
   To keep it I would have to write it somewhere outside the process. A file on disk
   or a database would do, read back in when the server starts. With Docker that is
   still not enough on its own. The container gets thrown away and rebuilt every time.
   The file would also have to sit in a volume mounted from the host so it outlives
   the container.

4. If two people in different browser tabs both added missions at the same time, would
   they both see the same list? Why or why not?

   Eventually yes. Both tabs talk to the same server process and there is only one
   missions array inside it. Every POST lands in the same place. What they do not get
   is a live update. A tab only redraws when its own code asks the server again. Until
   it refetches it keeps showing the list as it was when it last looked. The data is
   shared, the screen is not.

*/

// Step 8: ask the server for every mission, then draw the list from the answer
async function loadMissions() {
    // root-relative, so the same file works on localhost and on the droplet
    const response = await fetch("/ic20/missions");
    const missions = await response.json();

    const list = document.querySelector("#mission-list");
    list.innerHTML = "";   // clear it first, so a refresh does not stack up

    missions.forEach(function (mission) {
        const item = document.createElement("li");

        const name = document.createElement("div");
        name.classList.add("name");
        name.textContent = mission.name;

        const dest = document.createElement("div");
        dest.classList.add("dest");
        dest.textContent = mission.destination;

        item.appendChild(name);
        item.appendChild(dest);
        list.appendChild(item);
    });
}

// Step 9: send the form to the server, then redraw from what the server now holds
document.querySelector("#mission-form").addEventListener("submit", async function (event) {
    event.preventDefault();   // stop the browser reloading the page

    const nameInput = document.querySelector("#mission-name");
    const destInput = document.querySelector("#mission-dest");

    await fetch("/ic20/missions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: nameInput.value,
            destination: destInput.value
        })
    });

    nameInput.value = "";
    destInput.value = "";

    loadMissions();   // the server is the source of truth, so ask it again
});

// run once as soon as the page loads
loadMissions();
