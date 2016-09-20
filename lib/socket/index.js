"use strict";

const SocketClient = require("./client");

class Socket {
  constructor(server) {
    this.io = require("socket.io")(server);

    this.io.on("connection", (connection) => {
      new SocketClient(connection);
    });
  }
}

module.exports = Socket;
