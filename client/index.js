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

    const row = document.createElement('tr');

    const dateCell = document.createElement('td');
    dateCell.textContent = new Date(entry.dateEntry).toLocaleDateString();
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

    const edit = document.createElement('a');
    edit.textContent = 'edit me';
    edit.href = `/edit_entry#${entry.id}`;
    row.append(' (', edit, ')');

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
    removeContentFrom(el.entrylist);
    showEntries(updatedEntries, el.entrylist);
  } else {
    console.log('failed to delete entry', response);
  }
}

async function showDetail(e) {
  const response = await fetch('entries/' + e.target.dataset.id);
  if (response.ok) {
    const detail = await response.json();
    const p = document.createElement('p');
    p.textContent = `Message recieved on server at ${detail.dateEntry}`;
    removeContentFrom(el.detail);
    el.detail.append(p);
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

function checkKeys(e) {
  if (e.key === 'Enter') {
    sendEntry();
  }
}

async function sendEntry() {
  const payload = { 
    dateEntry: new Date(el.date.value).toISOString().split('T')[0],
    work: el.work.value,
    experience: el.experience.value,
    competency: el.competency.value  
  };
  console.log('Payload', payload);

  const response = await fetch('entries', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    el.entry.value = '';
    const updatedEntries = await response.json();
    removeContentFrom(el.entrylist);
    showEntries(updatedEntries, el.entrylist);
  } else {
    console.log('failed to send entry', response);
  }
}

function prepareHandles() {
  el.entrylist = document.querySelector('#entrylist');
  el.date = document.querySelector('#date');
  el.work = document.querySelector('#work');
  el.experience = document.querySelector('#experience');
  el.competency = document.querySelector('#competency');
  el.submitbtn = document.querySelector('#submitbtn');
  el.detail = document.querySelector('#detail');
}

function addEventListeners() {
  el.submitbtn.addEventListener('click', sendEntry);
  el.work.addEventListener('keyup', checkKeys);
  el.experience.addEventListener('keyup', checkKeys);
  el.competency.addEventListener('keyup', checkKeys);
}

prepareHandles();
addEventListeners();
loadEntries();