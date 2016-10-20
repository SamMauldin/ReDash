import React from "react";

export default React.createClass({

  render: function() {
    return (<div className="uk-container">
      <br/>
      <div data-uk-dropdown className="uk-button-dropdown">
        <button className={this.statusClasses()}>{this.statusMessage()}</button>

        <div className="uk-dropdown uk-dropdown-bottom">
          <ul className="uk-nav uk-nav-dropdown">
            {this.statusDescriptions().map(function(listValue, listKey){
              return <li key={listKey}>
                  <a href="#">{listValue}</a>
                </li>;
            })}
          </ul>
        </div>
      </div>

      {this.props.children}
    </div>);
  },

  statusDescriptions: function() {
    if (this.state.status) {
      return this.state.status.messages;
    } else {
      return ["Loading"];
    }
  },

  statusMessage: function() {
    let message = "Waiting...";

    if (this.state.status) {
      switch (this.state.status.status) {
        case 0:
          message = "Server OK";
          break;
        case 1:
          message = "Warning";
          break;
        default:
          message = "Unavailability"
      }
    }

    return message;
  },

  statusClasses: function() {
    let color = "uk-button-success";

    if (this.state.status && this.state.status.status >= 1) {
      color = "uk-button-danger";
    } else if (!this.state.status) {
      color = "uk-button-primary";
    }

    console.log(color);
    return "uk-button " + color;
  },

  getInitialState: function() {
    return {
      status: undefined
    };
  },

  componentDidMount: function() {
    let self = this;

    this.context.socket.on("db status", message => {
      // TODO: Unmount the listeners without unmounting other component's listeners
      if (!this.isMounted()) { return; }

      this.setState({
        status: message
      });

      console.log(message);
    });

    this.context.socket.emit("db status");
    console.log("Requested DB Status");
  },

  contextTypes: {
    socket: React.PropTypes.object
  }

});
