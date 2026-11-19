// IC23 – COSC 2328 – Professor McCurry
// Implemented by: Zied Raboudi

/* Reflection

   fetch GET uses zero options and the defaults work. What three options does fetch
   POST require and why does each one matter?

      method, headers and body. method has to say POST because fetch sends a GET when
      you leave it out, so the request would hit the wrong route. headers has to carry
      Content-Type application/json or Express never parses the body and req.body
      comes out undefined on the server. body has to be a string, so JSON.stringify
      turns my object into one, because fetch cannot put a raw object on the wire.

   Why does the db.run callback use function (err) instead of (err) =>? What would
   this.lastID be if you used an arrow function?

      db.run sets this to the statement object before it calls the callback, and
      lastID lives on that object. A regular function accepts the this that db.run
      hands it. An arrow function never makes its own this, it borrows whatever this
      was in the code around it, so this.lastID would be undefined and the response
      would send back an id of undefined.

   What is the re-fetch pattern and why does it keep the UI in sync with the server
   instead of just appending a new li directly?

      The re-fetch pattern means asking the server for the whole list again after a
      write succeeds, rather than guessing what changed and patching the page myself.
      It keeps things in sync because the database stays the one source of truth.
      Appending an li by hand would only show my own guess at the row, so it would
      miss the real id that SQLite assigned and it would drift the moment anything
      else writes to that table.

   Looking at the GET and POST side by side in the Network tab, what is different
   about the POST in the Headers and Payload tabs that the GET does not have?

      The POST carries a Content-Type header of application/json, which the GET has no
      reason to send because a GET has no body. The POST also fills the Payload tab
      with the JSON I sent while the GET has nothing there at all. The GET answers
      with 200 and the POST answers with 201, because a new row now exists.

*/

const list = document.getElementById('student-list');

async function loadStudents() {
  try {
    const res  = await fetch('/ic23/students');
    const data = await res.json();
    list.innerHTML = '';
    data.forEach(s => {
      const li   = document.createElement('li');
      const name = document.createElement('p');
      const meta = document.createElement('p');
      name.className = 'name';
      meta.className = 'meta';
      name.textContent = `${s.first_name} ${s.last_name}`;
      meta.textContent = `${s.classification || '—'} — ${s.major || '—'}`;
      li.appendChild(name);
      li.appendChild(meta);
      list.appendChild(li);
    });
  } catch (err) {
    list.innerHTML = `<li>Error loading students: ${err.message}</li>`;
  }
}

document.getElementById('add-btn').addEventListener('click', async () => {
  const first_name     = document.getElementById('first-name').value.trim();
  const last_name      = document.getElementById('last-name').value.trim();
  const classification = document.getElementById('classification').value;
  const major          = document.getElementById('major').value.trim();
  const result         = document.getElementById('add-result');

  if (!first_name || !last_name) {
    result.className = 'error';
    result.textContent = 'First name and last name are required.';
    return;
  }

  try {
    const res = await fetch('/ic23/students', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ first_name, last_name, classification, major })
    });
    const data = await res.json();
    if (res.ok) {
      result.className = '';
      result.textContent = `Added: ${data.first_name} ${data.last_name} (ID ${data.id})`;
      document.getElementById('first-name').value = '';
      document.getElementById('last-name').value = '';
      document.getElementById('classification').value = '';
      document.getElementById('major').value = '';
      await loadStudents();
    } else {
      result.className = 'error';
      result.textContent = data.error || 'Something went wrong.';
    }
  } catch (err) {
    result.className = 'error';
    result.textContent = `Network error: ${err.message}`;
  }
});

loadStudents();
