const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/authenticate");
const validation = require("../middlewares/validations");
const userController = require("../controllers/userController");
const carController = require("../controllers/carController");
const carAvController = require("../controllers/carAvailabilityController");

router.post(
  "/signup",
  validation.signUpSchema,
  validation.validateRequestSchema,
  middleware,
  userController.signup
);
router.post("/login", userController.login);
router.get("/users", middleware, userController.users);
router.get("/user/:id", middleware, userController.user);
router.delete("/user/:id", middleware, userController.userDelete);
router.put(
  "/user/:id",
  validation.userUpdateSchema,
  validation.validateRequestSchema,
  middleware,
  userController.userUpdate
);

router.post(
  "/car",
  validation.carSchema,
  validation.validateRequestSchema,
  middleware,
  carController.carCreate
);
router.get("/cars", middleware, carController.cars);
router.get("/car/:id", middleware, carController.car);
router.delete("/car/:id", middleware, carController.carDelete);
router.put(
  "/car/:id",
  validation.carUpdateSchema,
  validation.validateRequestSchema,
  middleware,
  carController.carUpdate
);

router.post(
  "/carav",
  validation.caravSchema,
  validation.validateRequestSchema,
  middleware,
  carAvController.caravCreate
);
router.get("/carsav", middleware, carAvController.carsav);
router.get("/carav/:id", middleware, carAvController.carav);
router.delete("/carav/:id", middleware, carAvController.caravDelete);
router.put(
  "/carav/:id",
  validation.caravUpdateSchema,
  validation.validateRequestSchema,
  middleware,
  carAvController.caravUpdate
);

module.exports = router;
