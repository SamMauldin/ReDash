"use strict";

const db = require("../../db");
const SocketHandler = require("../handler");

class ServersHandler extends SocketHandler {

  handleEvent(args) {
    db.servers().then(status => {
      this.socket.emit(this.eventName, status);
    });

  }

  get eventName() {
    return "db servers";
  }
}

module.exports = ServersHandler;
