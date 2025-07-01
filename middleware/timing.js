const timing = (start) => {
  const time = Date.now() - start;

  return time;
};

module.exports = timing;
