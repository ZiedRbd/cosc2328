// HW9 – COSC 2328 – Professor McCurry
// Implemented by: Zied Raboudi

const express = require('express');
const router  = express.Router();

let cases  = [];   // in-memory case log — resets on server restart
let nextId = 1;

// GET /hw9/credentials — return detective clearance from .env
router.get('/credentials', (req, res) => {
  res.json({
    license: process.env.PI_LICENSE,
    station: process.env.STATION_NAME,
    alert:   process.env.ALERT_LEVEL
  });
});

// GET /hw9/cases: the case log exactly as it stands right now
router.get('/cases', (req, res) => {
  res.json(cases);
});

// POST /hw9/cases: file one new piece of evidence
router.post('/cases', (req, res) => {
  const suspect  = req.body.suspect;
  const location = req.body.location;
  const notes    = req.body.notes;

  // reject before touching the array
  if (!suspect || !location) {
    return res.status(400).json({ error: 'suspect and location required' });
  }

  const newCase = {
    id:        nextId++,          // hand out the current id, then move the counter on
    suspect:   suspect,
    location:  location,
    notes:     notes || '',       // notes is optional, keep the field present either way
    timestamp: new Date().toISOString()
  };

  cases.push(newCase);

  // 201 means a new thing now exists on the server
  res.status(201).json(newCase);
});

module.exports = router;
