const errorHandler = (msg) => {
  return {
    results: "fail",
    error: msg,
  };
};

module.exports = errorHandler;
