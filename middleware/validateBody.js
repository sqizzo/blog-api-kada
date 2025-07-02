const validateBody = (keys) => (req, res, next) => {
  const body = req.body;
  let isValid = true;

  keys.forEach((key) => {
    if (!Object.keys(body).includes(key)) {
      isValid = false;
    }
  });

  if (!isValid) {
    const err = new Error("Invalid request body. Missing required fields.");
    err.status = 400;
    return next(err);
  }

  next();
};

module.exports = validateBody;
