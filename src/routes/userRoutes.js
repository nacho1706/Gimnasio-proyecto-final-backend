const express = require("express");
const {
  getAllUsers,
  updateUser,
  registerUser,
} = require("../controllers/userControllers");

const checkDuplicateUser = require("../middlewares/register/checkDuplicateUser");
const registerValidation = require("../middlewares/register/registerValidation");
const handleValidationErrors = require("../middlewares/handleValidationErrors");

const app = express.Router();

app.get("/getAll", getAllUsers);

app.post(
  "/register",
  checkDuplicateUser, // Middleware personalizado
  ...registerValidation, // Descomponiendo el arreglo en funciones individuales
  handleValidationErrors,
  registerUser
);

module.exports = app;
