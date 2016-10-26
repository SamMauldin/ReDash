import React from "react";

import DBList from "./DBList";

export default React.createClass({

  render: function() {
    return (<div className="uk-container">
        <br/>

        <DBList></DBList>

        {this.props.children}
    </div>);
  }

});
