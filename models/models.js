const db = require("../db/db-config");

module.exports = {
  getAll
};

function getAll(database) {
  return db(database);
}
