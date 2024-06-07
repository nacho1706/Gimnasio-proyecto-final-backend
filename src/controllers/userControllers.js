const UserModel = require("../models/userSchema");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const recoveryPassMsg = require("../middlewares/user/updateUser/recoveryPass");

// const { userExists, emailExists } = require("../utils/doesExists");

const getAllUsers = async (req, res) => {
  try {
    const getUsers = await UserModel.find().select("-password");
    res.status(200).json({ msg: "All users:  ", getUsers });
  } catch (error) {
    console.log(error);
  }
};
const getOneUser = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await UserModel.findOne({ username }).select("-password -_id");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const update = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    console.log(update);
    res.status(200).json({ msg: "User updated successfuly", update });
  } catch (error) {
    res.status(500).json({ msg: "Error: Server", error });
  }
};

const deleteUserByUsername = async (req, res) => {
  try {
    const user = await UserModel.findOneAndDelete({
      username: req.params.username,
    });

    const userResponse = {
      _id: user._id,
      username: user.username,
    };

    res
      .status(200)
      .json({ msg: "Username deleted susccessfuly", user: userResponse });
  } catch (error) {
    res.status(500).json({ msg: "Error: Server", error });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);

    const userResponse = {
      _id: user._id,
      username: user.username,
    };

    res
      .status(200)
      .json({ msg: "User deleted susccessfuly", user: userResponse });
  } catch (error) {
    res.status(500).json({ msg: "Error: Server", error });
  }
};

const registerUser = async (req, res) => {
  try {
    const newUser = new UserModel(req.body);

    let salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(req.body.password, salt);
    
    await newUser.save();

    res.status(201).json({ msg: "Usuario creado con exito", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error: Server", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await UserModel.findOne({ username });

    const payload = {
      user: {
        idUser: user._id,
        role: user.role,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        pfp: user.pfp,
      },
    };

    const token = JWT.sign(payload, process.env.JWT_SECRETPASS);
    console.log(token);
    res.status(200).json({ msg: "Usuario Logueado", token });
  } catch (error) {
    res.status(500).json({ msg: "Error: Server", error });
  }
};

const recoveryPass = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });

    console.log(user); //borrar depsues

    const payload = {
      user: {
        idUser: user._id,
        username: user.username,
        role: user.role,
      },
    };

    const token = JWT.sign(payload, process.env.JWT_SECRETPASS);
    const response = await recoveryPassMsg(token, email);

    if (response === 200) {
      res.status(200).json({ msg: "An email has been sended to your account" });
    } else {
      res.status(422).json({ msg: "ERRMAIL. Email not sended" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error: Server", error });
  }
};

const changePass = async (req, res) => {
  try {
    console.log(req.body);
    const verifyToken = JWT.verify(req.body.token, process.env.JWT_SECRETPASS);
    const user = await UserModel.findOne({ _id: verifyToken.user.idUser });

    let salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(req.body.password, salt);

    await user.save();
    res.status(200).json({ msg: "Contraseña cambiada con exito" });
  } catch (error) {
    res.status(500).json({ msg: "Error: Server", error });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUserById,
  deleteUserByUsername,
  registerUser,
  loginUser,
  recoveryPass,
  changePass
};
