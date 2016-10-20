"use strict";

const handlerList = [
  "testHandler",
  "loginHandler",
  "dbStatus"
];

const handlers = handlerList.map(name => { return require("./" + name); });

module.exports = handlers;
