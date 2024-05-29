const { check } = require('express-validator');

const registerValidation = [
  check("username").not().isEmpty().withMessage("Username is required"),
  check("password").not().isEmpty().withMessage("Password is required"),
  check("password")
    .isLength({ min: 8, max: 30 })
    .withMessage("Password requires a min of 8 characters and a max of 30"),
  check("email")
    .isEmail()
    .withMessage("Debe ser un correo electrónico válido")
];
module.exports = registerValidation;
