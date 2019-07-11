const { assert } = require('chai');

const { validator } = require('../helpers.js');

const testUsers = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

describe('getUserByEmail', function() {
  it('should return a user with valid email', function() {
    const user = validator("user@example.com", testUsers)
    const expectedOutput = { valid: true, user:{
      id: "userRandomID", 
      email: "user@example.com", 
      password: "purple-monkey-dinosaur"
    }};
    assert.deepEqual(user, expectedOutput);
  })
  it('should return { valid: false, } object if an email is not in the database', function() {
    const user = validator("uper@example.com", testUsers);
    const expectedOutput = { valid: false }
    assert.deepEqual(user, expectedOutput);
  })
});