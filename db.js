// IC22 – COSC 2328 – Professor McCurry
// Implemented by: Zied Raboudi

const sqlite3 = require('sqlite3').verbose();
const path    = require('path');

// OPEN_READWRITE: open the file that already exists. If voyage.db is missing, this
// fails with an error instead of silently creating a new, empty database.
const db = new sqlite3.Database(path.join(__dirname, 'voyage.db'), sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error('Could not open voyage.db:', err.message);
  console.log('Connected to the SQLite database.');
});

module.exports = db;
