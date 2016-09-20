"use strict";

class SocketHandler {
  constructor(socket) {
    this.socket = socket;
    socket.on(this.eventName, this.preEvent);
  }

  preEvent() {
    if (this.requiresAuthentication) {
      // TODO
      return false;
    }

    return handleEvent.apply({}, arguments);
  }

  handleEvent() {
    throw "Abstract event handler called";
  }

  get eventName() {
    return "abstract event";
  }

  get requiresAuthentication() {
    return true;
  }
}

module.exports = SocketHandler;
