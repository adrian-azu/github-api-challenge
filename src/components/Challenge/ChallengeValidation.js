const { check } = require("express-validator");
const { validate } = require("../../utils/validatorHandler");
const validationMessage = require("../../constants/response/ErrorMessage");
const regex = require("../../constants/regex");

module.exports = {
  githubList: () => validate([
      check("usernames").isArray({ max: 10 }).withMessage(validationMessage.USERNAMES_INVALID),
      check("usernames.*").isString().withMessage(validationMessage.USERNAMES_).bail().matches(regex.alphaNumericDash()),
    ]),
  distance: () => validate([
      check("x").isInt({ lt: 231, gt: -1 }).withMessage(validationMessage.NUMERIC_ONLY),
      check("y").isInt({ lt: 231, gt: -1 }).withMessage(validationMessage.NUMERIC_ONLY),
    ]),
};
