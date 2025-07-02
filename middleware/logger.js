const timing = require("./timing");
const attachTimestamp = require("./attachTimestamp");

const logger = (req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = timing(start);
    console.log(
      `${req.method} ${req.originalUrl} - ${duration}ms - ${attachTimestamp()}`
    );
  });

  next();
};

module.exports = logger;
