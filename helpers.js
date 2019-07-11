
const validator = (email, database) => {
  for (keys in database) {
    if (database[keys].email === email) {
      return { valid: true, user: database[keys] }
    }
  }
  return { valid: false }
};

module.exports = {validator};