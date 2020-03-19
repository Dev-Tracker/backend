const knex = require("knex");
// change development to process.env for dynamic config options
const configOptions = require("../knexfile").production;
module.exports = knex(configOptions);
