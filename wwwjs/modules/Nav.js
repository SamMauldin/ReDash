import React from "react";
import Status from "./Status";

export default React.createClass({

  render: function() {
    return (<div>
      <div className="nav">
        <h1>ReDash</h1>

        <Status></Status>
      </div>

      <div className="navSpace"></div>
    </div>);
  }

});
