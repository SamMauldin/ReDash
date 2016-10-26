"use strict";

const db = require("../../db");
const SocketHandler = require("../handler");

class DBListHandler extends SocketHandler {

  handleEvent(args) {
    db.list().then(status => {
      this.socket.emit(this.eventName, status);
    });

  }

  get eventName() {
    return "db list";
  }
}

module.exports = DBListHandler;
