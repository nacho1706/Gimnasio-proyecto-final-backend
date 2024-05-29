const { check } = require('express-validator');

const loginValidationRules = [
  check("username").not().isEmpty().withMessage("Username is required"),
  check("password").not().isEmpty().withMessage("Password is required"),
  ];

module.exports = { loginValidationRules };
