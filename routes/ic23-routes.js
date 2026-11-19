// IC23 – COSC 2328 – Professor McCurry
// Implemented by: Zied Raboudi

const express = require('express');
const router  = express.Router();
const db      = require('../db');

router.get('/students', (req, res) => {
  db.all('SELECT * FROM students ORDER BY id', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST /ic23/students — insert a new student
router.post('/students', (req, res) => {
  const { first_name, last_name, classification, major } = req.body;

  if (!first_name || !last_name) {
    return res.status(400).json({ error: 'First name and last name are required.' });
  }

  db.run(
    'INSERT INTO students (first_name, last_name, classification, major) VALUES (?, ?, ?, ?)',
    [first_name, last_name, classification, major],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, first_name, last_name, classification, major });
    }
  );
});

module.exports = router;
