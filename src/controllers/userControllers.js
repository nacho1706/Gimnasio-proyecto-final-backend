const UserModel = require("../models/userSchema");

const bycrypt = require("bycrypt");
const JWT = requre("jsonwebtoken");
const { validationResult } = require("express-validator");


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
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
      }
  
      const { username, password, email, first_name, last_name, phone_number, pfp } = req.body;
  
      const userExist = await UserModel.findOne({ nombreUsuario });
  
      if (userExist) {
        return res
          .status(422)
          .json({ msg: "Username already exists. Please select another username" });
      }
  
      if (!nombreUsuario) {
        return res.status(400).json({ msg: "Campo NOMBRE Vacio" });
      } else if (!contrasenia) {
        return res.status(400).json({ msg: "Campo CONTRASEÑA Vacio" });
      }
  
      const newUser = new UserModel(req.body);
      const newCart = new CartModel({ idUser: newUser._id });
      const newFav = new FavsModel({ idUser: newUser._id });
  
      newUser.idCart = newCart._id;
      newUser.idFav = newFav._id;
  
      let salt = bcrypt.genSaltSync(10);
      newUser.contrasenia = bcrypt.hashSync(req.body.contrasenia, salt);
  
      //const sendMail = await userRegister(emailUsuario);
  
      /* if (sendMail === 200) { */
      await newCart.save();
      await newFav.save();
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