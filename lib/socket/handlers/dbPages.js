"use strict";

const db = require("../../db");
const SocketHandler = require("../handler");

class DBPagesHandler extends SocketHandler {

  handleEvent(args) {
    db.pages(args.db, args.table).then(status => {
      this.socket.emit(this.eventName, status);
    });

  }

  get eventName() {
    return "db pages";
  }
}

module.exports = DBPagesHandler;
