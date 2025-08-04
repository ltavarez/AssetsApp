import express from "express";
import {
  GetIndex,
  GetCreate,
  PostCreate,
  Delete,
  GetEdit,
  PostEdit,
} from "../controllers/AssetsTypeController.js";
import isAuth from "../middlewares/isAuth.js"; // Import the authentication middleware
import { handleValidationErrors } from "../middlewares/handleValidation.js"; // Import the validation error handler
import {
  validatePostCreateAssetsType,
  validateGetEditAssetsType,
  validatePostEditAssetsType,
  validateDeleteAssetsType,
} from "./validations/assetsTypeValidation.js"; // Import validation rules

const router = express.Router();

// Assets type routes
router.get("/index", isAuth, GetIndex);

router.get("/create", isAuth, GetCreate);
router.post(
  "/create",
  isAuth, 
  validatePostCreateAssetsType, // Validate the request body
  handleValidationErrors("/assets-type/create"),
  PostCreate
);

router.get(
  "/edit/:assetsTypeId",
  isAuth,
  validateGetEditAssetsType,
  handleValidationErrors("/assets-type/index"),
  GetEdit
);

router.post(
  "/edit",
  isAuth,
  validatePostEditAssetsType, // Validate the request body
  handleValidationErrors((req) => `/assets-type/edit/${req.body.AssetsTypeId}`),
  PostEdit
);

router.post(
  "/delete",
  isAuth,
  validateDeleteAssetsType, // Validate the request body
  handleValidationErrors("/assets-type/index"),
  Delete
);

export default router;
