const UserModel = require("../models/userSchema");

const userExists = async (username, res) => {
  try {
    const userExist = await UserModel.findOne({ username });

    if (userExist) {
      return res
        .status(422)
        .json({ msg: "Username already exists.", username: username });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
};

const emailExists = async (email, res) => {
  try {
    const emailExist = await UserModel.findOne({ email });

    if (emailExist) {
      return res
        .status(422)
        .json({ msg: "Email already in use.", email: email });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
};

module.exports = {
  userExists,
  emailExists,
};
