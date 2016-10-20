const cfg = require("../../config.json");

const r = require("rethinkdbdash")({
  db: "rethinkdb",
  servers: cfg.db.servers
});

module.exports = {
  status: require("./dbStatus")(r),
  dash: r
};
