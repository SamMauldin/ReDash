"use strict";

const db = require("../../db");
const SocketHandler = require("../handler");

class LoginHandler extends SocketHandler {

  handleEvent(args) {
    db.status().then(status => {
      this.socket.emit(this.eventName, status);
    });

  }

  get eventName() {
    return "db status";
  }
}

module.exports = LoginHandler;
