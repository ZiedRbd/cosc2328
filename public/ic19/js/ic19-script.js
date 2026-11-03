// IC19 – COSC 2328 – Professor McCurry
// Implemented by: Zied Raboudi

/*
  Reflection

  1. What does require('dotenv').config() do, and why must it be the first line in app.js?

     It opens the .env file at the project root, reads every KEY=value line, and copies
     those values into process.env so the rest of app.js can read them. It has to run
     first because the lines below it already use process.env. If it loaded after
     const PORT = process.env.PORT || 3000, then process.env.PORT would still be empty
     at that moment, PORT would fall back to 3000, and the value in .env would be
     ignored even though the file was there the whole time.

  2. What is the difference between res.send() and res.json()? When would you use each?

     res.send() takes a string and Express labels the response text/html. res.json()
     takes a JavaScript object, converts it to JSON itself, and labels the response
     application/json. I use res.send() for a short text or HTML message meant for a
     person reading it in the browser, like /ic19/status. I use res.json() when the page
     is going to fetch the route and call .json() on the response, like /ic19/config.

  3. Why must .env never be committed to GitHub?

     Anyone who can see the repo could read it. .env is where API keys, database
     passwords, and other secrets live, so pushing it hands those secrets to everyone
     with access. It is also permanent: once it is in a commit it stays in the history
     even after you delete the file, so the only safe move is to keep it out from the
     start with .gitignore.

  4. On the droplet, MISSION_ZONE shows undefined. What are two ways you could fix this
     without committing .env to GitHub?

     First way: SSH into the droplet and create a .env there by hand, in ~/cosc2328,
     with the same three lines. It lives only on that machine, so it never gets pushed,
     and git pull will not touch it.

     Second way: skip the file and hand the values to the container when I start it,
     by adding -e flags to docker run:
     docker run -d -p 8080:3000 -e MISSION_ZONE="Alpha Quadrant" -e ALERT_LEVEL=green cosc2328
     Node reads those the same way through process.env, and nothing is stored in the repo.
*/

// Step 11: ask the server for its config, then draw each key and value into the <dl>
async function loadConfig() {
    // root-relative path, so it works on localhost and on the droplet without changes
    const response = await fetch("/ic19/config");
    const data = await response.json();

    const display = document.querySelector("#config-display");
    display.innerHTML = "";   // clear the list before drawing, so a reload does not stack up

    // Object.entries turns { zone: "Alpha Quadrant" } into [ ["zone", "Alpha Quadrant"] ]
    Object.entries(data).forEach(function (entry) {
        const key = entry[0];
        const value = entry[1];

        const dt = document.createElement("dt");
        dt.textContent = key;

        const dd = document.createElement("dd");
        dd.textContent = value;

        display.appendChild(dt);
        display.appendChild(dd);
    });
}

// run it once as soon as the page loads
loadConfig();
