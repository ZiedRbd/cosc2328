// IC20 – COSC 2328 – Professor McCurry
// Implemented by: Zied Raboudi

const express = require('express');
const router  = express.Router();

let missions = [
  { id: 1, name: 'Alpha Probe',  destination: 'Mars'   },
  { id: 2, name: 'Deep Survey',  destination: 'Europa' },
];
let nextId = 3;

// Step 2: the path here is /missions, because app.js already supplies the /ic20 prefix
router.get('/missions', (req, res) => {
  res.status(200).json(missions);
});

// Step 3: create one mission from the JSON body
router.post('/missions', (req, res) => {
  const name        = req.body.name;
  const destination = req.body.destination;

  // reject anything missing before touching the array
  if (!name || !destination) {
    return res.status(400).json({ error: 'name and destination required' });
  }

  const newMission = { id: nextId, name: name, destination: destination };
  nextId = nextId + 1;
  missions.push(newMission);

  // 201 means a new thing now exists on the server
  res.status(201).json(newMission);
});

module.exports = router;
