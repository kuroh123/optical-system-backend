import authMiddleware from "../middleware/auth.js";
import express from "express";
import { dashboard } from "../controller/dashboard.js";
const router = express.Router();

router.get("/", authMiddleware, dashboard);

// router.post("/", authMiddleware, dashboard);

export default router;
