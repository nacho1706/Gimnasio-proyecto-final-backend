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
const { userExists, emailExists } = require("../middlewares/register/doesExists");
const { loginValidator } = require("../middlewares/login/dataValidator");
const { registerValidationRules } = require("../middlewares/register/regRulesValidator");
const { loginValidationRules } = require("../middlewares/login/logRulesValidator");

const app = express.Router();

//Get all users
app.get("/getAll", getAllUsers);

//Get one user
app.get("getUser/:username", getOneUser)

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
)




module.exports = app;
