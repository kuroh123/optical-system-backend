import authMiddleware from "../middleware/auth.js";
import express from "express";
import { patients, createPatient } from "../controller/patients.js";
const router = express.Router();

// router.route("/").get(users);
router.get("/", authMiddleware, patients);
router.post("/", authMiddleware, createPatient);

export default router;
