import React from "react";

export default React.createClass({

  render: function() {
    return (<div>
      <h2>{this.props.params.server} {this.state.server ? "(" + this.state.server.id + ")" : null}</h2>



    </div>);
  },

  contextTypes: {
    socket: React.PropTypes.object,
    session: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      server: null
    };
  },

  componentDidMount: function() {
    let self = this;

    if (this.context.session.authenticated) {
      this.context.socket.emit("db servers");
    }

    // Socket.io reassigns `this`, so we have to bind `this` to `self`
    this.context.socket.on("login", args => {
      if (!this.isMounted()) { return; }

      this.context.socket.emit("db servers");
    });

    this.context.socket.on("db servers", list => {
      if (!this.isMounted()) { return; }
      let server = null;

      list.forEach(function(x) {
        if (x.name == self.props.params.server) {
          server = x;
        }
      });

      this.setState({
        server: server
      });
    });
  },

  componentWillReceiveProps: function(newProps) {
    if (this.props.params.server != newProps.params.server) {
      if (this.context.session.authenticated) {
        this.context.socket.emit("db servers");
      }

      this.setState({
        server: null
      });
    }
  }

});
