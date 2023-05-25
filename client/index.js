const el = {};

function removeContentFrom(what) {
  what.textContent = '';
}

/**Adds an array of messages to the page */
function showEntries(entries, where) {
  const table = document.createElement('table');

  const tableHeader = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headers = ['Date', 'Work', 'Experience', 'Competency'];

  for (const headerText of headers) {
    const headerCell = document.createElement('th');
    headerCell.textContent = headerText;
    headerRow.appendChild(headerCell);
  }

  tableHeader.appendChild(headerRow);

  table.appendChild(tableHeader);

  const tableBody = document.createElement('tbody');

  for (const entry of entries) {

    console.log('Entry:', entry);

    const row = document.createElement('tr');

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
    editButton.textContent = 'edit me';
    editButton.href = `/edit_entry#${entry.id}`;
    editCell.appendChild(editButton);
    row.appendChild(editCell);

    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteEntry(entry.id));
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    tableBody.appendChild(row);
  }

  table.appendChild(tableBody);

  removeContentFrom(where);

  where.appendChild(table);
}

async function deleteEntry(entryId) {
  const response = await fetch(`entries/${entryId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    const updatedEntries = await response.json();
    console.log('Deleted entry:', entryId);
    console.log('Updated entries:', updatedEntries);
    removeContentFrom(el.entrylist);
    showEntries(updatedEntries, el.entrylist);
  } else {
    console.log('failed to delete entry', response);
  }
}

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

function prepareHandles() {
  el.entrylist = document.querySelector('#entrylist');
  el.date = document.querySelector('#date');
  el.work = document.querySelector('#work');
  el.experience = document.querySelector('#experience');
  el.competency = document.querySelector('#competency');
  el.submitbtn = document.querySelector('#submitbtn');
}

prepareHandles();
loadEntries();