"use strict";

module.exports = r => {
  return () => {
    return r.table("current_issues").run().then(res => {
      let warn = false;
      let critical = false;
      let messages = [];

      res.forEach(function(stat) {
        warn = true;
        if (stat.critical) {
          critical = true;
        }
        messages.push(stat.description);
      });

      return {
        status: critical ? 2 : (warn ? 1 : 0),
        messages: messages
      };

    });
  };
};
