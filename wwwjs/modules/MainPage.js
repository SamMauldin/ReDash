import React from "react";

export default React.createClass({

  render: function() {
    return (<div className="uk-container">
        <br/>


        {this.props.children}
    </div>);
  }

});
