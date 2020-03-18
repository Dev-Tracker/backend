const knex = require("knex");
// change development to process.env for dynamic config options
const configOptions = require("../knexfile").development;
module.exports = knex(configOptions);
