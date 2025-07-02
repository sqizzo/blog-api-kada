const auth = (role) => (req, res, next) => {
  const headerRole = req.get("x-user-role");

  if (!headerRole) {
    const err = new Error("No required role in the header");
    err.status = 403;
    return next(err);
  }

  if (headerRole !== role) {
    const err = new Error("Required role did not match");
    err.status = 403;
    return next(err);
  }
  next();
};

module.exports = auth;
