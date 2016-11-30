import React from "react";

export default React.createClass({

  render: function() {
    return (<div>
      <h2>{this.props.params.db}</h2>

      {this.state.tables.map(function(listValue, listKey){
        return (
          <h3 key={listKey}>{listValue.name}</h3>
        );
      })}

    </div>);
  },

  contextTypes: {
    socket: React.PropTypes.object,
    session: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      tables: []
    };
  },

  componentDidMount: function() {
    let self = this;

    if (this.context.session.authenticated) {
      this.context.socket.emit("db tables");
    }

    // Socket.io reassigns `this`, so we have to bind `this` to `self`
    this.context.socket.on("login", args => {
      if (!this.isMounted()) { return; }

      this.context.socket.emit("db tables");
    });

    this.context.socket.on("db tables", tables => {
      if (!this.isMounted()) { return; }

      tables = tables.filter(i => i.db == self.props.params.db);

      this.setState({
        tables: tables
      });
    });
  },

  componentWillReceiveProps: function(newProps) {
    if (this.props.params.db != newProps.params.db) {
      if (this.context.session.authenticated) {
        this.context.socket.emit("db tables");
      }

      this.setState({
        tables: []
      });
    }
  }

});
