import express from "express";
import { GetIndex } from "../controllers/DashBoardController.js";
import isAuth from "../middlewares/isAuth.js"; // Import the authentication middleware

const router = express.Router();

// Dashboard route
router.get("/dashboard", isAuth, GetIndex);

export default router;
