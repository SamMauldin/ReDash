"use strict";

const db = require("../../db");
const SocketHandler = require("../handler");

class DBRowsHandler extends SocketHandler {

  handleEvent(args) {
    db.rows(args.db, args.table, args.page).then(status => {
      this.socket.emit(this.eventName, status);
    });

  }

  get eventName() {
    return "db rows";
  }
}

module.exports = DBRowsHandler;
