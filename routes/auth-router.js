import express from "express";
import isAuthForLogin from "../middlewares/isAuthForLogin.js";
import {
  GetLogin,
  GetRegister,
  PostRegister,
  PostLogin,
  Logout,
  GetForgot,
  PostForgot,
  GetReset,
  PostReset,
  GetActivate,
} from "../controllers/AuthController.js";
import {
  validatePostLogin,
  validatePostRegister,
  validateGetActivate,
  validatePostForgot,
  validateGetReset,
  validatePostReset,
} from "./validations/authValidation.js";
import { handleValidationErrors } from "../middlewares/handleValidation.js";

const router = express.Router();

// User route
router.get("/", isAuthForLogin, GetLogin);
router.post(
  "/",
  isAuthForLogin,
  validatePostLogin,
  handleValidationErrors("/"),
  PostLogin
);
router.get("/user/logout", Logout);

router.get("/user/register", isAuthForLogin, GetRegister);
router.post(
  "/user/register",
  isAuthForLogin,
  validatePostRegister,
  handleValidationErrors("/user/register"),
  PostRegister
);

router.get("/user/forgot", isAuthForLogin, GetForgot);
router.post(
  "/user/forgot",
  isAuthForLogin,
  validatePostForgot,
  handleValidationErrors("/user/forgot"),
  PostForgot
);

router.get(
  "/user/reset/:token",
  isAuthForLogin,
  validateGetReset,
  handleValidationErrors("/"),
  GetReset
);
router.post(
  "/user/reset",
  isAuthForLogin,
  validatePostReset,
  handleValidationErrors((req) => `/user/reset/${req.body.PasswordToken}`),
  PostReset
);

router.get(
  "/user/activate/:token",
  isAuthForLogin,
  validateGetActivate,
  handleValidationErrors("/"),
  GetActivate
);

export default router;
