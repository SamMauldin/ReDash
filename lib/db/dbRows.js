"use strict";

module.exports = r => {
  return (database, table, page) => {
    page = page * 25;
    return r.db(database).table(table).slice(page, page + 24).run();
  };
};
