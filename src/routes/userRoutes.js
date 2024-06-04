const express = require("express");
const {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUserById,
  deleteUserByUsername,
  registerUser,
  loginUser,
} = require("../controllers/userControllers");

const handleValidationErrors = require("../middlewares/handleValidationErrors");
const {
  userExists,
  emailExists,
} = require("../middlewares/register/doesExists");
const { loginValidator } = require("../middlewares/login/dataValidator");
const { checkUserId } = require("../middlewares/id/checkUserId");
const {
  registerValidationRules,
  loginValidationRules,
  idValidationRules,
  userIsEmpty,
} = require("../middlewares/inputRules");
const { checkEmptyBody } = require("../middlewares/updateUser/checkEmptyBody");
const { blockPasswordUpdate } = require("../middlewares/updateUser/blockPasswordUpdate");


const app = express.Router();

//Get all users
app.get("/getAll", getAllUsers);
//Get one user
app.get("/getUser/:username", getOneUser);
//Delete one User by id
app.delete("/deleteUser/:id", ...idValidationRules, deleteUserById);
//Delete one User by username
app.delete("/deleteUserbyUsername/:username", ...userIsEmpty, userExists, deleteUserByUsername);

//Update one user by ID
app.put("/updateUser/:id", ...idValidationRules, checkUserId, checkEmptyBody, blockPasswordUpdate, handleValidationErrors, updateUser);

//Register
app.post(
  "/register",
  userExists, // Middleware personalizado
  emailExists,
  ...registerValidationRules, // Descomponiendo el arreglo en funciones individuales
  handleValidationErrors,
  registerUser
);

//Login
app.post(
  "/login",
  ...loginValidationRules,
  loginValidator,
  handleValidationErrors,
  loginUser
);

module.exports = app;
