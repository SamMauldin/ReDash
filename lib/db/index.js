const cfg = require("../../config.json");

const r = require("rethinkdbdash")({
  db: "rethinkdb",
  servers: cfg.db.servers
});

module.exports = {
  status: require("./dbStatus")(r),
  list: require("./dbList")(r),
  servers: require("./dbServers")(r),
  tables: require("./dbTables")(r),
  pages: require("./dbPages")(r),
  rows: require("./dbRows")(r),
  dash: r
};
