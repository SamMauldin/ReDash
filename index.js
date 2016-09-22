"use strict";

const colors = require("colors");

console.log("Starting ReDash".cyan);

const express = require("express");
const app = express();

const http = require("http");
const server = http.Server(app);

const Socket = require("./lib/socket");

const socket = new Socket(server);


const port = 8080;

server.listen(port);
console.log(("Listening on port " + port).green);