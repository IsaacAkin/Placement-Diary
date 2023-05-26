const el = {};

function showEntry(entry) {
    el.date.value = new Date(entry.dateEntry).toISOString().split('T')[0];
    el.work.value = entry.work;
    el.experience.value = entry.experience;
    el.competency.value = entry.competency;
}

function getEntryId() {
    return window.location.hash.substring(1);
}

async function loadEntry() {
    const id = getEntryId();
    const response = await fetch(`entries/${id}`);
    let entry;
    if (response.ok) {
        entry = await response.json();
    } else {
        entry = { msg: 'failed to load entries' };
    }
    showEntry(entry);
}

/** add a message of enter is pressed, update button 
 * to make it "update" when the mesage is edited */
function checkKeys(e) {
    if (e.key === 'Enter') {
        sendEntry();
    }
}

/** Use fetch to put a JSON message to the server */
async function sendEntry() {
    const id = getEntryId();
    const dateEntry = new Date(el.date.value).toISOString().split('T')[0];
    const work = el.work.value;
    const experience = el.experience.value;
    const competency = el.competency.value;

    // If theres is at least one field empty, the data does not get updated
    if (dateEntry === '' || work === '' || experience === '' || competency === '') {
        return;
    }

    const payload = { 
        id,
        dateEntry, 
        work,
        experience,
        competency
    };
    console.log('Payload', payload);

    const response = await fetch(`entries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(payload),
    });

    if (response.ok) {
        const updatedEntries = await response.json();
        showEntry(updatedEntries, el.entrylist);
    } else {
        console.log('failed to send entry', response);
    }
}

/**Page elements used in the program are setup here for convenience */
function prepareHandles() {
    el.entry = document.querySelector('#entry');
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
loadEntry();