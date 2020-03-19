const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { userRouter } = require("./routers/");
const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get("/", (req, res) => {
  res.json({ message: "SERVER IS LIVE" });
});

server.use("/api", userRouter);

module.exports = server;
