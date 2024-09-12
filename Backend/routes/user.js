import {
  validateEmail,
  validateId,
  validatePassword,
  validateString,
} from "../utils/validation.js";
import {
  getUserAuth,
  loginUser,
  RegisterUser,
  updateUser,
} from "../controllers/user.js";
import express from "express";
const Router = express.Router();

Router.route("/")
  .post(
    [
      validateEmail,
      validateString("name", false).isLength({ min: 3, max: 30 }),
      validatePassword,
      validateString("location"),
      validateString("profilePic"),
      validateString("about"),
    ],
    RegisterUser,
  )
  .get([validateEmail, validatePassword], loginUser);
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

export default Router;
