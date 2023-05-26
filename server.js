import express from 'express';
import * as db from './entries.js';

const app = express();
app.use(express.static('client', { extensions: ['html' ] }));

/** Gets all entries entered by the user */
async function getAllEntries(req, res) {
    res.json(await db.getAllEntries());
}

/** Gets a single entry entered by the user */
async function getEntry(req, res) {
    const result = await db.findEntry(req.params.id);
    if (result) {
        res.json(result);
    } else {
        res.status(404).send('No match for that ID.');
    }
}

/** Displays all entries entered by the user */
async function postEntries(req, res) {
    const { work, experience, competency, dateEntry } = req.body;
    const entries = await db.addEntry(dateEntry, work, experience, competency);
    res.json(entries);
}

async function putEntry(req, res) {
    const entry = await db.editEntry(req.body);
    res.json(entry);
}

/** Deletes a single entry entered by the user */
async function deleteEntry(req, res) {
    const result = await db.deleteEntry(req.params.id);
    if (result) {
      res.json({ message: 'Entry deleted successfully' });
    } else {
      res.status(404).send('No match for that ID.');
    }
}

// wrap async function for express.js error handling
function asyncWrap(f) {
    return (req, res, next) => {
        Promise.resolve(f(req, res, next))
            .catch((e) => next(e || new Error()));
    };
}

app.get('/entries', asyncWrap(getAllEntries));
app.get('/entries/:id', asyncWrap(getEntry));
app.put('/entries/:id', express.json(), asyncWrap(putEntry));
app.post('/entries', express.json(), asyncWrap(postEntries));
app.delete('/entries/:id', asyncWrap(deleteEntry));

app.listen(8080, () => {
    console.log(`Listening on port ${8080}`)
})