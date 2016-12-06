"use strict";

const handlerList = [
  "testHandler",
  "loginHandler",
  "dbStatus",
  "dbServers",
  "dbList",
  "dbTables",
  "dbRows",
  "dbPages"
];

const handlers = handlerList.map(name => { return require("./" + name); });

module.exports = handlers;
