const el = {};

/* Remove all contents from a given element */
function removeContentFrom(what) {
  what.textContent = '';
}

/** Adds an array of entries to the page */
function showEntries(entries, where) {
  const table = document.createElement('table');

  const tableHeader = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headers = ['Date', 'Work', 'Experience', 'Competency'];

  // Creates headers for the table
  for (const headerText of headers) {
    const headerCell = document.createElement('th');
    headerCell.textContent = headerText;
    headerRow.appendChild(headerCell);
  }

  tableHeader.appendChild(headerRow);
  table.appendChild(tableHeader);

  const tableBody = document.createElement('tbody');
  
  // Creates a new row for each entry entered
  for (const entry of entries) {
    const row = document.createElement('tr');

    // Creates a new cell for each section of information entered
    const dateCell = document.createElement('td');
    dateCell.textContent = new Date(entry.dateEntry).toLocaleDateString('en-GB');
    row.appendChild(dateCell);

    const workCell = document.createElement('td');
    workCell.textContent = entry.work;
    row.appendChild(workCell);

    const experienceCell = document.createElement('td');
    experienceCell.textContent = entry.experience;
    row.appendChild(experienceCell);

    const competencyCell = document.createElement('td');
    competencyCell.textContent = entry.competency;
    row.appendChild(competencyCell);

    const editCell = document.createElement('td');
    const editButton = document.createElement('a');
    editButton.textContent = 'edit entry';
    editButton.href = `/edit_entry#${entry.id}`;
    editButton.classList.add('hidden-from-print');
    editCell.appendChild(editButton);
    row.appendChild(editCell);

    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteEntry(entry.id));
    deleteButton.classList.add('hidden-from-print');
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    // Appends the row to the body of the table
    tableBody.appendChild(row);
  }

  table.appendChild(tableBody);

  removeContentFrom(where);

  where.appendChild(table);
}

/** Deletes a single entry when the delete button is pressed */
async function deleteEntry(entryId) {
  const response = await fetch(`entries/${entryId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    // When a message is deleted it loads the updated entries from the server
    loadEntries();
  } else {
    console.log('failed to delete entry', response);
  }
}

/** Loads all entries made by the user */
async function loadEntries() {
  const response = await fetch('entries');
  let entries;
  if (response.ok) {
    entries = await response.json();
  } else {
    entries = [{
      dateEntry: 'failed to load date',
      work: 'failed to load work',
      experience: 'failed to load experience',
      competency: 'failed to load competencies'
    }];
  }
  removeContentFrom(el.entrylist);
  showEntries(entries, el.entrylist);
}

/** Page elements used are set up here */
function prepareHandles() {
  el.entrylist = document.querySelector('#entrylist');
  el.date = document.querySelector('#date');
  el.work = document.querySelector('#work');
  el.experience = document.querySelector('#experience');
  el.competency = document.querySelector('#competency');
  el.submitbtn = document.querySelector('#submitbtn');
  el.printbtn = document.getElementById('#printbtn');
}

prepareHandles();
loadEntries();