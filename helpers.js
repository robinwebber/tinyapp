const bcrypt = require('bcrypt');

// Retrieves a user from database by email, then allows for checks to be run against the result
const validator = (email, database) => {
  for (keys in database) {
    if (database[keys].email === email) {
      return { valid: true, user: database[keys] }
    }
  }
  return { valid: false }
};

// Creates a new user to be added to the user database.
const userCreator = (id, email, password, database) => {
  database[id] = { id, email, password: bcrypt.hashSync(password, 10) };
};

// filters database to return a database of the same structure only including a given users entries.
const urlsForUser = (id, database) => {
  const filteredDB = {};

  for (const shortURLs in database) {
    if (database[shortURLs].userID === id) {
      filteredDB[shortURLs] = database[shortURLs];
    }
  }
  return filteredDB;
};

// updates the longURL of a given shortURL in the database and attaches the changes to a user id.
const updateLongURL = (shortURL, longURL, userID, database) => {
  
  database[shortURL] = {longURL: longURL, userID: userID};
};

module.exports = { validator, 
                  userCreator,
                  urlsForUser,
                  updateLongURL };