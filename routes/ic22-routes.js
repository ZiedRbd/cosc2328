// IC22 – COSC 2328 – Professor McCurry
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

router.get('/students/:id', (req, res) => {
  const id = req.params.id;
  db.get(
    'SELECT * FROM students WHERE id = ?',
    [id],
    (err, row) => {
      if (err)  return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ message: 'Student not found' });
      res.json(row);
    }
  );
});

module.exports = router;
