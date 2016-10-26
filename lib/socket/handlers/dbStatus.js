"use strict";

const db = require("../../db");
const SocketHandler = require("../handler");

class StatusHandler extends SocketHandler {

  handleEvent(args) {
    db.status().then(status => {
      this.socket.emit(this.eventName, status);
    });

  }

  get eventName() {
    return "db status";
  }
}

module.exports = StatusHandler;
