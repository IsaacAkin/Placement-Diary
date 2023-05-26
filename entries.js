import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import uuid from 'uuid-random';

async function init() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
    verbose: true
  });
  await db.migrate({ migrationsPath: './database' });
  return db;
}

const dbconnect = init();

/** Gets all entries entered by the user */
export async function getAllEntries() {
  const db = await dbconnect;
  return db.all('SELECT * FROM Entries ORDER BY dateEntry DESC LIMIT 10');
}

/** When given an ID, finds the entry with that ID */
export async function findEntry(id) {
  const db = await dbconnect;
  return db.get('SELECT * FROM Entries WHERE id = ?', id);
}

/** Adds an entry entered by the user */
export async function addEntry(dateEntry, work, experience, competency) {
  const db = await dbconnect;

  const id = uuid();
  await db.run('INSERT INTO Entries VALUES (?, ?, ?, ?, ?)', [id, dateEntry, work, experience, competency]);

  return getAllEntries();
}

/** Deletes an entry entered by the user */
export async function deleteEntry(id) {
  const db = await dbconnect;

  const statement = await db.run('DELETE FROM Entries WHERE id = ?', id);

  // If nothing was deleted, the ID doesn't exist
  if (statement.changes === 0) return false;
  
  return true;
}

/** Updates the previous information entered by the user */
export async function editEntry(updatedEntry) {
  const db = await dbconnect;

  const id = updatedEntry.id;
  const dateEntry = updatedEntry.dateEntry;
  const work = updatedEntry.work;
  const experience = updatedEntry.experience;
  const competency = updatedEntry.competency;

  const statement = await db.run('UPDATE Entries SET dateEntry = ? , work = ? , experience = ? , competency = ? WHERE id = ?', [dateEntry, work, experience, competency, id]);

  // If nothing was updated, the ID doesn't exist
  if (statement.changes === 0) throw new Error('message not found');

  return findEntry(id);
}