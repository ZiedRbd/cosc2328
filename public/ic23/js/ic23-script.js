// IC23 – COSC 2328 – Professor McCurry
// Implemented by: Zied Raboudi

/* Reflection

   fetch GET uses zero options and the defaults work. What three options does fetch
   POST require and why does each one matter?

      method, headers and body. method because fetch sends a GET if you leave it out.
      headers because Content-Type application/json is what makes Express parse the
      body, and without it req.body is undefined. body because fetch cannot send an
      object, so JSON.stringify turns it into a string first.

   Why does the db.run callback use function (err) instead of (err) =>? What would
   this.lastID be if you used an arrow function?

      db.run sets this to the statement object before calling back, and lastID lives
      there. A regular function takes that this. An arrow function makes no this of
      its own, so this.lastID would be undefined and the id would come back undefined.

   What is the re-fetch pattern and why does it keep the UI in sync with the server
   instead of just appending a new li directly?

      It means re-fetching the whole list from the server after a write instead of
      patching the page myself. The database stays the one source of truth. Appending
      an li by hand would miss the real id SQLite assigned and would go stale as soon
      as anything else writes to that table.

   Looking at the GET and POST side by side in the Network tab, what is different
   about the POST in the Headers and Payload tabs that the GET does not have?

      The POST carries a Content-Type header, which the GET has no reason to send
      because it has no body. The POST also fills the Payload tab with my JSON while
      the GET has nothing there. The GET answers 200 and the POST answers 201.

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
