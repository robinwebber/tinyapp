// const generateUid = function () {
//   return Math.floor((1 + Math.random()) * 0x10000).toString(32).substring(1);
// }

// console.log(generateUid());

const generateRandomString = () => {
  return Math.random().toString(36).substring(2, 8)
};

console.log(generateRandomString());