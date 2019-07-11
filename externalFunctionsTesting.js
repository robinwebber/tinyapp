// const generateUid = function () {
//   return Math.floor((1 + Math.random()) * 0x10000).toString(32).substring(1);
// }

// console.log(generateUid());
// const uuidv4 = require('uuid/v4');

// const generateRandomString = () => {
//   return Math.random().toString(36).substring(2, 8)
// };

// //console.log(generateRandomString());
// const users = {};
// class User {
//   constructor(id, email, password) {
//     this.id = id;
//     this.email = email;
//     this.password = password;
//   }
// };

// const userCreater = (id, email, password) => {

  
//   users[id] = {id, email, password};

// }

// userCreater('hay67d', 'robin@robin', 'hey123');
// //console.log(users);
// //console.log(uuidv4().slice(0,6));
// const billy = new User('1234', 'billy@bill.com', 'billy123');

// const usersDemo = { 
//   "userRandomID": {
//     id: "userRandomID", 
//     email: "user@example.com", 
//     password: "purple-monkey-dinosaur"
//   },
//  "user2RandomID": {
//     id: "user2RandomID", 
//     email: "user2@example.com", 
//     password: "dishwasher-funk"
//   }
// }

// const emailDuplicateChecker = (email) => {
//   for (keys in usersDemo) {
//     if (usersDemo[keys].email === email) {
//       return true;
//     }
//   }
//   return false;
// };

// console.log(emailDuplicateChecker('robin@robin.com'));

const urlDatabase = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "userRandomID" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "user2RandomID" }
};

const filterDatabaseByID = (user_id) => {
  const filteredDB = {};

  for (const shortURLs in urlDatabase) {
    if (urlDatabase[shortURLs].userID === user_id) {
      filteredDB[shortURLs] = urlDatabase[shortURLs];
    }
  }
  return filteredDB;
};

console.log(filterDatabaseByID('user2RandomID'));