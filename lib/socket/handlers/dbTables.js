"use strict";

const db = require("../../db");
const SocketHandler = require("../handler");

class TablesHandler extends SocketHandler {

  handleEvent(args) {
    db.tables().then(status => {
      this.socket.emit(this.eventName, status);
    });

  }

  get eventName() {
    return "db tables";
  }
}

module.exports = TablesHandler;
