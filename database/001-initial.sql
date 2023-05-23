-- Up

CREATE TABLE Entries (
  id   CHAR(36) PRIMARY KEY,
  dateEntry TEXT,
  work TEXT     NOT NULL,
  experience TEXT     NOT NULL,
  competency TEXT     NOT NULL
);

-- INSERT INTO Entries (id, dateEntry, work, experience, competency) VALUES
-- ( 'xnshfdsafasd',
--   'yesterday',
--   'Test data 1',
--   'gained experience in using A',
--   'A1 B2');


-- Down

DROP TABLE Entries;