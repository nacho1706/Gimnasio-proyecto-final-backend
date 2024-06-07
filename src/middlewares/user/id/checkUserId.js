const UserModel = require("../../../models/userSchema");

const checkUserId = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Si el usuario existe, agregamos el usuario al objeto de solicitud (req) y pasamos al siguiente middleware
    req.user = user;
    next();
  } catch (error) {
    console.error("Error checking user ID:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { checkUserId };
