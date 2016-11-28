"use strict";

const handlerList = [
  "testHandler",
  "loginHandler",
  "dbStatus",
  "dbServers",
  "dbList"
];

const handlers = handlerList.map(name => { return require("./" + name); });

module.exports = handlers;
