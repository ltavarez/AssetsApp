import { body, param } from "express-validator";

export const validatePostCreateAssetsType = [
  body("Name").trim().notEmpty().withMessage("Name is required").escape(),
  body("Description").trim().escape(),
];

export const validateGetEditAssetsType = [
  param("assetsTypeId")
    .trim()
    .notEmpty()
    .withMessage("Asset type ID is required")
    .isMongoId()
    .withMessage("Invalid asset type ID format")
    .escape(),
];

export const validatePostEditAssetsType = [
  body("Name").trim().notEmpty().withMessage("Name is required").escape(),
  body("Description").trim().escape(),
];

export const validateDeleteAssetsType = [
  body("AssetsTypeId")
    .trim()
    .notEmpty()
    .withMessage("Asset type ID is required")
    .isMongoId()
    .withMessage("Invalid asset type ID format")
    .escape(),
];
