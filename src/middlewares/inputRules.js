const { check } = require("express-validator");

const registerValidationRules = [
  check("username").not().isEmpty().withMessage("Username is required"),
  check("password").not().isEmpty().withMessage("Password is required"),
  check("password")
    .isLength({ min: 8, max: 30 })
    .withMessage("Password requires a min of 8 characters and a max of 30"),
  check("email").isEmail().withMessage("Debe ser un correo electrónico válido"),
];

const loginValidationRules = [
  check("username").not().isEmpty().withMessage("Username is required"),
  check("password").not().isEmpty().withMessage("Password is required"),
];

const idValidationRules = [
  check("id").isMongoId().withMessage("Invalid MongoDB ID"),
];

const userIsEmpty = [
  check("username").not().isEmpty().withMessage("Username is required"),
];


module.exports = {
  registerValidationRules,
  loginValidationRules,
  idValidationRules,
  userIsEmpty
};
