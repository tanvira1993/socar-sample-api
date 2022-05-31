const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/authenticate");
const validation = require("../middlewares/validations");
const userController = require("../controllers/userController");

router.post(
  "/signup",
  validation.signUpSchema,
  validation.validateRequestSchema,
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

// router.post("/post", middleware, postController.post);
// router.get("/posts", middleware, postController.posts);
// router.put("/upvote", middleware, postController.upvote);
// router.put("/downvote", middleware, postController.downvote);
// router.post("/comment", middleware, postController.comment);

module.exports = router;
