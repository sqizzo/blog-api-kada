const validateBody = (keys) => (req, res, next) => {
  const body = req.body;
  let isValid = true;

  keys.forEach((key) => {
    if (!Object.keys(body).includes(key)) {
      isValid = false;
    }
  });

  if (!isValid) {
    return res
      .status(400)
      .json({ error: "Invalid request body. Missing required fields." });
  }

  next();
};

module.exports = validateBody;
