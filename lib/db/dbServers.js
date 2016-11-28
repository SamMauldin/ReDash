"use strict";

module.exports = r => {
  return () => {
    return r.table("server_status").run();
  };
};
