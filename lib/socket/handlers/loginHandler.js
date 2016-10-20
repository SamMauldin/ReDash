"use strict";

const SocketHandler = require("../handler");

class LoginHandler extends SocketHandler {

  handleEvent(args) {
    // Dummy login handler that accepts everything

    if (args.username == "test" && args.password == "1234") {
      this.socket.session = {
        username: args.username,
        authenticated: true
      };

      this.socket.emit(this.eventName, {
        status: "success",
        username: args.username
      });
    } else {
      this.socket.emit(this.eventName, {
        status: "fail"
      });
    }
  }

  get eventName() {
    return "login";
  }

  get requiresAuthentication() {
    return false;
  }
}

module.exports = LoginHandler;
