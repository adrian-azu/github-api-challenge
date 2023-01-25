const { check } = require("express-validator");
const { validate } = require("../utils/validatorHandler");
const validationMessage = require("../constants/response/ErrorMessage");
const regex = require("../constants/regex");
module.exports = {
  register: () => {
    return validate([
      check("name").matches(regex.alphabetSpace()).withMessage(validationMessage.NAME_INVALID),
      check("email").isEmail().withMessage(validationMessage.EMAIL_INVALID),
      check("password").matches(regex.strongPassword()).withMessage(validationMessage.PASSWORD_INVALID),
    ]);
  },
  login: () => {
    return validate([
      check("email").isEmail().withMessage(validationMessage.EMAIL_INVALID),
      check("password").matches(regex.strongPassword()).withMessage(validationMessage.PASSWORD_INVALID),
    ]);
  },
};
