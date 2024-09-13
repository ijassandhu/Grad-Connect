import express from "express";
import {
  validateArray,
  validateEmail,
  validateId,
  validateIdinArray,
  validatePassword,
  validateString,
} from "../utils/validation.js";
import {
  addAlumnis,
  addStudents,
  getEduInstitutionAuth,
  loginEduInstitution,
  registerEduInstitution,
  updateEduInstitution,
} from "../controllers/educationalIntitutions.js";
const Router = express.Router();

Router.post(
  "/",
  [
    validateString("name", false),
    validateEmail,
    validatePassword,
    validateString("location"),
    validateString("ProfilePic"),
    validateString("about"),
  ],
  registerEduInstitution,
);
Router.post("/login", [validateEmail, validatePassword], loginEduInstitution);

Router.route("/:id")
  .get(validateId, getEduInstitutionAuth)
  .put(
    [
      validateId,
      validateString("location"),
      validateString("ProfilePic"),
      validateString("about"),
    ],
    updateEduInstitution,
  );
//
//add student
Router.route("/student/:id").post(
  [validateId, validateArray("students"), validateIdinArray("student.*")],
  addStudents,
);
//add alumni
Router.route("/alumni/:id").post(
  [validateId, validateArray("alumnis"), validateIdinArray("aluminis.*")],
  addAlumnis,
);

export default Router;
