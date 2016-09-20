"use strict";

const SocketHandler = require("../handler");

class TestHandler extends SocketHandler {

  handleEvent() {
    this.socket.emit(this.eventName, "success!");
  }

  get eventName() {
    return "test handler";
  }

  get requiresAuthentication() {
    return false;
  }
}

module.exports = TestHandler;
