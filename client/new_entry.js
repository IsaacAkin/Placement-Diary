const el = {};

/** Use fetch to send a JSON message to the server */
async function sendEntry() {
  const dateEntry = new Date(el.date.value).toISOString().split('T')[0];
  const work = el.work.value;
  const experience = el.experience.value;
  const competency = el.competency.value;

  // If there is at least one empty field, the data does not get registered
  if (dateEntry === '' || work === '' || experience === '' || competency === '') {
    return;
  }

    const payload = { 
    dateEntry,
    work,
    experience,
    competency 
  };
  console.log('Payload', payload);
  
  const response = await fetch('entries', {
  method: 'POST',

  headers: {'Content-Type':'application/json'},
  body: JSON.stringify(payload),
  });

  if (response.ok) {
    el.date.value = '';
    el.work.value = '';
    el.experience.value = '';
    el.competency.value = '';
    const updatedEntries = await response.json();
    removeContentFrom(el.entrylist);
    showEntries(updatedEntries, el.entrylist);
  } else {
    console.log('failed to send entry', response);
  }
}

/** Adds an entry if the enter key is pressed */
function checkKeys(e) {
    if (e.key === 'Enter') {
        sendEntry();
    }
}

/** Page elements used are set up here */
function prepareHandles() {
    el.date = document.querySelector('#date');
    el.work = document.querySelector('#work');
    el.experience = document.querySelector('#experience');
    el.competency = document.querySelector('#competency');
    el.submitbtn = document.querySelector('#submitbtn');
}

/** Connect listeners for button clicks and keyboard input */
function addEventListeners() {
    el.submitbtn.addEventListener('click', sendEntry);
    el.competency.addEventListener('keyup', checkKeys);
}

prepareHandles();
addEventListeners();