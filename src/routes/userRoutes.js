const express = require("express");
const {
  getAllUsers,
  updateUser,
  registerUser,
  loginUser,
} = require("../controllers/userControllers");

const registerValidation = require("../middlewares/register/regRulesValidator");
const handleValidationErrors = require("../middlewares/handleValidationErrors");
const { userExists, emailExists } = require("../middlewares/register/doesExists");
const { loginValidator } = require("../middlewares/login/dataValidator");
const registerValidationRules = require("../middlewares/register/regRulesValidator");
const { loginValidationRules } = require("../middlewares/login/logRulesValidator");

const app = express.Router();

app.get("/getAll", getAllUsers);
app.post(
  "/register",
  userExists, // Middleware personalizado
  emailExists,
  ...registerValidationRules, // Descomponiendo el arreglo en funciones individuales
  handleValidationErrors,
  registerUser
);

app.post(
  "/login",
  ...loginValidationRules,
  loginValidator,
  handleValidationErrors,
  loginUser
)

module.exports = app;
