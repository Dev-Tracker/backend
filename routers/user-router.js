const express = require("express");
const user = require("../models/models");
const bcrypt = require("bcryptjs");
const tokenGenerator = require("../token/token-generator");
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

router.post("/register", (req, res) => {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 12);
  credentials.password = hash;
  user
    .register(credentials)
    .then(newUser => {
      const token = tokenGenerator(user);
      res
        .status(201)
        .json({ message: "Welcome, thank you for joining!", token: token });
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ errorMessage: "Error regestering account :(" });
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  user
    .login({ email })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenGenerator(user);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: `Invalid credentials` });
      }
    })
    .catch(err => {
      console.log("login error", err);
      res.status(500).json({ errorMessage: `Error logging in` });
    });
});

module.exports = router;
