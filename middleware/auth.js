const auth = (role) => (req, res, next) => {
  const headerRole = req.get("x-user-role");

  if (!headerRole) {
    next(new Error("No required role in the header"));
    return;
  }

  if (headerRole !== role) {
    next(new Error("Required role did not match"));
    return;
  }

  next();
};

module.exports = auth;
