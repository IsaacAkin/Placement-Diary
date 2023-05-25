const el = {};

/** Use fetch to put a JSON message to the server */
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

/** add a message of enter is pressed, update button 
 * to make it "update" when the mesage is edited */
function checkKeys(e) {
    if (e.key === 'Enter') {
        sendEntry();
    }
}

/**Page elements used in the program are setup here for convenience */
function prepareHandles() {
    // el.entry = document.querySelector('#entry');
    el.date = document.querySelector('#date');
    el.work = document.querySelector('#work');
    el.experience = document.querySelector('#experience');
    el.competency = document.querySelector('#competency');
    el.submitbtn = document.querySelector('#submitbtn');
}

/** Connect listeners for button clicks, keyboard input, etc */
function addEventListeners() {
    el.submitbtn.addEventListener('click', sendEntry);
    el.competency.addEventListener('keyup', checkKeys);
}

prepareHandles();
addEventListeners();