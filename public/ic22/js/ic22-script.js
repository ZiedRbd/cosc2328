// IC22 – COSC 2328 – Professor McCurry
// Implemented by: Zied Raboudi

/* Reflection

   What is the difference between db.all() and db.get()? When would you use each?

      db.all runs the query and hands the callback every matching row as an array.
      db.get runs the same kind of query but stops at the first match and hands the
      callback one object instead. I use db.all when I am listing things like the
      whole student directory, and db.get when I am after one specific record like a
      lookup by id. db.all gives back an empty array when nothing matches while
      db.get gives back undefined.

   A classmate writes 'SELECT * FROM students WHERE id = ' + id in a route handler.
   What is wrong with this, and what would happen if someone sent the value
   1; DROP TABLE students as the ID?

      Gluing the value onto the string means whatever the user typed becomes part of
      the SQL itself. That value turns the query into SELECT * FROM students WHERE
      id = 1; DROP TABLE students, which is two statements, so SQLite runs the select
      and then deletes the entire table. The fix is the ? placeholder with the value
      passed separately in the array. SQLite compiles the query first and drops the
      value into the hole as data, so it can never be read as a command.

   The db.get callback uses a parameter named row (singular) while db.all uses rows
   (plural). Why is this naming convention meaningful?

      The name tells me the shape of what I got before I use it. rows is plural
      because db.all always hands back an array, even when only one row matched, so I
      loop over it. row is singular because db.get hands back one object, so I read
      its properties straight off. Getting that backwards is how I would end up
      calling forEach on an object or reading first_name off an array.

   Visiting /ic22/students/2 and /ic22/students/7 both work from a single route
   definition. How does Express handle that?

      The :id in the path is a placeholder rather than a literal. Express matches the
      shape of the URL, so anything sitting in that last slot counts as a match, and
      it puts whatever was there into req.params.id as a string. One route definition
      covers every id, which is why 2 and 7 both land in the same handler.

*/


// Step 5: ask the server for every student, then draw them into the <ul>
async function loadStudents() {
    // root-relative path, so the same file works on localhost and on the droplet
    const response = await fetch("/ic22/students");
    const students = await response.json();

    const list = document.getElementById("student-list");
    list.innerHTML = "";   // clear first, so a reload does not stack up

    students.forEach(function (student) {
        const row = document.createElement("li");

        const name = document.createElement("div");
        name.classList.add("name");
        name.textContent = student.first_name + " " + student.last_name;

        const meta = document.createElement("div");
        meta.classList.add("meta");
        meta.textContent = student.classification + ", " + student.major;

        row.appendChild(name);
        row.appendChild(meta);
        list.appendChild(row);
    });
}

// Step 6: look one student up by the id typed in the box
document.getElementById("lookup-btn").addEventListener("click", async function () {
    const id = document.getElementById("student-id").value;
    const result = document.getElementById("student-result");

    const response = await fetch("/ic22/students/" + id);
    const data = await response.json();

    // a missing student comes back as a message instead of a student object
    if (data.message) {
        result.textContent = data.message;
        return;
    }

    result.textContent = data.first_name + " " + data.last_name + ", " +
                         data.classification + ", " + data.major;
});

// run once as soon as the page opens
loadStudents();
