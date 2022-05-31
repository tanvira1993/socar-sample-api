const { body, validationResult } = require("express-validator");
const User = require("../controllers/userController");

exports.validateRequestSchema = (Request, Response, NextFunction) => {
  const errors = validationResult(Request);
  if (!errors.isEmpty()) {
    return Response.status(422).json({
      message: "Unprocessable entity!",
      errors: errors.array(),
    });
  }
  NextFunction();
};

exports.signUpSchema = [
  body("email")
    .isEmail()
    .withMessage("email must contain a valid email address"),
  body("email").custom((value, { req }) => {
    return User.userFindByEmail(req.body.email).then((user) => {
      if (user.length) {
        return Promise.reject("E-mail already in use");
      } else {
        return true;
      }
    });
  }),
  body("password")
    .isLength({ min: 5 })
    .withMessage("password must be at least 5 characters long"),
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("role")
    .isLength({ min: 3 })
    .withMessage("Role must be at least 3 characters long"),
  body("permission").custom((value, { req }) => {
    const check = ["all", "edit", "view"];
    if (!check.includes(req.body.permission)) {
      return Promise.reject("Permission is not valid");
    } else {
      return true;
    }
  }),
];

exports.userUpdateSchema = [
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("role")
    .isLength({ min: 3 })
    .withMessage("Role must be at least 3 characters long"),
  body("permission").custom((value, { req }) => {
    const check = ["all", "edit", "view"];
    if (!check.includes(req.body.permission)) {
      return Promise.reject("Permission is not valid");
    } else {
      return true;
    }
  }),
];
