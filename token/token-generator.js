require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.SECRET;

function tokenGenerator(user) {
  const payload = {
    userId: user.id,
    userEmail: user.email,
    userFirstName: user.first_name,
    userLastName: user.last_name
  };

  const options = {
    expiresIn: "8h"
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = tokenGenerator;
