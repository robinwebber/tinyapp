const bcrypt = require('bcrypt');

// Retrieves a user by email, then allows for checks to be run against the result
const validator = (email, database) => {
  for (keys in database) {
    if (database[keys].email === email) {
      return { valid: true, user: database[keys] }
    }
  }
  return { valid: false }
};

// Creates a new user to be added to the database
const userCreator = (id, email, password, database) => {
  database[id] = { id, email, password: bcrypt.hashSync(password, 10) };
};

const urlsForUser = (id, database) => {
  const filteredDB = {};

  for (const shortURLs in database) {
    if (database[shortURLs].userID === id) {
      filteredDB[shortURLs] = database[shortURLs];
    }
  }
  return filteredDB;
};

module.exports = { validator, 
                  userCreator,
                  urlsForUser };