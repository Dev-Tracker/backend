const db = require("../db/db-config");

module.exports = {
  getAll,
  register,
  login,
  deleteAccount
};

// GENERAL QUERIES

function getAll(database, id) {
  return db(database);
}

function addData(database, data) {
  return db(database).insert(data);
}

function removeData(database, itemId) {
  return db(database)
    .where(itemId)
    .delete();
}

function editData(database, itemId) {
  return db(database)
    .where(itemId)
    .delete();
}

// CREDENTIALS
function register(info) {
  return db("users").insert(info);
}

function login(credentials) {
  return db("users").where(credentials);
}

function deleteAccount(credentials, id) {
  return db("users")
    .where(credentials, id)
    .delete();
}
