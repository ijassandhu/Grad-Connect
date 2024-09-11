import { body } from "express-validator";

export const validateString = (field: string, optional: Boolean = true) => {
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
