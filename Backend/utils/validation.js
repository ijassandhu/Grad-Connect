import { body, param } from "express-validator";

export const validateString = (field, optional = true) => {
  return optional
    ? body(field)
      .trim()
      .escape()
      .isString()
      .withMessage("Not a String")
      .notEmpty()
      .withMessage("Empty String")
      .optional()
    : body(field)
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Empty String")
      .isString()
      .withMessage("Not a String");
};

export const validateEmail = body("email")
  .trim()
  .escape()
  .isEmail()
  .withMessage("Invalid Email");

export const validatePassword = body("password")
  .isString()
  .withMessage("Not a String")
  .isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1,
  })
  .withMessage("Weak Password");

export const validateId = param("id").isJWT().withMessage("Invalid Token");

export const validateArray = (field) =>
  body(field).isArray().withMessage("Not an Array");

export const validateIdinArray = (field) =>
  body(field).isJWT().withMessage("Invalid Token");

export const validateViewableBy = body("viewableBy")
  .isInt({
    min: 1,
    max: 3,
  })
  .optional();
