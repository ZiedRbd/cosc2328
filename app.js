// IC1 – COSC 2328 – Professor McCurry
// Implemented by: Zied Raboudi
const express = require("express");                       // load the Express web framework
const path    = require("path");                          // built-in Node module for working with file paths
const app     = express();                               // create the Express application
const PORT    = 3000;                                    // the port your browser connects to

app.use(express.static(path.join(__dirname, "public"))); // serve every file in public/ as a static file

app.listen(PORT, "0.0.0.0", () =>                        // 0.0.0.0 makes the server reachable from the droplet (IC2)
  console.log(`Running on http://localhost:${PORT}`)
);