"use strict";

const handlers = require("./handlers");

class SocketClient {
  constructor(connection) {
    this.connection = connection;

    handlers.forEach(handler => {
      new handler(this.connection);
    });

  }
}

module.exports = SocketClient;
