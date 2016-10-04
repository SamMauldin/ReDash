global.jQuery = require("jquery");
global.$ = global.jQuery;
require("./uikit.min.js");

import React from "react";
import { render } from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import ReDash from "./modules/ReDash";
import Login from "./modules/Login";
import Index from "./modules/Index"

render(<Router history={browserHistory}>
    <Route path="/" component={ReDash}>
      <IndexRoute component={Index}/>

      <Route path="/login" component={Login}/>
    </Route>
  </Router>, document.getElementById("redash"));
