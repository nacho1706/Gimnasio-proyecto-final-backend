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
} = require("../middlewares/user/register/doesExists");
const { loginValidator } = require("../middlewares/user/login/dataValidator");
const { checkUserId } = require("../middlewares/user/id/checkUserId");
const {
  registerValidationRules,
  loginValidationRules,
  idValidationRules,
} = require("../middlewares/user/inputRules");
const {
  checkEmptyBody,
} = require("../middlewares/user/updateUser/checkEmptyBody");
const {
  blockPasswordUpdate,
} = require("../middlewares/user/updateUser/blockPasswordUpdate");
const auth = require("../middlewares/auth");
const emailRegisterSuccess = require("../middlewares/user/register/emailRegisterSuccess");
const excludeRoles = require("../middlewares/user/register/excludeRoles");

const app = express.Router();

//Get all users
app.get("/getAll", auth(["admin", "professor"]), getAllUsers);
//Get one user
app.get("/getUser/:username", getOneUser);
//Delete one User by id
app.delete(
  "/deleteUser/:id",
  auth("admin"),
  ...idValidationRules,
  checkUserId,
  deleteUserById
);
//Delete one User by username
app.delete(
  "/deleteUserbyUsername/:username",
  auth("admin"),
  deleteUserByUsername
); //BORRAR DESPUES PQ NO TIENE SENTIDO

//Update one user by ID
app.put(
  "/updateUser/:id",
  ...idValidationRules,
  checkUserId,
  auth(["admin, professor, student"]),
  checkEmptyBody,
  blockPasswordUpdate,
  handleValidationErrors,
  updateUser
);

//Register
app.post(
  "/register",
  userExists, // Middleware personalizado
  emailExists,
  ...registerValidationRules, // Descomponiendo el arreglo en funciones individuales
  excludeRoles,
  emailRegisterSuccess,
  handleValidationErrors,
  registerUser
);

app.post(
  //REGISTER DE ADMINS O DE PROFESORES, EN ESTE REGISTER SE PREGUNTARA SI EL USUARIO LOGUEADO ES ADMIN, SI ES QUE LO ES PERMITIRA CREAR USUARIOS CON CUALQUIER ROL
  "/registerAdmin",
  auth("admin"),
  userExists, // Middleware personalizado
  emailExists,
  ...registerValidationRules,
  emailRegisterSuccess,
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
