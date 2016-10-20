import React from "react";

export default React.createClass({

  render: function() {
    return (<div className="appLoginPanel uk-width-1-1 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-2-3 uk-panel uk-panel-box uk-panel-box-primary uk-container-center">
      <h1 className="uk-panel-title">Login</h1>
      <form className="uk-form" onSubmit={this.handleSubmit}>

        <div className="uk-form-row">
          <input type="text" placeholder="Username" className="uk-form-width-large"
            value={this.state.username} onChange={this.handleUsernameChange}/>
        </div>

        <div className="uk-form-row">
          <input type="password" placeholder="Password" className="uk-form-width-large"
            value={this.state.password} onChange={this.handlePasswordChange}/>
        </div>

        { this.state.loginFailed ? (
          <div className="uk-form-row">
            <div className="uk-text-warning">Username or password incorrect</div>
          </div>) : null }

        <div className="uk-form-row">
          <button className="uk-button uk-button-primary"
            disabled={!(this.state.username && this.state.password) || this.state.submitted}>Submit</button>
        </div>
      </form>
    </div>);
  },

  componentDidMount: function() {
    let self = this;

    // Socket.io reassigns `this`, so we have to bind `this` to `self`
    this.context.socket.on("login", args => {
      // TODO: Unmount the listeners without unmounting other component's listeners
      if (!this.isMounted()) { return; }

      if (args.status !== "success") {
        self.setState({
          submitted: false,
          loginFailed: true
        });
      }

    });

    this.context.socket.on("reconnect", () => {
      // TODO: Unmount the listeners without unmounting other component's listeners
      if (!this.isMounted()) { return; }
      
      self.setState({
        submitted: false,
        loginFailed: false
      });
    });
  },

  handleSubmit: function(e) {
    // Prevent the page from reloading
    e.preventDefault();

    // This should either be over TLS or localhost, so that is secure enough
    // for mose uses. JSRP could be implemented in the future for usage over an
    // insecure connection.

    // Submit login to server
    this.context.socket.emit("login", {
      username: this.state.username,
      password: this.state.password
    });

    // Add a `submitted` attribute to disable the submit button
    this.setState({
      submitted: true,
      loginFailed: false
    });
  },

  // Blank slate
  getInitialState: function() {
    return {username: "", password: ""}
  },

  handleUsernameChange: function(e) {
    this.setState({
      username: e.target.value
    });
  },

  handlePasswordChange: function(e) {
    this.setState({
      password: e.target.value
    });
  },

  // Import the socket context for sending details to the server
  contextTypes: {
    socket: React.PropTypes.object
  }

});
