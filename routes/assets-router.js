import express from "express";
import {
  GetIndex,
  GetCreate,
  PostCreate,
  Delete,
  GetEdit,
  PostEdit,
} from "../controllers/AssetsController.js";
import isAuth from "../middlewares/isAuth.js"; // Import the authentication middleware
import { handleValidationErrors } from "../middlewares/handleValidation.js"; // Import the validation error handler
import {
  validatePostCreateAssets,
  validateGetEditAssets,
  validatePostEditAssets,
  validateDeleteAssets,
} from "./validations/assetsValidation.js"; // Import the validation rules

const router = express.Router();

// Assets routes
router.get("/index", isAuth, GetIndex);

router.get("/create", isAuth, GetCreate);
router.post(
  "/create",
  isAuth,
  validatePostCreateAssets,
  handleValidationErrors("/assets/create"),
  PostCreate
);

router.get(
  "/edit/:assetsId",
  isAuth,
  validateGetEditAssets,
  handleValidationErrors("/assets/index"),
  GetEdit
);
router.post(
  "/edit",
  isAuth,
  validatePostEditAssets,
  handleValidationErrors((req) => `/assets/edit/${req.body.AssetsId}`),
  PostEdit
);

router.post(
  "/delete",
  isAuth,
  validateDeleteAssets,
  handleValidationErrors("/assets/index"),
  Delete
);

export default router;
