const express = require("express");
const {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUserById,
  // deleteUserByUsername,
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
} = require("../middlewares/inputRules");

const app = express.Router();

//Get all users
app.get("/getAll", getAllUsers);
//Get one user
app.get("/getUser/:username", getOneUser);
//Delete one User by id
app.delete("/deleteUser/:id", deleteUserById);

//Update one user by ID
app.put("/updateUser/:id", ...idValidationRules, checkUserId, handleValidationErrors, updateUser);

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
