const timing = require("./timing");

const logger = (req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = timing(start);
    console.log(`${req.method} ${req.path} - ${duration}ms`);
  });

  next();
};

module.exports = logger;
