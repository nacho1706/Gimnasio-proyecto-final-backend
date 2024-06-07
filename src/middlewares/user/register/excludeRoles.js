const excludeRoles = (req, res, next) => {
  try {
    if (req.body) {
      req.body.role = "student";
    }
    next();
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
};

module.exports = excludeRoles;
