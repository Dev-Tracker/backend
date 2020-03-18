const express = require("express");
const user = require("../models/models");
const helmet = require("helmet");
const router = express();

router.use(helmet());

router.get("/users", (req, res) => {
  user
    .getAll("users")
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ errorMessage: "cannot get users at this time" });
    });
});

module.exports = router;
