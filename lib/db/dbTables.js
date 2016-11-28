"use strict";

module.exports = r => {
  return () => {
    return r.table("table_status").run();
  };
};
