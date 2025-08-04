import { body, param } from "express-validator";

export const validatePostLogin = [
  body("Email").trim().isEmail().withMessage("Invalid email format").escape(),
  body("Password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .escape(),
];

export const validatePostRegister = [
  body("Name").trim().notEmpty().withMessage("Name is required").escape(),
  body("Email").trim().isEmail().withMessage("Invalid email format").escape(),
  body("Password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .custom((value, { req }) => {
      if (value !== req.body.ConfirmPassword) {
        throw new Error("Passwords do not match");
      }
      return true;
    })
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[\W_]/)
    .withMessage("Password must contain at least one special character"),
  body("ConfirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Confirm Password is required"),
];

export const validateGetActivate = [
  param("token").trim().notEmpty().withMessage("Token is required").escape(),
];

export const validatePostForgot = [
  body("Email").trim().isEmail().withMessage("Invalid email format").escape(),
];

export const validateGetReset = [
  param("token").trim().notEmpty().withMessage("Token is required").escape(),
];

export const validatePostReset = [
  body("Password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .custom((value, { req }) => {
      if (value !== req.body.ConfirmPassword) {
        throw new Error("Passwords do not match");
      }
      return true;
    })
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[\W_]/)
    .withMessage("Password must contain at least one special character"),

  body("ConfirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Confirm Password is required"),

  body("UserId")
    .trim()
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid User ID")
    .escape(),

  body("PasswordToken")
    .trim()
    .notEmpty()
    .withMessage("Password token is required")
    .escape(),
];
