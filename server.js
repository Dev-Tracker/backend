const express = require("express");
const helmet = require("helmet");
const { userRouter } = require("./routers/");
const server = express();

server.use(express.json());
server.use(helmet());

server.use("/api", userRouter);

module.exports = server;
