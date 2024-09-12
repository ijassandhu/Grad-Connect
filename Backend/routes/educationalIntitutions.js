import express from "express";
import {
  validateEmail,
  validateId,
  validatePassword,
  validateString,
} from "../utils/validation.js";
import { loginEduInstitution, registerEduInstitution } from "../controllers/educationalIntitutions.js";
const Router = express.Router();

Router.route("/")
  .post(
    [
      validateString("name", false),
      validateEmail,
      validatePassword,
      validateString("location"),
      validateString("ProfilePic"),
      validateString("about"),
    ],
    registerEduInstitution,
  )
  .get([validateEmail, validatePassword], loginEduInstitution);

// Router.route("/:id").get(validateId, getEduInstitutionAuth).put([
//       validateString("location"),
//       validateString("ProfilePic"),
//       validateString("about"),
// ]);

export default Router;

//add student
//add alumni
