import {
  validateEmail,
  validatePassword,
  validateString,
} from "../utils/validation.ts";
import { getUser, RegisterUser, updateUser } from "../controllers/user.ts";
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
  ],
  RegisterUser,
);
Router.get("/", getUser);
Router.put("/", updateUser);

export default Router;
