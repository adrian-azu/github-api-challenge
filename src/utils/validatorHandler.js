const { validationResult, matchedData } = require("express-validator");
const { Request, Response, NextFunction } = require("express");

module.exports.validate = (validations) => async (req = Request, res = Response, next = NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      req.validated = matchedData(req);
      return next();
    }

    const errorObj = {};
    // eslint-disable-next-line no-unused-vars
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
      errorObj[param] = msg;
      return { [param]: msg };
    };
    errors.formatWith(errorFormatter).array();
    return res.status(200).json({
      message: "Validation Failed",
      data: errorObj,
    });
  };
