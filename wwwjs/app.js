global.jQuery = require("jquery");
global.$ = global.jQuery;
require("./uikit.min.js");

import React from "react";
import { render } from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import ReDash from "./modules/ReDash";
import Login from "./modules/Login";
import Index from "./modules/Index";
import MainPage from "./modules/MainPage";
import ServerPage from "./modules/ServerPage";
import DBPage from "./modules/DBPage";

render(<Router history={browserHistory}>
    <Route path="/" component={ReDash}>
      <IndexRoute component={Index}/>

      <Route path="/login" component={Login}/>
      <Route path="/app" component={MainPage}/>
      <Route path="/app/server/:server" component={ServerPage}/>
      <Route path="/app/db/:db" component={DBPage}/>
    </Route>
  </Router>, document.getElementById("redash"));
