import React from "react";
import Nav from "./Nav";
import { browserHistory } from "react-router";
import IO from "socket.io-client";

export default React.createClass({

  // Render the NavBar and our application inside its container
  render: function() {
    return (<div>
      <Nav></Nav>

      <div className="appContainer">
        {this.props.children}
      </div>
    </div>);
  },

  // Create a socket connection when this component is created
  getDefaultProps: function() {
    return {
      socket: IO(window.location.host)
    };
  },

  // Connect to the Socket.IO Server when this component is mounted
  componentDidMount: function() {

    // Go to login page whenever there's a new socket connection
    this.props.socket.on("reconnect", () => {
      browserHistory.push("/login");
    });

    this.props.socket.on("connect", () => {
      browserHistory.push("/login");
    });

    // TODO: Navigate to previous page when logged in

    this.props.socket.on("login", () => {
      browserHistory.push("/app");
    });

  },

  // Export socket in a React Context for use throughout the application
  getChildContext: function() {
    return {
      socket: this.props.socket,
      session: (this.state ? this.state.session : null)
    };
  },

  childContextTypes: {
    socket: React.PropTypes.object,
    session: React.PropTypes.object
  }

});
