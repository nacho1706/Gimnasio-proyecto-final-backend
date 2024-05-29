const express = require("express");
const {
  getAllUsers,
  updateUser,
  registerUser,
  loginUser,
} = require("../controllers/userControllers");

const registerValidation = require("../middlewares/register/registerValidation");
const handleValidationErrors = require("../middlewares/handleValidationErrors");
const { userExists, emailExists } = require("../middlewares/register/doesExists");

const app = express.Router();

app.get("/getAll", getAllUsers);

app.post(
  "/register",
  userExists, // Middleware personalizado
  emailExists,
  ...registerValidation, // Descomponiendo el arreglo en funciones individuales
  handleValidationErrors,
  registerUser
);

app.post(
  "/login",
  handleValidationErrors,
  loginUser
)

module.exports = app;
