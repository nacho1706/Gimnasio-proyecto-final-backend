const UserModel = require("../models/userSchema");

const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
// const { userExists, emailExists } = require("../utils/doesExists");

const getAllUsers = async (req, res) => {
  try {
    const getUsers = await UserModel.find();
    res.status(200).json({ msg: "All users:  ", getUsers });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const update = await UserModel.findByIdAndUpdate(
      { _id: req.params.idUser },
      req.body,
      { new: true }
    );

    res.status(200).json({ msg: "Usuario Actualizado", update });
  } catch (error) {
    console.log(error);
  }
};

const registerUser = async (req, res) => {
  try {
    // const { username , email } = req.body;
    // userExists(username);
    // emailExists(email);

    const newUser = new UserModel(req.body);

    let salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(req.body.password, salt);

    //const sendMail = await userRegister(emailUsuario);

    /* if (sendMail === 200) { */
    await newUser.save();

    res.status(201).json({ msg: "Usuario creado con exito", newUser });
    /*} else {
        res.status(400).json({ msg: "ERRMAIL. No se pudo crear el usuario" });
      } */
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error: Server", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await UserModel.findOne({username})

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
    console.log(error);
    res.status(500).json({ msg: "Error: Server", error });
  }
};

module.exports = {
  getAllUsers,
  updateUser,
  registerUser,
  loginUser,
};
