import React from "react";

export default React.createClass({

  render: function() {
    return (<div className="uk-container">

    <ul>
      {this.state.databases.map(function(listValue, listKey){
        return <li key={listKey}>
            <a href="#">{listValue}</a>
        </li>;
      })}
    </ul>

        {this.props.children}
    </div>);
  },

  contextTypes: {
    socket: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      databases: []
    };
  },

  componentDidMount: function() {
    let self = this;

    // Socket.io reassigns `this`, so we have to bind `this` to `self`
    this.context.socket.on("login", args => {
      if (!this.isMounted()) { return; }
      
      this.context.socket.emit("db list");
    });

    this.context.socket.on("db list", list => {
      if (!this.isMounted()) { return; }

      this.setState({
        databases: list
      });
    });
  },

});
