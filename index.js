const express = require("express");
const carRouter = require("./cars/carRouter");
const server = express();
require("dotenv").config();

server.use(express.json());
server.use("/cars", carRouter);

const port = 1002;

server.listen(port, () => console.log(`server running on ${port}`));
