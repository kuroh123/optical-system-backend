import authMiddleware from "../middleware/auth.js";
import express from "express";
import { dashboard } from "../controller/dashboard.js";
const router = express.Router();

// router.route("/").get(users);
router.get("/", authMiddleware, dashboard);

export default router;
