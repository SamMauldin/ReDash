"use strict";

const handlerList = [
  "testHandler"
];

const handlers = handlerList.map(name => { return require("./" + name); });

module.exports = handlers;
