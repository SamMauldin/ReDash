"use strict";

module.exports = r => {
  return () => {
    return r.dbList().run();
  };
};
