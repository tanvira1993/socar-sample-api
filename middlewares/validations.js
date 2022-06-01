const { body, validationResult } = require("express-validator");
const User = require("../controllers/userController");
const Car = require("../controllers/carController");

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

exports.carSchema = [
  body("user_id").custom((value, { req }) => {
    return User.userFindById(req.body.user_id).then((user) => {
      if (!user) {
        return Promise.reject("user invalid");
      } else {
        return true;
      }
    });
  }),
  body("brand")
    .isLength({ min: 3 })
    .withMessage("Brand must be at least 3 characters long"),
  body("build")
    .isLength({ min: 3 })
    .withMessage("build must be at least 3 characters long"),
  body("year")
    .isLength({ min: 3 })
    .withMessage("Year must be at least 3 characters long"),
  body("model")
    .isLength({ min: 3 })
    .withMessage("Model must be at least 3 characters long"),
  body("geolocation")
    .isLength({ min: 3 })
    .withMessage("Location must be at least 3 characters long"),
  body("day_price").isInt({ gt: 0 }).withMessage("Price must be a Number"),
];

exports.carUpdateSchema = [
  body("brand")
    .isLength({ min: 3 })
    .withMessage("Brand must be at least 3 characters long"),
  body("build")
    .isLength({ min: 3 })
    .withMessage("build must be at least 3 characters long"),
  body("year")
    .isLength({ min: 3 })
    .withMessage("Year must be at least 3 characters long"),
  body("model")
    .isLength({ min: 3 })
    .withMessage("Model must be at least 3 characters long"),
  body("geolocation")
    .isLength({ min: 3 })
    .withMessage("Location must be at least 3 characters long"),
  body("day_price").isInt({ gt: 0 }).withMessage("Price must be a Number"),
  body("is_featured").isBoolean().withMessage("Featured is required"),
];

exports.caravSchema = [
  body("car_id").custom((value, { req }) => {
    return Car.carFindById(req.body.car_id).then((car) => {
      if (!car) {
        return Promise.reject("car invalid");
      } else {
        return true;
      }
    });
  }),
  body("start_at").isDate().withMessage("Must be a valid date"),
  body("end_at").isDate().withMessage("Must be a valid date"),
  body("end_at").custom((sdate, { req }) => {
    const [sy, sm, sd] = req.body.start_at.split("-");
    const [ey, em, ed] = req.body.end_at.split("-");

    const startDate = new Date(sy, sm, sd);
    const endDate = new Date(ey, em, ed);
    if (startDate >= endDate) {
      throw new Error("Start date of Car Availability must be before End date");
    }
    return true;
  }),
];
exports.caravUpdateSchema = [
  body("start_at").isDate().withMessage("Must be a valid date"),
  body("end_at").isDate().withMessage("Must be a valid date"),
  body("end_at").custom((sdate, { req }) => {
    const [sy, sm, sd] = req.body.start_at.split("-");
    const [ey, em, ed] = req.body.end_at.split("-");

    const startDate = new Date(sy, sm, sd);
    const endDate = new Date(ey, em, ed);
    if (startDate >= endDate) {
      throw new Error("Start date of Car Availability must be before End date");
    }
    return true;
  }),
  body("is_active").isBoolean().withMessage("Active is required"),
];
