import { body, param } from "express-validator";

export const validatePostCreateAssets = [
  body("Name").trim().notEmpty().withMessage("Name is required").escape(),
  body("Description").trim().escape(),
  body("AssetsTypeId")
    .trim()
    .notEmpty()
    .withMessage("Asset type ID is required")
    .isMongoId()
    .withMessage("Invalid asset type ID format")
    .escape(),
  body("Symbol")
    .trim()
    .notEmpty()
    .withMessage("Symbol is required")
    .isUppercase()
    .withMessage("Symbol must be uppercase")
    .escape(),
  body("Logo").custom((value, { req }) => {
    // Check if the file is provided
    if (!req.file) {
      throw new Error("Logo file is required");
    }
    return true;
  }),
];

export const validateGetEditAssets = [
  param("assetsId")
    .trim()
    .notEmpty()
    .withMessage("Assets ID is required")
    .isMongoId()
    .withMessage("Invalid assets ID format")
    .escape(),
];

export const validatePostEditAssets = [
  body("Name").trim().notEmpty().withMessage("Name is required").escape(),
  body("Description").trim().escape(),
  body("AssetsTypeId")
    .trim()
    .notEmpty()
    .withMessage("Asset type ID is required")
    .isMongoId()
    .withMessage("Invalid asset type ID format")
    .escape(),
  body("Symbol")
    .trim()
    .notEmpty()
    .withMessage("Symbol is required")
    .isUppercase()
    .withMessage("Symbol must be uppercase")
    .escape(),
  body("AssetsId")
    .trim()
    .notEmpty()
    .withMessage("Assets ID is required")
    .isMongoId()
    .withMessage("Invalid assets ID format")
    .escape(),
];

export const validateDeleteAssets = [
  body("AssetsId")
    .trim()
    .notEmpty()
    .withMessage("Assets ID is required")
    .isMongoId()
    .withMessage("Invalid assets ID format")
    .escape(),
];
