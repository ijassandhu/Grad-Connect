import {
  validateEmail,
  validateId,
  validatePassword,
  validateString,
} from "../utils/validation.js";
import {
  getUserAuth,
  getUserView,
  loginUser,
  RegisterUser,
  updateUser,
} from "../controllers/user.js";
import express from "express";
const Router = express.Router();

Router.post(
  "/",
  [
    validateEmail,
    validateString("name", false).isLength({ min: 3, max: 30 }),
    validatePassword,
    validateString("location"),
    validateString("profilePic"),
    validateString("about"),
  ],
  RegisterUser,
);
Router.post("/login", [validateEmail, validatePassword], loginUser);
Router.route("/:id")
  .get(validateId, getUserAuth)
  .put(
    [
      validateId,
      validateString("profilePic"),
      validateString("location"),
      validateString("about"),
    ],
    updateUser,
  );
Router.post("/test", getUserView);

export default Router;
