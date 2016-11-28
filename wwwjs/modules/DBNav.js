import React from "react";
import Status from "./Status";
import { Link } from "react-router";

export default React.createClass({

  render: function() {
    if (!this.context.session.authenticated) {
      return null;
    }

    return (<div>
      <div className="dbnav">
        <span className="nav-right">
          <Status></Status>

          <div data-uk-dropdown className="uk-button-dropdown database-button">
            <button className="uk-button-primary uk-button">Databases</button>

            <div className="uk-dropdown uk-dropdown-bottom">
              <ul className="uk-nav uk-nav-dropdown">
                {this.state.databases.map(function(listValue, listKey){
                  return <li key={listKey}>
                      <a href="#">{listValue}</a>
                    </li>;
                })}
              </ul>
            </div>
          </div>

          <div data-uk-dropdown className="uk-button-dropdown cluster-button">
            <button className="uk-button-primary uk-button">Cluster</button>

            <div className="uk-dropdown uk-dropdown-bottom">
              <ul className="uk-nav uk-nav-dropdown">
                {this.state.servers.map(function(listValue, listKey){
                  return <li key={listKey}>
                      <Link to={`/app/server/${listValue.name}`}>{listValue.name}</Link>
                    </li>;
                })}
              </ul>
            </div>
          </div>
        </span>
      </div>

      <div className="dbnavSpace"></div>
    </div>);
  },

  contextTypes: {
    socket: React.PropTypes.object,
    session: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      databases: [],
      servers: []
    };
  },

  componentDidMount: function() {
    let self = this;

    if (this.context.session.authenticated) {
      this.context.socket.emit("db list");
      this.context.socket.emit("db servers");
    }

    // Socket.io reassigns `this`, so we have to bind `this` to `self`
    this.context.socket.on("login", args => {
      if (!this.isMounted()) { return; }

      this.context.socket.emit("db list");
      this.context.socket.emit("db servers");
    });

    this.context.socket.on("db list", list => {
      if (!this.isMounted()) { return; }

      this.setState({
        databases: list
      });
    });

    this.context.socket.on("db servers", list => {
      if (!this.isMounted()) { return; }
      this.setState({
        servers: list
      });
    });
  },

});
