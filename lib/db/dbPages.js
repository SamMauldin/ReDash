"use strict";

module.exports = r => {
  return (database, table) => {
    return r.db(database).table(table).count().run().then(function(val) {
      return Math.min(Math.ceil(val / 25), 1);
    });
  };
};
