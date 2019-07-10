// const generateUid = function () {
//   return Math.floor((1 + Math.random()) * 0x10000).toString(32).substring(1);
// }

// console.log(generateUid());
const uuidv4 = require('uuid/v4');

const generateRandomString = () => {
  return Math.random().toString(36).substring(2, 8)
};

//console.log(generateRandomString());
const users = {};
class User {
  constructor(id, email, password) {
    this.id = id;
    this.email = email;
    this.password = password;
  }
};

const userCreater = (id, email, password) => {

  
  users[id] = {id, email, password};

}

userCreater('hay67d', 'robin@robin', 'hey123');
console.log(users);
//console.log(uuidv4().slice(0,6));
const billy = new User('1234', 'billy@bill.com', 'billy123');

